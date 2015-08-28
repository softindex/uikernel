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
var plumber = require('gulp-plumber');
var regenerator = require('gulp-regenerator');
var react = require('gulp-react');

function jsPrecompile() {
  return gulp.src(['src/**/*.jsx', 'src/**/*.js'])
    .pipe(plumber())
    .pipe(regenerator())
    .pipe(react())
    .pipe(gulp.dest('lib'));
}

module.exports = jsPrecompile;
