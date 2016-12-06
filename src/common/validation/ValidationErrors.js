/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

import utils from '../utils';
/**
 * Field errors control manager
 * @constructor
 */
function ValidationErrors() {
  if (!(this instanceof ValidationErrors)) {
    return new ValidationErrors();
  }
  this._fields = {};
}

/**
 * Convert JSON to ValidationErrors object
 *
 * @param   {Object}      jsonObject
 * @return  {ValidationErrors}
 * @static
 */
ValidationErrors.createFromJSON = jsonObject =>{
  const validationErrors = new ValidationErrors();
  validationErrors._fields = jsonObject ? utils.clone(jsonObject) : {};
  return validationErrors;
};

/**
 * Add an error
 *
 * @param {string}        field       Field name
 * @param {String}        errorText   Error text
 * @return {ValidationErrors}
 */
ValidationErrors.prototype.add = function (field, errorText) {
  if (!this._fields[field]) {
    this._fields[field] = [];
  }
  if (this._fields[field].indexOf(errorText) < 0) {
    this._fields[field].push(errorText);
  }
  return this;
};

/**
 * Field has error flag
 *
 * @param   {string}      field     Field name
 * @returns {boolean}
 */
ValidationErrors.prototype.hasError = function (field) {
  return this._fields.hasOwnProperty(field);
};

/**
 * Get field errors
 *
 * @param   {string}      field     Field name
 * @returns {Array|null}  Errors array or null
 */
ValidationErrors.prototype.getFieldErrors = function (field) {
  return this._fields[field] || null;
};

/**
 * Get field names array, that contain errors
 *
 * @returns {string[]|null}
 */
ValidationErrors.prototype.getFailedFields = function () {
  const fields = Object.keys(this._fields);
  return fields.length ? fields : null;
};

/**
 * Errors absence check
 *
 * @returns {boolean} Errors presence
 */
ValidationErrors.prototype.isEmpty = function () {
  return utils.isEmpty(this._fields);
};

/**
 * Clear specific field errors
 *
 * @param   {string}  field  Field name
 * @returns {ValidationErrors}
 */
ValidationErrors.prototype.clearField = function (field) {
  delete this._fields[field];
  return this;
};

/**
 * Clear errors list
 *
 * @return {ValidationErrors}
 */
ValidationErrors.prototype.clear = function () {
  this._fields = {};
  return this;
};

/**
 * Convert errors to JSON
 *
 * @return {Array}
 */
ValidationErrors.prototype.toJSON = function () {
  return this._fields;
};

/**
 * Clone object
 *
 * @return {ValidationErrors}
 */
ValidationErrors.prototype.clone = function () {
  return ValidationErrors.createFromJSON(this.toJSON());
};

module.exports = ValidationErrors;
