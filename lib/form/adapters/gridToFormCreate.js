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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _Events2 = require('../../common/Events');

var _Events3 = _interopRequireDefault(_Events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridToFormCreate = function (_Events) {
  (0, _inherits3.default)(GridToFormCreate, _Events);

  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  function GridToFormCreate(model, initialData) {
    (0, _classCallCheck3.default)(this, GridToFormCreate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridToFormCreate.__proto__ || (0, _getPrototypeOf2.default)(GridToFormCreate)).call(this));

    _initialiseProps.call(_this);

    _this._adapter = {
      model: model,
      initialData: initialData || {}
    };
    return _this;
  }

  (0, _createClass3.default)(GridToFormCreate, [{
    key: 'getValidationDependency',


    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields
     * @returns {Array}  Dependencies
     */
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }], [{
    key: 'create',
    value: function create(model, initialData) {
      return new GridToFormCreate(model, initialData);
    }

    /**
     * Get data
     *
     * @param {Array}     fields     Required fields
     * @param {Function}  cb         CallBack function
     */


    /**
     * Create new record
     *
     * @param   {Object}      data      Record
     * @param   {Function}    cb        CallBack function
     */


    /**
     * Validation checking
     *
     * @param {Object}      record  Record object
     * @param {Function}    cb      CallBack function
     */

  }]);
  return GridToFormCreate;
}(_Events3.default); /**
                      * Copyright (с) 2015-present, SoftIndex LLC.
                      * All rights reserved.
                      *
                      * This source code is licensed under the BSD-style license found in the
                      * LICENSE file in the root directory of this source tree.
                      */

var _initialiseProps = function _initialiseProps() {
  this.getData = (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this._adapter.initialData;

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  this.submit = (0, _callbackify2.default)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
      var model;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              model = this._adapter.model;
              _context2.next = 3;
              return (0, _toPromise2.default)(model.create.bind(model))(data);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  this.isValidRecord = (0, _callbackify2.default)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(record) {
      var model;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              model = this._adapter.model;
              _context3.next = 3;
              return (0, _toPromise2.default)(model.isValidRecord.bind(model))(record);

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
};

exports.default = GridToFormCreate.create;
module.exports = exports['default'];