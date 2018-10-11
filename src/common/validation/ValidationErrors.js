/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class ValidationErrors {
  /**
   * Field errors control manager
   * @constructor
   */
  constructor() {
    this._fields = new Map();
  }

  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */
  static createFromJSON(jsonObject) {
    const validationErrors = new ValidationErrors();
    for (const [key, value] of Object.entries(jsonObject)) {
      value.forEach(errMessage => validationErrors.add(key, errMessage));
    }
    return validationErrors;
  }

  /**
   * Create ValidationErrors object with one error
   *
   * @param {string}                  field
   * @param {string|{error: string}}  error
   * @return {ValidationErrors}
   */
  static createWithError(field, error) {
    const validationErrors = new ValidationErrors();
    validationErrors.add(field, error);
    return validationErrors;
  }

  static merge = function (...args) {
    const jsonErrors = [{}];

    for (const arg of args) {
      jsonErrors.push(arg.toJSON());
    }

    // TODO Need deep merge
    return ValidationErrors.createFromJSON(Object.assign(...jsonErrors));
  };

  /**
   * Add an error
   *
   * @param {string}                  field       Field name
   * @param {string|{string message}} error       Error text
   * @return {ValidationErrors}
   */
  add(field, error) {
    error = this._formErrorValue(error);
    if (!this._fields.has(field)) {
      this._fields.set(field, [error]);
      return this;
    }
    const fieldErrors = this._fields.get(field);
    if (!fieldErrors.includes(error)) {
      fieldErrors.push(error);
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
    return this._fields.has(field);
  }

  /**
   * Get field errors
   *
   * @param   {string}      field     Field name
   * @returns {Array|null}  Errors array or null
   */
  getFieldErrors(field) {
    return this._fields.get(field) || null;
  }

  /**
   * Get field errors message
   *
   * @param   {string}      field     Field name
   * @returns {Array|null}  Errors array or null
   */
  getFieldErrorMessages(field) {
    const fieldErrors = this._fields.get(field);
    if (fieldErrors) {
      return fieldErrors.map(error => error.message);
    }
    return null;
  }

  /**
   * Get field names array, that contain errors
   *
   * @returns {string[]|null}
   */
  getFailedFields() {
    const fields = [...this._fields.keys()];
    return fields.length ? fields : null;
  }

  /**
   * Errors absence check
   *
   * @returns {boolean} Errors presence
   */
  isEmpty() {
    return this._fields.size === 0;
  }

  /**
   * Clear specific field errors
   *
   * @param   {string}  field  Field name
   * @returns {ValidationErrors}
   */
  clearField(field) {
    this._fields.delete(field);
    return this;
  }

  /**
   * Clear errors list
   *
   * @return {ValidationErrors}
   */
  clear() {
    this._fields = new Map();
    return this;
  }

  /**
   * Convert errors to JSON
   *
   * @return {{[string]: Array<string>}}
   */
  toJSON() {
    const json = {};
    for (const [key, value] of this._fields) {
      json[key] = value;
    }
    return json;
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
  merge(validationErrors) {
    for (const [field, newErrors] of validationErrors.getErrors()) {
      let errors = this._fields.get(field);
      if (!errors) {
        errors = [];
        this._fields.set(field, errors);
      }
      for (const newError of newErrors) {
        errors.push(newError);
      }
    }

    return this;
  }

  /**
   * Get errors iterator
   *
   * @return {[string, string[]][]}
   */
  getErrors() {
    return this._fields;
  }

  _formErrorValue(error) {
    if (typeof error === 'string') {
      return {
        message: error
      };
    }
    if (!error.message) {
      throw new Error('Invalid error value. Error must be string or object with "message" property.');
    }
    return error;
  }
}

export default ValidationErrors;
