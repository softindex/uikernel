"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../common/utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DatePickerEditor = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DatePickerEditor, _React$Component);

  var _super = _createSuper(DatePickerEditor);

  function DatePickerEditor() {
    (0, _classCallCheck2["default"])(this, DatePickerEditor);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DatePickerEditor, [{
    key: "onChange",
    value: function onChange(date) {
      if (date) {
        date = (0, _format["default"])(date, this.props.format);
      }

      this.props.onChange(date);
    }
  }, {
    key: "render",
    value: function render() {
      var otherProps = (0, _utils.omit)(this.props, ['textFormat', 'value', 'onChange', 'min', 'max', 'onBlur']);
      return /*#__PURE__*/_react["default"].createElement(_reactDatepicker["default"], (0, _extends2["default"])({}, otherProps, {
        dateFormat: this.props.textFormat,
        selected: this.props.value && new Date(this.props.value),
        onChange: this.onChange.bind(this),
        minDate: this.props.min && new Date(this.props.min),
        maxDate: this.props.max && new Date(this.props.max),
        startDate: this.props.startDate && new Date(this.props.startDate),
        endDate: this.props.endDate && new Date(this.props.endDate),
        onCalendarClose: this.props.onBlur
      }));
    }
  }]);
  return DatePickerEditor;
}(_react["default"].Component);

(0, _defineProperty2["default"])(DatePickerEditor, "propTypes", {
  format: _propTypes["default"].string,
  textFormat: _propTypes["default"].string,
  todayButton: _propTypes["default"].string,
  min: _propTypes["default"].any,
  max: _propTypes["default"].any,
  startDate: _propTypes["default"].any,
  endDate: _propTypes["default"].any,
  value: _propTypes["default"].any,
  show: _propTypes["default"].bool,
  onBlur: _propTypes["default"].func,
  onChange: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(DatePickerEditor, "defaultProps", {
  textFormat: 'yyyy-MM-dd',
  todayButton: 'Today'
});
var _default = DatePickerEditor;
exports["default"] = _default;
module.exports = exports.default;