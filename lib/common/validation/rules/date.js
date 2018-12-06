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
function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid date';

  if (!_utils.default.isDefined(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  value = _utils.default.toDate(value);

  if (isNaN(value)) {
    return error;
  }

  if (min && _utils.default.toDate(min) > value) {
    return error;
  }

  if (max && _utils.default.toDate(max) < value) {
    return error;
  }
}
/**
 * Create date validator
 *
 * @param {Date}    [min]   Min date
 * @param {Date}    [max]   Max date
 * @param {string}  error   Error message
 * @returns {Function} Validator
 */


var validator = function validator(min, max, error) {
  return baseValidator.bind(null, false, min, max, error);
};

validator.notNull = function (min, max, error) {
  return baseValidator.bind(null, true, min, max, error);
};

var _default = validator;
exports.default = _default;
module.exports = exports.default;