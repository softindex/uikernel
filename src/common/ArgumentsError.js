/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function ArgumentsError(message) {
  this.message = message;
  this.status = this.statusCode = 422;
  Error.captureStackTrace(this, ArgumentsError);
}

ArgumentsError.prototype = Object.create(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;

module.exports = ArgumentsError;
