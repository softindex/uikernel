/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (error) {
  error = error || 'Can not be empty';
  return function (value) {
    if (_utils2.default.isEmpty(value) || typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      return error;
    }
  };
};

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = exports['default'];

/**
 * Check if value is not empty string, array and object. Not null, undefined, 0
 *
 * @param {string} [error="Can not be empty"] Error message
 * @returns {Function}
 */