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

var utils = require('../../utils');

function validator(notNull, min, max, error, value) {
  if (!utils.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  value = new Date(value);
  if (min && new Date(min) > value) {
    return error;
  }
  if (max && new Date(max) < value) {
    return error;
  }
}

/**
 * Create date validator
 *
 * @param {Date}    [min]   Min date
 * @param {Date}    [max]   Max date
 * @param {string}  error   Error message
 * @returns {Function} Validator
 */
module.exports = function (min, max, error) {
  return validator.bind(null, false, min, max, error);
};

module.exports.notNull = function (min, max, error) {
  return validator.bind(null, true, min, max, error);
};
