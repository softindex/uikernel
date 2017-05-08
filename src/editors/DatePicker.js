/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';

class DatePickerEditor extends React.Component {
  static propTypes = {
    format: React.PropTypes.string,
    textFormat: React.PropTypes.string,
    min: React.PropTypes.any,
    max: React.PropTypes.any,
    value: React.PropTypes.any,
    show: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired
  };

  static defaultProps ={
    textFormat: 'yyyy-mm-dd'
  };

  constructor(props) {
    super(props);
    this.state = {
      format: props.format ? this.getFormat(props.format) : null,
      textFormat: this.getFormat(props.textFormat)
    };
    this.setDate = this::this.setDate;
  }

  componentDidMount() {
    const $element = $(findDOMNode(this.refs.input))
      .datepicker({
        minDate: this.props.min ? utils.toDate(this.props.min) : null,
        maxDate: this.props.max ? utils.toDate(this.props.max) : null,
        dateFormat: this.state.textFormat,
        onSelect: this.setDate,
        onClose: this.props.onBlur
      });

    // Remove jQueryUI DatePicker key commands
    $.datepicker._doKeyDown = () => {
    };

    if (this.props.value) {
      $element.val($.datepicker.formatDate(this.state.textFormat, utils.toDate(this.props.value)));
    }

    if (this.props.show) {
      $element.datepicker('show');
    }
  }

  componentWillReceiveProps(props) {
    const $datePicker = $(findDOMNode(this.refs.input));
    if (props.min !== this.props.min) {
      $datePicker.datepicker('option', 'minDate', props.min ? utils.toDate(props.min) : null);
    }
    if (props.max !== this.props.max) {
      $datePicker.datepicker('option', 'maxDate', props.max ? utils.toDate(props.max) : null);
    }
    if (props.textFormat !== this.props.textFormat) {
      this.state.textFormat = props.textFormat;
      $datePicker.datepicker('option', 'dateFormat', this.getFormat(props.textFormat));
    }
    if (props.value !== this.props.value) {
      let text = '';
      if (props.value) {
        text = $.datepicker.formatDate(this.state.textFormat, utils.toDate(props.value));
      }
      findDOMNode(this.refs.input).value = text;
    }
  }

  /**
   * Save date changes
   */
  setDate() {
    const inputElement = findDOMNode(this.refs.input);
    const value = inputElement.value;
    let date;

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
  }

  focus() {
    findDOMNode(this.refs.input).focus();
  }

  /**
   * Change usual date format to jQuery UI one
   *
   * @param   {string}    format      DateFormat
   * @returns {string}    jQuery  UI DateFormat
   */
  getFormat(format) {
    return format.replace('yyyy', 'yy');
  }

  render() {
    return (
      <input
        {...utils.omit(this.props, ['value', 'onBlur'])}
        ref="input"
        type="text"
        onChange={this.setDate}
      />
    );
  }
}

export default DatePickerEditor;
