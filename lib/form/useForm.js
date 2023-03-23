"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _FormService = _interopRequireDefault(require("./FormService"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
function useForm(settings) {
  var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.error;
  var formService = (0, _react.useMemo)(function () {
    return new _FormService["default"]();
  }, []);

  var _useState = (0, _react.useState)(formService.getAll()),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      formState = _useState2[0],
      setFormState = _useState2[1];

  (0, _react.useEffect)(function () {
    formService.init(settings)["catch"](onError);
    formService.addChangeListener(setFormState);
    return function () {
      return formService.removeChangeListener(setFormState);
    };
  }, [formService]);
  return [formState, formService];
}

var _default = useForm;
exports["default"] = _default;
module.exports = exports.default;