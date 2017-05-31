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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Abstract List model
 */
var AbstractListModel = function () {
  function AbstractListModel() {
    (0, _classCallCheck3.default)(this, AbstractListModel);
  }

  (0, _createClass3.default)(AbstractListModel, [{
    key: 'read',

    /**
     * Get data
     *
     * @param {string}    search  Search query
     * @abstract
     */
    value: function read() /*search*/{
      return _promise2.default.resolve([]);
    }

    /**
     * Get option name using ID
     *
     * @param {*}         id  Option ID
     * @abstract
     */

  }, {
    key: 'getLabel',
    value: function getLabel() /*id*/{
      return _promise2.default.resolve('');
    }
  }]);
  return AbstractListModel;
}();

exports.default = AbstractListModel;
module.exports = exports['default'];