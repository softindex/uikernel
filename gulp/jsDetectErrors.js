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
var jsxcs = require('gulp-jsxcs');
var eslint = require('gulp-eslint');

function jsDetectErrors() {
  return gulp.src(['gulpfile.js', 'main.js', 'browser.js', 'src/**/*.js', 'src/**/*.jsx', 'gulp/**/*.js'])
    .pipe(jsxcs())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}

module.exports = jsDetectErrors;
