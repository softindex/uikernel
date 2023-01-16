/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ThrottleError from './error/ThrottleError';
import {getStack} from './utils';

type TFunction<TArgs extends unknown[], TResult> = (...args: TArgs) => TResult;

/**
 * Prevents calling passed function `func` while it wasn't finished.
 */
function throttle<TResult = unknown, TArgs extends unknown[] = []>(
  func: TFunction<TArgs, Promise<TResult>>
): TFunction<TArgs, Promise<TResult>> {
  let worked = false;
  let nextArguments: TArgs | undefined;
  let nextResolve: ((value: PromiseLike<TResult> | TResult) => void) | undefined;

  return function (...args) {
    return (
      throttlePromise(func)
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-invalid-this
        .apply(this, args)
    );
  };

  function throttlePromise(func: TFunction<TArgs, Promise<TResult>>): TFunction<TArgs, Promise<TResult>> {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run(...args) {
      const parentStack = '\n' + getStack();

      return new Promise<TResult>((resolve, reject) => {
        if (worked) {
          if (nextResolve) {
            const error = new ThrottleError(parentStack);
            error.message += `\ndata = ${args[0]}`;
            nextResolve(Promise.reject(error));
          }

          nextArguments = args;
          nextResolve = resolve;
          return;
        }

        worked = true;

        func
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-invalid-this
          .apply(this, args)
          .then((result) => {
            worked = false;
            if (nextResolve && nextArguments) {
              // @ts-expect-error
              // eslint-disable-next-line @typescript-eslint/no-invalid-this
              nextResolve(run.apply(this, nextArguments));
              nextResolve = undefined;
              nextArguments = undefined;

              const error = new ThrottleError(parentStack);
              reject(error);
              return;
            }

            resolve(result);
          })
          .catch((err) => {
            worked = false;
            if (nextResolve && nextArguments) {
              // @ts-expect-error
              // eslint-disable-next-line @typescript-eslint/no-invalid-this
              nextResolve(run.apply(this, nextArguments));
              nextResolve = undefined;
              nextArguments = undefined;
            }

            reject(err);
          });
      });
    };
  }
}

export default throttle;
