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

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseValidator(notNull, regExp, error, value) {
  error = error || 'Not valid';
  if (!_utils2.default.isDefined(value) || value === '') {
    if (notNull) {
      return error;
    }
    return;
  }

  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
  if (type !== 'string' && type !== 'number' || !regExp.test(value)) {
    return error;
  }
}

/**
 * Create RegEx validator
 *
 * @param regExp
 * @param {string} error Error message
 * @returns {Function}
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var validator = function validator(regExp, error) {
  return baseValidator.bind(null, false, regExp, error);
};
validator.notNull = function (regExp, error) {
  return baseValidator.bind(null, true, regExp, error);
};

exports.default = validator;
module.exports = exports['default'];