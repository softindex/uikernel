/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';
import {isCorrectNumber} from '../../common/utils';

type Limit = number | null | undefined;

function baseValidator(
  notNull: boolean,
  min: Limit,
  max: Limit,
  error = 'Invalid number',
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
    !isCorrectNumber(value) ||
    parseInt(value.toString(), 10).toString() !== value.toString() ||
    (typeof min === 'number' && value < min) ||
    (typeof max === 'number' && value > max)
  ) {
    return error;
  }

  return;
}

export interface IntegerValidation {
  (min: Limit, max: Limit, error?: string): (value: unknown) => string | undefined;
  notNull: (min: Limit, max: Limit, error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create range Integer validator
 */
const validator: IntegerValidation = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);

export default validator;
