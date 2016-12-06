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

import utils from '../../utils';

/**
 * Create NULL validator
 *
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = error => value => {
  if (!utils.isDefined(value)) {
    return error;
  }
};
