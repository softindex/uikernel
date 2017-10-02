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

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defaultXhr = require('../../defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _ValidationErrors = require('../ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _common = require('../Validator/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientValidator = function (_Validator) {
  (0, _inherits3.default)(ClientValidator, _Validator);

  /**
   * Get validator.
   *
   * @param {string}        validationUrl
   * @param {Validator}     validator
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  function ClientValidator(validationUrl, validator, xhr) {
    (0, _classCallCheck3.default)(this, ClientValidator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClientValidator.__proto__ || (0, _getPrototypeOf2.default)(ClientValidator)).call(this));

    _this._settings.validationUrl = validationUrl;
    _this._settings.xhr = xhr || _defaultXhr2.default;
    _this._validator = validator;
    return _this;
  }

  (0, _createClass3.default)(ClientValidator, [{
    key: 'isValidRecord',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
        var xhrResult, _context, validationErrors;

        return _regenerator2.default.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                xhrResult = void 0;
                _context2.prev = 1;
                _context2.next = 4;
                return this._settings.xhr({
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: (0, _stringify2.default)(record),
                  uri: this._settings.validationUrl
                });

              case 4:
                xhrResult = _context2.sent;
                _context2.next = 16;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](1);

                if (!(_context2.t0.statusCode === 413)) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 12;
                return (_context = this._validator, _common2.default.prototype.isValidRecord).call(_context, record);

              case 12:
                validationErrors = _context2.sent;

                if (validationErrors.isEmpty()) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('return', validationErrors);

              case 15:
                throw _context2.t0;

              case 16:
                return _context2.abrupt('return', _ValidationErrors2.default.createFromJSON(JSON.parse(xhrResult)));

              case 17:
              case 'end':
                return _context2.stop();
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
      var _context3;

      return (_context3 = this._validator, (0, _get3.default)(ClientValidator.prototype.__proto__ || (0, _getPrototypeOf2.default)(ClientValidator.prototype), 'getValidationDependency', this)).call(_context3, fields);
    }
  }]);
  return ClientValidator;
}(_common2.default); /**
                      * Copyright (с) 2015-present, SoftIndex LLC.
                      * All rights reserved.
                      *
                      * This source code is licensed under the BSD-style license found in the
                      * LICENSE file in the root directory of this source tree.
                      */

exports.default = ClientValidator;
module.exports = exports['default'];