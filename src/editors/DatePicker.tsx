/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {format, parseISO} from 'date-fns';
import React from 'react';
import DatePicker from 'react-datepicker';
import {omit} from '../common/utils';

type Props = {
  endDate: any;
  format: string;
  max: any;
  min: any;
  show: boolean;
  startDate: any;
  textFormat: string;
  todayButton: string;
  value: any;
  onBlur: (...args: any[]) => any;
  onChange: (...args: any[]) => any;
};

class DatePickerEditor extends React.Component {
  static defaultProps = {
    textFormat: 'yyyy-MM-dd',
    todayButton: 'Today'
  };

  constructor(props: Props) {
    super(props);
  }

  onChange(date) {
    if (date) {
      date = format(date, this.props.format);
    }

    this.props.onChange(date);
  }

  parseDate(value) {
    if (value && typeof value === 'string') {
      return parseISO(value);
    }

    return value;
  }

  render() {
    const otherProps = omit(this.props, ['textFormat', 'value', 'onChange', 'min', 'max', 'onBlur']);
    return (
      <DatePicker
        {...otherProps}
        dateFormat={this.props.textFormat}
        selected={this.parseDate(this.props.value)}
        onChange={this.onChange.bind(this)}
        minDate={this.parseDate(this.props.min)}
        maxDate={this.parseDate(this.props.max)}
        startDate={this.parseDate(this.props.startDate)}
        endDate={this.parseDate(this.props.endDate)}
        onCalendarClose={this.props.onBlur}
      />
    );
  }
}

export default DatePickerEditor;
