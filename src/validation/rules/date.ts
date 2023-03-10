/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';

type Limit = Date | number | string | null | undefined;

const INVALID_DATE = 'Invalid Date';

function baseValidator(
  notNull: boolean,
  min: Limit,
  max: Limit,
  error = 'Invalid date',
  value: unknown
): string | undefined {
  if (isNil(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  const date = toDate(value);
  if (!date) {
    return error;
  }

  const [minDate, maxDate] = [toDate(min), toDate(max)];

  if (minDate && minDate > date) {
    return error;
  }

  if (maxDate && maxDate < date) {
    return error;
  }

  return;
}

export interface DateValidation {
  (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
  notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create date validator
 */
const validator: DateValidation = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);

function toDate(value: unknown): Date | null {
  const typeOfValue = typeof value;
  if (typeOfValue !== 'number' && typeOfValue !== 'string' && !(value instanceof Date)) {
    return null;
  }

  const date = new Date(value as Date | number | string);

  if (date.toString() === INVALID_DATE) {
    return null;
  }

  if (typeof value === 'string') {
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000); // Convert UTC to local time
  }

  return date;
}

export default validator;
