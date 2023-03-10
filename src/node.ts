/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import browserModule from './browser';
import FormExpressApi from './form/FormExpressApi';
import toCSV from './grid/export/exporters/toCSV';
import toJSON from './grid/export/exporters/toJSON';
import exportGridData from './grid/export/exportGridData';
import GridExpressApi from './grid/models/GridExpressApi';
import ListExpressApi from './list/ListExpressApi';

const nodeModule = {
  ...browserModule,
  gridExpressApi: GridExpressApi.create,
  listExpressApi: ListExpressApi.create,
  formExpressApi: FormExpressApi.create,
  exportGridData: exportGridData,
  toJSON: toJSON,
  toCSV: toCSV
};

export default nodeModule;
