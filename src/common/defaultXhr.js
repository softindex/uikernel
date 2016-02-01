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
  xhr(settings, function (err, response, body) {
    if (err && body) {
      try {
        var parsedBody = JSON.parse(body);
        err.message = parsedBody.message || body;
      } catch (e) {
        err.message = body;
      }
    }

    cb(err, response, body);
  });
};

module.exports = function (settings, cb) {
  (variables.get('xhr') || defaultXhr)(settings, cb);
};
