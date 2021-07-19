/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import {omit} from '../common/utils';

class DatePickerEditor extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    textFormat: PropTypes.string,
    todayButton: PropTypes.string,
    min: PropTypes.any,
    max: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    value: PropTypes.any,
    show: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    textFormat: 'yyyy-MM-dd',
    todayButton: 'Today'
  };

  onChange(date) {
    if (date) {
      date = format(date, this.props.format);
    }
    this.props.onChange(date);
  }

  render() {
    const otherProps = omit(this.props, ['textFormat', 'value', 'onChange', 'min', 'max']);
    return (
      <DatePicker
        {...otherProps}
        dateFormat={this.props.textFormat}
        selected={this.props.value && new Date(this.props.value)}
        onChange={::this.onChange}
        minDate={this.props.min && new Date(this.props.min)}
        maxDate={this.props.max && new Date(this.props.max)}
        startDate={this.props.startDate && new Date(this.props.startDate)}
        endDate={this.props.endDate && new Date(this.props.endDate)}
      />
    );
  }
}

export default DatePickerEditor;
