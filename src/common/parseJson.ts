/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArgumentsError from './error/ArgumentsError';

function parseJson(json: unknown, errorMessage = 'Incorrect JSON'): unknown {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(json as any);
  } catch (err) {
    throw new ArgumentsError(errorMessage);
  }
}

export default parseJson;
