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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationErrors = function () {
  /**
   * Field errors control manager
   * @constructor
   */
  function ValidationErrors() {
    (0, _classCallCheck3.default)(this, ValidationErrors);

    this._fields = {};
  }

  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {Object}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */


  (0, _createClass3.default)(ValidationErrors, [{
    key: 'add',


    /**
     * Add an error
     *
     * @param {string}        field       Field name
     * @param {String}        errorText   Error text
     * @return {ValidationErrors}
     */
    value: function add(field, errorText) {
      if (!this._fields[field]) {
        this._fields[field] = [];
      }
      if (!this._fields[field].includes(errorText)) {
        this._fields[field].push(errorText);
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
    key: 'hasError',
    value: function hasError(field) {
      return this._fields.hasOwnProperty(field);
    }

    /**
     * Get field errors
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: 'getFieldErrors',
    value: function getFieldErrors(field) {
      return this._fields[field] || null;
    }

    /**
     * Get field names array, that contain errors
     *
     * @returns {string[]|null}
     */

  }, {
    key: 'getFailedFields',
    value: function getFailedFields() {
      var fields = (0, _keys2.default)(this._fields);
      return fields.length ? fields : null;
    }

    /**
     * Errors absence check
     *
     * @returns {boolean} Errors presence
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return _utils2.default.isEmpty(this._fields);
    }

    /**
     * Clear specific field errors
     *
     * @param   {string}  field  Field name
     * @returns {ValidationErrors}
     */

  }, {
    key: 'clearField',
    value: function clearField(field) {
      delete this._fields[field];
      return this;
    }

    /**
     * Clear errors list
     *
     * @return {ValidationErrors}
     */

  }, {
    key: 'clear',
    value: function clear() {
      this._fields = {};
      return this;
    }

    /**
     * Convert errors to JSON
     *
     * @return {Array}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this._fields;
    }

    /**
     * Clone object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: 'clone',
    value: function clone() {
      return ValidationErrors.createFromJSON(this.toJSON());
    }

    /**
     * Get errors iterator
     *
     * @return {[string, string[]][]}
     */

  }, {
    key: 'getErrors',
    value: function getErrors() {
      return (0, _entries2.default)(this._fields);
    }
  }]);
  return ValidationErrors;
}(); /**
      * Copyright (с) 2015-present, SoftIndex LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree.
      */

ValidationErrors.createFromJSON = function (jsonObject) {
  var validationErrors = new ValidationErrors();
  validationErrors._fields = jsonObject ? _utils2.default.clone(jsonObject) : {};
  return validationErrors;
};

ValidationErrors.merge = function () {
  var jsonErrors = [{}];

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arg = _step.value;

      jsonErrors.push(arg.toJSON());
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

  return ValidationErrors.createFromJSON(_assign2.default.apply(Object, jsonErrors));
};

exports.default = ValidationErrors;
module.exports = exports['default'];