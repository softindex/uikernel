/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {getStack} from './utils';

class ThrottleError extends Error {
  constructor() {
    super();
    this.name = 'ThrottleError';
    this.message = 'Too many function call';
    this.stack = getStack();
  }
  static createWithParentStack = function (stack: any) {
    const err = new ThrottleError();
    err.stack += '\n' + stack;
    return err;
  };
}

export default ThrottleError;
