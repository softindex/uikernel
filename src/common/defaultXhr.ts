/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {StrictOmit} from 'ts-essentials';
import xhr, {XhrResponse, XhrUriConfig, XhrUrlConfig} from 'xhr';
import RequestError from './error/RequestError';
import variables from './variables';

export type DefaultXhrSettings = XhrUriConfig | XhrUrlConfig;

export interface DefaultXhr {
  (settings: StrictOmit<DefaultXhrSettings, 'json'> & {json?: false}): Promise<string>;
  (settings: DefaultXhrSettings | (StrictOmit<DefaultXhrSettings, 'json'> & {json: true})): Promise<unknown>;
}

function defaultRequest(settings: DefaultXhrSettings): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const callStack = new Error().stack;

    xhr(settings, (exception?: Error, response?: XhrResponse, body?: unknown) => {
      const statusCode = response?.statusCode || 0;

      // if server sends statusCode 1xx and 3xx - client got exception with statusCode 0
      if (statusCode >= 200 && statusCode < 300) {
        resolve(body);
        return;
      }

      if (exception || !statusCode) {
        const error = new RequestError('Network Error', statusCode, exception, callStack);
        reject(error);
        return;
      }

      const error = new RequestError('', statusCode, undefined, callStack);
      if (body) {
        try {
          const parsedBody = JSON.parse(body as string);
          error.message = parsedBody.message || body;
        } catch (e) {
          error.message = body as string;
        }
      }

      if (!error.message) {
        error.message = `Status Code: ${statusCode}.`;
      }

      reject(error);
    });
  });
}

if (!variables.get('xhr')) {
  variables.set('xhr', defaultRequest);
}

const defaultXhr: DefaultXhr = (settings: DefaultXhrSettings) => variables.get('xhr')(settings);

export default defaultXhr;
