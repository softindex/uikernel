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

/**
 * @param {{}}                    gridModel
 * @param {string[]}              fields
 * @param {{}}                    columns
 * @param {Function}              exporter
 * @param {{}}                    settings
 * @param {[string, string][]}      settings.sort
 * @param {number}                  settings.limit
 * @param {number}                  settings.offset
 * @param {string[]}                settings.viewColumns
 */
module.exports = suspend.async(function * (gridModel, fields, columns, viewColumns, exporter, settings) {
  var result = yield gridModel.read({
    fields: fields,
    sort: settings.sort,
    limit: settings.limit,
    offset: settings.offset
  }, suspend.resume());

  var data = formatData(result.records, result.totals, columns, viewColumns);

  return yield exporter(data, suspend.resume());
});
