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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var GridXhrModel =
/*#__PURE__*/
function (_AbstractGridModel) {
  (0, _inherits2["default"])(GridXhrModel, _AbstractGridModel);

  function GridXhrModel(_ref) {
    var _this;

    var api = _ref.api,
        validator = _ref.validator,
        xhr = _ref.xhr,
        validateOnClient = _ref.validateOnClient,
        multipartFormData = _ref.multipartFormData;
    (0, _classCallCheck2["default"])(this, GridXhrModel);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridXhrModel).call(this));

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
    value: function create(record) {
      var formData, ordinaryData, _i, _Object$entries, _Object$entries$_i, prop, value, body;

      return _regenerator["default"].async(function create$(_context) {
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
              return _regenerator["default"].awrap(this._xhr(_objectSpread({
                method: 'POST',
                uri: this._apiUrl,
                body: this._multipartFormDataEncoded ? formData : JSON.stringify(record)
              }, !this._multipartFormDataEncoded && {
                headers: {
                  'Content-type': 'application/json'
                }
              })));

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
      }, null, this);
    }
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
    value: function read(settings) {
      var queryUrl, response;
      return _regenerator["default"].async(function read$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              queryUrl = this._getQueryUrl(settings);

              if (!(_url["default"].format(queryUrl).length > MAX_URI_LENGTH)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return _regenerator["default"].awrap(this._readPostRequest(settings));

            case 4:
              return _context2.abrupt("return", _context2.sent);

            case 5:
              _context2.next = 7;
              return _regenerator["default"].awrap(this._xhr({
                method: 'GET',
                uri: _url["default"].format(queryUrl)
              }));

            case 7:
              response = _context2.sent;
              return _context2.abrupt("return", JSON.parse(response));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
     * Get the particular record
     *
     * @param {number|string}   id      Record ID
     * @param {Array}           fields  Required fields
     */

  }, {
    key: "getRecord",
    value: function getRecord(id, fields) {
      var parsedUrl, body;
      return _regenerator["default"].async(function getRecord$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              parsedUrl = _url["default"].parse(this._apiUrl, true);
              parsedUrl.query.cols = JSON.stringify(fields); // TODO rename cols to fields

              parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, JSON.stringify(id));
              delete parsedUrl.search;
              _context3.next = 6;
              return _regenerator["default"].awrap(this._xhr({
                method: 'GET',
                uri: _url["default"].format(parsedUrl)
              }));

            case 6:
              body = _context3.sent;
              return _context3.abrupt("return", JSON.parse(body));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
    /**
     * Apply record changes
     *
     * @param {[]}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function update(changes) {
      var formDataChanges, ordinaryRecordChanges, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, body, res, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, error, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _error;

      return _regenerator["default"].async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              formDataChanges = new FormData();

              if (!this._multipartFormDataEncoded) {
                _context4.next = 24;
                break;
              }

              ordinaryRecordChanges = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 6;

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
                  return _objectSpread({}, agr, (0, _defineProperty2["default"])({}, key, record[key]));
                }, {});
                ordinaryRecordChanges.push([recordId, filteredRecord]);
              };

              for (_iterator = changes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
              }

              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 15:
              _context4.prev = 15;
              _context4.prev = 16;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 18:
              _context4.prev = 18;

              if (!_didIteratorError) {
                _context4.next = 21;
                break;
              }

              throw _iteratorError;

            case 21:
              return _context4.finish(18);

            case 22:
              return _context4.finish(15);

            case 23:
              formDataChanges.append('rest', JSON.stringify(ordinaryRecordChanges));

            case 24:
              _context4.next = 26;
              return _regenerator["default"].awrap(this._xhr(_objectSpread({
                method: 'PUT'
              }, !this._multipartFormDataEncoded && {
                headers: {
                  'Content-type': 'application/json'
                }
              }, {
                uri: this._apiUrl,
                body: this._multipartFormDataEncoded ? formDataChanges : JSON.stringify(changes)
              })));

            case 26:
              body = _context4.sent;
              body = JSON.parse(body);
              res = [];

              if (body.changes && body.changes.length) {
                this.trigger('update', body.changes);
                res.push.apply(res, (0, _toConsumableArray2["default"])(body.changes));
              }

              if (!(body.validation && body.validation.length)) {
                _context4.next = 50;
                break;
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 34;

              for (_iterator2 = body.validation[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                error = _step2.value;

                if (error && error[1]) {
                  error[1] = _ValidationErrors["default"].createFromJSON(error[1]);
                  res.push(error);
                }
              }

              _context4.next = 42;
              break;

            case 38:
              _context4.prev = 38;
              _context4.t1 = _context4["catch"](34);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t1;

            case 42:
              _context4.prev = 42;
              _context4.prev = 43;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 45:
              _context4.prev = 45;

              if (!_didIteratorError2) {
                _context4.next = 48;
                break;
              }

              throw _iteratorError2;

            case 48:
              return _context4.finish(45);

            case 49:
              return _context4.finish(42);

            case 50:
              if (!(body.errors && body.errors.length)) {
                _context4.next = 70;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 54;

              for (_iterator3 = body.errors[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _error = _step3.value;

                if (_error && _error[1]) {
                  _error[1] = Object.assign(new Error(), _error[1]); // Note, that Object spread operator won't work here

                  res.push(_error);
                }
              }

              _context4.next = 62;
              break;

            case 58:
              _context4.prev = 58;
              _context4.t2 = _context4["catch"](54);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t2;

            case 62:
              _context4.prev = 62;
              _context4.prev = 63;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 65:
              _context4.prev = 65;

              if (!_didIteratorError3) {
                _context4.next = 68;
                break;
              }

              throw _iteratorError3;

            case 68:
              return _context4.finish(65);

            case 69:
              return _context4.finish(62);

            case 70:
              return _context4.abrupt("return", res);

            case 71:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[6, 11, 15, 23], [16,, 18, 22], [34, 38, 42, 50], [43,, 45, 49], [54, 58, 62, 70], [63,, 65, 69]]);
    }
    /**
     * Validation check
     *
     * @param {{[string]: *}} record
     * @param {Promise<*>}    recordId
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record, recordId) {
      var parsedUrl, response, validationErrors;
      return _regenerator["default"].async(function isValidRecord$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!this._validateOnClient) {
                _context5.next = 4;
                break;
              }

              _context5.next = 3;
              return _regenerator["default"].awrap(this._validator.isValidRecord(record));

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
              parsedUrl = _url["default"].parse(this._apiUrl, true);
              parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'validation');
              _context5.prev = 6;
              _context5.next = 9;
              return _regenerator["default"].awrap(this._xhr({
                method: 'POST',
                uri: _url["default"].format(parsedUrl),
                body: {
                  record: record,
                  id: recordId
                },
                json: true
              }));

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
              return _regenerator["default"].awrap(this._validator.isValidRecord(record));

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
      }, null, this, [[6, 12]]);
    }
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
    value: function _readPostRequest(settings) {
      var requestBody, parsedUrl;
      return _regenerator["default"].async(function _readPostRequest$(_context6) {
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
              return _regenerator["default"].awrap(this._xhr({
                method: 'POST',
                json: true,
                uri: _url["default"].format(parsedUrl),
                body: requestBody
              }));

            case 11:
              return _context6.abrupt("return", _context6.sent);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);
  return GridXhrModel;
}(_AbstractGridModel2["default"]);

var _default = GridXhrModel;
exports["default"] = _default;
module.exports = exports.default;