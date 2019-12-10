"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Checkbox(props) {
  var indeterminate = props.indeterminate,
      otherProps = (0, _objectWithoutProperties2["default"])(props, ["indeterminate"]);
  return _react["default"].createElement("input", (0, _extends2["default"])({}, otherProps, {
    type: "checkbox",
    ref: function ref(input) {
      if (input) {
        input.indeterminate = indeterminate;
      }
    }
  }));
}

Checkbox.propTypes = {
  indeterminate: _propTypes["default"].bool
};
var _default = Checkbox;
exports["default"] = _default;
module.exports = exports.default;