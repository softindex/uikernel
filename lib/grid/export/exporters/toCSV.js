'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toPromise = require('../../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _callbackify = require('../../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

var _csvStringify = require('csv-stringify');

var _csvStringify2 = _interopRequireDefault(_csvStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toCSV = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    var csvData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _toPromise2.default)(_csvStringify2.default, true)(data.records.concat([data.totals]), {
              header: true,
              columns: data.columns
            });

          case 2:
            csvData = _context.sent;
            return _context.abrupt('return', {
              mime: 'text/csv',
              data: csvData
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); /**
       * Copyright (с) 2015-present, SoftIndex LLC.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree.
       */

exports.default = toCSV;
module.exports = exports['default'];