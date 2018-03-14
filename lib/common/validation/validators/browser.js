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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _callbackify = require('../../callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _toPromise = require('../../toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _defaultXhr = require('../../defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _ValidationErrors = require('../ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientValidator = function (_Validator) {
  (0, _inherits3.default)(ClientValidator, _Validator);

  /**
   * Get validator.
   *
   * @param {string}  serverValidationUrl
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  function ClientValidator(serverValidationUrl, xhr) {
    (0, _classCallCheck3.default)(this, ClientValidator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClientValidator.__proto__ || (0, _getPrototypeOf2.default)(ClientValidator)).call(this));

    _this._settings.serverValidationUrl = serverValidationUrl;
    _this._settings.xhr = xhr || _defaultXhr2.default;
    return _this;
  }

  (0, _createClass3.default)(ClientValidator, null, [{
    key: 'create',
    value: function create(serverValidationUrl, xhr) {
      return new ClientValidator(serverValidationUrl, xhr);
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

ClientValidator.prototype.isValidRecord = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
    var xhrResult, validationErrors;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this._settings.serverValidationUrl) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return _common2.default.prototype.isValidRecord.call(this, record);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
            xhrResult = void 0;
            _context.prev = 5;
            _context.next = 8;
            return (0, _toPromise2.default)(this._settings.xhr.bind(this._settings))({
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              body: (0, _stringify2.default)(record),
              uri: this._settings.serverValidationUrl
            });

          case 8:
            xhrResult = _context.sent;
            _context.next = 20;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](5);

            if (!(_context.t0.statusCode === 413)) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return _common2.default.prototype.isValidRecord.call(this, record);

          case 16:
            validationErrors = _context.sent;

            if (validationErrors.isEmpty()) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return', validationErrors);

          case 19:
            throw _context.t0;

          case 20:
            return _context.abrupt('return', _ValidationErrors2.default.createFromJSON(JSON.parse(xhrResult)));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 11]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = ClientValidator;
module.exports = exports['default'];