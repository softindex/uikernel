/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Validator from '../common/validation/Validator';
import AbstractFormModel from './AbstractFormModel';
import {clone} from '../common/utils';

class FormModel extends AbstractFormModel {
  private _validation: Validator;
  private _data: any;
  /**
   * Simple form model
   *
   * @param {Object}    defaultValues Default form field values
   * @param {Validator} validation    Validation
   * @constructor
   */
  constructor(defaultValues: any, validation: Validator) {
    super();
    this._validation = validation || new Validator();
    this._data = defaultValues ? clone(defaultValues) : {};
  }

  /**
   * Get data
   *
   * @param {Array}    fields     Required fields
   */
  async getData(fields: string[]) {
    let record: {[index: string]: any} = {};

    if (fields) {
      for (const field of fields) {
        record[field] = this._data[field];
      }
    } else {
      record = clone(this._data);
    }

    return record;
  }

  /**
   * Process form data
   *
   * @param {Object}      changes     Form data
   */
  async submit(changes: object) {
    const validErrors = await this.isValidRecord(changes);
    if (!validErrors.isEmpty()) {
      throw validErrors;
    }
    Object.assign(this._data, changes);
    this.trigger('update', changes);
    return changes;
  }

  /**
   * Validation check
   *
   * @param {Object}      record
   */
  async isValidRecord(record) {
    return await this._validation.isValidRecord(record);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields) {
    return this._validation.getValidationDependency(fields);
  }
}

export default FormModel;
