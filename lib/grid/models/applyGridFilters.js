/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _callbackify = require('../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines filter values while reading Grid model data
 *
 * @param {AbstractGridModel} model       Grid model
 * @param {Object}            filters     Filter values
 */
function applyGridFilters(model, filters) {
  return _utils2.default.decorate(model, {
    read: (0, _callbackify2.default)(function (options) {
      options.filters = filters;
      return (0, _toPromise2.default)(model.read.bind(model))(options);
    })
  });
} /**
   * Copyright (с) 2015-present, SoftIndex LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree.
   */

exports.default = applyGridFilters;
module.exports = exports['default'];