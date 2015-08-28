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

var Validator = require('./Validator');

/**
 * Get validator.
 *
 * @return {Validator}
 * @type {Module}
 */
function createValidator() {
  return new Validator();
}

module.exports = createValidator;
