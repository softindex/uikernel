/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var utils = require('../../utils');

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 *
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = function (error) {
  return function (value) {
    if (utils.isEmpty(value)) {
      return error;
    }
  };
};
