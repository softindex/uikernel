/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseValidator(notNull, variants, error, value) {
  error = error || 'Not in variants';
  if (!_utils2.default.isDefined(value)) {
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
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var validator = function validator(variants, error) {
  return baseValidator.bind(null, false, variants, error);
};
validator.notNull = function (variants, error) {
  return baseValidator.bind(null, true, variants, error);
};

exports.default = validator;
module.exports = exports['default'];