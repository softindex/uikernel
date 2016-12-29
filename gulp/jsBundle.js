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
import licenser from 'gulp-licenser';
import packageInfo from '../package.json';
import webpack from 'webpack-stream';
import {argv} from 'yargs';

const LICENSE_TEMPLATE =
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

export default jsBundle;
