/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import common from './common';
import GridExpressApi from './grid/models/GridExpressApi';
import ListExpressApi from './list/ListExpressApi';
import FormExpressApi from './form/FormExpressApi';
import exportGridData from './grid/export/exportGridData';
import toJSON from './grid/export/exporters/toJSON';
import toCSV from './grid/export/exporters/toCSV';

const UIKernel = {
  ...common,
  gridExpressApi: GridExpressApi.create,
  listExpressApi: ListExpressApi.create,
  formExpressApi: FormExpressApi.create,
  exportGridData: exportGridData,
  toJSON: toJSON,
  toCSV: toCSV
};

export default UIKernel;
