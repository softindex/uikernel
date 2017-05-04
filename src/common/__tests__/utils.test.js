/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../utils';
import ThrottleError from '../ThrottleError';

describe('init form', () => {
  function makeRequest(data, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(null, data), delay);
    });
  }

  it('serial delay request', async () => {
    const throttleRequest = utils.throttle(makeRequest);
    const firstRequest = throttleRequest(1, 1);
    expect(await firstRequest).toBe(1);

    const secondRequest = throttleRequest(2, 1);
    expect(await secondRequest).toBe(2);

    const lastRequest = throttleRequest(3, 1);
    expect(await lastRequest).toBe(3);
  });

  it('serial pending request', async () => {
    const throttleRequest = utils.throttle(makeRequest);
    const firstRequest = throttleRequest(1, 10);
    const secondRequest = throttleRequest(2, 10);
    const lastRequest = throttleRequest(3, 10);

    let error;
    try {
      await firstRequest;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(ThrottleError);

    error = null;
    try {
      await secondRequest;
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(ThrottleError);

    expect(await lastRequest).toBe(3);
  });

  it('serial request callback', () => {
    let cb;
    const makeRequestCB = jest.fn(cbWrapper => cb = cbWrapper);
    const throttleRequest = utils.throttle(makeRequestCB);

    throttleRequest(jest.fn());// request 1 start
    expect(makeRequestCB).toHaveBeenCalledTimes(1);
    cb();// request 1 done

    throttleRequest(jest.fn());
    expect(makeRequestCB).toHaveBeenCalledTimes(2);// request 2 start

    throttleRequest(jest.fn());
    expect(makeRequestCB).toHaveBeenCalledTimes(2);// request 3 wait

    let data;
    throttleRequest(jest.fn( () => data = true));
    expect(makeRequestCB).toHaveBeenCalledTimes(2);// request 4 wait
    cb();// request 2 done
    expect(makeRequestCB).toHaveBeenCalledTimes(3);// request 4 start
    cb();// request 4 done
    expect(data).toBeTruthy();
    // request 3 killed
  });
});
