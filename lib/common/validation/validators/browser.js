"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defaultXhr = _interopRequireDefault(require("../../defaultXhr"));

var _ValidationErrors = _interopRequireDefault(require("../ValidationErrors"));

var _common = _interopRequireDefault(require("./common"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ClientValidator =
/*#__PURE__*/
function (_Validator) {
  (0, _inherits2.default)(ClientValidator, _Validator);

  /**
   * Get validator.
   *
   * @param {string}  serverValidationUrl
   * @param {{}}      xhr
   *
   * @return {Validator}
   */
  function ClientValidator(serverValidationUrl, xhr) {
    var _this;

    (0, _classCallCheck2.default)(this, ClientValidator);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ClientValidator).call(this));
    _this._settings.serverValidationUrl = serverValidationUrl;
    _this._settings.xhr = xhr || _defaultXhr.default;
    return _this;
  }

  (0, _createClass2.default)(ClientValidator, [{
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(record) {
        var xhrResult, validationErrors;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._settings.serverValidationUrl) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return _common.default.prototype.isValidRecord.call(this, record);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this._settings.xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify(record),
                  uri: this._settings.serverValidationUrl
                });

              case 7:
                xhrResult = _context.sent;
                _context.next = 19;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);

                if (!(_context.t0.statusCode === 413)) {
                  _context.next = 18;
                  break;
                }

                _context.next = 15;
                return _common.default.prototype.isValidRecord.call(this, record);

              case 15:
                validationErrors = _context.sent;

                if (validationErrors.isEmpty()) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", validationErrors);

              case 18:
                throw _context.t0;

              case 19:
                return _context.abrupt("return", _ValidationErrors.default.createFromJSON(JSON.parse(xhrResult)));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      return function isValidRecord(_x) {
        return _isValidRecord.apply(this, arguments);
      };
    }()
  }], [{
    key: "create",
    value: function create(serverValidationUrl, xhr) {
      return new ClientValidator(serverValidationUrl, xhr);
    }
  }]);
  return ClientValidator;
}(_common.default);

var _default = ClientValidator;
exports.default = _default;
module.exports = exports.default;