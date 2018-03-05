'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var defaultXhr = function defaultXhr(settings, cb) {
  return new _promise2.default(function (resolve, reject) {
    (0, _xhr2.default)(settings, function (err, response, body) {
      if (response.statusCode !== 200) {
        if (!err) {
          err = new Error();
          err.statusCode = response.statusCode;
          err.message = 'Status Code: ' + err.statusCode;
        }
        if (body) {
          try {
            var parsedBody = JSON.parse(body);
            err.message = parsedBody.message || body;
          } catch (e) {
            err.message = body;
          }
        }
        reject(err);
      }

      if (cb) {
        cb(err, body);
      }
      resolve(body);
    });
  });
};

if (!_variables2.default.get('xhr')) {
  _variables2.default.set('xhr', defaultXhr);
}

exports.default = function (settings, cb) {
  return _variables2.default.get('xhr')(settings, cb);
};

module.exports = exports['default'];