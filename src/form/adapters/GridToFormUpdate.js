/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import callbackify from '../../common/callbackify';
import toPromise from '../../common/toPromise';
import ValidationErrors from '../../common/validation/ValidationErrors';
import Events from '../../common/Events';
import utils from '../../common/utils';

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
GridToFormUpdate.prototype.getData = callbackify(function (fields) {
    const model = this._adapter.model;
    return toPromise(model.getRecord.bind(model))(this._adapter.id, fields)
  }
);

/**
 * Apply changes
 *
 * @param   {Object}      changes     Form data
 * @param   {Function}    cb          CallBack function
 */
GridToFormUpdate.prototype.submit = callbackify(
  async function (changes) {
    const record = utils.clone(changes);
    const model = this._adapter.model;
    let result = await toPromise(model.update.bind(model))([[this._adapter.id, record]]);
    result = result[0][1];
    if (result instanceof ValidationErrors) {
      throw result;
    }
    return result;
  }
);

/**
 * Record validity check
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridToFormUpdate.prototype.isValidRecord = callbackify(
  async function (record) {
    const model = this._adapter.model;
    return await toPromise(model.isValidRecord.bind(model))(record)
  }
);

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
  const ctx = this;

  if (event !== 'update') {
    Events.prototype.on.call(this, event, cb);
    return;
  }

  // onChange filters out table events, that do not regard to our record
  function onChange(changes) {
    for (let i = 0; i < changes.length; i++) {
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
  const ctx = this;
  const newOnUpdateHandlers = [];

  if (event !== 'update') {
    Events.prototype.off.call(this, event, cb);
    return;
  }

  this._onUpdateHandlers.forEach(handler =>{
    if (handler.originalCallback === cb) {
      ctx._adapter.model.off('update', handler.wrappedCallback);
    } else {
      newOnUpdateHandlers.push(handler);
    }
  });

  this._onUpdateHandlers = newOnUpdateHandlers;
};

GridToFormUpdate.prototype.listenerCount = function (event) {
  return this._adapter.model.listenerCount(event);
};

module.exports = GridToFormUpdate;
