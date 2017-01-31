/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

var toPromise = function toPromise(func, hideWarning) {
  var funcName = func.name;
  return function () {
    for (var _len = arguments.length, mainArguments = Array(_len), _key = 0; _key < _len; _key++) {
      mainArguments[_key] = arguments[_key];
    }

    var promise = void 0;
    var callbackPromise = new _promise2.default(function (resolve, reject) {
      mainArguments.push(function toPromiseCallback(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
      promise = func.apply(undefined, mainArguments);
    });

    if (promise) {
      if (promise.then && promise.catch) {
        return promise;
      }
      _utils2.default.warn('The return value is not a Promise');
      return callbackPromise;
    } else {
      if (!hideWarning) {
        if (!functionsNames.includes(funcName)) {
          _utils2.default.warn('You are used callback in: \'' + funcName + '\'. Use promise instead.\n' + (0, _stringify2.default)(mainArguments));
          functionsNames.push(funcName);
        }
      }
      return callbackPromise;
    }
  };
};

exports.default = toPromise;
module.exports = exports['default'];