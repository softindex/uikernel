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
import styleBundle from './gulp/styleBundle';
import addLicense from './gulp/addLicense';
import deploySite from './gulp/deploySite';
import buildSite from './gulp/buildSite';
import release from './gulp/release';
import clearOldLibFiles from './gulp/clearOldLibFiles';

gulp.task('release', release);
gulp.task('clear', jsClear);
gulp.task('clearOldLibFiles', clearOldLibFiles);
gulp.task('styleBundle', styleBundle);

gulp.task('detectErrors', gulp.series(['clearOldLibFiles', jsDetectErrors]));
gulp.task('lib', gulp.series(['detectErrors', jsPrecompile]));
gulp.task('license', gulp.series(['lib', addLicense]));
gulp.task('jsBundle', gulp.series(['license', jsBundle]));
gulp.task('bundle', gulp.series(['clear', gulp.parallel(['jsBundle', 'styleBundle'])]));
gulp.task('archive', gulp.series(['bundle', archive]));
gulp.task('buildSite', gulp.series(['archive', buildSite]));
gulp.task('deploySite', gulp.series(['buildSite', deploySite]));

gulp.task('default', gulp.series('lib'));
