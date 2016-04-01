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
var csv = require('csv-stringify');

var toCSV = suspend.async(function * (data) {
  return {
    mime: 'text/csv',
    data: yield csv(
      data.records.concat([data.totals]),
      {header: true, columns: data.columns},
      suspend.resume()
    )
  };
});

module.exports = toCSV;
