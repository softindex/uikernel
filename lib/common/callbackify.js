"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = _interopRequireDefault(require("../common/utils"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var functionsNames = [];

function _default(func) {
  var hideWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var funcName = func.name;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lastArgumentIndex = args.length - 1;
    var cb = args[lastArgumentIndex];

    if (typeof cb === 'function' && !cb.__ignoreUIKernelWarning) {
      if (!functionsNames.includes(funcName) && !hideWarning) {
        _utils.default.warn("You are using callback in: '".concat(funcName, "'. Use promise instead.\n").concat(JSON.stringify(args)));

        functionsNames.push(funcName);
      }

      var result = func.apply(this, args);

      if (result && result.then) {
        result.then(function (data) {
          cb(null, data);
        }).catch(function (err) {
          cb(err);
        });
      }
    } else {
      return func.apply(this, args);
    }
  };
}

module.exports = exports.default;