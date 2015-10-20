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

var EventsModel = require('../../common/Events');
var ValidationErrors = require('../../common/validation/ValidationErrors');

/**
 * Grid model abstraction
 *
 * @constructor
 * @extends EventsModel
 */
var AbstractGridModel = function () {
  EventsModel.call(this);
};
AbstractGridModel.prototype = new EventsModel();
AbstractGridModel.prototype.constructor = AbstractGridModel;

/**
 * Add a record
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.create = function (record, cb) {
  cb(null);
};

/**
 * Get records list
 *
 * @param {Object}      settings                Request
 * @param {Array}       settings.fields         Fields
 * @param {number}      [settings.limit]        Limit
 * @param {number}      [settings.offset]       Offset
 * @param {Object}      [settings.filters]      Filter values object
 * @param {Array}       [settings.sort]         Sort parameters
 * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
 * @param {Function}    cb                      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.read = function (settings, cb) {
  cb(null, {
    records: [],   // Primary records
    ids: [],    // Extra records
    extraRecords: 0    // In all records count
  });
};

/**
 * Get the particular record
 *
 * @param {*}         id      Record ID
 * @param {Array}     fields  Required fields
 * @param {Function}  cb      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.getRecord = function (id, fields, cb) {
  cb(null);
};

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
AbstractGridModel.prototype.update = function (changes, cb) {
  cb(null, []);
};

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 * @abstract
 */
AbstractGridModel.prototype.getValidationDependency = function () {
  return [];
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.isValidRecord = function (record, cb) {
  cb(null, new ValidationErrors());
};

module.exports = AbstractGridModel;
