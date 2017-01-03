/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import count from 'gulp-count';
import {argv} from 'yargs';

function jsPrecompile() {
  return gulp.src(['src/**/*.js'])
    .pipe(changed('lib', {hasChanged: changed.compareLastModifiedTime}))
    .pipe(count('babel transplit ## files'))
    .pipe(babel({sourceMaps: argv.map ? 'inline' : false}))
    .pipe(gulp.dest('lib'));
}

export default jsPrecompile;
