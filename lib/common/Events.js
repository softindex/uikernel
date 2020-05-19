"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("./utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Events control model
 */
var EventsModel =
/*#__PURE__*/
function () {
  function EventsModel() {
    (0, _classCallCheck2["default"])(this, EventsModel);
    this._subscribers = {};
  }
  /**
   * Subscribe to inner model event
   *
   * @param {string}      event   Event ID
   * @param {Function}    cb      CallBack function
   */


  (0, _createClass2["default"])(EventsModel, [{
    key: "on",
    value: function on(event, cb) {
      if ((0, _typeof2["default"])(this._subscribers[event]) !== 'object') {
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
    key: "off",
    value: function off(event, cb) {
      if (this._subscribers[event]) {
        this._subscribers[event] = (0, _utils.without)(this._subscribers[event], cb);
      }
    }
    /**
     * Trigger inner model event
     *
     * @param {number}  event   Event ID
     * @param {...*}    params
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      if (!this._subscribers[event] || !this._subscribers[event].length) {
        return;
      }

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._subscribers[event][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscriber = _step.value;
          subscriber.apply(void 0, params);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
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
    key: "listenerCount",
    value: function listenerCount(event) {
      return this._subscribers[event] ? this._subscribers[event].length : 0;
    }
    /**
     * Removes all listeners of the specified event
     *
     * @param {string} event name
     */

  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(event) {
      this._subscribers[event] = [];
    }
  }]);
  return EventsModel;
}();

var _default = EventsModel;
exports["default"] = _default;
module.exports = exports.default;