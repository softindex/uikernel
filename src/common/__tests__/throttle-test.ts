/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ThrottleError from '../error/ThrottleError';
import throttle from '../throttle';

async function makeRequest(data?: unknown): Promise<unknown> {
  return new Promise((resolve) => {
    setImmediate(() => resolve(data));
  });
}

describe('Throttle', () => {
  it('Should handle one by one if called in turn', async () => {
    const request = throttle(makeRequest);

    const firstResponse = await request(1);
    expect(firstResponse).toBe(1);

    const secondResponse = await request(2);
    expect(secondResponse).toBe(2);

    const lastResponse = await request(3);
    expect(lastResponse).toBe(3);
  });

  it('Should handle last if called simultaneously', async () => {
    const request = throttle(makeRequest);
    let receivedError1;
    let receivedError2;
    let receivedResult;

    // First request throws error
    const firstRequest = request(1).catch((error) => {
      receivedError1 = error;
    });

    // Second request throws error
    const secondRequest = request(2).catch((error) => {
      receivedError2 = error;
    });

    // Last request return value
    const lastRequest = request(3).then((data) => {
      receivedResult = data;
      expect(data).toBe(3);
    });

    await Promise.all([firstRequest, secondRequest, lastRequest]);

    expect(receivedError1).toBeInstanceOf(ThrottleError);
    expect(receivedError2).toBeInstanceOf(ThrottleError);
    expect(receivedResult).toBe(3);
  });

  // There was bug with reusing fulfilled promise (e79f4db)
  it('Should let catch all ThrottleErrors without unhandled promise rejection', async () => {
    const throttledRequest = throttle(makeRequest);

    // Catch errors so that Promise.all wait for completion of all promises
    async function asyncFuncCatchingThrottleErrors(result?: unknown): Promise<unknown> {
      try {
        await throttledRequest();
      } catch (e) {
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
      }

      return result;
    }

    const result1 = await Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);
    const result2 = await Promise.all([
      asyncFuncCatchingThrottleErrors(1),
      asyncFuncCatchingThrottleErrors('1')
    ]);

    expect(result1).toStrictEqual([undefined, undefined]);
    expect(result2).toStrictEqual([1, '1']);
  });
});
