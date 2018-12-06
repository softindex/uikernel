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
function baseValidator(notNull, variants, error, value) {
  error = error || 'Not in variants';

  if (!_utils.default.isDefined(value)) {
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


var validator = function validator(variants, error) {
  return baseValidator.bind(null, false, variants, error);
};

validator.notNull = function (variants, error) {
  return baseValidator.bind(null, true, variants, error);
};

var _default = validator;
exports.default = _default;
module.exports = exports.default;