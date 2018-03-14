'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function Checkbox(props) {
  var indeterminate = props.indeterminate,
      otherProps = (0, _objectWithoutProperties3.default)(props, ['indeterminate']);

  return _react2.default.createElement('input', (0, _extends3.default)({}, otherProps, {
    type: 'checkbox',
    ref: function ref(input) {
      if (input) {
        input.indeterminate = indeterminate;
      }
    }
  }));
}

Checkbox.propTypes = {
  indeterminate: _propTypes2.default.bool
};

exports.default = Checkbox;
module.exports = exports['default'];