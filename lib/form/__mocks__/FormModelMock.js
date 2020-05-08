"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormModelMock = function FormModelMock() {
  (0, _classCallCheck2["default"])(this, FormModelMock);
  this.getData = jest.fn(function _callee() {
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              name: null,
              age: null
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  this.submit = jest.fn(function _callee2() {
    return _regenerator["default"].async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", {});

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  this.isValidRecord = jest.fn(function _callee3() {
    return _regenerator["default"].async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new _ValidationErrors["default"]());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  this.getValidationDependency = jest.fn(function () {
    return [];
  });
  this.on = jest.fn();
  this.off = jest.fn();
};

var _default = FormModelMock;
exports["default"] = _default;
module.exports = exports.default;