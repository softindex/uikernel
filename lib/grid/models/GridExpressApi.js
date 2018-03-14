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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _utils = require('../../common/utils');

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var GridExpressApi = function () {
  (0, _createClass3.default)(GridExpressApi, null, [{
    key: 'create',
    value: function create() {
      return new GridExpressApi();
    }
  }]);

  function GridExpressApi() {
    var _this = this;

    (0, _classCallCheck3.default)(this, GridExpressApi);

    this.middlewares = {
      read: [(0, _utils.asyncHandler)(function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
          var settings, model, result, response;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  settings = {};

                  if (req.query.limit) {
                    settings.limit = parseInt(req.query.limit);
                  }
                  if (req.query.offset) {
                    settings.offset = parseInt(req.query.offset);
                  }
                  if (req.query.sort) {
                    settings.sort = JSON.parse(req.query.sort);
                  }
                  if (req.query.fields) {
                    settings.fields = JSON.parse(req.query.fields);
                  }
                  if (req.query.extra) {
                    settings.extra = JSON.parse(req.query.extra);
                  }
                  if (req.query.filters) {
                    settings.filters = JSON.parse(req.query.filters);
                  }
                  model = _this._getModel(req, res);
                  result = _this._result('read');
                  _context.prev = 9;
                  _context.next = 12;
                  return (0, _toPromise2.default)(model.read.bind(model))(settings);

                case 12:
                  response = _context.sent;

                  result(null, response, req, res, next);
                  _context.next = 19;
                  break;

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context['catch'](9);

                  result(_context.t0, null, req, res, next);

                case 19:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[9, 16]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }())],
      validate: [(0, _utils.asyncHandler)(function () {
        var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
          var model, result, errors;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('validate');
                  _context2.prev = 2;
                  _context2.next = 5;
                  return (0, _toPromise2.default)(model.isValidRecord.bind(model))(req.body);

                case 5:
                  errors = _context2.sent;

                  result(null, errors, req, res, next);
                  _context2.next = 12;
                  break;

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2['catch'](2);

                  result(_context2.t0, null, req, res, next);

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this, [[2, 9]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }())],
      getRecord: [(0, _utils.asyncHandler)(function () {
        var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
          var cols, recordId, model, result, response;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  cols = req.query.cols ? JSON.parse(req.query.cols) : null;
                  recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
                  model = _this._getModel(req, res);
                  result = _this._result('getRecord');
                  _context3.prev = 4;
                  _context3.next = 7;
                  return (0, _toPromise2.default)(model.getRecord.bind(model))(recordId, cols);

                case 7:
                  response = _context3.sent;

                  result(null, response, req, res, next);
                  _context3.next = 14;
                  break;

                case 11:
                  _context3.prev = 11;
                  _context3.t0 = _context3['catch'](4);

                  result(_context3.t0, null, req, res, next);

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this, [[4, 11]]);
        }));

        return function (_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }())],
      update: [(0, _utils.asyncHandler)(function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
          var model, result, data;
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('update');
                  _context4.prev = 2;
                  _context4.next = 5;
                  return (0, _toPromise2.default)(model.update.bind(model))(req.body);

                case 5:
                  data = _context4.sent;

                  result(null, data, req, res, next);
                  _context4.next = 12;
                  break;

                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4['catch'](2);

                  result(_context4.t0, null, req, res, next);

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this, [[2, 9]]);
        }));

        return function (_x10, _x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }())],
      create: [(0, _utils.asyncHandler)(function () {
        var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
          var model, result, data;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  model = _this._getModel(req, res);
                  result = _this._result('create');
                  _context5.prev = 2;
                  _context5.next = 5;
                  return (0, _toPromise2.default)(model.create.bind(model))(req.body);

                case 5:
                  data = _context5.sent;

                  result(null, data, req, res, next);
                  _context5.next = 12;
                  break;

                case 9:
                  _context5.prev = 9;
                  _context5.t0 = _context5['catch'](2);

                  result(_context5.t0, null, req, res, next);

                case 12:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this, [[2, 9]]);
        }));

        return function (_x13, _x14, _x15) {
          return _ref5.apply(this, arguments);
        };
      }())]
    };
  }

  /**
   * Specify Grid model
   *
   * @param   {Function|AbstractGridModel}  model   Grid model
   * @return  {GridExpressApi}
   */


  (0, _createClass3.default)(GridExpressApi, [{
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
      var _this2 = this;

      return new _express2.default.Router().get('/', this.middlewares.read).post('/validation', this.middlewares.validate).get('/:recordId', this.middlewares.getRecord).put('/', this.middlewares.update).post('/', this.middlewares.create).use(function (err, req, res, next) {
        _this2._result()(err, null, req, res, next);
      });
    }
  }, {
    key: 'read',
    value: function read(middlewares) {
      return this._addMidelwares('read', middlewares);
    }
  }, {
    key: 'validate',
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: 'getRecord',
    value: function getRecord(middlewares) {
      return this._addMidelwares('getRecord', middlewares);
    }
  }, {
    key: 'update',
    value: function update(middlewares) {
      return this._addMidelwares('update', middlewares);
    }
  }, {
    key: 'create',
    value: function create(middlewares) {
      return this._addMidelwares('create', middlewares);
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
    value: function _result(method) {
      if (method === 'update') {
        return function (err, data, req, res, next) {
          if (err) {
            return send(err, null, req, res, next);
          }

          data = data.reduce(function (result, record) {
            if (record[1] instanceof _ValidationErrors2.default || record[1] instanceof Error) {
              result.errors.push(record);
            } else {
              result.changes.push(record);
            }
            return result;
          }, { changes: [], errors: [] });

          send(null, data, req, res, next);
        };
      }

      if (method === 'create') {
        return function (err, data, req, res, next) {
          if (err) {
            if (!(err instanceof _ValidationErrors2.default)) {
              return send(err, null, req, res, next);
            }
            return send(null, { data: null, error: err }, req, res, next);
          }
          return send(null, { data: data, error: null }, req, res, next);
        };
      }

      return send;

      function send(err, data, req, res, next) {
        if (err) {
          next(err);
        } else {
          res.json(data);
        }
      }
    }
  }]);
  return GridExpressApi;
}();

exports.default = GridExpressApi;
module.exports = exports['default'];