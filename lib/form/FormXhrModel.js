"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _Validator = _interopRequireDefault(require("../common/validation/Validator"));

var _defaultXhr = _interopRequireDefault(require("../common/defaultXhr"));

var _Events = _interopRequireDefault(require("../common/Events"));

var _url = _interopRequireDefault(require("url"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var MAX_URI_LENGTH = 2048;

var FormXhrModel = /*#__PURE__*/function (_EventsModel) {
  (0, _inherits2["default"])(FormXhrModel, _EventsModel);

  var _super = _createSuper(FormXhrModel);

  function FormXhrModel(settings) {
    var _this;

    (0, _classCallCheck2["default"])(this, FormXhrModel);
    _this = _super.call(this);

    if (!settings.api) {
      throw new Error('Initialization problem: \'api\' must be specified.');
    }

    _this._multipartFormDataEncoded = settings.multipartFormData || false;
    _this._validator = settings.validator || new _Validator["default"]();
    _this._validateOnClient = settings.validateOnClient || false;
    _this._xhr = settings.xhr || _defaultXhr["default"];
    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end

    return _this;
  }

  (0, _createClass2["default"])(FormXhrModel, [{
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fields) {
        var parsedUrl, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
                return this._getDataPostRequest(fields);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
                _context.next = 9;
                return this._xhr({
                  method: 'GET',
                  uri: _url["default"].format(parsedUrl)
                });

              case 9:
                response = _context.sent;
                return _context.abrupt("return", JSON.parse(response));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData(_x) {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(record) {
        var formData, ordinaryData, _i, _Object$entries, _Object$entries$_i, prop, value, body;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
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

                _context2.next = 4;
                return this._xhr(_objectSpread(_objectSpread({
                  method: 'POST'
                }, !this._multipartFormDataEncoded && {
                  headers: {
                    'Content-type': 'application/json'
                  }
                }), {}, {
                  uri: this._apiUrl,
                  body: this._multipartFormDataEncoded ? formData : JSON.stringify(record)
                }));

              case 4:
                body = _context2.sent;
                body = JSON.parse(body);

                if (!body.error) {
                  _context2.next = 8;
                  break;
                }

                throw _ValidationErrors["default"].createFromJSON(body.error);

              case 8:
                this.trigger('update', body.data);
                return _context2.abrupt("return", body.data);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submit(_x2) {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
    /**
     * Validation check
     *
     * @param {Object}      record
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(record) {
        var parsedUrl, response, validationErrors;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._validateOnClient) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this._validator.isValidRecord(record));

              case 2:
                parsedUrl = _url["default"].parse(this._apiUrl, true);
                parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'validation');
                _context3.prev = 4;
                _context3.next = 7;
                return this._xhr({
                  method: 'POST',
                  uri: _url["default"].format(parsedUrl),
                  body: record,
                  json: true
                });

              case 7:
                response = _context3.sent;
                _context3.next = 19;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](4);

                if (!(_context3.t0.statusCode === 413)) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 15;
                return this._validator.isValidRecord(record);

              case 15:
                validationErrors = _context3.sent;

                if (validationErrors.isEmpty()) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return", validationErrors);

              case 18:
                throw _context3.t0;

              case 19:
                return _context3.abrupt("return", _ValidationErrors["default"].createFromJSON(response));

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      function isValidRecord(_x3) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
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
    value: function () {
      var _getDataPostRequest2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(fields) {
        var parsedUrl;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                parsedUrl = _url["default"].parse(this._apiUrl, true);
                parsedUrl.pathname = _url["default"].resolve(parsedUrl.pathname, 'data');
                _context4.next = 4;
                return this._xhr({
                  method: 'POST',
                  json: true,
                  uri: _url["default"].format(parsedUrl),
                  body: {
                    fields: fields
                  }
                });

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _getDataPostRequest(_x4) {
        return _getDataPostRequest2.apply(this, arguments);
      }

      return _getDataPostRequest;
    }()
  }]);
  return FormXhrModel;
}(_Events["default"]);

var _default = FormXhrModel;
exports["default"] = _default;
module.exports = exports.default;