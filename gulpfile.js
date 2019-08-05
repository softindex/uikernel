/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO Need to remove gulp dependency

const gulp = require('gulp');
const jsDetectErrors = require('./gulp/jsDetectErrors');
const clearSite = require('./gulp/clearSite');
const archive = require('./gulp/archive');
const styleBundle = require('./gulp/styleBundle');
const deploySite = require('./gulp/deploySite');
const buildSite = require('./gulp/buildSite');
const release = require('./gulp/release');
const buildSrc = require('./gulp/buildSrc');

gulp.task('default', gulp.parallel([
  gulp.series([jsDetectErrors, buildSrc]),
  styleBundle
]));

gulp.task('buildSite', gulp.series(['default', archive, clearSite, buildSite]));
gulp.task('deploySite', gulp.series(['buildSite', deploySite]));

gulp.task('release', gulp.series(['default', release]));

