'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseValidator(notNull, error, value) {
  error = error || 'Not boolean';
  if (!_utils2.default.isDefined(value)) {
    if (notNull) {
      return error;
    }
    return;
  }

  if (typeof value !== 'boolean') {
    return error;
  }
}

/**
 * Create boolean validator
 *
 * @param {string} error Error message
 * @returns {Function} Validator
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var validator = function validator(error) {
  return baseValidator.bind(null, false, error);
};
validator.notNull = function (error) {
  return baseValidator.bind(null, true, error);
};

exports.default = validator;
module.exports = exports['default'];