"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toPromise = _interopRequireDefault(require("../../../common/toPromise"));

var _csvStringify = _interopRequireDefault(require("csv-stringify"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function toCSV(data) {
  var csvData;
  return _regenerator["default"].async(function toCSV$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap((0, _toPromise["default"])(_csvStringify["default"], true)(data.records.concat([data.totals]), {
            header: true,
            columns: data.columns
          }));

        case 2:
          csvData = _context.sent;
          return _context.abrupt("return", {
            mime: 'text/csv',
            data: csvData
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = toCSV;
exports["default"] = _default;
module.exports = exports.default;