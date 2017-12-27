/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import merge from 'merge-stream';

function buildSite() {
  const copyDocs = gulp.src(['./docs/**/*'])
    .pipe(gulp.dest('_site'));

  const copyExamples = gulp.src(['./examples/**/*'])
    .pipe(gulp.dest('_site/examples'));

  const copyDist = gulp.src(['./dist/**/*'])
    .pipe(gulp.dest('_site/dist'));

  const copyThemes = gulp.src(['./themes/**/*'])
    .pipe(gulp.dest('_site/themes'));

  return merge(copyDocs, copyExamples, copyDist, copyThemes);
}

export default buildSite;
