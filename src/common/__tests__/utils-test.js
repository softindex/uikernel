/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../utils';
import ThrottleError from '../ThrottleError';

function makeRequest(data) {
  return new Promise((resolve) => {
    setImmediate(() => resolve(data));
  });
}

describe('Throttle promise', () => {
  it('Should handle one by one if called in turn', async () => {
    const request = utils.throttle(makeRequest);

    const firstResponse = await request(1);
    expect(firstResponse).toBe(1);

    const secondResponse = await request(2);
    expect(secondResponse).toBe(2);

    const lastResponse = await request(3);
    expect(lastResponse).toBe(3);
  });

  it('Should handle last if called simultaneously', () => {
    const request = utils.throttle(makeRequest);

    // First request throws error
    const firstRequest = request(1)
      .catch(error => {
        expect(error).toBeInstanceOf(ThrottleError);
      });

    // Second request throws error
    const secondRequest = request(2)
      .catch(error => {
        expect(error).toBeInstanceOf(ThrottleError);
      });

    // Last request return value
    const lastRequest = request(3);
    lastRequest
      .then(data => {
        expect(data).toBe(3);
      });

    return Promise.all([firstRequest, secondRequest, lastRequest])
  });
});

describe('Throttle callback', () => {
  it('Should handle last if called simultaneously', () => {
    let resolve;
    const requestCallback = jest.fn(cbWrapper => resolve = cbWrapper);
    const request = utils.throttle(requestCallback);

    request(jest.fn()); // request 1 start
    expect(requestCallback).toHaveBeenCalledTimes(1);
    resolve();// request 1 done

    request(jest.fn());
    expect(requestCallback).toHaveBeenCalledTimes(2); // request 2 start

    request(jest.fn());
    expect(requestCallback).toHaveBeenCalledTimes(2); // request 3 wait

    let isLastCbHandled;
    request(jest.fn(() => isLastCbHandled = true));

    expect(requestCallback).toHaveBeenCalledTimes(2); // request 4 wait
    resolve();// request 2 done
    expect(requestCallback).toHaveBeenCalledTimes(3); // request 4 start
    resolve();// request 4 done

    expect(isLastCbHandled).toBeTruthy();
  });
});
