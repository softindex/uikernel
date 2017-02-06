/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';

const functionsNames = [];

function toPromise(func, hideWarning) {
  const funcName = func.name;

  function warn(text) {
    if (!hideWarning) {
      if (!functionsNames.includes(funcName)) {
        utils.warn(text);
        functionsNames.push(funcName);
      }
    }
  }

  return function (...mainArguments) {
    let promise;
    const callbackPromise = new Promise((resolve, reject) => {
      function toPromiseCallback(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
      toPromiseCallback.__ignoreUIKernelWarning = true;
      mainArguments.push(toPromiseCallback);
      promise = func(...mainArguments);
    });

    if (promise) {
      if (promise.then && promise.catch) {
        return promise;
      }
      warn(
        `The return value is not a Promise in '${funcName}'.\n` +
        `Arguments: ${JSON.stringify(mainArguments)}\n` +
        `Returns: ${JSON.stringify(promise)}`
      );
      return callbackPromise;
    } else {
      warn(
        `You are used callback in: '${funcName}'. Use promise instead.\n` +
        `Arguments: ${JSON.stringify(mainArguments)}`
      );
      return callbackPromise;
    }
  };
}

export default toPromise;
