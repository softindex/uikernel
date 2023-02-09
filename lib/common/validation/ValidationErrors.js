"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ValidationErrors = /*#__PURE__*/function () {
  /**
   * Field errors control manager
   * @constructor
   */
  function ValidationErrors() {
    (0, _classCallCheck2["default"])(this, ValidationErrors);
    this._fields = new Map();
  }
  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */


  (0, _createClass2["default"])(ValidationErrors, [{
    key: "add",
    value:
    /**
     * Add an error
     *
     * @param {string}                  field       Field name
     * @param {string|{string message}} error       Error text
     * @return {ValidationErrors}
     */
    function add(field, error) {
      error = this._formErrorValue(error);

      if (!this._fields.has(field)) {
        this._fields.set(field, [error]);

        return this;
      }

      var fieldErrors = this._fields.get(field);

      if (!fieldErrors.includes(error)) {
        fieldErrors.push(error);
      }

      return this;
    }
    /**
     * Field has error flag
     *
     * @param   {string}      field     Field name
     * @returns {boolean}
     */

  }, {
    key: "hasError",
    value: function hasError(field) {
      return this._fields.has(field);
    }
    /**
     * Get field errors
     *
     * @param   {string}      field     Field name
     * @returns {Array}       Errors array or null
     */

  }, {
    key: "getFieldErrors",
    value: function getFieldErrors(field) {
      return this._fields.get(field) || [];
    }
    /**
     * Get field errors message
     *
     * @param   {string}      field     Field name
     * @returns {Array}       Errors array or null
     */

  }, {
    key: "getFieldErrorMessages",
    value: function getFieldErrorMessages(field) {
      var fieldErrors = this._fields.get(field);

      if (fieldErrors) {
        return fieldErrors.map(function (error) {
          return error.message;
        });
      }

      return [];
    }
    /**
     * Get field names array, that contain errors
     *
     * @returns {string[]}
     */

  }, {
    key: "getFailedFields",
    value: function getFailedFields() {
      return (0, _toConsumableArray2["default"])(this._fields.keys());
    }
    /**
     * Errors absence check
     *
     * @returns {boolean} Errors presence
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._fields.size === 0;
    }
    /**
     * Clear specific field errors
     *
     * @param   {string}  field  Field name
     * @returns {ValidationErrors}
     */

  }, {
    key: "clearField",
    value: function clearField(field) {
      this._fields["delete"](field);

      return this;
    }
    /**
     * Clear errors list
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clear",
    value: function clear() {
      this._fields = new Map();
      return this;
    }
    /**
     * Convert errors to JSON
     *
     * @return {{[string]: Array<string>}}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};

      var _iterator = _createForOfIteratorHelper(this._fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          json[key] = value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return json;
    }
    /**
     * Clone object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "clone",
    value: function clone() {
      return ValidationErrors.createFromJSON(this.toJSON());
    }
    /**
     * Merge object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: "merge",
    value: function merge(validationErrors) {
      var _iterator2 = _createForOfIteratorHelper(validationErrors.getErrors()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _errors;

          var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
              field = _step2$value[0],
              newErrors = _step2$value[1];

          var errors = this._fields.get(field);

          if (!errors) {
            errors = [];

            this._fields.set(field, errors);
          }

          (_errors = errors).push.apply(_errors, (0, _toConsumableArray2["default"])(newErrors));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return this;
    }
    /**
     * Get errors iterator
     *
     * @return {[string, string[]][]}
     */

  }, {
    key: "getErrors",
    value: function getErrors() {
      return this._fields;
    }
  }, {
    key: "_formErrorValue",
    value: function _formErrorValue(error) {
      if (typeof error === 'string') {
        return {
          message: error
        };
      }

      if (!error.message) {
        throw new Error('Invalid error value. Error must be string or object with "message" property.');
      }

      return error;
    }
  }], [{
    key: "createFromJSON",
    value: function createFromJSON(jsonObject) {
      var validationErrors = new ValidationErrors();

      var _loop = function _loop() {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        value.forEach(function (errMessage) {
          return validationErrors.add(key, errMessage);
        });
      };

      for (var _i = 0, _Object$entries = Object.entries(jsonObject); _i < _Object$entries.length; _i++) {
        _loop();
      }

      return validationErrors;
    }
    /**
     * Create ValidationErrors object with one error
     *
     * @param {string}                  field
     * @param {string|{error: string}}  error
     * @return {ValidationErrors}
     */

  }, {
    key: "createWithError",
    value: function createWithError(field, error) {
      var validationErrors = new ValidationErrors();
      validationErrors.add(field, error);
      return validationErrors;
    }
  }]);
  return ValidationErrors;
}();

(0, _defineProperty2["default"])(ValidationErrors, "merge", function () {
  var jsonErrors = [{}];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i2 = 0, _args = args; _i2 < _args.length; _i2++) {
    var arg = _args[_i2];
    jsonErrors.push(arg.toJSON());
  } // TODO Need deep merge


  return ValidationErrors.createFromJSON(Object.assign.apply(Object, jsonErrors));
});
var _default = ValidationErrors;
exports["default"] = _default;
module.exports = exports.default;