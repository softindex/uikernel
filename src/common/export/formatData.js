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

function formatRecord(record, columns) {
  var formattedRecord = _.mapValues(record, function (value, key) {
    columns.map(function (column) {
      if (key === column.render[0]) {
        value = _.last(column.render)(record);
      }
    });

    return value;
  });

  return formattedRecord;
}

function formatData(columns, records, totals) {
  var columnsNames = [];
  var formattedColumns = columns.map(function (column) {
    var formattedName = column.name.replace(/<(.|\n)*?>/g, '').trim();
    column.name = formattedName;

    columnsNames.push(column.render[0]);

    return _.pick(column, ['name', 'render']);
  });

  return {
    columns: formattedColumns.map(function (column) {
      return column.name;
    }),
    records: records.map(function (record) {
      return _.pick(formatRecord(record[1], formattedColumns), columnsNames);
    }),
    totals: _.pick(formatRecord(totals, formattedColumns), columnsNames)
  };
}

module.exports = formatData;
