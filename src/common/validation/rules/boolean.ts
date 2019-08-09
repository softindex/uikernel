/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined} from '../../utils';

function baseValidator(notNull: boolean, error: string, value: any) {
  error = error || 'Not boolean';
  if (!isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (typeof value !== 'boolean') {
    return error;
  }
}

/**
 * Create boolean validator
 *
 * @param {string} error Error message
 * @returns {Function} Validator
 */
const validator = (error: string) => baseValidator.bind(null, false, error);
validator.notNull = (error: string) => baseValidator.bind(null, true, error);

export default validator;
