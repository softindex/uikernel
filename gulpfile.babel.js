/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const jsDetectErrors = require('./gulp/jsDetectErrors');
const jsPrecompile = require('./gulp/jsPrecompile');
const jsClear = require('./gulp/jsClear');
const jsDocsClear = require('./gulp/jsDocsClear');
const generateJSDoc = require('./gulp/generateJSDoc');
const archive = require('./gulp/archive');
const jsBundle = require('./gulp/jsBundle');
const addLicense = require('./gulp/addLicense');
const deploySite = require('./gulp/deploySite');
const buildSite = require('./gulp/buildSite');
const release = require('./gulp/release');

gulp.task('default', ['precompile']);

gulp.task('jsdoc', ['jsdoc:clear', 'license'], generateJSDoc);
gulp.task('jsdoc:clear', jsDocsClear);

gulp.task('bundle', ['precompile'], jsBundle);
gulp.task('precompile', ['license', 'clear'], jsPrecompile);
gulp.task('license', ['detectErrors'], addLicense);
gulp.task('detectErrors', jsDetectErrors);
gulp.task('clear', jsClear);
gulp.task('deploySite', ['buildSite'], deploySite);
gulp.task('buildSite', ['archive'], buildSite);
gulp.task('archive', ['bundle'], archive);
gulp.task('release', release);
