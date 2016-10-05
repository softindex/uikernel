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
var ArgumentsError = require('../../common/ArgumentsError');

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
  var formatted = {
    columns: formatColumns(columns, viewColumns),
    records: records.map(function (record) {
      return utils.pick(formatRecord(record[1], columns), viewColumns);
    })
  };
  if (totals) {
    formatted.totals = utils.pick(formatRecord(totals, columns), viewColumns, '');
  }
  return formatted;
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
 * @param {{}} columns
 * @param {string[]} viewColumns
 */
function assertValidViewColumns(columns, viewColumns){
  if(!viewColumns || !viewColumns.length){
    throw new ArgumentsError('"viewColumns" can`t be empty');
  }

  var i;
  var notExistColumns = [];
  for (i = 0; i < viewColumns.length; i++) {
    if (!columns[viewColumns[i]]) {
      notExistColumns.push(JSON.stringify(viewColumns[i]))
    }
  }

  if(notExistColumns.length){
    throw new ArgumentsError('You trying to get not exist columns: [' + notExistColumns.join(', ') + '];');
  }
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
module.exports = suspend.callback(regeneratorRuntime.mark(function callee$0$0(gridModel, columns, viewColumns, exporter, settings) {
  var result, data;

  return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
    case 0:
      assertValidViewColumns(columns, viewColumns);
      context$1$0.next = 3;

      return gridModel.read({
        fields: getFields(columns, viewColumns),
        sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : null,
        limit: settings.limit,
        offset: settings.offset
      }, suspend.resume());
    case 3:
      result = context$1$0.sent;
      data = formatData(result.records, result.totals, columns, viewColumns);
      context$1$0.next = 7;
      return exporter(data, suspend.resume());
    case 7:
      return context$1$0.abrupt("return", context$1$0.sent);
    case 8:
    case "end":
      return context$1$0.stop();
    }
  }, callee$0$0, this);
}));
