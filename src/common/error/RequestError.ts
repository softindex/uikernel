/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class RequestError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
    cause: Error | undefined,
    parentCallStack: string | undefined
  ) {
    super(message);

    this.statusCode = statusCode;
    this.cause = cause;

    if (parentCallStack) {
      this.stack += '\n' + parentCallStack;
    }
  }
}

export default RequestError;
