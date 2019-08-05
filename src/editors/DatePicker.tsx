/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DatePicker from 'react-datepicker';
import moment, {Moment} from 'moment';
import { omit } from '../common/utils';

type DatePickerEditorProps = {
  format?: string,
  textFormat?: string,
  min?: any,
  max?: any,
  value?: any,
  show?: boolean,
  onBlur?: (...args: any[]) => any,
  onChange: (...args: any[]) => any
};
class DatePickerEditor extends React.Component<DatePickerEditorProps, {}> {
  static defaultProps = {
    textFormat: 'YYYY-MM-DD'
  };
  onChange(date: Date) {
    if (date) {
      date = date.format(this.props.format);
    }
    this.props.onChange(date);
  }
  render() {
    const otherProps = omit(this.props, [
      'textFormat',
      'value',
      'onChange',
      'min',
      'max'
    ]);
    return (
      <DatePicker
        {...otherProps}
        dateFormat={this.props.textFormat}
        selected={this.props.value && moment(this.props.value)}
        onChange={this.onChange.bind(this)}
        minDate={this.props.min && moment(this.props.min)}
        maxDate={this.props.max && moment(this.props.max)}
        todayButton={'Today'}
      />
    );
  }
}
export default DatePickerEditor;
