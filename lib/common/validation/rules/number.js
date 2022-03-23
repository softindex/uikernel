"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../../utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid number';

  if (!(0, _utils.isDefined)(value)) {
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


var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};

validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

var _default = validator;
exports["default"] = _default;
module.exports = exports.default;