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

  if (
    !value && value !== 0 ||
    parseInt(value, 10).toString() !== value.toString() ||
    typeof min === 'number' && value < min ||
    typeof max === 'number' && value > max
  ) {
    return error;
  }
}

/**
 * Create range Number validator
 *
 * @param min
 * @param max
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (min, max, error) {
  return validator.bind(null, false, min, max, error);
};

module.exports.notNull = function (min, max, error) {
  return validator.bind(null, true, min, max, error);
};
