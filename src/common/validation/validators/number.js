/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

/**
 * Create range Number validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (min, max, error) {
  return function (value) {
    if (
      !value && value !== 0 ||
      parseInt(value, 10).toString() !== value.toString() ||
      typeof min === 'number' && value < min ||
      typeof max === 'number' && value > max
    ) {
      return error;
    }
  };
};
