"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _Validator = _interopRequireDefault(require("../../common/validation/Validator"));

var _defaultXhr = _interopRequireDefault(require("../../common/defaultXhr"));

var _AbstractGridModel2 = _interopRequireDefault(require("./AbstractGridModel"));

var _url = _interopRequireDefault(require("url"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                          Model settings
 * @param {string}    settings.api                      API address
 * @param {Validator} [settings.validator]              General validator
 * @param {Function}  [settings.xhr]                    XHR interface
 * @param {boolean}   [settings.validateOnClient=false] Don't send validation request to server
 * @constructor
 */
var GridXhrModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  (0, _inherits2.default)(GridXhrModel, _AbstractGridModel);

  function GridXhrModel(settings) {
    var _this;

    (0, _classCallCheck2.default)(this, GridXhrModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GridXhrModel).call(this));

    if (!settings.api) {
      throw Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = settings.validator || new _Validator.default();
    _this._xhr = settings.xhr || _defaultXhr.default;
    _this._validateOnClient = settings.validateOnClient || false;
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }
  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   */


  (0, _createClass2.default)(GridXhrModel, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(record) {
        var body;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._xhr({
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: this._apiUrl,
                  body: JSON.stringify(record)
                });

              case 2:
                body = _context.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context.next = 6;
                  break;
                }

                throw _ValidationErrors.default.createFromJSON(body.error);

              case 6:
                this.trigger('create', [body.data]);
                return _context.abrupt("return", body.data);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function create(_x) {
        return _create.apply(this, arguments);
      };
    }()
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
     */

  }, {
    key: "read",
    value: function () {
      var _read = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(settings) {
        var parsedUrl, response;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                parsedUrl.query.fields = JSON.stringify(settings.fields);
                parsedUrl.query.offset = settings.offset || 0;

                if (settings.limit) {
                  parsedUrl.query.limit = settings.limit;
                }

                if (settings.filters) {
                  parsedUrl.query.filters = JSON.stringify(settings.filters);
                }

                if (settings.sort) {
                  parsedUrl.query.sort = JSON.stringify(settings.sort);
                }

                if (settings.extra) {
                  parsedUrl.query.extra = JSON.stringify(settings.extra);
                }

                delete parsedUrl.search;
                _context2.next = 10;
                return this._xhr({
                  method: 'GET',
                  uri: _url.default.format(parsedUrl)
                });

              case 10:
                response = _context2.sent;
                return _context2.abrupt("return", JSON.parse(response));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function read(_x2) {
        return _read.apply(this, arguments);
      };
    }()
    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: "getRecord",
    value: function () {
      var _getRecord = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(id, fields) {
        var parsedUrl, body;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields

                parsedUrl.pathname = _url.default.resolve(parsedUrl.pathname, JSON.stringify(id));
                delete parsedUrl.search;
                _context3.next = 6;
                return this._xhr({
                  method: 'GET',
                  uri: _url.default.format(parsedUrl)
                });

              case 6:
                body = _context3.sent;
                return _context3.abrupt("return", JSON.parse(body));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getRecord(_x3, _x4) {
        return _getRecord.apply(this, arguments);
      };
    }()
    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(changes) {
        var body, res, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, error, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _error;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._xhr({
                  method: 'PUT',
                  headers: {
                    'Content-type': 'application/json'
                  },
                  uri: this._apiUrl,
                  body: JSON.stringify(changes)
                });

              case 2:
                body = _context4.sent;
                body = JSON.parse(body);
                res = [];

                if (body.changes && body.changes.length) {
                  this.trigger('update', body.changes);
                  res.push.apply(res, (0, _toConsumableArray2.default)(body.changes));
                }

                if (!(body.validation && body.validation.length)) {
                  _context4.next = 26;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 10;

                for (_iterator = body.validation[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  error = _step.value;

                  if (error && error[1]) {
                    error[1] = _ValidationErrors.default.createFromJSON(error[1]);
                    res.push(error);
                  }
                }

                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](10);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 18:
                _context4.prev = 18;
                _context4.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 21:
                _context4.prev = 21;

                if (!_didIteratorError) {
                  _context4.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context4.finish(21);

              case 25:
                return _context4.finish(18);

              case 26:
                if (!(body.errors && body.errors.length)) {
                  _context4.next = 46;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context4.prev = 30;

                for (_iterator2 = body.errors[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _error = _step2.value;

                  if (_error && _error[1]) {
                    _error[1] = Object.assign(new Error(), _error[1]); // Note, that Object spread operator won't work here

                    res.push(_error);
                  }
                }

                _context4.next = 38;
                break;

              case 34:
                _context4.prev = 34;
                _context4.t1 = _context4["catch"](30);
                _didIteratorError2 = true;
                _iteratorError2 = _context4.t1;

              case 38:
                _context4.prev = 38;
                _context4.prev = 39;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 41:
                _context4.prev = 41;

                if (!_didIteratorError2) {
                  _context4.next = 44;
                  break;
                }

                throw _iteratorError2;

              case 44:
                return _context4.finish(41);

              case 45:
                return _context4.finish(38);

              case 46:
                return _context4.abrupt("return", res);

              case 47:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 14, 18, 26], [19,, 21, 25], [30, 34, 38, 46], [39,, 41, 45]]);
      }));

      return function update(_x5) {
        return _update.apply(this, arguments);
      };
    }()
    /**
     * Validation check
     *
     * @param {{[string]: *}} record
     * @param {Promise<*>}    recordId
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(record, recordId) {
        var parsedUrl, response, validationErrors;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._validateOnClient) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this._validator.isValidRecord(record);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 4:
                parsedUrl = _url.default.parse(this._apiUrl, true);
                parsedUrl.pathname = _url.default.resolve(parsedUrl.pathname, 'validation');
                _context5.prev = 6;
                _context5.next = 9;
                return this._xhr({
                  method: 'POST',
                  uri: _url.default.format(parsedUrl),
                  body: {
                    record: record,
                    id: recordId
                  },
                  json: true
                });

              case 9:
                response = _context5.sent;
                _context5.next = 21;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](6);

                if (!(_context5.t0.statusCode === 413)) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 17;
                return this._validator.isValidRecord(record);

              case 17:
                validationErrors = _context5.sent;

                if (validationErrors.isEmpty()) {
                  _context5.next = 20;
                  break;
                }

                return _context5.abrupt("return", validationErrors);

              case 20:
                throw _context5.t0;

              case 21:
                return _context5.abrupt("return", _ValidationErrors.default.createFromJSON(response));

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 12]]);
      }));

      return function isValidRecord(_x6, _x7) {
        return _isValidRecord.apply(this, arguments);
      };
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {string[]}  fields   Fields list
     * @returns {string[]}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._validator.getValidationDependency(fields);
    }
  }]);
  return GridXhrModel;
}(_AbstractGridModel2.default);

var _default = GridXhrModel;
exports.default = _default;
module.exports = exports.default;