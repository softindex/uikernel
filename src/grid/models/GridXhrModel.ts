/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import url from 'url';
import defaultXhr, {DefaultXhr} from '../../common/defaultXhr';
import parseJson from '../../common/parseJson';
import {IObservable} from '../../common/types';
import {keys} from '../../common/utils';
import ValidationErrors from '../../validation/ValidationErrors';
import Validator from '../../validation/Validator';
import AbstractGridModel from './AbstractGridModel';
import {GridModelListenerArgsByEventName} from './types/GridModelListenerArgsByEventName';
import {
  IGridModelReadParams,
  IGridModel,
  IGridModelReadResult,
  IGridModelUpdateResult
} from './types/IGridModel';
import {JsonGridApiResult} from './types/JsonGridApiResult';

const MAX_URI_LENGTH = 2048;

type GridXhrModelParams<TRecord extends Record<string, unknown>> = {
  /**
   * @description API address
   */
  api: string;
  /**
   * @description Send form data with enctype='multipart/form-data' - Default `false`
   */
  multipartFormData?: boolean;
  /**
   * @description Don't send validation request to server - Default `false`
   */
  validateOnClient?: boolean;
  /**
   * @description General validator
   */
  validator?: Validator<TRecord>;
  xhr?: DefaultXhr;
};

/**
 * Grid model, that works with API via XHR
 */
class GridXhrModel<TKey, TRecord extends Record<string, unknown>, TFilters>
  extends AbstractGridModel<TKey, TRecord, TFilters, GridModelListenerArgsByEventName<TKey, TRecord>>
  implements
    IGridModel<TKey, TRecord, TFilters>,
    IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>
{
  private xhr: DefaultXhr;
  private validator: Validator<TRecord>;
  private apiUrl: string;
  private validateOnClient: boolean;
  private multipartFormDataEncoded: boolean;

  constructor({
    api,
    validator = new Validator(),
    xhr = defaultXhr,
    validateOnClient = false,
    multipartFormData = false
  }: GridXhrModelParams<TRecord>) {
    super();

    this.validator = validator;
    this.xhr = xhr;
    this.validateOnClient = validateOnClient;
    this.multipartFormDataEncoded = multipartFormData;
    this.apiUrl = api
      .replace(/([^/])\?/, '$1/?') // Add "/" before "?"
      .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }

  /**
   * Add a record
   */
  async create(record: Partial<TRecord>): Promise<TKey> {
    const formData = new FormData();

    if (this.multipartFormDataEncoded) {
      const ordinaryData: Partial<TRecord> = {};
      for (const prop in record) {
        if (!Object.prototype.hasOwnProperty.call(record, prop)) {
          continue;
        }

        const value = record[prop];
        if (value instanceof File) {
          // reslove name collision with "rest"
          formData.append(JSON.stringify(prop), value);
        } else {
          ordinaryData[prop] = value;
        }
      }

      formData.append('rest', JSON.stringify(ordinaryData));
    }

    const rawBody = await this.xhr({
      method: 'POST',
      uri: this.apiUrl,
      body: this.multipartFormDataEncoded ? formData : JSON.stringify(record),
      ...(!this.multipartFormDataEncoded && {headers: {'Content-type': 'application/json'}})
    });

    const {data, error} = parseJson(rawBody) as JsonGridApiResult<TKey, TRecord>['create'];

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw ValidationErrors.createFromJSON(error);
    }

    this.trigger('create', [data as TKey]);

    return data as TKey;
  }

  /**
   * Get records list
   */
  async read<TField extends keyof TRecord & string>(
    settings: IGridModelReadParams<TKey, TRecord, TField, TFilters>
  ): Promise<IGridModelReadResult<TKey, TRecord, TField>> {
    const queryUrl = this.getQueryUrl(settings);

    if (url.format(queryUrl).length > MAX_URI_LENGTH) {
      return await this.readPostRequest(settings);
    }

    return (await this.xhr({
      method: 'GET',
      uri: url.format(queryUrl),
      json: true
    })) as JsonGridApiResult<TKey, TRecord>['read'];
  }

  /**
   * Get the particular record
   */
  async getRecord<TField extends keyof TRecord & string>(
    id: TKey,
    fields: TField[]
  ): Promise<Pick<TRecord, TField>> {
    const parsedUrl = url.parse(this.apiUrl, true);
    parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields
    parsedUrl.pathname = url.resolve(parsedUrl.pathname ?? '', JSON.stringify(id));
    parsedUrl.search = null;

    return (await this.xhr({
      method: 'GET',
      uri: url.format(parsedUrl),
      json: true
    })) as JsonGridApiResult<TKey, TRecord, TField>['getRecord'];
  }

  /**
   * Apply record changes
   */
  async update(changes: [TKey, Partial<TRecord>][]): Promise<IGridModelUpdateResult<TKey, TRecord>> {
    const formDataChanges = new FormData();

    if (this.multipartFormDataEncoded) {
      const ordinaryRecordChanges: [TKey, Partial<TRecord>][] = [];

      for (const [recordId, record] of changes) {
        const fileFieldNames = new Set<keyof TRecord & string>();
        for (const field in record) {
          if (!Object.prototype.hasOwnProperty.call(record, field)) {
            continue;
          }

          const value = record[field];
          if (value instanceof File) {
            formDataChanges.append(JSON.stringify({recordId, field}), value);
            fileFieldNames.add(field);
          }
        }

        const filteredRecord: Partial<TRecord> = keys(record)
          .filter((key) => !fileFieldNames.has(key))
          .reduce((agr, key) => ({...agr, [key]: record[key]}), {});

        ordinaryRecordChanges.push([recordId, filteredRecord]);
      }

      formDataChanges.append('rest', JSON.stringify(ordinaryRecordChanges));
    }

    const rawBody = await this.xhr({
      method: 'PUT',
      ...(!this.multipartFormDataEncoded && {
        headers: {
          'Content-type': 'application/json'
        }
      }),
      uri: this.apiUrl,
      body: this.multipartFormDataEncoded ? formDataChanges : JSON.stringify(changes)
    });

    const parsedBody = parseJson(rawBody) as JsonGridApiResult<TKey, TRecord>['update'];
    const result: IGridModelUpdateResult<TKey, TRecord> = [];

    if (parsedBody.changes.length) {
      this.trigger('update', parsedBody.changes);
      result.push(...parsedBody.changes);
    }

    for (const [key, validationErros] of parsedBody.validation) {
      result.push([key, ValidationErrors.createFromJSON(validationErros)]);
    }

    for (const [key, customError] of parsedBody.errors) {
      const preparedError = Object.assign(new Error(), customError); // Note, that Object spread operator won't work here
      result.push([key, preparedError]);
    }

    return result;
  }

  /**
   * Validation check
   */
  async isValidRecord(
    record: Partial<TRecord>,
    recordId?: TKey | null
  ): Promise<ValidationErrors<keyof TRecord & string>> {
    if (this.validateOnClient) {
      return await this.validator.isValidRecord(record);
    }

    const parsedUrl = url.parse(this.apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname ?? '', 'validation');

    let response: JsonGridApiResult<TKey, TRecord>['validate'];
    try {
      response = (await this.xhr({
        method: 'POST',
        uri: url.format(parsedUrl),
        body: {
          record,
          id: recordId
        },
        json: true
      })) as JsonGridApiResult<TKey, TRecord>['validate'];
    } catch (error: unknown) {
      // @ts-expect-error: TS18046 error 'error' is of type 'unknown'
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

  private getQueryUrl({
    fields,
    extra,
    filters,
    limit,
    offset,
    sort
  }: IGridModelReadParams<TKey, TRecord, keyof TRecord & string, TFilters>): url.UrlWithParsedQuery {
    const parsedUrl = url.parse(this.apiUrl, true);
    parsedUrl.query.fields = JSON.stringify(fields);
    parsedUrl.query.offset = String(offset ?? 0);
    if (limit) {
      parsedUrl.query.limit = limit.toString();
    }

    if (filters) {
      parsedUrl.query.filters = JSON.stringify(filters);
    }

    if (sort) {
      parsedUrl.query.sort = JSON.stringify(sort);
    }

    if (extra) {
      parsedUrl.query.extra = JSON.stringify(extra);
    }

    parsedUrl.search = null;

    return parsedUrl;
  }

  private async readPostRequest<TField extends keyof TRecord & string>({
    fields,
    extra,
    filters,
    limit,
    offset,
    sort
  }: IGridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<
    IGridModelReadResult<TKey, TRecord, TField>
  > {
    const requestBody: IGridModelReadParams<TKey, TRecord, TField, TFilters> = {
      fields,
      offset: offset ?? 0
    };
    if (limit) {
      requestBody.limit = limit;
    }

    if (filters) {
      requestBody.filters = filters;
    }

    if (sort) {
      requestBody.sort = sort;
    }

    if (extra) {
      requestBody.extra = extra;
    }

    const parsedUrl = url.parse(this.apiUrl, true);
    parsedUrl.pathname = url.resolve(parsedUrl.pathname ?? '', 'read');

    return (await this.xhr({
      method: 'POST',
      json: true,
      uri: url.format(parsedUrl),
      body: requestBody
    })) as JsonGridApiResult<TKey, TRecord>['read'];
  }
}

export default GridXhrModel;
