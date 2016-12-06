/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import toPromise from '../../../common/toPromise';
import callbackify from '../../../common/callbackify';
import csv from 'csv-stringify';

const toCSV = callbackify(async data => {
  const csvData = await toPromise(csv(data.records.concat([data.totals]),
    {
      header: true,
      columns: data.columns
    }));

  return {
    mime: 'text/csv',
    data: csvData
  };
});

module.exports = toCSV;
