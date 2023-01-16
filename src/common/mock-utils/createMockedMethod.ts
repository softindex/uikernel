/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function createMockedMethod<TResult>(
  className: string,
  methodName: string
  // Parameters are any - overload resolution in conditional types is not supported yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): jest.Mock<TResult, any> {
  return jest.fn(() => {
    throw new Error(`"${className}.${methodName}" not implemented yet`);
  });
}

export default createMockedMethod;
