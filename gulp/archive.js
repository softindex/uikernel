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
var archiver = require('gulp-archiver');

function archive() {
  return gulp.src('themes/base/**/*')
    .pipe(archiver('static.zip'))
    .pipe(gulp.dest('./dist'));
}

module.exports = archive;
