'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function ThrottleError() {
  Error.call(this);

  this.name = 'ThrottleError';
  this.message = 'Too many function call';

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ThrottleError);
  } else {
    this.stack = new Error().stack;
  }
}

ThrottleError.prototype = (0, _create2.default)(Error.prototype);
ThrottleError.prototype.constructor = ThrottleError;

exports.default = ThrottleError;
module.exports = exports['default'];