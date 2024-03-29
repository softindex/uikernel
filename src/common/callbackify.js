/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {warn} from './utils';

const functionsNames = [];

function callbackify(func, hideWarning = false) {
  const funcName = func.name;

  return function (...args) {
    const lastArgumentIndex = args.length - 1;
    const cb = args[lastArgumentIndex];

    if (typeof cb === 'function' && !cb.__ignoreUIKernelWarning) {
      if (!functionsNames.includes(funcName) && !hideWarning) {
        warn(`You are using callback in: '${funcName}'. Use promise instead.\n${JSON.stringify(args)}`);
        functionsNames.push(funcName);
      }

      const result = func.apply(this, args);
      if (result?.then) {
        result
          .then((data) => {
            cb(null, data);
          })
          .catch((err) => {
            cb(err);
          });
      }
    } else {
      return func.apply(this, args);
    }
  };
}

export default callbackify;
