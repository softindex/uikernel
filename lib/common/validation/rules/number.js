'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid number';
  if (!_utils2.default.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (typeof value !== 'number' || isNaN(value) || parseInt(value, 10).toString() !== value.toString() || typeof min === 'number' && value < min || typeof max === 'number' && value > max) {
    return error;
  }
}

/**
 * Create range Number validator
 *
 * @param min
 * @param max
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

var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};
validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

exports.default = validator;
module.exports = exports['default'];