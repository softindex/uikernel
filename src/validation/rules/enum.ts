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
  variants: unknown[],
  error = 'Not in variants',
  value: unknown
): string | undefined {
  if (isNil(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (!variants.includes(value)) {
    return error;
  }

  return;
}

export interface EnumValidation {
  (variants: unknown[], error?: string): (value: unknown) => string | undefined;
  notNull: (variants: unknown[], error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create enum validator
 */
const validator: EnumValidation = (variants, error) => baseValidator.bind(null, false, variants, error);
validator.notNull = (variants, error) => baseValidator.bind(null, true, variants, error);

export default validator;
