/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import toPromise from '../../../common/toPromise';
import csv from 'csv-stringify';

async function toCSV(data) {
  const csvData = await toPromise(csv, true)(data.records.concat([data.totals]), {
    header: true,
    columns: data.columns
  });

  return {
    mime: 'text/csv',
    data: csvData
  };
}

export default toCSV;
