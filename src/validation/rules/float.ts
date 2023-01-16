/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';

type Limit = number | null | undefined;

function baseValidator(
  notNull: boolean,
  min: Limit,
  max: Limit,
  error = 'Invalid float',
  value: unknown
): string | undefined {
  if (isNil(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (
    typeof value !== 'number' ||
    isNaN(value) ||
    !isFinite(value) ||
    (typeof min === 'number' && value < min) ||
    (typeof max === 'number' && value > max)
  ) {
    return error;
  }

  return;
}

export interface FloatValidation {
  (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
  notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create float validator
 */
const validator: FloatValidation = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);

export default validator;
