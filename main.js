/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var browserModule = require('./browser');

browserModule.gridExpressApi = require('./lib/grid/models/gridExpressApi');
browserModule.listExpressApi = require('./lib/list/ListExpressApi');
browserModule.formExpressApi = require('./lib/form/FormExpressApi');
browserModule.createValidator = require('./lib/common/validation/Validator/common');

module.exports = browserModule;
