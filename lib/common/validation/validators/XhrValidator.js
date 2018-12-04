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

var _defaultXhr = _interopRequireDefault(require("../../defaultXhr"));

var _ValidationErrors = _interopRequireDefault(require("../ValidationErrors"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XhrValidator =
/*#__PURE__*/
function () {
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
    (0, _classCallCheck2.default)(this, XhrValidator);
    this._validationUrl = validationUrl;
    this._validator = validator;
    this._xhr = xhr || _defaultXhr.default;
  }

  (0, _createClass2.default)(XhrValidator, [{
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
                _context.prev = 0;
                _context.next = 3;
                return this._xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  body: JSON.stringify(record),
                  uri: this._validationUrl
                });

              case 3:
                xhrResult = _context.sent;
                _context.next = 15;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);

                if (!(_context.t0.statusCode === 413)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return this._validator.isValidRecord(record);

              case 11:
                validationErrors = _context.sent;

                if (validationErrors.isEmpty()) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", validationErrors);

              case 14:
                throw _context.t0;

              case 15:
                return _context.abrupt("return", _ValidationErrors.default.createFromJSON(JSON.parse(xhrResult)));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      return function isValidRecord(_x) {
        return _isValidRecord.apply(this, arguments);
      };
    }()
  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }], [{
    key: "create",
    value: function create(validationUrl, validator, xhr) {
      return new XhrValidator(validationUrl, validator, xhr);
    }
  }]);
  return XhrValidator;
}();

var _default = XhrValidator;
exports.default = _default;
module.exports = exports.default;