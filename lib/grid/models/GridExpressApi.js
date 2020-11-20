"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _utils = require("../../common/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_MAX_FILE_SIZE = 104857600; // 100 MB

/**
 * Form Express API for Grid model interaction
 *
 * @return {GridExpressApi}
 * @constructor
 */

var GridExpressApi =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(GridExpressApi, null, [{
    key: "create",
    value: function create(multipartFormData, maxFileSize) {
      return new GridExpressApi(multipartFormData, maxFileSize);
    }
  }]);

  function GridExpressApi() {
    var _this = this;

    var multipartFormData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var maxFileSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAX_FILE_SIZE;
    (0, _classCallCheck2["default"])(this, GridExpressApi);
    var upload = (0, _multer["default"])({
      limits: {
        fileSize: maxFileSize
      }
    });
    this.middlewares = {
      readGet: [(0, _utils.asyncHandler)(function _callee(req, res, next) {
        var settings;
        return _regenerator["default"].async(function _callee$(_context) {
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
                } else {
                  settings.fields = [];
                }

                if (req.query.extra) {
                  settings.extra = JSON.parse(req.query.extra);
                }

                if (req.query.filters) {
                  settings.filters = JSON.parse(req.query.filters);
                }

                _context.next = 9;
                return _regenerator["default"].awrap(_this._commonReadMiddleware(req, res, next, settings));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        });
      })],
      readPost: [(0, _utils.asyncHandler)(function _callee2(req, res, next) {
        var settings;
        return _regenerator["default"].async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                settings = {};

                if (req.body.limit) {
                  settings.limit = parseInt(req.body.limit);
                }

                if (req.body.offset) {
                  settings.offset = parseInt(req.body.offset);
                }

                if (req.body.sort) {
                  settings.sort = req.body.sort;
                }

                if (req.body.fields) {
                  settings.fields = req.body.fields;
                } else {
                  settings.fields = [];
                }

                if (req.body.extra) {
                  settings.extra = req.body.extra;
                }

                if (req.body.filters) {
                  settings.filters = req.body.filters;
                }

                _context2.next = 9;
                return _regenerator["default"].awrap(_this._commonReadMiddleware(req, res, next, settings));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        });
      })],
      validate: [(0, _utils.asyncHandler)(function _callee3(req, res, next) {
        var model, result, errors;
        return _regenerator["default"].async(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = _this._getModel(req, res);
                result = _this._result('validate');
                _context3.prev = 2;
                _context3.next = 5;
                return _regenerator["default"].awrap(model.isValidRecord(req.body.record, req.body.id));

              case 5:
                errors = _context3.sent;
                result(null, errors, req, res, next);
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                result(_context3.t0, null, req, res, next);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[2, 9]]);
      })],
      getRecord: [(0, _utils.asyncHandler)(function _callee4(req, res, next) {
        var cols, recordId, model, result, response;
        return _regenerator["default"].async(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                cols = req.query.cols ? JSON.parse(req.query.cols) : null;
                recordId = req.params.recordId ? JSON.parse(req.params.recordId) : null;
                model = _this._getModel(req, res);
                result = _this._result('getRecord');
                _context4.prev = 4;
                _context4.next = 7;
                return _regenerator["default"].awrap(model.getRecord(recordId, cols));

              case 7:
                response = _context4.sent;
                result(null, response, req, res, next);
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](4);
                result(_context4.t0, null, req, res, next);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, null, null, [[4, 11]]);
      })],
      update: [].concat((0, _toConsumableArray2["default"])(multipartFormData ? [upload.any()] : []), [(0, _utils.asyncHandler)(function _callee5(req, res, next) {
        var model, result, body, filesByRecordId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, fieldname, buffer, _parseJson, recordId, field, data;

        return _regenerator["default"].async(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                model = _this._getModel(req, res);
                result = _this._result('update');
                body = req.body;

                if (!multipartFormData) {
                  _context5.next = 25;
                  break;
                }

                filesByRecordId = {};
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 8;

                for (_iterator = req.files[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _step$value = _step.value, fieldname = _step$value.fieldname, buffer = _step$value.buffer;
                  _parseJson = (0, _utils.parseJson)(decodeURI(fieldname), 'Incorrect name for field containing file data'), recordId = _parseJson.recordId, field = _parseJson.field;

                  if (!filesByRecordId[recordId]) {
                    filesByRecordId[recordId] = {};
                  }

                  filesByRecordId[recordId][field] = buffer;
                }

                _context5.next = 16;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context5.t0;

              case 16:
                _context5.prev = 16;
                _context5.prev = 17;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 19:
                _context5.prev = 19;

                if (!_didIteratorError) {
                  _context5.next = 22;
                  break;
                }

                throw _iteratorError;

              case 22:
                return _context5.finish(19);

              case 23:
                return _context5.finish(16);

              case 24:
                body = (0, _utils.parseJson)(body.rest, 'Incorrect "rest" json').map(function (_ref) {
                  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                      recordId = _ref2[0],
                      record = _ref2[1];

                  return [recordId, _objectSpread({}, record, {}, filesByRecordId[recordId])];
                });

              case 25:
                if (Array.isArray(body)) {
                  _context5.next = 27;
                  break;
                }

                throw (0, _httpErrors["default"])(422, 'Wrong data type to update');

              case 27:
                _context5.prev = 27;
                _context5.next = 30;
                return _regenerator["default"].awrap(model.update(body));

              case 30:
                data = _context5.sent;
                result(null, data, req, res, next);
                _context5.next = 37;
                break;

              case 34:
                _context5.prev = 34;
                _context5.t1 = _context5["catch"](27);
                result(_context5.t1, null, req, res, next);

              case 37:
              case "end":
                return _context5.stop();
            }
          }
        }, null, null, [[8, 12, 16, 24], [17,, 19, 23], [27, 34]]);
      })]),
      create: [].concat((0, _toConsumableArray2["default"])(multipartFormData ? [upload.any()] : []), [(0, _utils.asyncHandler)(function _callee6(req, res, next) {
        var model, result, body, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, fieldname, buffer, data;

        return _regenerator["default"].async(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                model = _this._getModel(req, res);
                result = _this._result('create');
                body = req.body;

                if (!multipartFormData) {
                  _context6.next = 24;
                  break;
                }

                body = (0, _utils.parseJson)(body.rest);
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context6.prev = 8;

                for (_iterator2 = req.files[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _step2$value = _step2.value, fieldname = _step2$value.fieldname, buffer = _step2$value.buffer;
                  body[JSON.parse(decodeURI(fieldname))] = buffer;
                }

                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](8);
                _didIteratorError2 = true;
                _iteratorError2 = _context6.t0;

              case 16:
                _context6.prev = 16;
                _context6.prev = 17;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 19:
                _context6.prev = 19;

                if (!_didIteratorError2) {
                  _context6.next = 22;
                  break;
                }

                throw _iteratorError2;

              case 22:
                return _context6.finish(19);

              case 23:
                return _context6.finish(16);

              case 24:
                _context6.prev = 24;
                _context6.next = 27;
                return _regenerator["default"].awrap(model.create(body));

              case 27:
                data = _context6.sent;
                result(null, data, req, res, next);
                _context6.next = 34;
                break;

              case 31:
                _context6.prev = 31;
                _context6.t1 = _context6["catch"](24);
                result(_context6.t1, null, req, res, next);

              case 34:
              case "end":
                return _context6.stop();
            }
          }
        }, null, null, [[8, 12, 16, 24], [17,, 19, 23], [24, 31]]);
      })])
    };
  }
  /**
   * Specify Grid model
   *
   * @param   {Function|AbstractGridModel}  model   Grid model
   * @return  {GridExpressApi}
   */


  (0, _createClass2["default"])(GridExpressApi, [{
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
      var _this2 = this;

      return new _express["default"].Router().get('/', this.middlewares.readGet).post('/read', this.middlewares.readPost).post('/validation', this.middlewares.validate).get('/:recordId', this.middlewares.getRecord).put('/', this.middlewares.update).post('/', this.middlewares.create).use(function (err, req, res, next) {
        _this2._result()(err, null, req, res, next);
      });
    }
  }, {
    key: "read",
    value: function read(middlewares) {
      this._addMidelwares('readGet', middlewares);

      this._addMidelwares('readPost', middlewares);

      return this;
    }
  }, {
    key: "validate",
    value: function validate(middlewares) {
      return this._addMidelwares('validate', middlewares);
    }
  }, {
    key: "getRecord",
    value: function getRecord(middlewares) {
      return this._addMidelwares('getRecord', middlewares);
    }
  }, {
    key: "update",
    value: function update(middlewares) {
      return this._addMidelwares('update', middlewares);
    }
  }, {
    key: "create",
    value: function create(middlewares) {
      return this._addMidelwares('create', middlewares);
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
    value: function _result(method) {
      if (method === 'update') {
        return function (err, data, req, res, next) {
          if (err) {
            return send(err, null, req, res, next);
          }

          data = data.reduce(function (result, record) {
            if (!record) {
              return result;
            }

            if (record[1] instanceof Error) {
              result.errors.push(record);
            } else if (record[1] instanceof _ValidationErrors["default"]) {
              result.validation.push(record);
            } else {
              result.changes.push(record);
            }

            return result;
          }, {
            changes: [],
            errors: [],
            validation: []
          });
          send(null, data, req, res, next);
        };
      }

      if (method === 'create') {
        return function (err, data, req, res, next) {
          if (err) {
            if (!(err instanceof _ValidationErrors["default"])) {
              return send(err, null, req, res, next);
            }

            return send(null, {
              data: null,
              error: err
            }, req, res, next);
          }

          return send(null, {
            data: data,
            error: null
          }, req, res, next);
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
  }, {
    key: "_commonReadMiddleware",
    value: function _commonReadMiddleware(req, res, next, settings) {
      var model, result, response;
      return _regenerator["default"].async(function _commonReadMiddleware$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              model = this._getModel(req, res);
              result = this._result('read');
              _context7.prev = 2;
              _context7.next = 5;
              return _regenerator["default"].awrap(model.read(settings));

            case 5:
              response = _context7.sent;
              result(null, response, req, res, next);
              _context7.next = 12;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](2);
              result(_context7.t0, null, req, res, next);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }]);
  return GridExpressApi;
}();

var _default = GridExpressApi;
exports["default"] = _default;
module.exports = exports.default;