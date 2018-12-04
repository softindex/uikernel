"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _float = _interopRequireDefault(require("../common/validation/rules/float"));

var _utils = _interopRequireDefault(require("../common/utils"));

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var isInvalidFloat = (0, _float.default)(null, null, true);

var NumberEditor =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(NumberEditor, _React$Component);

  function NumberEditor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, NumberEditor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NumberEditor).call(this, props));
    _this.state = {
      value: props.value
    };
    return _this;
  }

  (0, _createClass2.default)(NumberEditor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!_utils.default.isEqual(this.state.value, nextProps.value)) {
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

      return _react.default.createElement("input", (0, _extends2.default)({
        step: "any"
      }, _utils.default.omit(this.props, 'value'), {
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
}(_react.default.Component);

(0, _defineProperty2.default)(NumberEditor, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.number, // String should be allowed, because when we start typing negative number,
  // there is appearing a warning in console after '-' symbol
  _propTypes.default.string])
});
var _default = NumberEditor;
exports.default = _default;
module.exports = exports.default;