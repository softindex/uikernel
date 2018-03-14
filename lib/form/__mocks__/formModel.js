'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formModelMock = {
  getData: jest.fn((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', {
              name: null,
              age: null
            });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }))),
  submit: jest.fn((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', {});

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }))),
  isValidRecord: jest.fn((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', new _ValidationErrors2.default());

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }))),
  getValidationDependency: jest.fn(function () {
    return [];
  }),
  on: jest.fn(),
  off: jest.fn()
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

exports.default = formModelMock;
module.exports = exports['default'];