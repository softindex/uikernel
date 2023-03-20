/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';

function baseValidator(
  notNull: boolean,
  regExp: RegExp,
  error = 'Invalid value',
  value: unknown
): string | undefined {
  if (isNil(value) || value === '') {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'string' || !regExp.test(value)) {
    return error;
  }

  return;
}

export interface RegExpValidation {
  (regExp: RegExp, error?: string): (value: unknown) => string | undefined;
  notNull: (regExp: RegExp, error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create RegEx validator
 */
const validator: RegExpValidation = (regExp, error) => baseValidator.bind(null, false, regExp, error);
validator.notNull = (regExp, error) => baseValidator.bind(null, true, regExp, error);

export default validator;
