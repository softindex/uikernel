/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _GridCollectionModel2 = require('../GridCollectionModel');

var _GridCollectionModel3 = _interopRequireDefault(_GridCollectionModel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridModelMock = function (_GridCollectionModel) {
  (0, _inherits3.default)(GridModelMock, _GridCollectionModel);

  function GridModelMock() {
    var _ref;

    (0, _classCallCheck3.default)(this, GridModelMock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = GridModelMock.__proto__ || (0, _getPrototypeOf2.default)(GridModelMock)).call.apply(_ref, [this].concat(args)));

    _this.read = jest.fn(_this.read);
    _this.getRecord = jest.fn(_this.getRecord);
    _this.update = jest.fn(_this.update);
    _this.create = jest.fn(_this.create);
    return _this;
  }

  return GridModelMock;
}(_GridCollectionModel3.default); /**
                                   * Copyright (с) 2015-present, SoftIndex LLC.
                                   * All rights reserved.
                                   *
                                   * This source code is licensed under the BSD-style license found in the
                                   * LICENSE file in the root directory of this source tree.
                                   */

exports.default = GridModelMock;
module.exports = exports['default'];