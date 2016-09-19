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
var utils = require('../../common/utils');

function formatColumns(columns, viewColumns) {
  var formattedColumns = {};
  var columnId;
  var i;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    formattedColumns[columnId] = (columns[columnId].parent ? columns[columnId].parent + ' ': '') +
      columns[columnId].name;
  }

  return formattedColumns;
}

function formatRecord(record, columns) {
  var columnId;
  var column;
  var formattedRecord = utils.clone(record);

  for (columnId in columns) {
    column = columns[columnId];
    formattedRecord[columnId] = column.render[column.render.length - 1](record);
  }

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

function getFields(columns, viewColumns) {
  var fields = {};
  var i;
  var j;
  var columnId;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    for (j = 0; j < columns[columnId].render.length - 1; j++) {
      fields[columns[columnId].render[j]] = true;
    }
  }

  return Object.keys(fields);
}

/**
 * @param {{}}                    gridModel
 * @param {{}}                    columns
 * @param {string[]}              viewColumns
 * @param {Function}              exporter
 * @param {{}}                    settings
 * @param {[string, string][]}      settings.sort
 * @param {number}                  settings.limit
 * @param {number}                  settings.offset
 * @param {string[]}                settings.viewColumns
 * @param {Function}              cb
 */
module.exports = suspend.callback(function * (gridModel, columns, viewColumns, exporter, settings) {
  var result = yield gridModel.read({
    fields: getFields(columns, viewColumns),
    sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : null,
    limit: settings.limit,
    offset: settings.offset
  }, suspend.resume());

  var data = formatData(result.records, result.totals, columns, viewColumns);

  return yield exporter(data, suspend.resume());
});
