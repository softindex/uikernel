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

var Events = require('../../common/Events');
var toPromise = require('../../common/toPromise');
var callbackify = require('../../common/callbackify');
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

  Events.call(this);

  this._adapter = {
    model: model,
    initialData: initialData || {}
  };
};

GridToFormCreate.prototype = Object.create(Events.prototype);
GridToFormCreate.prototype.constructor = GridToFormCreate;

/**
 * Get data
 *
 * @param {Array}     fields     Required fields
 * @param {Function}  cb         CallBack function
 */
GridToFormCreate.prototype.getData = callbackify(
  async function () {
    return await this._adapter.initialData
  }
);

/**
 * Create new record
 *
 * @param   {Object}      data      Record
 * @param   {Function}    cb        CallBack function
 */
GridToFormCreate.prototype.submit = callbackify(
  async function (data) {
    var model = this._adapter.model;
    return await toPromise(model.create.bind(model))(data)
  }
);

/**
 * Validation checking
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridToFormCreate.prototype.isValidRecord = callbackify(
  async function (record) {
    var model = this._adapter.model;
    return await toPromise(model.isValidRecord.bind(model))(record)
  }
);

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields
 * @returns {Array}  Dependencies
 */
GridToFormCreate.prototype.getValidationDependency = function (fields) {
  return this._adapter.model.getValidationDependency(fields);
};

module.exports = GridToFormCreate;
