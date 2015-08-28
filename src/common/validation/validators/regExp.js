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
 * Create RegEx validator
 *
 * @param regExp
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (regExp, error) {
  return function (value) {
    var type = typeof value;
    if ((type !== 'string' && type !== 'number') || !regExp.test(value)) {
      return error;
    }
  };
};
