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

const gulp = require('gulp');
const babel = require('gulp-babel');
const argv = require('yargs').argv;

function jsPrecompile() {
  return gulp.src(['src/**/*.jsx', 'src/**/*.js'])
    .pipe(babel({
      presets: ['react', 'latest', 'stage-0'],
      plugins: ['transform-runtime', 'babel-plugin-add-module-exports'],
      sourceMaps: argv.map ? 'inline' : false
    }))
    .pipe(gulp.dest('lib'));
}

module.exports = jsPrecompile;
