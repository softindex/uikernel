/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

function ArgumentsError(message) {
  if (!(this instanceof ArgumentsError)) {
    return new ArgumentsError(message);
  }

  this.message = message;
  Error.captureStackTrace(this, ArgumentsError);
}

ArgumentsError.prototype = Error();

module.exports = ArgumentsError;
