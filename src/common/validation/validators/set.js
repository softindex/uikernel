/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../utils';

function validator(notNull, variants, error, values) {
  error = error || 'Not in variants';
  if (!utils.isDefined(values) || !values.length) {
    if (notNull) {
      return error;
    }
    return;
  }

  for (let i = 0; i < values.length; i++) {
    if (variants.indexOf(values[i]) < 0) {
      return error;
    }
  }
}

/**
 * Create set validator
 *
 * @param variants
 * @param {string} error Error message
 * @returns {Function}
 */
export default (variants, error) => validator.bind(null, false, variants, error);

module.exports.notNull = (variants, error) => validator.bind(null, true, variants, error);
