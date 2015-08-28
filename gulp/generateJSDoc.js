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
var jsdoc = require('gulp-jsdoc');

function generateJSDoc() {
  return gulp.src(['main.js', 'lib/**/*.js'])
    .pipe(jsdoc('./docs'));
}

module.exports = generateJSDoc;
