/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

const functionsNames = [];
module.exports = (func, onlyPromise) => {
  const funcName = func.name;
  return function (...mainArguments) {
    let promise;
    const callbackPromise = new Promise((resolve, reject) => {
      mainArguments.push((err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
      promise = func(...mainArguments);
    });

    if (promise) {
      if (promise.then) {
        return promise;
      }

      if (onlyPromise) {
        return callbackPromise;
      }

      return Promise.resolve(promise);
    } else {
      if (functionsNames.indexOf(funcName) === -1) {
        console.warn(`You are used callback in: '${funcName}'. Use promise instead`);
        functionsNames.push(funcName);
      }
      return callbackPromise;
    }
  };
};