/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import rename from 'gulp-rename';
import less from 'gulp-less';
import merge from 'merge-stream';

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

export default styleBundle;
