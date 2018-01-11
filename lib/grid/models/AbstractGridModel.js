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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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
var AbstractGridModel = function (_EventsModel) {
  (0, _inherits3.default)(AbstractGridModel, _EventsModel);

  function AbstractGridModel() {
    (0, _classCallCheck3.default)(this, AbstractGridModel);
    return (0, _possibleConstructorReturn3.default)(this, (AbstractGridModel.__proto__ || (0, _getPrototypeOf2.default)(AbstractGridModel)).call(this));
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   * @abstract
   */


  (0, _createClass3.default)(AbstractGridModel, [{
    key: 'getValidationDependency',
    value: function getValidationDependency() {
      return [];
    }
  }]);
  return AbstractGridModel;
}(_Events2.default);

/**
 * Add a record
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 * @abstract
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
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