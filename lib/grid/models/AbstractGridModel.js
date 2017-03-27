/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _Events = require('../../common/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Grid model abstraction
 *
 * @constructor
 * @extends EventsModel
 */
var AbstractGridModel = function AbstractGridModel() {
  _Events2.default.call(this);
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

AbstractGridModel.prototype = new _Events2.default();
AbstractGridModel.prototype.constructor = AbstractGridModel;

/**
 * Add a record
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.create = (0, _callbackify2.default)(function () {
  return (/*record*/_promise2.default.resolve()
  );
});

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
AbstractGridModel.prototype.read = (0, _callbackify2.default)(function () {
  return (/*settings*/_promise2.default.resolve({
      records: [], // Primary records
      ids: [], // Extra records
      extraRecords: 0 // In all records count
    })
  );
});

/**
 * Get the particular record
 *
 * @param {*}         id      Record ID
 * @param {Array}     fields  Required fields
 * @param {Function}  cb      CallBack function
 * @abstract
 */
AbstractGridModel.prototype.getRecord = (0, _callbackify2.default)(function () {
  return (/*id, fields*/_promise2.default.resolve()
  );
});

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
AbstractGridModel.prototype.update = (0, _callbackify2.default)(function () {
  return (/*changes*/_promise2.default.resolve([])
  );
});

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
AbstractGridModel.prototype.isValidRecord = (0, _callbackify2.default)(function () {
  return (/*record*/_promise2.default.resolve(new _ValidationErrors2.default())
  );
});

exports.default = AbstractGridModel;
module.exports = exports['default'];