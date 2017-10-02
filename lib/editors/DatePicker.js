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

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerEditor = function (_React$Component) {
  (0, _inherits3.default)(DatePickerEditor, _React$Component);

  function DatePickerEditor(props) {
    (0, _classCallCheck3.default)(this, DatePickerEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePickerEditor.__proto__ || (0, _getPrototypeOf2.default)(DatePickerEditor)).call(this, props));

    _this.state = {
      format: props.format ? _this.getFormat(props.format) : null,
      textFormat: _this.getFormat(props.textFormat)
    };
    _this.setDate = _this.setDate.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DatePickerEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var $element = $((0, _reactDom.findDOMNode)(this.refs.input)).datepicker({
        minDate: this.props.min ? _utils2.default.toDate(this.props.min) : null,
        maxDate: this.props.max ? _utils2.default.toDate(this.props.max) : null,
        dateFormat: this.state.textFormat,
        onSelect: this.setDate,
        onClose: this.props.onBlur
      });

      // Remove jQueryUI DatePicker key commands
      $.datepicker._doKeyDown = function () {};

      if (this.props.value) {
        $element.val($.datepicker.formatDate(this.state.textFormat, _utils2.default.toDate(this.props.value)));
      }

      if (this.props.show) {
        $element.datepicker('show');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var $datePicker = $((0, _reactDom.findDOMNode)(this.refs.input));
      if (props.min !== this.props.min) {
        $datePicker.datepicker('option', 'minDate', props.min ? _utils2.default.toDate(props.min) : null);
      }
      if (props.max !== this.props.max) {
        $datePicker.datepicker('option', 'maxDate', props.max ? _utils2.default.toDate(props.max) : null);
      }
      if (props.textFormat !== this.props.textFormat) {
        this.state.textFormat = props.textFormat;
        $datePicker.datepicker('option', 'dateFormat', this.getFormat(props.textFormat));
      }
      if (props.value !== this.props.value) {
        var text = '';
        if (props.value) {
          text = $.datepicker.formatDate(this.state.textFormat, _utils2.default.toDate(props.value));
        }
        (0, _reactDom.findDOMNode)(this.refs.input).value = text;
      }
    }

    /**
     * Save date changes
     */

  }, {
    key: 'setDate',
    value: function setDate() {
      var inputElement = (0, _reactDom.findDOMNode)(this.refs.input);
      var value = inputElement.value;
      var date = void 0;

      // Try to parse input text
      try {
        date = $.datepicker.parseDate(this.state.textFormat, value);
      } catch (e) {
        this.props.onChange(null);
        inputElement.value = value;
        return;
      }

      // Make an inverse convert for parse check
      // (removes partial dates parse bug)
      if ($.datepicker.formatDate(this.state.textFormat, date) !== value) {
        return this.props.onChange(null);
      }

      if (this.state.format) {
        this.props.onChange($.datepicker.formatDate(this.state.format, date));
      } else {
        this.props.onChange(date);
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      (0, _reactDom.findDOMNode)(this.refs.input).focus();
    }

    /**
     * Change usual date format to jQuery UI one
     *
     * @param   {string}    format      DateFormat
     * @returns {string}    jQuery  UI DateFormat
     */

  }, {
    key: 'getFormat',
    value: function getFormat(format) {
      return format.replace('yyyy', 'yy');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', (0, _extends3.default)({}, _utils2.default.omit(this.props, ['value', 'onBlur']), {
        ref: 'input',
        type: 'text',
        onChange: this.setDate
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
  format: _react2.default.PropTypes.string,
  textFormat: _react2.default.PropTypes.string,
  min: _react2.default.PropTypes.any,
  max: _react2.default.PropTypes.any,
  value: _react2.default.PropTypes.any,
  show: _react2.default.PropTypes.bool,
  onBlur: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func.isRequired
};
DatePickerEditor.defaultProps = {
  textFormat: 'yyyy-mm-dd'
};
exports.default = DatePickerEditor;
module.exports = exports['default'];