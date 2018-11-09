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

var _defaultXhr = _interopRequireDefault(require("../common/defaultXhr"));

var _url = _interopRequireDefault(require("url"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ListXMLHttpRequestModel =
/*#__PURE__*/
function () {
  /**
   * Simple list client model which works via XMLHttpRequest
   *
   * @param {string}    apiURL  API address for list model interaction
   * @param {Function}  [xhr]   XHR wrapper
   * @constructor
   */
  function ListXMLHttpRequestModel(apiURL, xhr) {
    (0, _classCallCheck2.default)(this, ListXMLHttpRequestModel);
    this._apiURL = apiURL;
    this._xhr = xhr || _defaultXhr.default;
    this._apiUrl = apiURL.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
  }
  /**
   * Get model data
   *
   * @param {string}    search  List search query
   */


  (0, _createClass2.default)(ListXMLHttpRequestModel, [{
    key: "read",
    value: function () {
      var _read = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(search) {
        var parsedUrl, body;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                delete parsedUrl.search;

                if (search) {
                  parsedUrl.query.v = search;
                }

                _context.next = 5;
                return this._xhr({
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: _url.default.format(parsedUrl)
                });

              case 5:
                body = _context.sent;
                return _context.abrupt("return", JSON.parse(body));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function read(_x) {
        return _read.apply(this, arguments);
      };
    }()
    /**
     * Get option name using ID
     *
     * @param {*}         id  Option ID
     */

  }, {
    key: "getLabel",
    value: function () {
      var _getLabel = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(id) {
        var parsedUrl, body;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                parsedUrl.pathname = _url.default.resolve(parsedUrl.pathname, "label/".concat(JSON.stringify(id)));
                _context2.next = 4;
                return this._xhr({
                  method: 'GET',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: _url.default.format(parsedUrl)
                });

              case 4:
                body = _context2.sent;
                body = JSON.parse(body);
                return _context2.abrupt("return", body);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getLabel(_x2) {
        return _getLabel.apply(this, arguments);
      };
    }()
  }]);
  return ListXMLHttpRequestModel;
}();

var _default = ListXMLHttpRequestModel;
exports.default = _default;
module.exports = exports.default;