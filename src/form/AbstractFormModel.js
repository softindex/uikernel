/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import callbackify from '../common/callbackify';
import ValidationErrors from '../common/validation/ValidationErrors';
import EventsModel from '../common/Events';

/**
 * Abstract form model
 *
 * @constructor
 */
const AbstractFormModel = function () {
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
AbstractFormModel.prototype.getData = callbackify(fields => Promise.resolve({}));

/**
 * Process form data
 *
 * @param   {Object}      changes     Form data
 * @param   {Function}    cb          CallBack function
 * @abstract
 */
AbstractFormModel.prototype.submit = callbackify(changes => Promise.resolve());

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields  Fields list
 * @returns {Array}  Dependencies
 * @abstract
 */
AbstractFormModel.prototype.getValidationDependency = callbackify(() => Promise.resolve([]));

/**
 * Record validity check
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 * @abstract
 */
AbstractFormModel.prototype.isValidRecord = callbackify(record => Promise.resolve(new ValidationErrors()));

module.exports = AbstractFormModel;
