/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';

function baseValidator(notNull: boolean, error = 'Not boolean', value: unknown): string | undefined {
  if (isNil(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'boolean') {
    return error;
  }

  return;
}

export interface BooleanValidation {
  (error?: string): (value: unknown) => string | undefined;
  notNull: (error?: string) => (value: unknown) => string | undefined;
}

/**
 * Create boolean validator
 */
const validator: BooleanValidation = (error) => baseValidator.bind(null, false, error);
validator.notNull = (error) => baseValidator.bind(null, true, error);

export default validator;
