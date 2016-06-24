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

function validator(notNull, variants, error, value) {
  error = error || 'Not in variants';
  if (!utils.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (variants.indexOf(value) < 0) {
    return error;
  }
}

/**
 * Create enum validator
 *
 * @param variants
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (variants, error) {
  return validator.bind(null, false, variants, error);
};

module.exports.notNull = function (variants, error) {
  return validator.bind(null, true, variants, error);
};
