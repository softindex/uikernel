"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

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
  this.stack = (0, _utils.getStack)();
}

ArgumentsError.prototype = Object.create(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;
var _default = ArgumentsError;
exports.default = _default;
module.exports = exports.default;