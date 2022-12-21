/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import xhr from 'xhr';
import variables from './variables';

function defaultXhr(settings) {
  return new Promise((resolve, reject) => {
    xhr(settings, (err, response, body) => {
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
          const parsedBody = JSON.parse(body);
          err.message = parsedBody.message || body;
        } catch (e) {
          err.message = body;
        }
      }

      reject(err);
    });
  });
}

if (!variables.get('xhr')) {
  variables.set('xhr', defaultXhr);
}

export default (settings) => variables.get('xhr')(settings);
