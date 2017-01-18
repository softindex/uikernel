/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function ArgumentsError(message) {
  this.message = message;
  this.status = this.statusCode = 422;
  Error.captureStackTrace(this, ArgumentsError);
}

ArgumentsError.prototype = (0, _create2.default)(Error.prototype);
ArgumentsError.prototype.constructor = ArgumentsError;

exports.default = ArgumentsError;
module.exports = exports["default"];