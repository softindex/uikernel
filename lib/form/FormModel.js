'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _callbackify = require('../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _common = require('../common/validation/validators/common');

var _common2 = _interopRequireDefault(_common);

var _AbstractFormModel2 = require('./AbstractFormModel');

var _AbstractFormModel3 = _interopRequireDefault(_AbstractFormModel2);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FormModel = function (_AbstractFormModel) {
  (0, _inherits3.default)(FormModel, _AbstractFormModel);

  /**
   * Simple form model
   *
   * @param {Object}    defaultValues Default form field values
   * @param {Validator} validation    Validation
   * @constructor
   */
  function FormModel(defaultValues, validation) {
    (0, _classCallCheck3.default)(this, FormModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FormModel.__proto__ || (0, _getPrototypeOf2.default)(FormModel)).call(this));

    _this._validation = validation || new _common2.default();
    _this._data = defaultValues ? _utils2.default.clone(defaultValues) : {};
    return _this;
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */


  (0, _createClass3.default)(FormModel, [{
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._validation.getValidationDependency(fields);
    }
  }]);
  return FormModel;
}(_AbstractFormModel3.default);

/**
 * Get data
 *
 * @param {Array}    fields     Required fields
 * @param {Function} cb         CallBack function
 */


FormModel.prototype.getData = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fields) {
    var record, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            record = {};

            if (!fields) {
              _context.next = 23;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;

            for (_iterator = (0, _getIterator3.default)(fields); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              field = _step.value;

              record[field] = this._data[field];
            }
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 13:
            _context.prev = 13;
            _context.prev = 14;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 16:
            _context.prev = 16;

            if (!_didIteratorError) {
              _context.next = 19;
              break;
            }

            throw _iteratorError;

          case 19:
            return _context.finish(16);

          case 20:
            return _context.finish(13);

          case 21:
            _context.next = 24;
            break;

          case 23:
            record = _utils2.default.clone(this._data);

          case 24:
            return _context.abrupt('return', record);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 9, 13, 21], [14,, 16, 20]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Process form data
 *
 * @param {Object}      changes     Form data
 * @param {Function}    cb          CallBack function
 */
FormModel.prototype.submit = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(changes) {
    var validErrors;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.isValidRecord(changes);

          case 2:
            validErrors = _context2.sent;

            if (validErrors.isEmpty()) {
              _context2.next = 5;
              break;
            }

            throw validErrors;

          case 5:
            (0, _assign2.default)(this._data, changes);
            this.trigger('update', changes);
            return _context2.abrupt('return', changes);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
FormModel.prototype.isValidRecord = (0, _callbackify2.default)(function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(record) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this._validation.isValidRecord(record);

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = FormModel;
module.exports = exports['default'];