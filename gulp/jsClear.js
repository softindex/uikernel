/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import del from 'del';

function jsClear() {
  return del(['dist', '_site']);
}

export default jsClear;
