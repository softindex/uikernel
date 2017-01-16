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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _callbackify = require('../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _Events = require('../common/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AbstractFormModel = function (_EventsModel) {
  (0, _inherits3.default)(AbstractFormModel, _EventsModel);

  /**
   * Abstract form model
   *
   * @constructor
   */
  function AbstractFormModel() {
    (0, _classCallCheck3.default)(this, AbstractFormModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AbstractFormModel.__proto__ || (0, _getPrototypeOf2.default)(AbstractFormModel)).call(this));

    _this.getData = (0, _callbackify2.default)(function () {
      return (/*fields*/_promise2.default.resolve({})
      );
    });
    _this.submit = (0, _callbackify2.default)(function () {
      return (/*changes*/_promise2.default.resolve()
      );
    });
    _this.getValidationDependency = (0, _callbackify2.default)(function () {
      return _promise2.default.resolve([]);
    });
    _this.isValidRecord = (0, _callbackify2.default)(function () {
      return (/*record*/_promise2.default.resolve(new _ValidationErrors2.default())
      );
    });
    return _this;
  }

  /**
   * Get data
   *
   * @param {Array} fields     Required fields
   * @param {Function} cb      CallBack function
   * @abstract
   */


  /**
   * Process form data
   *
   * @param   {Object}      changes     Form data
   * @param   {Function}    cb          CallBack function
   * @abstract
   */


  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields  Fields list
   * @returns {Array}  Dependencies
   * @abstract
   */


  /**
   * Record validity check
   *
   * @param {Object}      record  Record object
   * @param {Function}    cb      CallBack function
   * @abstract
   */


  return AbstractFormModel;
}(_Events2.default); /**
                      * Copyright (с) 2015-present, SoftIndex LLC.
                      * All rights reserved.
                      *
                      * This source code is licensed under the BSD-style license found in the
                      * LICENSE file in the root directory of this source tree.
                      */

exports.default = AbstractFormModel;
module.exports = exports['default'];