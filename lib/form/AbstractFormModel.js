"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _Events = _interopRequireDefault(require("../common/Events"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AbstractFormModel = /*#__PURE__*/function (_EventsModel) {
  (0, _inherits2["default"])(AbstractFormModel, _EventsModel);

  var _super = _createSuper(AbstractFormModel);

  /**
   * Abstract form model
   *
   * @constructor
   */
  function AbstractFormModel() {
    (0, _classCallCheck2["default"])(this, AbstractFormModel);
    return _super.call(this);
  }
  /**
   * Get data
   *
   * @param {Array} fields     Required fields
   * @returns {Object}  Promise
   * @abstract
   */


  (0, _createClass2["default"])(AbstractFormModel, [{
    key: "getData",
    value: function getData()
    /*fields*/
    {
      return Promise.resolve({});
    }
    /**
     * Process form data
     *
     * @param   {Object}      changes     Form data
     * @returns {Object}  Promise
     * @abstract
     */

  }, {
    key: "submit",
    value: function submit()
    /*changes*/
    {
      return Promise.resolve();
    }
    /**
     * Record validity check
     *
     * @param {Object}      record  Record object
     * @returns {Object}  Promise
     * @abstract
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord()
    /*record*/
    {
      return Promise.resolve(new _ValidationErrors["default"]());
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields  Fields list
     * @returns {Array}  Dependencies
     * @abstract
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency()
    /*fields*/
    {
      return [];
    }
  }]);
  return AbstractFormModel;
}(_Events["default"]);

var _default = AbstractFormModel;
exports["default"] = _default;
module.exports = exports.default;