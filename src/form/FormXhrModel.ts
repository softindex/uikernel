/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import url from 'url';
import {assertNonNullish} from '../common/assert';
import type {DefaultXhr} from '../common/defaultXhr';
import defaultXhr from '../common/defaultXhr';
import EventsModel from '../common/EventsModel';
import parseJson from '../common/parseJson';
import type {EventListener, IObservable} from '../common/types';
import type {IValidator} from '../validation/types/IValidator';
import ValidationErrors from '../validation/ValidationErrors';
import ValidatorBuilder from '../validation/ValidatorBuilder';
import type {FormModelListenerArgsByEventName} from './types/FormModelListenerArgsByEventName';
import type {IFormModel} from './types/IFormModel';
import type {JsonFormApiResult} from './types/JsonFormApiResult';

const MAX_URI_LENGTH = 2048;

type FormXhrModelParams<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string
> = {
  api: string;
  eventsModel?: EventsModel<FormModelListenerArgsByEventName<TRecord>>;
  multipartFormData?: boolean;
  validateOnClient?: boolean;
  validator?: IValidator<TRecord, TEditableField>;
  xhr?: DefaultXhr;
};

class FormXhrModel<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord>
  implements IFormModel<TEditableRecord, TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>>
{
  private multipartFormDataEncoded: boolean;
  private validator: IValidator<TRecord, keyof TEditableRecord & string>;
  private validateOnClient: boolean;
  private xhr: DefaultXhr;
  private apiURL: string;
  private eventsModel: EventsModel<FormModelListenerArgsByEventName<TRecord>>;

  constructor(settings: FormXhrModelParams<TRecord, keyof TEditableRecord & string>) {
    this.multipartFormDataEncoded = settings.multipartFormData ?? false;
    this.validator = settings.validator ?? ValidatorBuilder.createEmptyValidator();
    this.validateOnClient = settings.validateOnClient ?? false;
    this.xhr = settings.xhr ?? defaultXhr;
    this.eventsModel = settings.eventsModel ?? new EventsModel();
    this.apiURL = settings.api
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(
    fields: TField[] | readonly TField[]
  ): Promise<Partial<Pick<TRecord, TField>>>;
  async getData<TField extends keyof TRecord & string>(
    fields: TField[] | readonly TField[] = []
  ): Promise<Partial<Pick<TRecord, TField>>> {
    const parsedURL = url.parse(this.apiURL, true);
    parsedURL.query.fields = JSON.stringify(fields);
    parsedURL.search = null;

    if (url.format(parsedURL).length > MAX_URI_LENGTH) {
      return await this.getDataPostRequest(fields);
    }

    return (await this.xhr({
      method: 'GET',
      uri: url.format(parsedURL),
      json: true
    })) as JsonFormApiResult<TRecord, keyof TEditableRecord & string>['getData'];
  }

  async submit(record: Partial<TRecord>): Promise<Partial<TRecord>> {
    const formData = new FormData();

    if (this.multipartFormDataEncoded) {
      const ordinaryData: Partial<TRecord> = {};
      for (const prop in record) {
        if (!Object.prototype.hasOwnProperty.call(record, prop)) {
          continue;
        }

        const value = record[prop];
        if (value instanceof File) {
          formData.append(prop, value);
        } else {
          ordinaryData[prop] = value;
        }
      }

      formData.append('rest', JSON.stringify(ordinaryData));
    }

    const rawBody = await this.xhr({
      method: 'POST',
      ...(!this.multipartFormDataEncoded && {
        headers: {
          'Content-type': 'application/json'
        }
      }),
      uri: this.apiURL,
      body: this.multipartFormDataEncoded ? formData : JSON.stringify(record)
    });

    const {data, error} = parseJson(rawBody) as JsonFormApiResult<
      TRecord,
      keyof TEditableRecord & string
    >['submit'];

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw ValidationErrors.createFromJSON(error);
    }

    assertNonNullish<object | null>(data, '"data" unknown');
    this.eventsModel.trigger('update', data);
    return data;
  }

  /**
   * Validation check
   */
  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>> {
    if (this.validateOnClient) {
      return this.validator.isValidRecord(record);
    }

    const parsedURL = url.parse(this.apiURL, true);
    parsedURL.pathname = url.resolve(parsedURL.pathname ?? '', 'validation');

    let response: JsonFormApiResult<TRecord, keyof TEditableRecord & string>['validate'];
    try {
      response = (await this.xhr({
        method: 'POST',
        uri: url.format(parsedURL),
        body: record,
        json: true
      })) as JsonFormApiResult<TRecord, keyof TEditableRecord & string>['validate'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.statusCode === 413) {
        // When request exceeds server limits and
        // client validators are able to find errors,
        // we need to return these errors{
        const validationErrors = await this.validator.isValidRecord(record);
        if (!validationErrors.isEmpty()) {
          return validationErrors;
        }
      }

      throw error;
    }

    return ValidationErrors.createFromJSON(response);
  }

  /**
   * Get all dependent fields, that are required for validation
   */
  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.validator.getValidationDependency(fields);
  }

  on<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(
    eventName: TEventName,
    cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>
  ): this {
    this.eventsModel.on(eventName, cb);
    return this;
  }

  off<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(
    eventName: TEventName,
    cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>
  ): this {
    this.eventsModel.off(eventName, cb);
    return this;
  }

  removeAllListeners(eventName: keyof FormModelListenerArgsByEventName<TRecord>): void {
    this.eventsModel.removeAllListeners(eventName);
  }

  private async getDataPostRequest<TField extends keyof TRecord & string>(
    fields: TField[] | readonly TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    const parsedURL = url.parse(this.apiURL, true);
    parsedURL.pathname = url.resolve(parsedURL.pathname ?? '', 'data');

    return (await this.xhr({
      method: 'POST',
      json: true,
      uri: url.format(parsedURL),
      body: {fields}
    })) as JsonFormApiResult<TRecord, keyof TEditableRecord & string>['getData'];
  }
}

export default FormXhrModel;
