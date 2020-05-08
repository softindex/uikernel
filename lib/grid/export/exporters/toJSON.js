"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function toJSON(data) {
  return _regenerator["default"].async(function toJSON$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", {
            mime: 'application/json',
            data: {
              records: data.records,
              totals: data.totals
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = toJSON;
exports["default"] = _default;
module.exports = exports.default;