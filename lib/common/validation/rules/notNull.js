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

/**
 * Create NULL validator
 *
 * @param {string} [error = "Can not be empty"] Error message
 * @returns {Function}
 */
var _default = function _default(error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (!_utils.default.isDefined(value) || value === '' || typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return error;
    }
  };
};

exports.default = _default;
module.exports = exports.default;