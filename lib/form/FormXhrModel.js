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

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _common = _interopRequireDefault(require("../common/validation/validators/common"));

var _defaultXhr = _interopRequireDefault(require("../common/defaultXhr"));

var _Events = _interopRequireDefault(require("../common/Events"));

var _url = _interopRequireDefault(require("url"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormXhrModel =
/*#__PURE__*/
function (_EventsModel) {
  (0, _inherits2.default)(FormXhrModel, _EventsModel);

  function FormXhrModel(settings) {
    var _this;

    (0, _classCallCheck2.default)(this, FormXhrModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormXhrModel).call(this));

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = settings.validator || new _common.default();
    _this._xhr = settings.xhr || _defaultXhr.default;
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }

  (0, _createClass2.default)(FormXhrModel, [{
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(fields) {
        var parsedUrl, response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                parsedUrl.query.fields = JSON.stringify(fields);
                delete parsedUrl.search;
                _context.next = 5;
                return this._xhr({
                  method: 'GET',
                  uri: _url.default.format(parsedUrl)
                });

              case 5:
                response = _context.sent;
                return _context.abrupt("return", JSON.parse(response));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getData(_x) {
        return _getData.apply(this, arguments);
      };
    }()
  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(changes) {
        var body;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: this._apiUrl,
                  body: JSON.stringify(changes)
                });

              case 2:
                body = _context2.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context2.next = 6;
                  break;
                }

                throw _ValidationErrors.default.createFromJSON(body.error);

              case 6:
                this.trigger('update', body.data);
                return _context2.abrupt("return", body.data);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function submit(_x2) {
        return _submit.apply(this, arguments);
      };
    }()
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
  }]);
  return FormXhrModel;
}(_Events.default);

var _default = FormXhrModel;
exports.default = _default;
module.exports = exports.default;