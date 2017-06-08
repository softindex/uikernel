/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../common/callbackify';
import Validator from '../common/validation/Validator/common';
import AbstractFormModel from './AbstractFormModel';
import utils from '../common/utils';

class FormModel extends AbstractFormModel {
  /**
   * Simple form model
   *
   * @param {Object}    defaultValues Default form field values
   * @param {Validator} validation    Validation
   * @constructor
   */
  constructor(defaultValues, validation) {
    super();
    this._validation = validation || new Validator();
    this._data = defaultValues ? utils.clone(defaultValues) : {};
  }

}

/**
 * Get data
 *
 * @param {Array}    fields     Required fields
 * @param {Function} cb         CallBack function
 */
FormModel.prototype.getData = callbackify(async function (fields) {
  let record = {};

  if (fields) {
    for (const field of fields) {
      record[field] = this._data[field];
    }
  } else {
    record = utils.clone(this._data);
  }

  return record;
});

/**
 * Process form data
 *
 * @param {Object}      changes     Form data
 * @param {Function}    cb          CallBack function
 */
FormModel.prototype.submit = callbackify(async function (changes) {
  const validErrors = await this.isValidRecord(changes);
  if (!validErrors.isEmpty()) {
    throw validErrors;
  }
  Object.assign(this._data, changes);
  this.trigger('update', changes);
  return changes;
});

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 */
FormModel.prototype.getValidationDependency = function (fields) {
  return this._validation.getValidationDependency(fields);
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
FormModel.prototype.isValidRecord = callbackify(async function (record) {
  return await this._validation.isValidRecord(record);
});

export default FormModel;
