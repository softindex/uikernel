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

var _Events2 = _interopRequireDefault(require("../../common/Events"));

var _utils = require("../../common/utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GridToFormCreate = /*#__PURE__*/function (_Events) {
  (0, _inherits2["default"])(GridToFormCreate, _Events);

  var _super = _createSuper(GridToFormCreate);

  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  function GridToFormCreate(model, initialData) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridToFormCreate);
    _this = _super.call(this);
    _this._adapter = {
      model: model,
      initialData: initialData || {}
    };
    return _this;
  }
  /**
   * Get data
   *
   * @param {Array}     fields     Required fields
   */


  (0, _createClass2["default"])(GridToFormCreate, [{
    key: "getData",
    value: function () {
      var _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fields) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(fields && fields.length)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", (0, _utils.pick)(this._adapter.initialData, fields));

              case 2:
                return _context.abrupt("return", this._adapter.initialData);

              case 3:
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
     * Create new record
     *
     * @param   {Object}      data      Record
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var model;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                model = this._adapter.model;
                _context2.next = 3;
                return model.create(data);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
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
     * Validation checking
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
                return model.isValidRecord(record, null);

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
     * @param   {Array}  fields
     * @returns {Array}  Dependencies
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      return this._adapter.model.getValidationDependency(fields);
    }
  }]);
  return GridToFormCreate;
}(_Events2["default"]);

var _default = GridToFormCreate;
exports["default"] = _default;
module.exports = exports.default;