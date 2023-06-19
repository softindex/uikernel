/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {promisify} from 'util';
import type {default as stringify} from 'csv-stringify';
import {default as csv} from 'csv-stringify';

export type CSVExportRunnerParams<TColumn extends string> = {
  columns: stringify.Options['columns'];
  records: Partial<Record<TColumn, string>>[];
  totals?: Partial<Record<TColumn, string>>;
};

export type CSVExportRunnerResult = {
  data: string;
  mime: 'text/csv';
};

export type CSVExportRunner = <TColumn extends string>(
  params: CSVExportRunnerParams<TColumn>
) => Promise<CSVExportRunnerResult>;

const toCSV: CSVExportRunner = async (data) => {
  const csvData = await promisify(
    csv.bind(null, data.totals ? data.records.concat([data.totals]) : data.records, {
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
