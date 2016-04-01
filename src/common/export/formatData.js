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

var utils = require('../utils');

function formatColumns(columns, viewColumns) {
  var formattedColumns = {};

  for (var i = 0; i < viewColumns.length; i++) {
    var column = viewColumns[i];
    var columnName = columns[column].name;

    formattedColumns[column] = columnName;
  }

  return formattedColumns;
}

function formatRecord(record, columns) {
  var formattedRecord = utils.clone(record);

  utils.values(columns).map(function (column) {
    for (var key in record) {
      if (key === column.render[0]) {
        formattedRecord[key] = column.render[column.render.length - 1](record);
      }
    }
  });

  return formattedRecord;
}

function formatData(records, totals, columns, viewColumns) {
  return {
    columns: formatColumns(columns, viewColumns),
    records: records.map(function (record) {
      return utils.pick(formatRecord(record[1], columns), viewColumns);
    }),
    totals: utils.pick(formatRecord(totals, columns), viewColumns, '')
  };
}

module.exports = formatData;
