"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../common/utils"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var functionsNames = [];

function toPromise(func, hideWarning) {
  var funcName = func.name;

  function warn(text) {
    if (!hideWarning) {
      if (!functionsNames.includes(funcName)) {
        _utils.default.warn(text);

        functionsNames.push(funcName);
      }
    }
  }

  return function () {
    for (var _len = arguments.length, mainArguments = new Array(_len), _key = 0; _key < _len; _key++) {
      mainArguments[_key] = arguments[_key];
    }

    var promise;
    var callbackPromise = new Promise(function (resolve, reject) {
      function toPromiseCallback(err, data) {
        if (err) {
          return reject(err);
        }

        resolve(data);
      }

      toPromiseCallback.__ignoreUIKernelWarning = true;
      mainArguments.push(toPromiseCallback);
      promise = func.apply(void 0, mainArguments);
    });

    if (promise) {
      if (promise.then && promise.catch) {
        return promise;
      }

      warn("The return value is not a Promise in '".concat(funcName, "'.\n") + "Arguments: ".concat(JSON.stringify(mainArguments), "\n") + "Returns: ".concat(JSON.stringify(promise)));
      return callbackPromise;
    } else {
      warn("You are using callback in: '".concat(funcName, "'. Use promise instead.\n") + "Arguments: ".concat(JSON.stringify(mainArguments)));
      return callbackPromise;
    }
  };
}

var _default = toPromise;
exports.default = _default;
module.exports = exports.default;