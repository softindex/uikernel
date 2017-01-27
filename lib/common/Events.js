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

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Events control model
 */
var EventsModel = function () {
  function EventsModel() {
    (0, _classCallCheck3.default)(this, EventsModel);

    this._subscribers = {};
  }

  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  (0, _createClass3.default)(EventsModel, [{
    key: 'on',
    value: function on(event, cb) {
      if ((0, _typeof3.default)(this._subscribers[event]) !== 'object') {
        this._subscribers[event] = [];
      }
      this._subscribers[event].push(cb);
    }

    /**
     * Unsubscribe from inner model event
     *
     * @param {number}      event   Event ID
     * @param {Function}    cb      CallBack function
     */

  }, {
    key: 'off',
    value: function off(event, cb) {
      if (this._subscribers[event]) {
        this._subscribers[event] = _utils2.default.without(this._subscribers[event], cb);
      }
    }

    /**
     * Trigger inner model event
     *
     * @param {number}  event   Event ID
     * @param {...*}    params
     */

  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (!this._subscribers[event] || !this._subscribers[event].length) {
        return;
      }

      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._subscribers[event]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscriber = _step.value;

          subscriber.apply(undefined, params);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Returns the number of listeners listening to the event
     *
     * @param {string} event name
     */

  }, {
    key: 'listenerCount',
    value: function listenerCount(event) {
      return this._subscribers[event] ? this._subscribers[event].length : 0;
    }

    /**
     * Removes all listeners of the specified event
     *
     * @param {string} event name
     */

  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners(event) {
      this._subscribers[event] = [];
    }
  }]);
  return EventsModel;
}(); /**
      * Copyright (с) 2015-present, SoftIndex LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree.
      */

exports.default = EventsModel;
module.exports = exports['default'];