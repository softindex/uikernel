/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');

/**
 * Has ESLint fixed the file contents
 */
function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

function detectErrors() {
  return gulp.src(['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx', 'gulp/**/*.js'], {base: '.'})
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('.')));
}

module.exports = detectErrors;
