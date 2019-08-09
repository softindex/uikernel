/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined} from '../../utils';

function baseValidator(notNull: boolean, min: any, max: any, error: string, value: any) {
  error = error || 'Invalid float';
  if (!isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (
    typeof value !== 'number' ||
    isNaN(value) ||
    !isFinite(value) ||
    typeof min === 'number' && value < min ||
    typeof max === 'number' && value > max
  ) {
    return error;
  }
}

/**
 * Create float validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */
const validator = (min: any, max: any, error: string) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min: any, max: any, error: string) => baseValidator.bind(null, true, min, max, error);

export default validator;
