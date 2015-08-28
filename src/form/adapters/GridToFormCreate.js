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

/**
 * Adapter allows to use Grid model as a model for new form record creation
 *
 * @param {AbstractGridModel}   model           Grid model
 * @param {Object}              [initialData]   Default field values
 * @constructor
 */
var GridToFormCreate = function (model, initialData) {
  if (!(this instanceof GridToFormCreate)) {
    return new GridToFormCreate(model, initialData);
  }

  this._adapter = {
    model: model,
    initialData: initialData || {}
  };
};

/**
 * Get data
 *
 * @param {Array}     fields     Required fields
 * @param {Function}  cb         CallBack function
 */
GridToFormCreate.prototype.getData = function (fields, cb) {
  cb(null, this._adapter.initialData);
};

/**
 * Create new record
 *
 * @param   {Object}      data      Record
 * @param   {Function}    cb        CallBack function
 */
GridToFormCreate.prototype.submit = function (data, cb) {
  this._adapter.model.create(data, cb);
};

/**
 * Validation checking
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridToFormCreate.prototype.isValidRecord = function (record, cb) {
  this._adapter.model.isValidRecord(record, cb);
};

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields
 * @returns {Array}  Dependencies
 */
GridToFormCreate.prototype.getValidationDependency = function (fields) {
  return this._adapter.model.getValidationDependency(fields);
};

// Simplification that allows us not to inherit EventsModel
GridToFormCreate.prototype.on = function () {};
GridToFormCreate.prototype.off = function () {};

module.exports = GridToFormCreate;
