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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Events control model
 */
var EventsModel = /*#__PURE__*/function () {
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

      var _iterator = _createForOfIteratorHelper(this._subscribers[event]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var subscriber = _step.value;
          subscriber.apply(void 0, params);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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