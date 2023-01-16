/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {promisify} from 'util';
import {default as csv, default as stringify} from 'csv-stringify';

export type CSVExportRunnerParams<TRecord extends {}> = {
  columns: string[] | stringify.ColumnOption[];
  records: Partial<TRecord>[];
  totals: Partial<TRecord>;
};

type CSVExportRunnerResult = {
  data: string;
  mime: 'text/csv';
};

export type CSVExportRunner = <TRecord extends {}>(
  params: CSVExportRunnerParams<TRecord>
) => Promise<CSVExportRunnerResult>;

const toCSV: CSVExportRunner = async (data) => {
  const csvData = await promisify(
    csv.bind(null, data.records.concat([data.totals]), {
      header: true,
      columns: data.columns
    })
  )();

  return {
    mime: 'text/csv',
    data: csvData
  };
};

export default toCSV;
