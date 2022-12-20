/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import eslint from 'gulp-eslint7';
import gulpIf from 'gulp-if';

/**
 * Has ESLint fixed the file contents
 */
function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

function jsDetectErrors() {
  return gulp.src(['src/**/*.{ts,tsx}'], {base: '.'})
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('.')))
    .pipe(eslint.failAfterError());
}

export default jsDetectErrors;
