'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _utils = require('../common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var FormExpressApi = function () {
  (0, _createClass3.default)(FormExpressApi, null, [{
    key: 'create',
    value: function create() {
      return new FormExpressApi();
    }
  }]);

  function FormExpressApi() {
    var _this = this;

    (0, _classCallCheck3.default)(this, FormExpressApi);

    this.middlewares = {
      getData: [(0, _utils.asyncHandler)(function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
          var fields, model, data;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fields = req.query.fields ? JSON.parse(req.query.fields) : null;
                  model = _this._getModel(req, res);
                  _context.prev = 2;
                  _context.next = 5;
                  return (0, _toPromise2.default)(model.getData.bind(model))(fields);

                case 5:
                  data = _context.sent;

                  _this._result(null, data, req, res, next);
                  _context.next = 12;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](2);

                  _this._result(_context.t0, null, req, res, next);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[2, 9]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      submit: [(0, _utils.asyncHandler)(function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
          var model, data;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context2.prev = 1;
                  _context2.next = 4;
                  return (0, _toPromise2.default)(model.submit.bind(model))(req.body);

                case 4:
                  data = _context2.sent;

                  _this._result(null, data, req, res, next);
                  _context2.next = 14;
                  break;

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2['catch'](1);

                  if (!(_context2.t0 && !(_context2.t0 instanceof _ValidationErrors2.default))) {
                    _context2.next = 13;
                    break;
                  }

                  _this._result(_context2.t0, null, req, res, next);
                  return _context2.abrupt('return');

                case 13:
                  _this._result(null, { data: null, error: _context2.t0 }, req, res, next);

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this, [[1, 8]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())],
      validate: [(0, _utils.asyncHandler)(function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
          var model, data;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  model = _this._getModel(req, res);
                  _context3.prev = 1;
                  _context3.next = 4;
                  return (0, _toPromise2.default)(model.isValidRecord.bind(model))(req.body);

                case 4:
                  data = _context3.sent;

                  _this._result(null, data, req, res, next);
                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3['catch'](1);

                  _this._result(_context3.t0, null, req, res, next);

                case 11:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this, [[1, 8]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }())]
    };
  }

  (0, _createClass3.default)(FormExpressApi, [{
    key: 'model',
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
    key: 'getRouter',
    value: function getRouter() {
      return new _express2.default.Router().get('/', this.middlewares.getData).post('/', this.middlewares.submit).post('/validation', this.middlewares.validate);
    }
  }, {
    key: 'getData',
    value: function getData(middlewares) {
      return this._addMidelwares('getData', middlewares);
    }
  }, {
    key: 'submit',
    value: function submit(middlewares) {
      return this._addMidelwares('submit', middlewares);
    }
  }, {
    key: 'validate',
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: '_addMidelwares',
    value: function _addMidelwares(method, middlewares) {
      if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
      }
      this.middlewares[method] = middlewares.concat(this.middlewares[method]);
      return this;
    }

    // Default implementation

  }, {
    key: '_getModel',
    value: function _getModel() {
      throw Error('Model is not defined.');
    }
  }, {
    key: '_result',
    value: function _result(err, data, req, res, next) {
      if (err) {
        next(err);
      } else {
        res.json(data);
      }
    }
  }]);
  return FormExpressApi;
}();

exports.default = FormExpressApi;
module.exports = exports['default'];