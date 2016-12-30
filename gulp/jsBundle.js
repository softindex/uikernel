/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import packageInfo from '../package.json';
import webpack from 'webpack-stream';
import {argv} from 'yargs';

function jsBundle() {
  return gulp.src('browser.js')
    .pipe(webpack({
      output: {
        libraryTarget: 'var',
        library: 'UIKernel'
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
      devtool: argv.map ? 'eval' : false
    }))
    .pipe(rename(packageInfo.name + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('examples/libs/js'))
    .pipe(uglify())
    .pipe(rename(packageInfo.name + '.min.js'))
    .pipe(gulp.dest('dist'));
}

export default jsBundle;
