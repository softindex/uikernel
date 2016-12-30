/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';

const functionsNames = [];
export default function (func) {
  const funcName = func.name;

  return function (...args) {
    const lastArgumentIndex = args.length - 1;
    const cb = args[lastArgumentIndex];

    if (typeof cb === 'function') {
      if (!functionsNames.includes(funcName)) {
        utils.warn(`You are used callback in: '${funcName}'. Use promise instead`);
        functionsNames.push(funcName);
      }

      func.apply(this, args.slice(0, -1))
        .then(data => {
          cb(null, data);
        })
        .catch(err => {
          cb(err);
        });
    } else {
      return func.apply(this, args);
    }
  };
}
