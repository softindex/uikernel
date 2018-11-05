"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toPromise = _interopRequireDefault(require("../../../common/toPromise"));

var _csvStringify = _interopRequireDefault(require("csv-stringify"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function toCSV(_x) {
  return _toCSV.apply(this, arguments);
}

function _toCSV() {
  _toCSV = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(data) {
    var csvData;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _toPromise.default)(_csvStringify.default, true)(data.records.concat([data.totals]), {
              header: true,
              columns: data.columns
            });

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
    }, _callee, this);
  }));
  return _toCSV.apply(this, arguments);
}

var _default = toCSV;
exports.default = _default;
module.exports = exports.default;