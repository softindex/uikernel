"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _variables = _interopRequireDefault(require("./variables"));

var _xhr = _interopRequireDefault(require("xhr"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function defaultXhr(settings) {
  return new Promise(function (resolve, reject) {
    (0, _xhr["default"])(settings, function (err, response, body) {
      if (response.statusCode === 200) {
        resolve(body);
        return;
      }

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
    });
  });
}

if (!_variables["default"].get('xhr')) {
  _variables["default"].set('xhr', defaultXhr);
}

var _default = function _default(settings) {
  return _variables["default"].get('xhr')(settings);
};

exports["default"] = _default;
module.exports = exports.default;