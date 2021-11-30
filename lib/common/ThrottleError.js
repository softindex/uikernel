"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

/*
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
  this.stack = (0, _utils.getStack)();
}

ThrottleError.prototype = Object.create(Error.prototype);
ThrottleError.prototype.constructor = ThrottleError;

ThrottleError.createWithParentStack = function (stack) {
  var err = new ThrottleError();
  err.stack += '\n' + stack;
  return err;
};

var _default = ThrottleError;
exports["default"] = _default;
module.exports = exports.default;