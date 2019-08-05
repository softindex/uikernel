/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const less = require('gulp-less');
const merge = require('merge-stream');

function styleBundle() {
  const copyImg = gulp.src('themes/**/img/**')
    .pipe(gulp.dest('dist/themes'))
    .pipe(gulp.dest('examples/libs/css'));
  const copyLess = gulp.src('themes/base/main.less')
    .pipe(less())
    .pipe(rename('uikernel.css'))
    .pipe(gulp.dest('dist/themes/base'))
    .pipe(gulp.dest('examples/libs/css/base'));
  return merge(copyImg, copyLess);
}

module.exports = styleBundle;
