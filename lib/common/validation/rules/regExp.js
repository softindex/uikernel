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
function baseValidator(notNull, regExp, error, value) {
  error = error || 'Invalid value';

  if (!(0, _utils.isDefined)(value) || value === '') {
    if (notNull) {
      return error;
    }

    return;
  }

  if (typeof value !== 'string' || !regExp.test(value)) {
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


var validator = function validator(regExp, error) {
  return baseValidator.bind(null, false, regExp, error);
};

validator.notNull = function (regExp, error) {
  return baseValidator.bind(null, true, regExp, error);
};

var _default = validator;
exports["default"] = _default;
module.exports = exports.default;