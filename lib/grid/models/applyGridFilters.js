'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

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
  if (model instanceof _utils2.default.Decorator) {
    model = (0, _getPrototypeOf2.default)(model);
  }
  return _utils2.default.decorate(model, {
    read: function read(options) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options.filters = filters;
                _context.next = 3;
                return model.read(options);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
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