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

let variables = {};

module.exports = {
  get: key => variables[key],
  set: (key, value) => {
    variables[key] = value;
  }
};
