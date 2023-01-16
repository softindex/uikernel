/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isNil from 'lodash/isNil';

/**
 * Create NULL validator
 */
export default function noNull(error = 'Can not be empty'): (value: unknown) => string | undefined {
  return (value) => {
    if (isNil(value) || value === '' || (typeof value === 'number' && (isNaN(value) || !isFinite(value)))) {
      return error;
    }

    return;
  };
}
