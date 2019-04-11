/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import browserModule from './browser';
import GridExpressApi from './grid/models/GridExpressApi';
import ListExpressApi from './list/ListExpressApi';
import FormExpressApi from './form/FormExpressApi';
import toCSV from './grid/export/exporters/toCSV';

browserModule.gridExpressApi = GridExpressApi.create;
browserModule.listExpressApi = ListExpressApi.create;
browserModule.formExpressApi = FormExpressApi.create;
browserModule.toCSV = toCSV;

export default browserModule;
