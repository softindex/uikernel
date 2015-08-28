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

var utils = require('../common/utils');
var AbstractFormModel = require('./AbstractFormModel');
var Validator = require('../common/validation/Validator');

/**
 * Simple form model
 *
 * @param {Object} defaultValues Default form field values
 * @constructor
 */
var FormModel = function (defaultValues, validation) {
  AbstractFormModel.call(this);
  this._validation = validation || new Validator();
  this._data = defaultValues ? utils.clone(defaultValues) : {};
};
FormModel.prototype = new AbstractFormModel();

/**
 * Get data
 *
 * @param {Array}    fields     Required fields
 * @param {Function} cb         CallBack function
 */
FormModel.prototype.getData = function (fields, cb) {
  var record = {};
  var i;

  if (fields) {
    for (i = 0; i < fields.length; i++) {
      record[fields[i]] = this._data[fields[i]];
    }
  } else {
    record = utils.clone(this._data);
  }

  cb(null, record);
};

/**
 * Process form data
 *
 * @param {Object}      changes     Form data
 * @param {Function}    cb          CallBack function
 */
FormModel.prototype.submit = function (changes, cb) {
  this.isValidRecord(changes, function (err, validErrors) {
    if (err) {
      return cb(err);
    }

    if (validErrors.isEmpty()) {
      utils.assign(this._data, changes);
      this.trigger('update', changes);
    }

    cb(validErrors, changes);
  }.bind(this));
};

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
FormModel.prototype.isValidRecord = function (record, cb) {
  this._validation.isValidRecord(record, cb);
};

module.exports = FormModel;
