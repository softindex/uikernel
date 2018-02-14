'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _callbackify = require('../../../common/callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toJSON = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', {
              mime: 'application/json',
              data: {
                records: data.records,
                totals: data.totals
              }
            });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function toJSON(_x) {
    return _ref.apply(this, arguments);
  }

  return toJSON;
}()); /**
       * Copyright (с) 2015-present, SoftIndex LLC.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree.
       */

exports.default = toJSON;
module.exports = exports['default'];