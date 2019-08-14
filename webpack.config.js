/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeBundle = {
  target: 'node',
  entry: './src/node.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'UIKernel',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {test: /\.js|ts|tsx$/, exclude: /node_modules/, loader: 'awesome-typescript-loader'}
    ],
  },
  externals: [nodeExternals()],
  mode: 'development',
  devtool: 'inline-source-map'
};

const browserBundle = {
  target: 'web',
  entry: './src/browser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'uikernel.js',
    libraryTarget: 'umd',
    library: 'UIKernel',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {test: /\.js|ts|tsx$/, exclude: /node_modules/, loader: 'awesome-typescript-loader'}
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map'
};

const browserMinBundle = {
  target: 'web',
  entry: './src/browser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'uikernel.min.js',
    libraryTarget: 'umd',
    library: 'UIKernel',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {test: /\.js|ts|tsx$/, exclude: /node_modules/, loader: 'awesome-typescript-loader'}
    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  mode: 'production'
};

const bundles = [
  nodeBundle,
  browserBundle,
  browserMinBundle
];

module.exports = bundles;
