/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../common/callbackify';
import ValidationErrors from '../common/validation/ValidationErrors';
import EventsModel from '../common/Events';

class AbstractFormModel extends EventsModel {
  /**
   * Abstract form model
   *
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Get data
   *
   * @param {Array} fields     Required fields
   * @param {Function} cb      CallBack function
   * @abstract
   */
  getData = callbackify((/*fields*/) => Promise.resolve({}));

  /**
   * Process form data
   *
   * @param   {Object}      changes     Form data
   * @param   {Function}    cb          CallBack function
   * @abstract
   */
  submit = callbackify((/*changes*/) => Promise.resolve());

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields  Fields list
   * @returns {Array}  Dependencies
   * @abstract
   */
  getValidationDependency = callbackify(() => Promise.resolve([]));

  /**
   * Record validity check
   *
   * @param {Object}      record  Record object
   * @param {Function}    cb      CallBack function
   * @abstract
   */
  isValidRecord = callbackify((/*record*/) => Promise.resolve(new ValidationErrors()));
}

export default AbstractFormModel;
