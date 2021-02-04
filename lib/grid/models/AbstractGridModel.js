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

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _Events = _interopRequireDefault(require("../../common/Events"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Grid model abstraction
 *
 * @constructor
 * @extends EventsModel
 */
var AbstractGridModel = /*#__PURE__*/function (_EventsModel) {
  (0, _inherits2["default"])(AbstractGridModel, _EventsModel);

  var _super = _createSuper(AbstractGridModel);

  function AbstractGridModel() {
    (0, _classCallCheck2["default"])(this, AbstractGridModel);
    return _super.call(this);
  }
  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   * @abstract
   */


  (0, _createClass2["default"])(AbstractGridModel, [{
    key: "create",
    value: function create()
    /*record*/
    {
      return Promise.resolve();
    }
    /**
     * Get records list
     *
     * @param {Object}      settings                Request
     * @param {Array}       settings.fields         Fields
     * @param {number}      [settings.limit]        Limit
     * @param {number}      [settings.offset]       Offset
     * @param {Object}      [settings.filters]      Filter values object
     * @param {Array}       [settings.sort]         Sort parameters
     * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
     * @abstract
     */

  }, {
    key: "read",
    value: function read()
    /*settings*/
    {
      return Promise.resolve({
        records: [],
        // Primary records
        ids: [],
        // Extra records
        extraRecords: 0 // In all records count

      });
    }
    /**
     * Get the particular record
     *
     * @param {*}         id      Record ID
     * @param {Array}     fields  Required fields
     * @abstract
     */

  }, {
    key: "getRecord",
    value: function getRecord()
    /*id, fields*/
    {
      return Promise.resolve();
    }
    /**
     * Apply record changes
     *
     * @param {Array}       changes     Changes array
     * @abstract
     */

  }, {
    key: "update",
    value: function update()
    /*changes*/
    {
      return Promise.resolve([]);
    }
    /**
     * Validation check
     *
     * @param {Object}      record
     * @param {*|null}      recordId
     * @abstract
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord()
    /*record, recordId*/
    {
      return Promise.resolve(new _ValidationErrors["default"]());
    }
    /**
     * Get all dependent fields, that are required for validation
     *
     * @param   {Array}  fields   Fields list
     * @returns {Array}  Dependencies
     * @abstract
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency() {
      return [];
    }
  }]);
  return AbstractGridModel;
}(_Events["default"]);

var _default = AbstractGridModel;
exports["default"] = _default;
module.exports = exports.default;