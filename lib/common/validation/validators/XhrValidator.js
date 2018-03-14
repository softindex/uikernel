'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _defaultXhr = require('../../defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _ValidationErrors = require('../ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var XhrValidator = function () {
  /**
   * Get validator.
   *
   * @param {string}        validationUrl
   * @param {Validator}     validator
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  function XhrValidator(validationUrl, validator, xhr) {
    (0, _classCallCheck3.default)(this, XhrValidator);

    this._validationUrl = validationUrl;
    this._validator = validator;
    this._xhr = xhr || _defaultXhr2.default;
  }

  (0, _createClass3.default)(XhrValidator, [{
    key: 'isValidRecord',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
        var xhrResult, validationErrors;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                xhrResult = void 0;
                _context.prev = 1;
                _context.next = 4;
                return this._xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: (0, _stringify2.default)(record),
                  uri: this._validationUrl
                });

              case 4:
                xhrResult = _context.sent;
                _context.next = 16;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                if (!(_context.t0.statusCode === 413)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return this._validator.isValidRecord(record);

              case 12:
                validationErrors = _context.sent;

                if (validationErrors.isEmpty()) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', validationErrors);

              case 15:
                throw _context.t0;

              case 16:
                return _context.abrupt('return', _ValidationErrors2.default.createFromJSON(JSON.parse(xhrResult)));

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function isValidRecord(_x) {
        return _ref.apply(this, arguments);
      }

      return isValidRecord;
    }()
  }, {
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }], [{
    key: 'create',
    value: function create(validationUrl, validator, xhr) {
      return new XhrValidator(validationUrl, validator, xhr);
    }
  }]);
  return XhrValidator;
}();

exports.default = XhrValidator;
module.exports = exports['default'];