/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined} from '../../utils';

function baseValidator(notNull: boolean, min: number, max: number, error: string, value: any) {
  error = error || 'Invalid number';
  if (!isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (
    typeof value !== 'number' ||
    isNaN(value) ||
    parseInt(String(value), 10).toString() !== value.toString() ||
    value < min ||
    value > max
  ) {
    return error;
  }
}

/**
 * Create range Number validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */
const validator = (min: number, max: number, error: string) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min: number, max: number, error: string) => baseValidator.bind(null, true, min, max, error);

export default validator;
