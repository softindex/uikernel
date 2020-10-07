"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("./ValidationErrors"));

var _ArgumentsError = _interopRequireDefault(require("../ArgumentsError"));

var _utils = require("../utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Validator =
/*#__PURE__*/
function () {
  /**
   * Validation check model
   *
   * @constructor
   */
  function Validator() {
    (0, _classCallCheck2["default"])(this, Validator);
    this._settings = {
      validators: {},
      groupValidators: [],
      asyncValidators: {},
      asyncGroupValidators: [],
      asyncDependenies: []
    };
  }

  (0, _createClass2["default"])(Validator, [{
    key: "field",

    /**
     * Add field sync validators
     *
     * @param {string}      field       Field name
     * @param {...Function} validators  Field validators
     * @returns {Validator} validator
     */
    value: function field(_field) {
      if (!this._settings.validators[_field]) {
        this._settings.validators[_field] = [];
      }

      for (var _len = arguments.length, validators = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        validators[_key - 1] = arguments[_key];
      }

      this._settings.validators[_field] = this._settings.validators[_field].concat(validators);
      return this;
    }
    /**
     * Specify multiple sync validators for fields group
     *
     * @param {Array}      fields              Fields array
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "fields",
    value: function fields(_fields, validatorFunction) {
      this._settings.groupValidators.push({
        fields: _fields,
        fn: validatorFunction
      });

      return this;
    }
    /**
     * Point which fields server validation needs
     *
     * @param {Array}   fields   Fields array
     * @returns {Validator} validator
     */

  }, {
    key: "asyncDependence",
    value: function asyncDependence(fields) {
      this._settings.asyncDependenies.push(fields);

      return this;
    }
    /**
     * Add field async validators
     *
     * @param {string}     field               Field name
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "asyncField",
    value: function asyncField(field, validatorFunction) {
      if (!this._settings.asyncValidators[field]) {
        this._settings.asyncValidators[field] = [];
      }

      this._settings.asyncValidators[field].push(validatorFunction);

      return this;
    }
    /**
     * Specify multiple async validators for fields group
     *
     * @param {Array}      fields              Fields array
     * @param {Function}   validatorFunction   Validator function
     * @returns {Validator} validator
     */

  }, {
    key: "asyncFields",
    value: function asyncFields(fields, validatorFunction) {
      this._settings.asyncGroupValidators.push({
        fields: fields,
        fn: validatorFunction
      });

      return this;
    }
    /**
     * Get all dependent fields validation needs
     *
     * @param {Array}   fields    Fields array
     * @returns {Array} fields
     */

  }, {
    key: "getValidationDependency",
    value: function getValidationDependency(fields) {
      var result = [];
      var length;
      var groups = (0, _utils.pluck)(this._settings.groupValidators.concat(this._settings.asyncGroupValidators), 'fields').concat(this._settings.asyncDependenies);

      while (length !== result.length) {
        length = result.length;

        for (var i = 0; i < groups.length; i++) {
          if (!(0, _utils.isIntersection)(groups[i], fields) && !(0, _utils.isIntersection)(groups[i], result)) {
            continue;
          }

          for (var j = 0; j < groups[i].length; j++) {
            var field = groups[i][j];

            if (fields.indexOf(field) >= 0 || result.indexOf(field) >= 0) {
              continue;
            }

            result.push(field);
          }
        }
      }

      return result;
    }
    /**
     * Check client record validity
     *
     * @param {Object}  record   Record
     * @returns {ValidationErrors|null} Record validity
     */

  }, {
    key: "isValidRecord",
    value: function isValidRecord(record) {
      var fields, errors, awaitStack, promises, dependentFields, _i, _Object$entries, _Object$entries$_i, _field2, value, validators, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, validator, _error, asyncValidators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, asyncValidator, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, groupValidator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, asyncGroupValidator, asyncErrors, error, field;

      return _regenerator["default"].async(function isValidRecord$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fields = Object.keys(record);
              errors = new _ValidationErrors["default"]();
              awaitStack = [];
              promises = [];
              dependentFields = this.getValidationDependency(fields);

              if (!dependentFields.length) {
                _context.next = 7;
                break;
              }

              throw new _ArgumentsError["default"]('Not enough fields for validator: ' + dependentFields.join(', '));

            case 7:
              _i = 0, _Object$entries = Object.entries(record);

            case 8:
              if (!(_i < _Object$entries.length)) {
                _context.next = 66;
                break;
              }

              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), _field2 = _Object$entries$_i[0], value = _Object$entries$_i[1];
              validators = this._settings.validators[_field2];

              if (!validators) {
                _context.next = 31;
                break;
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 15;

              for (_iterator3 = validators[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                validator = _step3.value;
                _error = validator(value);

                if (_error) {
                  errors.add(_field2, _error);
                }
              }

              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](15);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError3) {
                _context.next = 29;
                break;
              }

              throw _iteratorError3;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              asyncValidators = this._settings.asyncValidators[_field2];

              if (!asyncValidators) {
                _context.next = 63;
                break;
              }

              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context.prev = 36;
              _iterator4 = asyncValidators[Symbol.iterator]();

            case 38:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context.next = 49;
                break;
              }

              asyncValidator = _step4.value;
              awaitStack.push(_field2);
              _context.t1 = promises;
              _context.next = 44;
              return _regenerator["default"].awrap(asyncValidator(value));

            case 44:
              _context.t2 = _context.sent;

              _context.t1.push.call(_context.t1, _context.t2);

            case 46:
              _iteratorNormalCompletion4 = true;
              _context.next = 38;
              break;

            case 49:
              _context.next = 55;
              break;

            case 51:
              _context.prev = 51;
              _context.t3 = _context["catch"](36);
              _didIteratorError4 = true;
              _iteratorError4 = _context.t3;

            case 55:
              _context.prev = 55;
              _context.prev = 56;

              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }

            case 58:
              _context.prev = 58;

              if (!_didIteratorError4) {
                _context.next = 61;
                break;
              }

              throw _iteratorError4;

            case 61:
              return _context.finish(58);

            case 62:
              return _context.finish(55);

            case 63:
              _i++;
              _context.next = 8;
              break;

            case 66:
              // Add sync and async group validators
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 69;

              for (_iterator = this._settings.groupValidators[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                groupValidator = _step.value;

                if ((0, _utils.isIntersection)(groupValidator.fields, fields)) {
                  groupValidator.fn(record, errors);
                }
              }

              _context.next = 77;
              break;

            case 73:
              _context.prev = 73;
              _context.t4 = _context["catch"](69);
              _didIteratorError = true;
              _iteratorError = _context.t4;

            case 77:
              _context.prev = 77;
              _context.prev = 78;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 80:
              _context.prev = 80;

              if (!_didIteratorError) {
                _context.next = 83;
                break;
              }

              throw _iteratorError;

            case 83:
              return _context.finish(80);

            case 84:
              return _context.finish(77);

            case 85:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 88;
              _iterator2 = this._settings.asyncGroupValidators[Symbol.iterator]();

            case 90:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 102;
                break;
              }

              asyncGroupValidator = _step2.value;

              if (!(0, _utils.isIntersection)(asyncGroupValidator.fields, fields)) {
                _context.next = 99;
                break;
              }

              awaitStack.push(null);
              _context.t5 = promises;
              _context.next = 97;
              return _regenerator["default"].awrap(asyncGroupValidator.fn(record, errors));

            case 97:
              _context.t6 = _context.sent;

              _context.t5.push.call(_context.t5, _context.t6);

            case 99:
              _iteratorNormalCompletion2 = true;
              _context.next = 90;
              break;

            case 102:
              _context.next = 108;
              break;

            case 104:
              _context.prev = 104;
              _context.t7 = _context["catch"](88);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t7;

            case 108:
              _context.prev = 108;
              _context.prev = 109;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 111:
              _context.prev = 111;

              if (!_didIteratorError2) {
                _context.next = 114;
                break;
              }

              throw _iteratorError2;

            case 114:
              return _context.finish(111);

            case 115:
              return _context.finish(108);

            case 116:
              _context.next = 118;
              return _regenerator["default"].awrap(Promise.all(promises));

            case 118:
              asyncErrors = _context.sent;

              while (asyncErrors.length) {
                error = asyncErrors.pop();
                field = awaitStack.pop();

                if (error && field) {
                  errors.add(field, error);
                }
              }

              return _context.abrupt("return", errors);

            case 121:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[15, 19, 23, 31], [24,, 26, 30], [36, 51, 55, 63], [56,, 58, 62], [69, 73, 77, 85], [78,, 80, 84], [88, 104, 108, 116], [109,, 111, 115]]);
    }
  }], [{
    key: "create",
    value: function create() {
      return new Validator();
    }
  }]);
  return Validator;
}();

var _default = Validator;
exports["default"] = _default;
module.exports = exports.default;