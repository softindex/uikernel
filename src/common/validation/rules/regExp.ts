/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined} from '../../utils';

function baseValidator(notNull: boolean, regExp: RegExp, error: string, value: any) {
  error = error || 'Invalid value';
  if (!isDefined(value) || value === '') {
    if (notNull) {
      return error;
    }
    return;
  }

  if (typeof value !== 'string' || !regExp.test(value)) {
    return error;
  }
}

/**
 * Create RegEx validator
 *
 * @param regExp
 * @param {string} error Error message
 * @returns {Function}
 */
const validator = (regExp: RegExp, error: string) => baseValidator.bind(null, false, regExp, error);
validator.notNull = (regExp: RegExp, error: string) => baseValidator.bind(null, true, regExp, error);

export default validator;
