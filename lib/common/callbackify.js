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

exports.default = function (func) {
  var hideWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var funcName = func.name;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lastArgumentIndex = args.length - 1;
    var cb = args[lastArgumentIndex];

    if (typeof cb === 'function' && cb.name !== 'toPromiseCallback') {
      if (!functionsNames.includes(funcName) && !hideWarning) {
        _utils2.default.warn('You are used callback in: \'' + funcName + '\'. Use promise instead.\n' + (0, _stringify2.default)(args));
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
};

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

module.exports = exports['default'];