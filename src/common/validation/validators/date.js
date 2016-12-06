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

function validator(notNull, min, max, error, value) {
  error = error || 'Invalid date';
  if (!utils.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  value = utils.toDate(value);
  if (min && utils.toDate(min) > value) {
    return error;
  }
  if (max && utils.toDate(max) < value) {
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
module.exports = (min, max, error) => validator.bind(null, false, min, max, error);

module.exports.notNull = (min, max, error) => validator.bind(null, true, min, max, error);
