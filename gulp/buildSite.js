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

var gulp = require('gulp');

function copy() {
  return gulp.src(['./examples/**/*', './docs/**/*'])
    .pipe(gulp.dest('_site'));
}

module.exports = copy;
