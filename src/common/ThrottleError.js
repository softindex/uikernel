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

ThrottleError.prototype = Object.create(Error.prototype);
ThrottleError.prototype.constructor = ThrottleError;

export default ThrottleError;
