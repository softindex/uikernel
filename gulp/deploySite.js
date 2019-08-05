/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

function deploySite() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
}

module.exports = deploySite;
