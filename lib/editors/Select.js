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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../common/utils");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SelectEditor = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SelectEditor, _React$Component);

  var _super = _createSuper(SelectEditor);

  function SelectEditor(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SelectEditor);
    _this = _super.call(this, props);
    _this.state = {
      options: props.options,
      loading: Boolean(props.model)
    };
    return _this;
  }

  (0, _createClass2["default"])(SelectEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) {
        this.props.model.read('').then(function (data) {
          data.unshift([null, '']);

          _this2.setState({
            options: data,
            loading: false
          });
        })["catch"](function (err) {
          console.error(err);
        });
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.props.model ? this.state.options : this.props.options;
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var option = this.getOptions()[e.target.value];

      if (!(option instanceof Array)) {
        option = [option, option];
      }

      this.props.onChange(option[0]);

      if (this.props.onLabelChange) {
        this.props.onLabelChange(option[1]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.getOptions();
      var valueIndex = (0, _utils.findIndex)(options, function (option) {
        return (0, _utils.isEqual)(option instanceof Array ? option[0] : option, _this3.props.value);
      });
      return /*#__PURE__*/_react["default"].createElement("select", (0, _extends2["default"])({}, (0, _utils.omit)(this.props, ['value', 'options']), {
        value: valueIndex,
        onChange: this.handleChange.bind(this),
        disabled: this.props.disabled || this.state.loading
      }), options.map(function (item, index) {
        var optionProps = item instanceof Array && item[2] instanceof Object ? item[2] : {};
        return /*#__PURE__*/_react["default"].createElement("option", (0, _extends2["default"])({
          key: index,
          value: index
        }, optionProps), item instanceof Array ? item[1] : item);
      }));
    }
  }]);
  return SelectEditor;
}(_react["default"].Component);

(0, _defineProperty2["default"])(SelectEditor, "propTypes", {
  options: _propTypes["default"].array,
  // shape: [[value, label, props], ...] or [label1, label2, ...]
  //                           `props` will be passed to each corresponding <option />
  model: _propTypes["default"].shape({
    read: _propTypes["default"].func
  }),
  disabled: _propTypes["default"].bool,
  onChange: _propTypes["default"].func.isRequired,
  onLabelChange: _propTypes["default"].func,
  value: _propTypes["default"].any
});
(0, _defineProperty2["default"])(SelectEditor, "defaultProps", {
  options: []
});
var _default = SelectEditor;
exports["default"] = _default;
module.exports = exports.default;