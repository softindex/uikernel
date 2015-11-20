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
var jsDetectErrors = require('./gulp/jsDetectErrors');
var jsPrecompile = require('./gulp/jsPrecompile');
var jsClear = require('./gulp/jsClear');
var jsDocsClear = require('./gulp/jsDocsClear');
var generateJSDoc = require('./gulp/generateJSDoc');
var archive = require('./gulp/archive');
var jsBundle = require('./gulp/jsBundle');
var addLicense = require('./gulp/addLicense');
var deploySite = require('./gulp/deploySite');
var buildSite = require('./gulp/buildSite');

gulp.task('default', ['precompile']);

gulp.task('jsDocs', ['jsDocs:clear'], generateJSDoc);
gulp.task('jsDocs:clear', ['bundle'], jsDocsClear);

gulp.task('bundle', ['precompile'], jsBundle);
gulp.task('precompile', ['license'], jsPrecompile);
gulp.task('license', ['detectErrors'], addLicense);
gulp.task('detectErrors', ['clear'], jsDetectErrors);
gulp.task('clear', jsClear);
gulp.task('deploySite', ['buildSite'], deploySite);
gulp.task('buildSite', ['bundle', 'archive'], buildSite);
gulp.task('archive', archive);
