/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO Need to remove gulp dependency

import gulp from 'gulp';
import jsDetectErrors from './gulp/jsDetectErrors';
import clearSite from './gulp/clearSite';
import archive from './gulp/archive';
import styleBundle from './gulp/styleBundle';
import deploySite from './gulp/deploySite';
import buildSite from './gulp/buildSite';
import release from './gulp/release';
import buildSrc from './gulp/buildSrc';

gulp.task('default', gulp.parallel([
  gulp.series([jsDetectErrors, buildSrc]),
  styleBundle
]));

gulp.task('buildSite', gulp.series(['default', archive, clearSite, buildSite]));
gulp.task('deploySite', gulp.series(['buildSite', deploySite]));

gulp.task('release', gulp.series(['default', release]));

