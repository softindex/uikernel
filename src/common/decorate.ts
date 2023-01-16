/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// use function, because for class property "prototype" readonly
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Decorator<T extends {}>(this: {}, obj: T, decor: Partial<T>) {
  Object.assign(this, decor);

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const originalMethod = obj[key];
    if (typeof originalMethod === 'function' && !decor[key]) {
      Object.assign(this, {[key]: originalMethod.bind(obj)});
    }
  }
}

function decorate<T extends {}>(obj: T, decor: Partial<T>): T {
  Decorator.prototype = obj;
  // @ts-expect-error new expression
  return new Decorator(obj, decor) as T;
}

export default decorate;
