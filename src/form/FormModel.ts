/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {IObservable} from '../common/types';
import type {IValidator} from '../validation/types/IValidator';
import type ValidationErrors from '../validation/ValidationErrors';
import ValidatorBuilder from '../validation/ValidatorBuilder';
import AbstractFormModel from './AbstractFormModel';
import type {FormModelListenerArgsByEventName} from './types/FormModelListenerArgsByEventName';
import type {IFormModel} from './types/IFormModel';

/**
 * Simple form model
 */
class FormModel<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord>
  extends AbstractFormModel<TEditableRecord, TRecord, FormModelListenerArgsByEventName<TRecord>>
  implements IFormModel<TEditableRecord, TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>>
{
  static create<TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord>(
    defaultValues?: Partial<TRecord>,
    validator?: IValidator<TRecord, keyof TEditableRecord & string>
  ): FormModel<TEditableRecord, TRecord> {
    return new FormModel(validator ?? ValidatorBuilder.createEmptyValidator(), defaultValues ?? {});
  }

  constructor(
    private validator: IValidator<TRecord, keyof TEditableRecord & string>,
    private data: Partial<TRecord>
  ) {
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
  async isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TEditableRecord & string>> {
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
