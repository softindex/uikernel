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

var toCSV = suspend.callback(regeneratorRuntime.mark(function callee$0$0(data) {
  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
    case 0:
      context$1$0.next = 2;

      return csv(
        data.records.concat([data.totals]),
        {
          header: true,
          columns: data.columns
        },
        suspend.resume()
      );
    case 2:
      context$1$0.t0 = context$1$0.sent;

      return context$1$0.abrupt("return", {
        mime: 'text/csv',
        data: context$1$0.t0
      });
    case 4:
    case "end":
      return context$1$0.stop();
    }
  }, callee$0$0, this);
}));

module.exports = toCSV;
