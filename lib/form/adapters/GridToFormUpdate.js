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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _Events2 = _interopRequireDefault(require("../../common/Events"));

var _utils = require("../../common/utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GridToFormUpdate = /*#__PURE__*/function (_Events) {
  (0, _inherits2["default"])(GridToFormUpdate, _Events);

  var _super = _createSuper(GridToFormUpdate);

  /**
   * Adapter that allows us to use Grid model record as a form model
   *
   * @param {AbstractGridModel} model   Grid model
   * @param {number|string}     id      Record ID
   * @constructor
   */
  function GridToFormUpdate(model, id) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridToFormUpdate);
    _this = _super.call(this);
    _this._adapter = {
      model: model,
      id: id
    };
    _this._onUpdateHandlers = [];
    return _this;
  }
  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  (0, _createClass2["default"])(GridToFormUpdate, [{
    key: "on",
    value: function on(event, cb) {
      var ctx = this;

      if (event !== 'update') {
        _Events2["default"].prototype.on.call(this, event, cb);

        return;
      } // onChange filters out table events, that do not regard to our record


      function onChange(changes) {
        for (var i = 0; i < changes.length; i++) {
          if ((0, _utils.isEqual)(changes[i][0], ctx._adapter.id)) {
            cb(changes[i][1]);
            return;
          }
        }
      }

      this._onUpdateHandlers.push({
        originalCallback: cb,
        wrappedCallback: onChange
      });

      this._adapter.model.on('update', onChange);
    }
    /**
     * Unsubscribe from inner model event
     *
     * @param {string}      event   Event ID
     * @param {Function}    cb      CallBack function
     */

  }, {
    key: "off",
    value: function off(event, cb) {
      var ctx = this;
      var newOnUpdateHandlers = [];

      if (event !== 'update') {
        _Events2["default"].prototype.off.call(this, event, cb);

        return;
      }

      this._onUpdateHandlers.forEach(function (handler) {
        if (handler.originalCallback === cb) {
          ctx._adapter.model.off('update', handler.wrappedCallback);
        } else {
          newOnUpdateHandlers.push(handler);
        }
      });

      this._onUpdateHandlers = newOnUpdateHandlers;
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(event) {
      return this._adapter.model.listenerCount(event);
    }
    /**
     * Get data
     *
     * @param {Array}     fields     Required fields
     */

  }, {
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fields) {
        var model;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                model = this._adapter.model;
                _context.next = 3;
                return model.getRecord(this._adapter.id, fields);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
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
    /**
     * Apply changes
     *
     * @param   {Object}      changes     Form data
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(changes) {
        var record, model, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                record = (0, _utils.clone)(changes);
                model = this._adapter.model;
                _context2.next = 4;
                return model.update([[this._adapter.id, record]]);

              case 4:
                result = _context2.sent;
                result = result[0][1];

                if (!(result instanceof Error || result instanceof _ValidationErrors["default"])) {
                  _context2.next = 8;
                  break;
                }

                throw result;

              case 8:
                return _context2.abrupt("return", result);

              case 9:
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
     * Record validity check
     *
     * @param {Object}      record  Record object
     */

  }, {
    key: "isValidRecord",
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(record) {
        var model;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                model = this._adapter.model;
                _context3.next = 3;
                return model.isValidRecord(record, this._adapter.id);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isValidRecord(_x3) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
    }()
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields  Fields list
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);
  return GridToFormUpdate;
}(_Events2["default"]);

var _default = GridToFormUpdate;
exports["default"] = _default;
module.exports = exports.default;