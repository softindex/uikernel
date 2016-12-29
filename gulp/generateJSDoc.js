/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import jsdoc from 'gulp-jsdoc3';

function generateJSDoc(cb) {
  gulp.src(['README.md', 'main.js', 'src/**/*.js'], {read: false})
    .pipe(jsdoc({
      opts: {
        destination: './jsdoc'
      }
    }, cb));
}

export default generateJSDoc;
