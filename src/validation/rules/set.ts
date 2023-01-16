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
  values: unknown[] | null | undefined
): string | undefined {
  if (isNil(values) || !values.length) {
    if (notNull) {
      return error;
    }

    return;
  }

  for (const value of values) {
    if (variants.indexOf(value) < 0) {
      return error;
    }
  }

  return;
}

export interface SetValidation {
  (variants: unknown[], error?: string): (values: unknown[] | null | undefined) => string | undefined;
  notNull: (
    variants: unknown[],
    error?: string
  ) => (values: unknown[] | null | undefined) => string | undefined;
}

/**
 * Create set validator
 */
const validator: SetValidation = (variants, error) => baseValidator.bind(null, false, variants, error);
validator.notNull = (variants, error) => baseValidator.bind(null, true, variants, error);

export default validator;
