/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import gulp from 'gulp';
import jsDetectErrors from './gulp/jsDetectErrors';
import jsPrecompile from './gulp/jsPrecompile';
import jsClear from './gulp/jsClear';
import archive from './gulp/archive';
import jsBundle from './gulp/jsBundle';
import addLicense from './gulp/addLicense';
import deploySite from './gulp/deploySite';
import buildSite from './gulp/buildSite';
import release from './gulp/release';
import clearOldLibFiles from './gulp/clearOldLibFiles';

gulp.task('default', ['lib']);
gulp.task('bundle', ['license'], jsBundle);
gulp.task('release', release);

gulp.task('license', ['lib'], addLicense);
gulp.task('lib', ['detectErrors'], jsPrecompile);
gulp.task('detectErrors', ['clearOldLibFiles', 'clear'], jsDetectErrors);
gulp.task('clearOldLibFiles', clearOldLibFiles);
gulp.task('clear', jsClear);

gulp.task('deploySite', ['buildSite'], deploySite);
gulp.task('buildSite', ['archive'], buildSite);
gulp.task('archive', ['bundle'], archive);
