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
 * Create date validator
 *
 * @param {Date}    [min]   Min date
 * @param {Date}    [max]   Max date
 * @param {string}  error   Error message
 * @returns {Function} Validator
 */
module.exports = function (min, max, error) {
  return function (value) {
    value = new Date(value);
    if (min && new Date(min) > value) {
      return error;
    }
    if (max && new Date(max) < value) {
      return error;
    }
  };
};
