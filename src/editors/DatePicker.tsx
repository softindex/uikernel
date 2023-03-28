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

type AvailableDateValue = Date | null | undefined;

type Props = {
  endDate?: AvailableDateValue;
  format?: string;
  max?: AvailableDateValue;
  min?: AvailableDateValue;
  show?: boolean;
  startDate?: AvailableDateValue;
  textFormat: string;
  todayButton: string;
  value?: AvailableDateValue;
  onBlur?: () => void;
  onChange: (date: string | null) => void;
};

const DEFAULT_PROPS = {
  textFormat: 'yyyy-MM-dd',
  todayButton: 'Today'
} as const;

class DatePickerEditor extends React.Component<Props> {
  static defaultProps = DEFAULT_PROPS;

  onChange = (date: Date | null): void => {
    const formatedDate = date ? format(date, this.props.format ?? '') : date;
    this.props.onChange(formatedDate);
  };

  parseDate(value: AvailableDateValue | string): AvailableDateValue {
    if (!value) {
      return null;
    }

    return typeof value === 'string' ? parseISO(value) : value;
  }

  render(): JSX.Element {
    const {textFormat, value, min, max, onBlur, endDate, startDate, ...otherProps} = this.props;

    return (
      <DatePicker
        {...otherProps}
        dateFormat={textFormat}
        selected={this.parseDate(value)}
        onChange={this.onChange}
        minDate={this.parseDate(min)}
        maxDate={this.parseDate(max)}
        startDate={this.parseDate(startDate)}
        endDate={this.parseDate(endDate)}
        onCalendarClose={onBlur}
      />
    );
  }
}

export default DatePickerEditor;
