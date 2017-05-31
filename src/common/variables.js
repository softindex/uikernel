/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const variables = {};

export default {
  get: key => variables[key],
  set: (key, value) => {
    variables[key] = value;
  }
};
