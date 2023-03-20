/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import common from './common';

// @ts-expect-error: TS7017 Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature
if (!window._babelPolyfill) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@babel/polyfill/browser');
}

export default common;
