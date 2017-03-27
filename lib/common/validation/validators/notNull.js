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

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create NULL validator
 *
 * @param {string} error Error message
 * @returns {Function}
 */
exports.default = function (error) {
  return function (value) {
    if (!_utils2.default.isDefined(value)) {
      return error;
    }
  };
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

module.exports = exports['default'];