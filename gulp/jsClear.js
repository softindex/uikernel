/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var del = require('del');

function jsClear() {
  return del(['lib', 'dist', '_site']);
}

module.exports = jsClear;
