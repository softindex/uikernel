/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../utils';

/**
 * Create NULL validator
 *
 * @param {string} error Error message
 * @returns {Function}
 */
export default error => value => {
  if (!utils.isDefined(value)) {
    return error;
  }
};
