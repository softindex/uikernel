/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var suspend = require('suspend');
var formatData = require('./formatData');

module.exports = suspend.async(function * (gridModel, columns, exporter, settings) {
  var result = yield gridModel.read({
    fields: settings.fields,
    sort: settings.sort,
    limit: settings.limit,
    offset: settings.offset
  }, suspend.resume());

  var data = formatData(columns, result.records, result.totals);

  return yield exporter(data, suspend.resume());
});
