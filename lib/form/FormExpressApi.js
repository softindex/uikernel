"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _express = _interopRequireDefault(require("express"));

var _utils = require("../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormExpressApi = /*#__PURE__*/function () {
  (0, _createClass2["default"])(FormExpressApi, null, [{
    key: "create",
    value: function create() {
      return new FormExpressApi();
    }
  }]);

  function FormExpressApi() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, FormExpressApi);
    this.middlewares = {
      getData: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
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
          return _ref.apply(this, arguments);
        };
      }())],
      getDataPost: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
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
          return _ref2.apply(this, arguments);
        };
      }())],
      submit: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
          var model, data;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context3.prev = 1;
                  _context3.next = 4;
                  return model.submit(req.body);

                case 4:
                  data = _context3.sent;

                  _this._result(null, {
                    data: data,
                    error: null
                  }, req, res, next);

                  _context3.next = 14;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](1);

                  if (!(_context3.t0 && !(_context3.t0 instanceof _ValidationErrors["default"]))) {
                    _context3.next = 13;
                    break;
                  }

                  _this._result(_context3.t0, null, req, res, next);

                  return _context3.abrupt("return");

                case 13:
                  _this._result(null, {
                    data: null,
                    error: _context3.t0
                  }, req, res, next);

                case 14:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[1, 8]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }())],
      validate: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
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
          return _ref4.apply(this, arguments);
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
      throw Error('Model is not defined.');
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
  }]);
  return FormExpressApi;
}();

var _default = FormExpressApi;
exports["default"] = _default;
module.exports = exports.default;