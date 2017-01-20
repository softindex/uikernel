/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';

const functionsNames = [];

const toPromise = function (func, hideWarning) {
  const funcName = func.name;
  return function (...mainArguments) {
    let promise;
    const callbackPromise = new Promise((resolve, reject) => {
      mainArguments.push(function toPomiseCallback(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
      promise = func(...mainArguments);
    });

    if (promise) {
      if (promise.then && promise.catch) {
        return promise;
      }
      utils.warn('The return value is not a function');
    } else {
      if (!hideWarning) {
        if (!functionsNames.includes(funcName)) {
          utils.warn(`You are using callback in: '${funcName}'. Use promise instead`);
          functionsNames.push(funcName);
        }
      }
      return callbackPromise;
    }
  };
};

export default toPromise;
