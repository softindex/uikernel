'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

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

var ValidationErrors = function () {
  /**
   * Field errors control manager
   * @constructor
   */
  function ValidationErrors() {
    (0, _classCallCheck3.default)(this, ValidationErrors);

    this._fields = new _map2.default();
  }

  /**
   * Convert JSON to ValidationErrors object
   *
   * @param   {{:string[]}}      jsonObject
   * @return  {ValidationErrors}
   * @static
   */


  (0, _createClass3.default)(ValidationErrors, [{
    key: 'add',


    /**
     * Add an error
     *
     * @param {string}                  field       Field name
     * @param {string|{string message}} error       Error text
     * @return {ValidationErrors}
     */
    value: function add(field, error) {
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
    key: 'hasError',
    value: function hasError(field) {
      return this._fields.has(field);
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
      return this._fields.get(field) || null;
    }

    /**
     * Get field errors message
     *
     * @param   {string}      field     Field name
     * @returns {Array|null}  Errors array or null
     */

  }, {
    key: 'getFieldErrorMessages',
    value: function getFieldErrorMessages(field) {
      var fieldErrors = this._fields.get(field);
      if (fieldErrors) {
        return fieldErrors.map(function (error) {
          return error.message;
        });
      }
      return null;
    }

    /**
     * Get field names array, that contain errors
     *
     * @returns {string[]|null}
     */

  }, {
    key: 'getFailedFields',
    value: function getFailedFields() {
      var fields = [].concat((0, _toConsumableArray3.default)(this._fields.keys()));
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
      return this._fields.size === 0;
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
      this._fields.delete(field);
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
      this._fields = new _map2.default();
      return this;
    }

    /**
     * Convert errors to JSON
     *
     * @return {{[string]: Array<string>}}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          json[key] = value;
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

      return json;
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
     * Merge object
     *
     * @return {ValidationErrors}
     */

  }, {
    key: 'merge',
    value: function merge(validationErrors) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(validationErrors.getErrors()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
              field = _step2$value[0],
              newErrors = _step2$value[1];

          var errors = this._fields.get(field);
          if (!errors) {
            errors = [];
            this._fields.set(field, errors);
          }
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(newErrors), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var newError = _step3.value;

              errors.push(newError);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }

    /**
     * Get errors iterator
     *
     * @return {[string, string[]][]}
     */

  }, {
    key: 'getErrors',
    value: function getErrors() {
      return this._fields;
    }
  }, {
    key: '_formErrorValue',
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
    key: 'createFromJSON',
    value: function createFromJSON(jsonObject) {
      var validationErrors = new ValidationErrors();
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop = function _loop() {
          var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
              key = _step4$value[0],
              value = _step4$value[1];

          value.forEach(function (errMessage) {
            return validationErrors.add(key, errMessage);
          });
        };

        for (var _iterator4 = (0, _getIterator3.default)((0, _entries2.default)(jsonObject)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
    key: 'createWithError',
    value: function createWithError(field, error) {
      var validationErrors = new ValidationErrors();
      validationErrors.add(field, error);
      return validationErrors;
    }
  }]);
  return ValidationErrors;
}();

ValidationErrors.merge = function () {
  var jsonErrors = [{}];

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = (0, _getIterator3.default)(args), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var arg = _step5.value;

      jsonErrors.push(arg.toJSON());
    }

    // TODO Need deep merge
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return ValidationErrors.createFromJSON(_assign2.default.apply(Object, jsonErrors));
};

exports.default = ValidationErrors;
module.exports = exports['default'];