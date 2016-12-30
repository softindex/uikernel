/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../utils';

function baseValidator(notNull, variants, error, value) {
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
const validator = (variants, error) => baseValidator.bind(null, false, variants, error);
validator.notNull = (variants, error) => baseValidator.bind(null, true, variants, error);

export default validator;
