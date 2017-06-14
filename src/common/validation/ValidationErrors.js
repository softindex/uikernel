/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../utils';

class ValidationErrors {
  /**
   * Field errors control manager
   * @constructor
   */
  constructor() {
    this._fields = {};
  }

  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */
  static createFromJSON = function (jsonObject) {
    const validationErrors = new ValidationErrors();
    for (const [key, value] of Object.entries(jsonObject)) {
      value.forEach(errMessage => validationErrors.add(key, errMessage));
    }
    return validationErrors;
  };

  static merge = function (...args) {
    const jsonErrors = [{}];

    for (const arg of args) {
      jsonErrors.push(arg.toJSON());
    }

    return ValidationErrors.createFromJSON(Object.assign(...jsonErrors));
  };

  /**
   * Add an error
   *
   * @param {string}        field       Field name
   * @param {String}        errorText   Error text
   * @return {ValidationErrors}
   */
  add(field, errorText) {
    if (!this._fields[field]) {
      this._fields[field] = [errorText];
      return this;
    }
    if (!this._fields[field].includes(errorText)) {
      this._fields[field].push(errorText);
    }
    return this;
  }

  /**
   * Field has error flag
   *
   * @param   {string}      field     Field name
   * @returns {boolean}
   */
  hasError(field) {
    return this._fields.hasOwnProperty(field);
  }

  /**
   * Get field errors
   *
   * @param   {string}      field     Field name
   * @returns {Array|null}  Errors array or null
   */
  getFieldErrors(field) {
    return this._fields[field] || null;
  }

  /**
   * Get field names array, that contain errors
   *
   * @returns {string[]|null}
   */
  getFailedFields() {
    const fields = Object.keys(this._fields);
    return fields.length ? fields : null;
  }

  /**
   * Errors absence check
   *
   * @returns {boolean} Errors presence
   */
  isEmpty() {
    return utils.isEmpty(this._fields);
  }

  /**
   * Clear specific field errors
   *
   * @param   {string}  field  Field name
   * @returns {ValidationErrors}
   */
  clearField(field) {
    delete this._fields[field];
    return this;
  }

  /**
   * Clear errors list
   *
   * @return {ValidationErrors}
   */
  clear() {
    this._fields = {};
    return this;
  }

  /**
   * Convert errors to JSON
   *
   * @return {Array}
   */
  toJSON() {
    return this._fields;
  }

  /**
   * Clone object
   *
   * @return {ValidationErrors}
   */
  clone() {
    return ValidationErrors.createFromJSON(this.toJSON());
  }

  /**
   * Merge object
   *
   * @return {ValidationErrors}
   */
  merge(error) {
    this._fields = {...this._fields, ...error.toJSON()};
    return this;
  }

  /**
   * Get errors iterator
   *
   * @return {[string, string[]][]}
   */
  getErrors() {
    return Object.entries(this._fields);
  }
}

export default ValidationErrors;
