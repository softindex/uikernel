/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

module.exports = function (fun, multiplyArgs) {
  return function (...mainArguments) {
    mainArguments = mainArguments.filter((elem) => elem);
    var lastArgumentIndex = mainArguments.length - 1;
    if (typeof mainArguments[lastArgumentIndex] === 'function') {
      // console.warn('You are using callback(');
      fun.apply(this, mainArguments);
    }
    else {
      return new Promise(function (resolve, reject) {
        mainArguments.push(function (err, ...data) {
          if (err) return reject(err);
          if (multiplyArgs){
            resolve(data);
          }
          else resolve(data[0]);
        });
        fun.apply(this, mainArguments);
      }.bind(this));
    }
  };
};
