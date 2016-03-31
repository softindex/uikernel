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

var _ = require('lodash');
var suspend = require('suspend');
var csv = require('csv-stringify');

var toCSV = suspend.async(function * (data) {
  var formattedTotals = _.values(data.totals);
  formattedTotals.unshift('');

  var result = [data.columns].concat(
    data.records.map(function (record) {
      return _.values(record);
    }),
    [formattedTotals]
  );

  return {
    mime: 'text/csv',
    data: yield csv(result, suspend.resume())
  };
});

module.exports = toCSV;
