"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _Validator = _interopRequireDefault(require("../../common/validation/Validator"));

var _defaultXhr = _interopRequireDefault(require("../../common/defaultXhr"));

var _AbstractGridModel2 = _interopRequireDefault(require("./AbstractGridModel"));

var _url = _interopRequireDefault(require("url"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MAX_URI_LENGTH = 2048;
/**
 * Grid model, that works with API via XHR
 *
 * @param {Object}    settings                                 Model settings
 * @param {string}    settings.api                             API address
 * @param {Validator} [settings.validator]                     General validator
 * @param {Function}  [settings.xhr]                           XHR interface
 * @param {boolean}   [settings.validateOnClient=false]        Don't send validation request to server
 * @param {boolean}   [settings.multipartFormData=false] Send form data with enctype='multipart/form-data'
 * @constructor
 */

var GridXhrModel = /*#__PURE__*/function (_AbstractGridModel) {
  (0, _inherits2["default"])(GridXhrModel, _AbstractGridModel);

  var _super = _createSuper(GridXhrModel);

  function GridXhrModel(_ref) {
    var _this;

    var api = _ref.api,
        validator = _ref.validator,
        xhr = _ref.xhr,
        validateOnClient = _ref.validateOnClient,
        multipartFormData = _ref.multipartFormData;
    (0, _classCallCheck2["default"])(this, GridXhrModel);
    _this = _super.call(this);

    if (!api) {
      throw new Error('Initialization problem: \'api\' must be specified.');
    }

    _this._validator = validator || new _Validator["default"]();
    _this._xhr = xhr || _defaultXhr["default"];
    _this._validateOnClient = validateOnClient || false;
    _this._multipartFormDataEncoded = multipartFormData || false;
    _this._apiUrl = api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }
  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   */


  (0, _createClass2["default"])(GridXhrModel, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(record) {
        var formData, ordinaryData, _i, _Object$entries, _Object$entries$_i, prop, value, body;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                formData = new FormData();

                if (this._multipartFormDataEncoded) {
                  ordinaryData = {};

                  for (_i = 0, _Object$entries = Object.entries(record); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), prop = _Object$entries$_i[0], value = _Object$entries$_i[1];

                    if (value instanceof File) {
                      formData.append(JSON.stringify(prop), value);
                    } else {
                      ordinaryData[prop] = value;
                    }
                  }

                  formData.append('rest', JSON.stringify(ordinaryData));
                }

                _context.next = 4;
                return this._xhr(_objectSpread({
                  method: 'POST',
                  uri: this._apiUrl,
                  body: this._multipartFormDataEncoded ? formData : JSON.stringify(record)
                }, !this._multipartFormDataEncoded && {
                  headers: {
                    'Content-type': 'application/json'
                  }
                }));

              case 4:
                body = _context.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context.next = 8;
                  break;
                }

                throw _ValidationErrors["default"].createFromJSON(body.error);

              case 8:
                this.trigger('create', [body.data]);
                return _context.abrupt("return", body.data);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
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
      var _read = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(settings) {
        var queryUrl, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryUrl = this._getQueryUrl(settings);

                if (!(_url["default"].format(queryUrl).length > MAX_URI_LENGTH)) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return this._readPostRequest(settings);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
                _context2.next = 7;
                return this._xhr({
                  method: 'GET',
                  uri: _url["default"].format(queryUrl)
                });

              case 7:
                response = _context2.sent;
                return _context2.abrupt("return", JSON.parse(response));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read(_x2) {
        return _read.apply(this, arguments);
      }

      return read;
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
      var _getRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, fields) {
        var parsedUrl, body;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parsedUrl = _url["default"].parse(this._apiUrl, true);
                parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields

                parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, JSON.stringify(id));
                delete parsedUrl.search;
                _context3.next = 6;
                return this._xhr({
                  method: 'GET',
                  uri: _url["default"].format(parsedUrl)
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

      function getRecord(_x3, _x4) {
        return _getRecord.apply(this, arguments);
      }

      return getRecord;
    }()
    /**
     * Apply record changes
     *
     * @param {[]}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(changes) {
        var formDataChanges, ordinaryRecordChanges, _iterator, _step, _loop, body, res, _iterator2, _step2, error, _iterator3, _step3, _error;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                formDataChanges = new FormData();

                if (this._multipartFormDataEncoded) {
                  ordinaryRecordChanges = [];
                  _iterator = _createForOfIteratorHelper(changes);

                  try {
                    _loop = function _loop() {
                      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                          recordId = _step$value[0],
                          record = _step$value[1];

                      var fileFieldNames = [];

                      for (var _i2 = 0, _Object$keys = Object.keys(record); _i2 < _Object$keys.length; _i2++) {
                        var field = _Object$keys[_i2];

                        if (record[field] instanceof File) {
                          formDataChanges.append(JSON.stringify({
                            recordId: recordId,
                            field: field
                          }), record[field]);
                          fileFieldNames.push(field);
                        }
                      }

                      var filteredRecord = Object.keys(record).filter(function (key) {
                        return !fileFieldNames.includes(key);
                      }).reduce(function (agr, key) {
                        return _objectSpread(_objectSpread({}, agr), {}, (0, _defineProperty2["default"])({}, key, record[key]));
                      }, {});
                      ordinaryRecordChanges.push([recordId, filteredRecord]);
                    };

                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _loop();
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  formDataChanges.append('rest', JSON.stringify(ordinaryRecordChanges));
                }

                _context4.next = 4;
                return this._xhr(_objectSpread(_objectSpread({
                  method: 'PUT'
                }, !this._multipartFormDataEncoded && {
                  headers: {
                    'Content-type': 'application/json'
                  }
                }), {}, {
                  uri: this._apiUrl,
                  body: this._multipartFormDataEncoded ? formDataChanges : JSON.stringify(changes)
                }));

              case 4:
                body = _context4.sent;
                body = JSON.parse(body);
                res = [];

                if (body.changes && body.changes.length) {
                  this.trigger('update', body.changes);
                  res.push.apply(res, (0, _toConsumableArray2["default"])(body.changes));
                }

                if (body.validation && body.validation.length) {
                  _iterator2 = _createForOfIteratorHelper(body.validation);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      error = _step2.value;

                      if (error && error[1]) {
                        error[1] = _ValidationErrors["default"].createFromJSON(error[1]);
                        res.push(error);
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }

                if (body.errors && body.errors.length) {
                  _iterator3 = _createForOfIteratorHelper(body.errors);

                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      _error = _step3.value;

                      if (_error && _error[1]) {
                        _error[1] = Object.assign(new Error(), _error[1]); // Note, that Object spread operator won't work here

                        res.push(_error);
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                }

                return _context4.abrupt("return", res);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x5) {
        return _update.apply(this, arguments);
      }

      return update;
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
      var _isValidRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(record, recordId) {
        var parsedUrl, response, validationErrors;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
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
                parsedUrl = _url["default"].parse(this._apiUrl, true);
                parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'validation');
                _context5.prev = 6;
                _context5.next = 9;
                return this._xhr({
                  method: 'POST',
                  uri: _url["default"].format(parsedUrl),
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
                return _context5.abrupt("return", _ValidationErrors["default"].createFromJSON(response));

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 12]]);
      }));

      function isValidRecord(_x6, _x7) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
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
  }, {
    key: "_getQueryUrl",
    value: function _getQueryUrl(settings) {
      var parsedUrl = _url["default"].parse(this._apiUrl, true);

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
      return parsedUrl;
    }
  }, {
    key: "_readPostRequest",
    value: function () {
      var _readPostRequest2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(settings) {
        var requestBody, parsedUrl;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                requestBody = {};
                requestBody.fields = settings.fields;
                requestBody.offset = settings.offset || 0;

                if (settings.limit) {
                  requestBody.limit = settings.limit;
                }

                if (settings.filters) {
                  requestBody.filters = settings.filters;
                }

                if (settings.sort) {
                  requestBody.sort = settings.sort;
                }

                if (settings.extra) {
                  requestBody.extra = settings.extra;
                }

                parsedUrl = _url["default"].parse(this._apiUrl, true);
                parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'read');
                _context6.next = 11;
                return this._xhr({
                  method: 'POST',
                  json: true,
                  uri: _url["default"].format(parsedUrl),
                  body: requestBody
                });

              case 11:
                return _context6.abrupt("return", _context6.sent);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _readPostRequest(_x8) {
        return _readPostRequest2.apply(this, arguments);
      }

      return _readPostRequest;
    }()
  }]);
  return GridXhrModel;
}(_AbstractGridModel2["default"]);

var _default = GridXhrModel;
exports["default"] = _default;
module.exports = exports.default;