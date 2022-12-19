/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined, toDate} from '../../utils';

function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid date';

  if (!isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  const typeOfValue = typeof value;
  if (typeOfValue !== 'number' && typeOfValue !== 'string' && !(value instanceof Date)) {
    return error;
  }

  value = toDate(value);
  if (isNaN(value)) {
    return error;
  }

  if (min && toDate(min) > value) {
    return error;
  }
  if (max && toDate(max) < value) {
    return error;
  }
}

/**
 * Create date validator
 *
 * @param {Date}    [min]   Min date
 * @param {Date}    [max]   Max date
 * @param {string}  error   Error message
 * @returns {Function} Validator
 */
const validator = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);

export default validator;
