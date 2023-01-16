/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collection: Record<string, any> = {};

const variables = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (key: string): any => collection[key],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (key: string, value: any): void => {
    collection[key] = value;
  }
};

export default variables;
