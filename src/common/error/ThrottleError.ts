/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {getStack} from '../utils';

class ThrottleError extends Error {
  constructor(parentStack?: string) {
    super();

    this.name = 'ThrottleError';
    this.message = 'Too many function call';

    this.stack = 'Error: ' + this.message + '\n' + getStack(1);

    if (parentStack) {
      this.stack += '\n' + parentStack;
    }
  }
}

export default ThrottleError;
