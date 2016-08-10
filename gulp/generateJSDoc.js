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
var jsdoc = require('gulp-jsdoc3');

function generateJSDoc(cb) {
  gulp.src(['README.md', 'main.js', 'src/**/*.js'], {read: false})
    .pipe(jsdoc({
      opts: {
        destination: './jsdoc'
      }
    }, cb));
}

module.exports = generateJSDoc;
