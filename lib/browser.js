"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = _interopRequireDefault(require("./common"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (!window._babelPolyfill) {
  require('@babel/polyfill/browser');
}

var _default = _common["default"];
exports["default"] = _default;
module.exports = exports.default;