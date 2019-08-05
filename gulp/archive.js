/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const archiver = require('gulp-archiver');
const merge = require('merge-stream');

function archive() {
  const archiveStatic = gulp.src('themes/base/**/*')
    .pipe(archiver('static.zip'))
    .pipe(gulp.dest('./dist'));

  const archiveExamples = gulp.src(['examples/**/*'])
    .pipe(archiver('starter-kit.zip'))
    .pipe(gulp.dest('./dist'));

  return merge(archiveStatic, archiveExamples);
}

module.exports = archive;
