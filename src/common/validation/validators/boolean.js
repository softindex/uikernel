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

function validator(notNull, error, value) {
  if (!utils.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (typeof value !== 'boolean') {
    return error;
  }
}

/**
 * Create boolean validator
 *
 * @param {string} error Error message
 * @returns {Function} Validator
 */
module.exports = function (error) {
  return validator.bind(null, false, error);
};

module.exports.notNull = function (error) {
  return validator.bind(null, this, error);
};
