/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var React = require('react');
var utils = require('../common/utils');

var DatePickerEditor = React.createClass({
  getDefaultProps: function () {
    return {
      textFormat: 'yyyy-mm-dd'
    };
  },
  getInitialState: function () {
    return {
      format: this.props.format ? this.getFormat(this.props.format) : null,
      textFormat: this.getFormat(this.props.textFormat)
    };
  },
  componentDidMount: function () {
    var $element = $(this.refs.input.getDOMNode())
      .datepicker({
        minDate: this.props.min ? new Date(this.props.min) : null,
        maxDate: this.props.max ? new Date(this.props.max) : null,
        dateFormat: this.state.textFormat,
        onSelect: this.setDate,
        onClose: this.props.onBlur
      });

    // Remove jQueryUI DatePicker key commands
    $.datepicker._doKeyDown = function () { };

    if (this.props.value) {
      $element.val($.datepicker.formatDate(this.state.textFormat, new Date(this.props.value)));
    }

    if (this.props.show) {
      $element.datepicker('show');
    }
  },
  componentWillReceiveProps: function (props) {
    var $datePicker = $(this.refs.input.getDOMNode());
    if (props.min !== this.props.min) {
      $datePicker.datepicker('option', 'minDate', props.min ? new Date(props.min) : null);
    }
    if (props.max !== this.props.max) {
      $datePicker.datepicker('option', 'maxDate', props.max ? new Date(props.max) : null);
    }
    if (props.textFormat !== this.props.textFormat) {
      this.state.textFormat = props.textFormat;
      $datePicker.datepicker('option', 'dateFormat', this.getFormat(props.textFormat));
    }
    if (props.value !== this.props.value) {
      var text = '';
      if (props.value) {
        text = $.datepicker.formatDate(this.state.textFormat, new Date(props.value));
      }
      this.refs.input.getDOMNode().value = text;
    }
  },

  /**
   * Save date changes
   */
  setDate: function () {
    var inputElement = this.refs.input.getDOMNode();
    var value = inputElement.value;
    var date;

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
      this.props.onChange(
        $.datepicker.formatDate(this.state.format, date)
      );
    } else {
      this.props.onChange(date);
    }
  },

  focus: function () {
    this.refs.input.getDOMNode().focus();
  },

  /**
   * Change usual date format to jQuery UI one
   *
   * @param   {string}    format      DateFormat
   * @returns {string}    jQuery  UI DateFormat
   */
  getFormat: function (format) {
    return format.replace('yyyy', 'yy');
  },

  render: function () {
    return (
      <input
        {...utils.omit(this.props, 'value')}
        ref="input"
        type="text"
        onChange={this.setDate}
      />
    );
  }
});

module.exports = DatePickerEditor;
