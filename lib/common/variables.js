"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var variables = {};
var _default = {
  get: function get(key) {
    return variables[key];
  },
  set: function set(key, value) {
    variables[key] = value;
  }
};
exports.default = _default;
module.exports = exports.default;