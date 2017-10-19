/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _float = require('../common/validation/rules/float');

var _float2 = _interopRequireDefault(_float);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var isInvalidFloat = (0, _float2.default)(null, null, true);

var NumberEditor = function (_React$Component) {
  (0, _inherits3.default)(NumberEditor, _React$Component);

  function NumberEditor(props) {
    (0, _classCallCheck3.default)(this, NumberEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberEditor.__proto__ || (0, _getPrototypeOf2.default)(NumberEditor)).call(this, props));

    _this.state = {
      value: props.value
    };
    return _this;
  }

  (0, _createClass3.default)(NumberEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!_utils2.default.isEqual(this.state.value, nextProps.value)) {
        (0, _reactDom.findDOMNode)(this.refs.input).value = this.state.value = nextProps.value;
      }
    }
  }, {
    key: '_onChangeHandler',
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
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', (0, _extends3.default)({
        step: 'any'
      }, _utils2.default.omit(this.props, 'value'), {
        type: 'number',
        ref: 'input',
        onChange: this._onChangeHandler.bind(this),
        defaultValue: this.props.value
      }));
    }
  }]);
  return NumberEditor;
}(_react2.default.Component);

NumberEditor.propTypes = {
  onChange: _react2.default.PropTypes.func.isRequired,
  value: _react2.default.PropTypes.number
};
exports.default = NumberEditor;
module.exports = exports['default'];