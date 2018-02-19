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

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _common = require('../../common/validation/validators/common');

var _common2 = _interopRequireDefault(_common);

var _defaultXhr = require('../../common/defaultXhr');

var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

var _AbstractGridModel2 = require('./AbstractGridModel');

var _AbstractGridModel3 = _interopRequireDefault(_AbstractGridModel2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                          Model settings
 * @param {string}    settings.api                      API address
 * @param {Validator} [settings.validator]        General validator
 * @param {Function}  [settings.xhr]                    XHR interface
 * @constructor
 */
var GridXhrModel = function (_AbstractGridModel) {
  (0, _inherits3.default)(GridXhrModel, _AbstractGridModel);

  function GridXhrModel(settings) {
    (0, _classCallCheck3.default)(this, GridXhrModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GridXhrModel.__proto__ || (0, _getPrototypeOf2.default)(GridXhrModel)).call(this));

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


  (0, _createClass3.default)(GridXhrModel, [{
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }]);
  return GridXhrModel;
}(_AbstractGridModel3.default);

/**
 * Add a record
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

GridXhrModel.prototype.create = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(record) {
    var body;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'POST',
              headers: { 'Content-type': 'application/json' },
              uri: this._apiUrl,
              body: (0, _stringify2.default)(record)
            });

          case 2:
            body = _context.sent;


            body = JSON.parse(body);

            if (!body.error) {
              _context.next = 6;
              break;
            }

            throw _ValidationErrors2.default.createFromJSON(body.error);

          case 6:

            this.trigger('create', body.data);

            return _context.abrupt('return', body.data);

          case 8:
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
 * Get records list
 *
 * @param {Object}      settings                Request
 * @param {Array}       settings.fields         Fields
 * @param {number}      [settings.limit]        Limit
 * @param {number}      [settings.offset=0]     Offset
 * @param {Object}      [settings.filters]      Filter values object
 * @param {Array}       [settings.sort]         Sort parameters
 * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
 * @param {Function}    cb                      CallBack function
 */
GridXhrModel.prototype.read = (0, _callbackify2.default)(function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(settings) {
    var parsedUrl, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            parsedUrl = _url2.default.parse(this._apiUrl, true);


            parsedUrl.query.fields = (0, _stringify2.default)(settings.fields);
            parsedUrl.query.offset = settings.offset || 0;
            if (settings.limit) {
              parsedUrl.query.limit = settings.limit;
            }
            if (settings.filters) {
              parsedUrl.query.filters = (0, _stringify2.default)(settings.filters);
            }
            if (settings.sort) {
              parsedUrl.query.sort = (0, _stringify2.default)(settings.sort);
            }
            if (settings.extra) {
              parsedUrl.query.extra = (0, _stringify2.default)(settings.extra);
            }
            delete parsedUrl.search;

            _context2.next = 10;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'GET',
              uri: _url2.default.format(parsedUrl)
            });

          case 10:
            response = _context2.sent;
            return _context2.abrupt('return', JSON.parse(response));

          case 12:
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
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridXhrModel.prototype.getRecord = (0, _callbackify2.default)(function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, fields) {
    var parsedUrl, body;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            parsedUrl = _url2.default.parse(this._apiUrl, true);

            parsedUrl.query.cols = (0, _stringify2.default)(fields); // TODO rename cols to fields
            parsedUrl.pathname = _url2.default.resolve(parsedUrl.pathname, (0, _stringify2.default)(id));
            delete parsedUrl.search;

            _context3.next = 6;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'GET',
              uri: _url2.default.format(parsedUrl)
            });

          case 6:
            body = _context3.sent;
            return _context3.abrupt('return', JSON.parse(body));

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridXhrModel.prototype.update = (0, _callbackify2.default)(function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(changes) {
    var body;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _toPromise2.default)(this._xhr.bind(this))({
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              uri: this._apiUrl,
              body: (0, _stringify2.default)(changes)
            });

          case 2:
            body = _context4.sent;


            body = JSON.parse(body);

            if (body.changes.length) {
              this.trigger('update', body.changes);
            }

            body.errors.forEach(function (error) {
              error[1] = _ValidationErrors2.default.createFromJSON(error[1]);
            });

            return _context4.abrupt('return', body.changes.concat(body.errors));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}());

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
GridXhrModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
});

exports.default = GridXhrModel;
module.exports = exports['default'];