/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

async function toJSON(data) {
  return {
    mime: 'application/json',
    data: {
      records: data.records,
      totals: data.totals
    }
  };
}

export default toJSON;
