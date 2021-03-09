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

var _express = _interopRequireDefault(require("express"));

var _utils = require("../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Form Express API for List model interaction
 *
 * @return {ListExpressApi}
 * @constructor
 */
var ListExpressApi = /*#__PURE__*/function () {
  (0, _createClass2["default"])(ListExpressApi, null, [{
    key: "create",
    value: function create() {
      return new ListExpressApi();
    }
  }]);

  function ListExpressApi() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, ListExpressApi);
    this.middlewares = {
      read: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
          var model, response;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context.prev = 1;
                  _context.next = 4;
                  return model.read(req.query.v);

                case 4:
                  response = _context.sent;

                  _this._result(null, response, req, res, next);

                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);

                  _this._result(_context.t0, null, req, res, next);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 8]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      getLabel: [(0, _utils.asyncHandler)( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
          var id, model, response;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  id = JSON.parse(req.params.id);
                  model = _this._getModel(req, res);
                  _context2.prev = 2;
                  _context2.next = 5;
                  return model.getLabel(id);

                case 5:
                  response = _context2.sent;

                  _this._result(null, response, req, res, next);

                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2["catch"](2);

                  _this._result(_context2.t0, null, req, res, next);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[2, 9]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())]
    };
  }
  /**
   * Specify List model
   *
   * @param   {Function|AbstractListModel}  model  List model
   * @return {ListExpressApi}
   */


  (0, _createClass2["default"])(ListExpressApi, [{
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
      return new _express["default"].Router().get('/', this.middlewares.read).get('/label/:id', this.middlewares.getLabel);
    }
  }, {
    key: "read",
    value: function read(middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares.read = middlewares.concat(this.middlewares.read);
      return this;
    }
  }, {
    key: "getLabel",
    value: function getLabel(middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }

      this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
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
        if (typeof data === 'number') {
          data = data.toString();
        }

        res.json(data);
      }
    }
  }]);
  return ListExpressApi;
}();

var _default = ListExpressApi;
exports["default"] = _default;
module.exports = exports.default;