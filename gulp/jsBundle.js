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
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var licenser = require('gulp-licenser');
var packageInfo = require('../package.json');
var webpack = require('webpack-stream');
var argv = require('yargs').argv;

var LICENSE_TEMPLATE =
  '/**\n' +
  ' * Copyright (с) 2015, SoftIndex LLC.\n' +
  ' * All rights reserved.\n' +
  ' *\n' +
  ' * This source code is licensed under the BSD-style license found in the\n' +
  ' * LICENSE file in the root directory of this source tree.\n' +
  ' *\n' +
  ' * @providesModule UIKernel\n' +
  ' */';

function jsBundle() {
  return gulp.src('browser.js')
    .pipe(webpack({
      externals: {
        'react': 'React',
        'react-dom' : 'ReactDOM'
      },
      devtool: argv.map ? 'eval' : false
    }))
    .pipe(rename(packageInfo.name + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('examples/libs/js'))
    .pipe(uglify())
    .pipe(licenser(LICENSE_TEMPLATE))
    .pipe(rename(packageInfo.name + '.min.js'))
    .pipe(gulp.dest('dist'));
}

module.exports = jsBundle;
