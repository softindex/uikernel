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

function ArgumentsError(message) {
  Error.call(this, message);

  this.name = 'ArgumentsError';
  this.message = message;
  this.status = this.statusCode = 422;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ArgumentsError);
  } else {
    this.stack = new Error().stack;
  }
}

ArgumentsError.prototype = (0, _create2.default)(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;

exports.default = ArgumentsError;
module.exports = exports['default'];