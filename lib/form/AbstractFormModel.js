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

var EventsModel = require('../common/Events');
var ValidationErrors = require('../common/validation/ValidationErrors');

/**
 * Abstract form model
 *
 * @constructor
 */
var AbstractFormModel = function () {
  EventsModel.call(this);
};
AbstractFormModel.prototype = new EventsModel();
AbstractFormModel.prototype.constructor = AbstractFormModel;

/**
 * Get data
 *
 * @param {Array} fields     Required fields
 * @param {Function} cb      CallBack function
 * @abstract
 */
AbstractFormModel.prototype.getData = function (fields, cb) {
  cb(null, {});
};

/**
 * Process form data
 *
 * @param   {Object}      changes     Form data
 * @param   {Function}    cb          CallBack function
 * @abstract
 */
AbstractFormModel.prototype.submit = function (changes, cb) {
  cb(null);
};

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields  Fields list
 * @returns {Array}  Dependencies
 * @abstract
 */
AbstractFormModel.prototype.getValidationDependency = function () {
  return [];
};

/**
 * Record validity check
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 * @abstract
 */
AbstractFormModel.prototype.isValidRecord = function (record, cb) {
  cb(null, new ValidationErrors());
};

module.exports = AbstractFormModel;
