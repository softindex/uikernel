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

function validator(notNull, regExp, error, value) {
  error = error || 'Not valid';
  if (!utils.isDefined(value) || value === '') {
    if (notNull) {
      return error;
    }
    return;
  }

  const type = typeof value;
  if ((type !== 'string' && type !== 'number') || !regExp.test(value)) {
    return error;
  }
}

/**
 * Create RegEx validator
 *
 * @param regExp
 * @param {string} error Error message
 * @returns {Function}
 */
module.exports = (regExp, error) => validator.bind(null, false, regExp, error);

module.exports.notNull = (regExp, error) => validator.bind(null, true, regExp, error);
