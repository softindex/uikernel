"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Abstract List model
 */
var AbstractListModel = /*#__PURE__*/function () {
  function AbstractListModel() {
    (0, _classCallCheck2["default"])(this, AbstractListModel);
  }

  (0, _createClass2["default"])(AbstractListModel, [{
    key: "read",
    value:
    /**
     * Get data
     *
     * @param {string}    search  Search query
     * @abstract
     */
    function
      /*search*/
    read() {
      return Promise.resolve([]);
    }
    /**
     * Get option name using ID
     *
     * @param {*}         id  Option ID
     * @abstract
     */

  }, {
    key: "getLabel",
    value: function
      /*id*/
    getLabel() {
      return Promise.resolve('');
    }
  }]);
  return AbstractListModel;
}();

var _default = AbstractListModel;
exports["default"] = _default;
module.exports = exports.default;