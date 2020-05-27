"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _utils = require("../../utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function baseValidator(notNull, min, max, error, value) {
  error = error || 'Invalid date';

  if (!(0, _utils.isDefined)(value)) {
    if (notNull) {
      return error;
    }

    return;
  }

  var typeOfValue = (0, _typeof2["default"])(value);

  if (typeOfValue !== 'number' && typeOfValue !== 'string' && !(value instanceof Date)) {
    return error;
  }

  value = (0, _utils.toDate)(value);

  if (isNaN(value)) {
    return error;
  }

  if (min && (0, _utils.toDate)(min) > value) {
    return error;
  }

  if (max && (0, _utils.toDate)(max) < value) {
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
exports["default"] = _default;
module.exports = exports.default;