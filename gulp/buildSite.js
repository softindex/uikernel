/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');

function copy() {
  var copyDocs = gulp.src(['./docs/**/*'])
    .pipe(gulp.dest('_site'));

  var copyExamples = gulp.src(['./examples/**/*'])
    .pipe(gulp.dest('_site/examples'));

  var copyDist = gulp.src(['./dist/**/*'])
    .pipe(gulp.dest('_site/dist'));

  var copyThemes = gulp.src(['./themes/**/*'])
    .pipe(gulp.dest('_site/themes'));

  return merge(copyDocs, copyExamples, copyDist, copyThemes);
}

module.exports = copy;
