/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {isDefined} from '../../utils';

/**
 * Create NULL validator
 *
 * @param {string} [error = "Can not be empty"] Error message
 * @returns {Function}
 */
export default error => {
  error = error || 'Can not be empty';
  return value => {
    if (
      !isDefined(value) ||
      value === '' ||
      (typeof value === 'number' && (
        isNaN(value) ||
        !isFinite(value)
      ))
    ) {
      return error;
    }
  };
};
