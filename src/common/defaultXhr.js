/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import variables from './variables';
import xhr from 'xhr';

const defaultXhr = (settings, cb) => new Promise((resolve, reject) => {
  xhr(settings, (err, response, body) => {
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

if (!variables.get('xhr')) {
  variables.set('xhr', defaultXhr);
}

module.exports = (settings, cb) => variables.get('xhr')(settings, cb);
