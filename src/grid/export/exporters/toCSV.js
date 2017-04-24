/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../../../common/callbackify';
import csv from 'csv-stringify';
import {forEachAsync} from '../../../common/utils';

const toCSV = callbackify(async function (data) {
  const stringifier = csv({ header: true, columns: data.columns });

  await forEachAsync(data.records.concat([data.totals]), 1000, ::stringifier.write);
  stringifier.end();

  return {
    mime: 'text/csv',
    dataStream: stringifier
  };
});

export default toCSV;
