'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _callbackify = require('../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _defaultXhr = require('../common/defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ListXMLHttpRequestModel =
/**
 * Simple list client model which works via XMLHttpRequest
 *
 * @param {string}    apiURL  API address for list model interaction
 * @param {Function}  [xhr]   XHR wrapper
 * @constructor
 */
function ListXMLHttpRequestModel(apiURL, xhr) {
  (0, _classCallCheck3.default)(this, ListXMLHttpRequestModel);

  this._apiURL = apiURL;
  this._xhr = xhr || _defaultXhr2.default;
  this._apiUrl = apiURL.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
  .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
};

/**
 * Get model data
 *
 * @param {string}    search  List search query
 */


ListXMLHttpRequestModel.prototype.read = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(search) {
    var parsedUrl, body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parsedUrl = _url2.default.parse(this._apiUrl, true);

            delete parsedUrl.search;
            if (search) {
              parsedUrl.query.v = search;
            }

            _context.next = 5;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'GET',
              headers: {
                'Content-type': 'application/json'
              },
              uri: _url2.default.format(parsedUrl)
            });

          case 5:
            body = _context.sent;
            return _context.abrupt('return', JSON.parse(body));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Get option name using ID
 *
 * @param {*}         id  Option ID
 */
ListXMLHttpRequestModel.prototype.getLabel = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
    var parsedUrl, body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            parsedUrl = _url2.default.parse(this._apiUrl, true);

            parsedUrl.pathname = _url2.default.resolve(parsedUrl.pathname, 'label/' + (0, _stringify2.default)(id));

            _context2.next = 4;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'GET',
              headers: {
                'Content-type': 'application/json'
              },
              uri: _url2.default.format(parsedUrl)
            });

          case 4:
            body = _context2.sent;


            body = JSON.parse(body);

            return _context2.abrupt('return', body);

          case 7:
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

exports.default = ListXMLHttpRequestModel;
module.exports = exports['default'];