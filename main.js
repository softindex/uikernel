/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var browserModule = require('./browser');

browserModule.gridExpressApi = require('./lib/grid/models/GridExpressApi').create;
browserModule.listExpressApi = require('./lib/list/ListExpressApi').create;
browserModule.formExpressApi = require('./lib/form/FormExpressApi').create;
browserModule.createValidator = require('./lib/common/validation/validators/common').create;
browserModule.toCSV = require('./lib/grid/export/exporters/toCSV');

module.exports = browserModule;
