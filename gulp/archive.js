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
var merge = require('merge-stream');

function archive() {
  var archiveStatic = gulp.src('themes/base/**/*')
    .pipe(archiver('static.zip'))
    .pipe(gulp.dest('./dist'));

  var archiveExamples = gulp.src(['examples/**/*'])
    .pipe(archiver('starter-kit.zip'))
    .pipe(gulp.dest('./dist'));

  return merge(archiveStatic, archiveExamples);
}

module.exports = archive;
