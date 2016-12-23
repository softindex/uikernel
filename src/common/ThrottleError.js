/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import ArgumentsError from './ArgumentsError'
export default class ThrottleError extends ArgumentsError{
  constructor(message){
    super(message);
  }
}