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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../common/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerEditor = function (_React$Component) {
  (0, _inherits3.default)(DatePickerEditor, _React$Component);

  function DatePickerEditor() {
    (0, _classCallCheck3.default)(this, DatePickerEditor);
    return (0, _possibleConstructorReturn3.default)(this, (DatePickerEditor.__proto__ || (0, _getPrototypeOf2.default)(DatePickerEditor)).apply(this, arguments));
  }

  (0, _createClass3.default)(DatePickerEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.picker.setOpen(this.props.show);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.refs.picker.setOpen(this.props.show);
    }
  }, {
    key: 'onChange',
    value: function onChange(date) {
      this.props.onChange(date.format(this.props.format));
    }
  }, {
    key: 'render',
    value: function render() {
      var otherProps = (0, _utils.omit)(this.props, ['textFormat', 'value', 'onChange', 'min', 'max']);
      return _react2.default.createElement(_reactDatepicker2.default, (0, _extends3.default)({
        ref: 'picker'
      }, otherProps, {
        dateFormat: this.props.textFormat,
        selected: this.props.value && (0, _moment2.default)(this.props.value),
        onChange: this.onChange.bind(this),
        minDate: this.props.min && (0, _moment2.default)(this.props.min),
        maxDate: this.props.max && (0, _moment2.default)(this.props.max),
        todayButton: 'Today'
      }));
    }
  }]);
  return DatePickerEditor;
}(_react2.default.Component); /**
                               * Copyright (с) 2015-present, SoftIndex LLC.
                               * All rights reserved.
                               *
                               * This source code is licensed under the BSD-style license found in the
                               * LICENSE file in the root directory of this source tree.
                               */

DatePickerEditor.propTypes = {
  format: _propTypes2.default.string,
  textFormat: _propTypes2.default.string,
  min: _propTypes2.default.any,
  max: _propTypes2.default.any,
  value: _propTypes2.default.any,
  show: _propTypes2.default.bool,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func.isRequired
};
DatePickerEditor.defaultProps = {
  textFormat: 'YYYY-MM-DD'
};
exports.default = DatePickerEditor;
module.exports = exports['default'];