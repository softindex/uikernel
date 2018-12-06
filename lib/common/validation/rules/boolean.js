"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../../utils"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function baseValidator(notNull, error, value) {
  error = error || 'Not boolean';

  if (!_utils.default.isDefined(value)) {
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


var validator = function validator(error) {
  return baseValidator.bind(null, false, error);
};

validator.notNull = function (error) {
  return baseValidator.bind(null, true, error);
};

var _default = validator;
exports.default = _default;
module.exports = exports.default;