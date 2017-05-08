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
    this.stack = (new Error()).stack;
  }
}

ArgumentsError.prototype = Object.create(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;

export default ArgumentsError;
