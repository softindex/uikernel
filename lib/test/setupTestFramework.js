"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("raf/polyfill");

require("@babel/polyfill");

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});