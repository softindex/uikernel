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
var docsClear = require('./gulp/docsClear');
var generateJSDoc = require('./gulp/generateJSDoc');
var jsBundle = require('./gulp/jsBundle');
var addLicense = require('./gulp/addLicense');

gulp.task('default', ['precompile']);

gulp.task('docs', ['docs:clear'], generateJSDoc);
gulp.task('docs:clear', ['bundle'], docsClear);

gulp.task('bundle', ['precompile'], jsBundle);
gulp.task('precompile', ['license'], jsPrecompile);
gulp.task('license', ['detectErrors'], addLicense);
gulp.task('detectErrors', ['clear'], jsDetectErrors);
gulp.task('clear', jsClear);
