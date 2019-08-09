/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const variables: {[index: string]: any} = {};

export default {
  get: (key: string) => variables[key],
  set: (key: string, value: any) => {
    variables[key] = value;
  }
};
