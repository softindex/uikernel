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
 * Create validator for listElement
 *
 * @param {string} error Error message
 * @returns {Function}
 */
var listElement = function (error) {
  return function (value) {
    if (!Array.isArray(value) || value.length !== 2) {
      return error;
    }
  };
};

listElement.isRequired = function (error) {
  return function (value) {
    if (!Array.isArray(value) || value.length !== 2 || value[0] === null) {
      return error;
    }
  };
};

module.exports = listElement;
