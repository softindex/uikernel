"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _GridCollectionModel2 = _interopRequireDefault(require("../GridCollectionModel"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridModelMock =
/*#__PURE__*/
function (_GridCollectionModel) {
  (0, _inherits2.default)(GridModelMock, _GridCollectionModel);

  function GridModelMock() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GridModelMock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GridModelMock)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.read = jest.fn(_this.read);
    _this.getRecord = jest.fn(_this.getRecord);
    _this.update = jest.fn(_this.update);
    _this.create = jest.fn(_this.create);
    return _this;
  }

  return GridModelMock;
}(_GridCollectionModel2.default);

var _default = GridModelMock;
exports.default = _default;
module.exports = exports.default;