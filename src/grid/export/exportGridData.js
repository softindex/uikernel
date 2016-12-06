/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import toPromise from '../../common/toPromise';
import callbackify from '../../common/callbackify';
import ArgumentsError from '../../common/ArgumentsError';
import utils from '../../common/utils';

function formatColumns(columns, viewColumns) {
  const formattedColumns = {};
  let columnId;
  let i;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    formattedColumns[columnId] = `${columns[columnId].parent ? columns[columnId].parent + ' ' : ''}${columns[columnId].name}`;
  }

  return formattedColumns;
}

function formatRecord(record, columns) {
  let columnId;
  let column;
  const formattedRecord = utils.clone(record);

  for (columnId in columns) {
    column = columns[columnId];
    formattedRecord[columnId] = column.render[column.render.length - 1](record);
  }

  return formattedRecord;
}

function formatData(records, totals, columns, viewColumns) {
  const formatted = {
    columns: formatColumns(columns, viewColumns),
    records: records.map(record => utils.pick(formatRecord(record[1], columns), viewColumns))
  };
  if (totals) {
    formatted.totals = utils.pick(formatRecord(totals, columns), viewColumns, '');
  }
  return formatted;
}

function getFields(columns, viewColumns) {
  const fields = {};
  let i;
  let j;
  let columnId;
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

  let i;
  const notExistColumns = [];
  for (i = 0; i < viewColumns.length; i++) {
    if (!columns[viewColumns[i]]) {
      notExistColumns.push(JSON.stringify(viewColumns[i]))
    }
  }

  if(notExistColumns.length){
    throw new ArgumentsError(`You trying to get not exist columns: [${notExistColumns.join(', ')}];`);
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
module.exports = callbackify(async(gridModel, columns, viewColumns, exporter, settings) =>{
  assertValidViewColumns(columns, viewColumns);
  const result = await toPromise(gridModel.read.bind(gridModel))({
    fields: getFields(columns, viewColumns),
    sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : null,
    limit: settings.limit,
    offset: settings.offset
  });

  const data = formatData(result.records, result.totals, columns, viewColumns);

  return await toPromise(exporter)(data);
});
