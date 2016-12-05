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

var csv = require('csv-stringify');
var callbackify = require('../../../common/callbackify');
var toPromise = require('../../../common/toPromise');

var toCSV = callbackify(async function (data) {
  var csvData = await toPromise(csv(data.records.concat([data.totals]),
    {
      header: true,
      columns: data.columns
    }));

  return {
    mime: 'text/csv',
    data: csvData
  };
});

module.exports = toCSV;
