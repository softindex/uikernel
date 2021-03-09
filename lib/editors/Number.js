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

var _float = _interopRequireDefault(require("../common/validation/rules/float"));

var _utils = require("../common/utils");

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var isInvalidFloat = (0, _float["default"])(null, null, true);

var NumberEditor = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(NumberEditor, _React$Component);

  var _super = _createSuper(NumberEditor);

  function NumberEditor(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, NumberEditor);
    _this = _super.call(this, props);
    _this.state = {
      value: props.value
    };
    return _this;
  }

  (0, _createClass2["default"])(NumberEditor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _utils.isEqual)(this.state.value, nextProps.value)) {
        (0, _reactDom.findDOMNode)(this.input).value = this.state.value = nextProps.value;
      }
    }
  }, {
    key: "_onChangeHandler",
    value: function _onChangeHandler(e) {
      var target = e.target;
      var valueAsNumber = parseFloat(target.value); // Edge doesn't support "target.valueAsNumber"

      if (target.value === '' && target.validity.valid) {
        // Invalid number set empty string and valid=false to event
        this.state.value = null;
      } else if (isInvalidFloat(valueAsNumber)) {
        this.state.value = '';
      } else {
        this.state.value = valueAsNumber;
      }

      this.props.onChange(this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        step: "any"
      }, (0, _utils.omit)(this.props, 'value'), {
        type: "number",
        ref: function ref(input) {
          return _this2.input = input;
        },
        onChange: this._onChangeHandler.bind(this),
        defaultValue: this.props.value
      }));
    }
  }]);
  return NumberEditor;
}(_react["default"].Component);

(0, _defineProperty2["default"])(NumberEditor, "propTypes", {
  onChange: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].oneOfType([_propTypes["default"].number, // String should be allowed, because when we start typing negative number,
  // there is appearing a warning in console after '-' symbol
  _propTypes["default"].string])
});
var _default = NumberEditor;
exports["default"] = _default;
module.exports = exports.default;