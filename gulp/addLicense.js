/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import licenser from 'gulp-licenser';

const LICENSE_TEMPLATE =
  '/**\n' +
  ' * Copyright (с) 2015-present, SoftIndex LLC.\n' +
  ' * All rights reserved.\n' +
  ' *\n' +
  ' * This source code is licensed under the BSD-style license found in the\n' +
  ' * LICENSE file in the root directory of this source tree.\n' +
  ' */';

function addLicense() {
  return gulp.src(['**/*.js', '!node_modules/**/*.*', '!**/libs/*.js'])
    .pipe(licenser(LICENSE_TEMPLATE))
    .pipe(gulp.dest(''));
}

export default addLicense;
