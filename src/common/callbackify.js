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
module.exports = function (func) {
  const funcName = func.name;

  return function (...mainArguments) {
    const lastArgumentIndex = mainArguments.length - 1;
    let cb = mainArguments[lastArgumentIndex];

    if (typeof cb === 'function') {

      if (functionsNames.indexOf(funcName) === -1) {
        console.warn(`You are used callback in: '${funcName}'. Use promise instead`);
        functionsNames.push(funcName);
      }

      func.apply(this, mainArguments)
        .then(data =>{
          cb(null, data);
        })
        .catch(err =>{
          cb(err);
        });
    }
    else {
      return func.apply(this, mainArguments);
    }
  };
};
