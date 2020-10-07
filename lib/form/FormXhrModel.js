"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _Validator = _interopRequireDefault(require("../common/validation/Validator"));

var _defaultXhr = _interopRequireDefault(require("../common/defaultXhr"));

var _Events = _interopRequireDefault(require("../common/Events"));

var _url = _interopRequireDefault(require("url"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var MAX_URI_LENGTH = 2048;

var FormXhrModel =
/*#__PURE__*/
function (_EventsModel) {
  (0, _inherits2["default"])(FormXhrModel, _EventsModel);

  function FormXhrModel(settings) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormXhrModel);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FormXhrModel).call(this));

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = settings.validator || new _Validator["default"]();
    _this._xhr = settings.xhr || _defaultXhr["default"];
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }

  (0, _createClass2["default"])(FormXhrModel, [{
    key: "getData",
    value: function getData(fields) {
      var parsedUrl, response;
      return _regenerator["default"].async(function getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              parsedUrl = _url["default"].parse(this._apiUrl, true);
              parsedUrl.query.fields = JSON.stringify(fields);
              delete parsedUrl.search;

              if (!(_url["default"].format(parsedUrl).length > MAX_URI_LENGTH)) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return _regenerator["default"].awrap(this._getDataPostRequest(fields));

            case 6:
              return _context.abrupt("return", _context.sent);

            case 7:
              _context.next = 9;
              return _regenerator["default"].awrap(this._xhr({
                method: 'GET',
                uri: _url["default"].format(parsedUrl)
              }));

            case 9:
              response = _context.sent;
              return _context.abrupt("return", JSON.parse(response));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "submit",
    value: function submit(changes) {
      var body;
      return _regenerator["default"].async(function submit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator["default"].awrap(this._xhr({
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                uri: this._apiUrl,
                body: JSON.stringify(changes)
              }));

            case 2:
              body = _context2.sent;
              body = JSON.parse(body);

              if (!body.error) {
                _context2.next = 6;
                break;
              }

              throw _ValidationErrors["default"].createFromJSON(body.error);

            case 6:
              this.trigger('update', body.data);
              return _context2.abrupt("return", body.data);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      return this._validator.isValidRecord(record);
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }, {
    key: "_getDataPostRequest",
    value: function _getDataPostRequest(fields) {
      var parsedUrl;
      return _regenerator["default"].async(function _getDataPostRequest$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              parsedUrl = _url["default"].parse(this._apiUrl, true);
              parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'data');
              _context3.next = 4;
              return _regenerator["default"].awrap(this._xhr({
                method: 'POST',
                json: true,
                uri: _url["default"].format(parsedUrl),
                body: {
                  fields: fields
                }
              }));

            case 4:
              return _context3.abrupt("return", _context3.sent);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);
  return FormXhrModel;
}(_Events["default"]);

var _default = FormXhrModel;
exports["default"] = _default;
module.exports = exports.default;