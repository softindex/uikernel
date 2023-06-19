/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IObservable} from '../common/types';
import {IValidator} from '../validation/types/IValidator';
import ValidationErrors from '../validation/ValidationErrors';
import ValidatorBuilder from '../validation/ValidatorBuilder';
import AbstractFormModel from './AbstractFormModel';
import {FormModelListenerArgsByEventName} from './types/FormModelListenerArgsByEventName';
import {IFormModel} from './types/IFormModel';

/**
 * Simple form model
 */
class FormModel<TRecord extends Record<string, unknown>>
  extends AbstractFormModel<TRecord, FormModelListenerArgsByEventName<TRecord>>
  implements IFormModel<TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>>
{
  static create<TRecord extends Record<string, unknown>>(
    defaultValues?: Partial<TRecord>,
    validator?: IValidator<TRecord>
  ): FormModel<TRecord> {
    return new FormModel(validator ?? ValidatorBuilder.createEmptyValidator(), defaultValues ?? {});
  }

  constructor(private validator: IValidator<TRecord>, private data: Partial<TRecord>) {
    super();
  }

  /**
   * Get data
   */
  getData(): Promise<Partial<TRecord>>;
  getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
  async getData<TField extends keyof TRecord & string>(
    fields?: TField[]
  ): Promise<Partial<Pick<TRecord, TField>>> {
    if (!fields) {
      return {...this.data};
    }

    const record: Partial<TRecord> = {};
    for (const field of fields) {
      record[field] = this.data[field];
    }

    return record;
  }

  /**
   * Process form data
   */
  async submit(changes: Partial<TRecord>): Promise<Partial<TRecord>> {
    const validErrors = await this.isValidRecord(changes);
    if (!validErrors.isEmpty()) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw validErrors;
    }

    this.data = {...this.data, ...changes};
    this.trigger('update', changes);
    return changes;
  }

  /**
   * Validation check
   */
  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>> {
    return await this.validator.isValidRecord(record);
  }

  /**
   * Get all dependent fields, that are required for validation
   */
  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.validator.getValidationDependency(fields);
  }
}

export default FormModel;
