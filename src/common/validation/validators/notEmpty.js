/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../utils';

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 *
 * @param {string} [error="Can not be empty"] Error message
 * @returns {Function}
 */
export default function (error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (
      utils.isEmpty(value) ||
      (typeof value === 'number' && (
        isNaN(value) ||
        !isFinite(value)
      ))
    ) {
      return error;
    }
  };
}
