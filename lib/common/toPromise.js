'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functionsNames = []; /**
                          * Copyright (с) 2015-present, SoftIndex LLC.
                          * All rights reserved.
                          *
                          * This source code is licensed under the BSD-style license found in the
                          * LICENSE file in the root directory of this source tree.
                          */

function toPromise(func, hideWarning) {
  var funcName = func.name;

  function warn(text) {
    if (!hideWarning) {
      if (!functionsNames.includes(funcName)) {
        _utils2.default.warn(text);
        functionsNames.push(funcName);
      }
    }
  }

  return function () {
    for (var _len = arguments.length, mainArguments = Array(_len), _key = 0; _key < _len; _key++) {
      mainArguments[_key] = arguments[_key];
    }

    var promise = void 0;
    var callbackPromise = new _promise2.default(function (resolve, reject) {
      function toPromiseCallback(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
      toPromiseCallback.__ignoreUIKernelWarning = true;
      mainArguments.push(toPromiseCallback);
      promise = func.apply(undefined, mainArguments);
    });

    if (promise) {
      if (promise.then && promise.catch) {
        return promise;
      }
      warn('The return value is not a Promise in \'' + funcName + '\'.\n' + ('Arguments: ' + (0, _stringify2.default)(mainArguments) + '\n') + ('Returns: ' + (0, _stringify2.default)(promise)));
      return callbackPromise;
    } else {
      warn('You are using callback in: \'' + funcName + '\'. Use promise instead.\n' + ('Arguments: ' + (0, _stringify2.default)(mainArguments)));
      return callbackPromise;
    }
  };
}

exports.default = toPromise;
module.exports = exports['default'];