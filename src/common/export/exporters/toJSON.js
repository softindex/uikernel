/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var suspend = require('suspend');

var toJSON = suspend.async(function * (data) {
  return {
    mime: 'application/json',
    data: {
      records: data.records,
      totals: data.totals
    }
  };
});

module.exports = toJSON;
