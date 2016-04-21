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

var utils = require('../../common/utils');
var Events = require('../../common/Events');
var ValidationErrors = require('../../common/validation/ValidationErrors');

/**
 * Adapter that allows us to use Grid model record as a form model
 *
 * @param {AbstractGridModel} model   Grid model
 * @param {number|string}     id      Record ID
 * @constructor
 */
function GridToFormUpdate(model, id) {
  if (!(this instanceof GridToFormUpdate)) {
    return new GridToFormUpdate(model, id);
  }

  Events.call(this);

  this._adapter = {
    model: model,
    id: id
  };

  this._onUpdateHandlers = [];
}

GridToFormUpdate.prototype = Object.create(Events.prototype);
GridToFormUpdate.prototype.constructor = GridToFormUpdate;

/**
 * Get data
 *
 * @param {Array}     fields     Required fields
 * @param {Function}  cb         CallBack function
 */
GridToFormUpdate.prototype.getData = function (fields, cb) {
  this._adapter.model.getRecord(this._adapter.id, fields, function (err, data) {
    if (err) {
      return cb(err);
    }
    cb(null, data);
  });
};

/**
 * Apply changes
 *
 * @param   {Object}      changes     Form data
 * @param   {Function}    cb          CallBack function
 */
GridToFormUpdate.prototype.submit = function (changes, cb) {
  var record = utils.clone(changes);
  this._adapter.model.update([[this._adapter.id, record]], function (err, data) {
    if (err) {
      return cb(err);
    }
    var result = data[0][1];
    if (result instanceof ValidationErrors) {
      return cb(result);
    }
    cb(null, result);
  });
};

/**
 * Record validity check
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridToFormUpdate.prototype.isValidRecord = function (record, cb) {
  this._adapter.model.isValidRecord(record, cb);
};

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields  Fields list
 * @returns {Array}  Dependencies
 */
GridToFormUpdate.prototype.getValidationDependency = function (fields) {
  return this._adapter.model.getValidationDependency(fields);
};

/**
 * Subscribe to inner model event
 *
 * @param {string}      event   Event ID
 * @param {Function}    cb      CallBack function
 */
GridToFormUpdate.prototype.on = function (event, cb) {
  var ctx = this;

  if (event !== 'update') {
    Events.prototype.on.call(this, event, cb);
    return;
  }

  // onChange filters out table events, that do not regard to our record
  function onChange(changes) {
    for (var i = 0; i < changes.length; i++) {
      if (utils.isEqual(changes[i][0], ctx._adapter.id)) {
        cb(changes[i][1]);
        return;
      }
    }
  }

  this._onUpdateHandlers.push({
    originalCallback: cb,
    wrappedCallback: onChange
  });

  this._adapter.model.on('update', onChange);
};

/**
 * Unsubscribe from inner model event
 *
 * @param {string}      event   Event ID
 * @param {Function}    cb      CallBack function
 */
GridToFormUpdate.prototype.off = function (event, cb) {
  var ctx = this;
  var newOnUpdateHandlers = [];

  if (event !== 'update') {
    Events.prototype.off.call(this, event, cb);
    return;
  }

  this._onUpdateHandlers.forEach(function (handler) {
    if (handler.originalCallback === cb) {
      ctx._adapter.model.off(handler.wrappedCallback);
    } else {
      newOnUpdateHandlers.push(handler);
    }
  });

  this._onUpdateHandlers = newOnUpdateHandlers;
};

module.exports = GridToFormUpdate;
