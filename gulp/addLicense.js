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
var licenser = require('gulp-licenser');

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

function addLicense() {
  return gulp.src(['**/*.js', '**/*.jsx', '!node_modules/**/*.*'])
    .pipe(licenser(LICENSE_TEMPLATE))
    .pipe(gulp.dest(''));
}

module.exports = addLicense;
