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

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _callbackify = require('../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _common = require('../common/validation/validators/common');

var _common2 = _interopRequireDefault(_common);

var _defaultXhr = require('../common/defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _Events = require('../common/Events');

var _Events2 = _interopRequireDefault(_Events);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormXhrModel = function (_EventsModel) {
  (0, _inherits3.default)(FormXhrModel, _EventsModel);

  function FormXhrModel(settings) {
    (0, _classCallCheck3.default)(this, FormXhrModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FormXhrModel.__proto__ || (0, _getPrototypeOf2.default)(FormXhrModel)).call(this));

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = settings.validator || new _common2.default();
    _this._xhr = settings.xhr || _defaultXhr2.default;
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
    return _this;
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */


  (0, _createClass3.default)(FormXhrModel, [{
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }]);
  return FormXhrModel;
}(_Events2.default); /**
                      * Copyright (с) 2015-present, SoftIndex LLC.
                      * All rights reserved.
                      *
                      * This source code is licensed under the BSD-style license found in the
                      * LICENSE file in the root directory of this source tree.
                      */

FormXhrModel.prototype.getData = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fields) {
    var parsedUrl, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            parsedUrl = _url2.default.parse(this._apiUrl, true);

            parsedUrl.query.fields = (0, _stringify2.default)(fields);
            delete parsedUrl.search;

            _context.next = 5;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'GET',
              uri: _url2.default.format(parsedUrl)
            });

          case 5:
            response = _context.sent;
            return _context.abrupt('return', JSON.parse(response));

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

FormXhrModel.prototype.submit = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(changes) {
    var body;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              uri: this._apiUrl,
              body: (0, _stringify2.default)(changes)
            });

          case 2:
            body = _context2.sent;


            body = JSON.parse(body);

            if (!body.error) {
              _context2.next = 6;
              break;
            }

            throw _ValidationErrors2.default.createFromJSON(body.error);

          case 6:

            this.trigger('update', body.data);
            return _context2.abrupt('return', body.data);

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
FormXhrModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
});

exports.default = FormXhrModel;
module.exports = exports['default'];