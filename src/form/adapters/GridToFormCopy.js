/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';
import Events from '../../common/Events';
import {isEqual, clone} from '../../common/utils';

class GridToFormCopy extends Events {
  /**
   * Adapter that allows us to use Grid model record as a form model
   *
   * @param {AbstractGridModel} model   Grid model
   * @param {number|string}     id      Record ID
   * @constructor
   */
  constructor(model, id) {
    super();

    this._adapter = {
      model: model,
      id: id
    };

    this._onUpdateHandlers = [];
  }

  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */
  on(event, cb) {
    const ctx = this;

    if (event !== 'update') {
      Events.prototype.on.call(this, event, cb);
      return;
    }

    // onChange filters out table events, that do not regard to our record
    function onChange(changes) {
      for (let i = 0; i < changes.length; i++) {
        if (isEqual(changes[i][0], ctx._adapter.id)) {
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
  }

  /**
   * Unsubscribe from inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */
  off(event, cb) {
    const ctx = this;
    const newOnUpdateHandlers = [];

    if (event !== 'update') {
      Events.prototype.off.call(this, event, cb);
      return;
    }

    this._onUpdateHandlers.forEach(handler => {
      if (handler.originalCallback === cb) {
        ctx._adapter.model.off('update', handler.wrappedCallback);
      } else {
        newOnUpdateHandlers.push(handler);
      }
    });

    this._onUpdateHandlers = newOnUpdateHandlers;
  }

  listenerCount(event) {
    return this._adapter.model.listenerCount(event);
  }

  /**
   * Get data
   *
   * @param {Array}     fields     Required fields
   */
  async getData(fields) {
    const model = this._adapter.model;
    return await model.getRecord(this._adapter.id, fields);
  }

  /**
   * Clone record with changes
   *
   * @param   {Object}      changes     Form data
   */
  async submit(changes) {
    const record = clone(changes);
    const model = this._adapter.model;

    const result = await model.copySingleRecord(this._adapter.id, record);
    if (result instanceof Error || result instanceof ValidationErrors) {
      throw result;
    }
    return result;
  }

  /**
   * Record validity check
   *
   * @param {Object}      record  Record object
   */
  async isValidRecord(record) {
    const model = this._adapter.model;
    return await model.isValidRecord(record, this._adapter.id);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields  Fields list
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields) {
    return this._adapter.model.getValidationDependency(fields);
  }
}

export default GridToFormCopy;
