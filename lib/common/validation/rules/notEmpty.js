"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = _interopRequireDefault(require("../../utils"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 *
 * @param {string} [error="Can not be empty"] Error message
 * @returns {Function}
 */
function _default(error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (_utils.default.isEmpty(value) || typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return error;
    }
  };
}

module.exports = exports.default;