/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function ThrottleError() {
  this.message = 'Too many function call';
  Error.captureStackTrace(this, ThrottleError);
}

ThrottleError.prototype = Object.create(Error.prototype);
ThrottleError.prototype.constructor = ThrottleError;

export default ThrottleError;
