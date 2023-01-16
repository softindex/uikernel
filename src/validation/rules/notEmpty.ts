/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isEmpty} from '../../common/utils';

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 */
export default function notEmpty(error = 'Can not be empty'): (value: unknown) => string | undefined {
  return (value) => {
    if (isEmpty(value) || (typeof value === 'number' && (isNaN(value) || !isFinite(value)))) {
      return error;
    }

    return;
  };
}
