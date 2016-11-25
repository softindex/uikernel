/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var xhr = require('xhr');
var variables = require('./variables');

var defaultXhr = function (settings, cb) {
  return new Promise(function (resolve, reject) {
    xhr(settings, function (err, response, body) {
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

      if (cb)
        cb(err, response, body);
      resolve(body);
    });
  });
};

if (!variables.get('xhr')) {
  variables.set('xhr', defaultXhr);
}

module.exports = function (settings, cb) {
  return variables.get('xhr')(settings, cb);
};
