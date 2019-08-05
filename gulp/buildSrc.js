/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const webpack = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');
const merge = require('merge-stream');

function buildSrc() {
  return merge.apply(null, webpackConfig.map(config => webpack(config)));
}

module.exports = buildSrc;
