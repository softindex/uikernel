/* eslint-disable @typescript-eslint/no-unsafe-return */
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Newable} from 'ts-essentials';
import createMockedMethod from './createMockedMethod';

function createMockInstance<TClass>(Schema: Newable<TClass>): jest.Mocked<TClass> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function Instance(): void {}

  const schemaPrototype = Schema.prototype as object;

  Instance.prototype = Object.create(schemaPrototype);
  const mockSource: Record<string | symbol, unknown> = {};

  return new Proxy(Reflect.construct(Instance, []), {
    get(target, property) {
      if (typeof target[property] !== 'function') {
        return target[property];
      }

      if (!(property in mockSource)) {
        mockSource[property] = createMockedMethod(schemaPrototype.constructor.name, property.toString());
      }

      return mockSource[property];
    },
    set(target, property, value) {
      target[property] = value;
      mockSource[property] = value;

      return true;
    }
  });
}

export default createMockInstance;
