"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _utils = require("../common/utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

var FormExpressApi = /*#__PURE__*/function () {
  function FormExpressApi() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$multipartFormDat = _ref.multipartFormData,
        multipartFormData = _ref$multipartFormDat === void 0 ? false : _ref$multipartFormDat,
        _ref$maxFileSize = _ref.maxFileSize,
        maxFileSize = _ref$maxFileSize === void 0 ? DEFAULT_MAX_FILE_SIZE : _ref$maxFileSize;

    (0, _classCallCheck2["default"])(this, FormExpressApi);
    var upload = (0, _multer["default"])({
      limits: {
        fileSize: maxFileSize
      }
    });
    this.middlewares = {
      getData: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
          var fields;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fields = req.query.fields ? JSON.parse(req.query.fields) : null;

                  _this._commonGetDataMiddleware(req, res, next, fields);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }())],
      getDataPost: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
          var fields;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  fields = req.body.fields || null;

                  _this._commonGetDataMiddleware(req, res, next, fields);

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }())],
      submit: [].concat((0, _toConsumableArray2["default"])(multipartFormData ? [upload.any()] : []), [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
          var model, body, _iterator, _step, _step$value, fieldname, buffer, parsedFieldName, data;

          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  model = _this._getModel(req, res);
                  body = req.body;

                  if (multipartFormData) {
                    body = (0, _utils.parseJson)(body.rest);
                    _iterator = _createForOfIteratorHelper(req.files);

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        _step$value = _step.value, fieldname = _step$value.fieldname, buffer = _step$value.buffer;
                        parsedFieldName = (0, _utils.parseJson)(decodeURI(fieldname), 'Invalid JSON in field name');
                        body[parsedFieldName] = buffer;
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  }

                  _context3.prev = 3;
                  _context3.next = 6;
                  return model.submit(body);

                case 6:
                  data = _context3.sent;

                  _this._result(null, {
                    data: data,
                    error: null
                  }, req, res, next);

                  _context3.next = 16;
                  break;

                case 10:
                  _context3.prev = 10;
                  _context3.t0 = _context3["catch"](3);

                  if (!(_context3.t0 && !(_context3.t0 instanceof _ValidationErrors["default"]))) {
                    _context3.next = 15;
                    break;
                  }

                  _this._result(_context3.t0, null, req, res, next);

                  return _context3.abrupt("return");

                case 15:
                  _this._result(null, {
                    data: null,
                    error: _context3.t0
                  }, req, res, next);

                case 16:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[3, 10]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref4.apply(this, arguments);
        };
      }())]),
      validate: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
          var model, data;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context4.prev = 1;
                  _context4.next = 4;
                  return model.isValidRecord(req.body);

                case 4:
                  data = _context4.sent;

                  _this._result(null, data, req, res, next);

                  _context4.next = 11;
                  break;

                case 8:
                  _context4.prev = 8;
                  _context4.t0 = _context4["catch"](1);

                  _this._result(_context4.t0, null, req, res, next);

                case 11:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[1, 8]]);
        }));

        return function (_x10, _x11, _x12) {
          return _ref5.apply(this, arguments);
        };
      }())]
    };
  }

  (0, _createClass2["default"])(FormExpressApi, [{
    key: "model",
    value: function model(_model) {
      if (typeof _model === 'function') {
        this._getModel = _model;
      } else {
        this._getModel = function () {
          return _model;
        };
      }

      return this;
    }
  }, {
    key: "getRouter",
    value: function getRouter() {
      return new _express["default"].Router().get('/', this.middlewares.getData) // Deprecated
      .post('/', this.middlewares.submit).get('/data', this.middlewares.getData).post('/data', this.middlewares.getDataPost).post('/validation', this.middlewares.validate);
    }
  }, {
    key: "getData",
    value: function getData(middlewares) {
      return this._addMidelwares('getData', middlewares);
    }
  }, {
    key: "submit",
    value: function submit(middlewares) {
      return this._addMidelwares('submit', middlewares);
    }
  }, {
    key: "validate",
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: "_addMidelwares",
    value: function _addMidelwares(method, middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares[method] = middlewares.concat(this.middlewares[method]);
      return this;
    } // Default implementation

  }, {
    key: "_getModel",
    value: function _getModel() {
      throw new Error('Model is not defined.');
    }
  }, {
    key: "_result",
    value: function _result(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }, {
    key: "_commonGetDataMiddleware",
    value: function () {
      var _commonGetDataMiddleware2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next, fields) {
        var model, data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                model = this._getModel(req, res);
                _context5.prev = 1;
                _context5.next = 4;
                return model.getData(fields);

              case 4:
                data = _context5.sent;

                this._result(null, data, req, res, next);

                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);

                this._result(_context5.t0, null, req, res, next);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function _commonGetDataMiddleware(_x13, _x14, _x15, _x16) {
        return _commonGetDataMiddleware2.apply(this, arguments);
      }

      return _commonGetDataMiddleware;
    }()
  }], [{
    key: "create",
    value: function create(settings) {
      return new FormExpressApi(settings);
    }
  }]);
  return FormExpressApi;
}();

var _default = FormExpressApi;
exports["default"] = _default;
module.exports = exports.default;