"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("../ValidationErrors"));

var _ArgumentsError = _interopRequireDefault(require("../../ArgumentsError"));

var _utils = _interopRequireDefault(require("../../utils"));

/**
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
    (0, _classCallCheck2.default)(this, Validator);
    this._settings = {
      validators: {},
      groupValidators: [],
      asyncValidators: {},
      asyncGroupValidators: [],
      asyncDependenies: []
    };
  }

  (0, _createClass2.default)(Validator, [{
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

      var groups = _utils.default.pluck(this._settings.groupValidators.concat(this._settings.asyncGroupValidators), 'fields').concat(this._settings.asyncDependenies);

      while (length !== result.length) {
        length = result.length;

        for (var i = 0; i < groups.length; i++) {
          if (!_utils.default.isIntersection(groups[i], fields) && !_utils.default.isIntersection(groups[i], result)) {
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
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(record) {
        var fields, errors, awaitStack, promises, dependentFields, _arr, _i, _arr$_i, _field2, value, validators, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, validator, _error, asyncValidators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, asyncValidator, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, groupValidator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, asyncGroupValidator, asyncErrors, error, field;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fields = Object.keys(record);
                errors = new _ValidationErrors.default();
                awaitStack = [];
                promises = [];
                dependentFields = this.getValidationDependency(fields);

                if (!dependentFields.length) {
                  _context.next = 7;
                  break;
                }

                throw new _ArgumentsError.default('Not enough fields for validator: ' + dependentFields.join(', '));

              case 7:
                // Add sync and async validators
                _arr = Object.entries(record);
                _i = 0;

              case 9:
                if (!(_i < _arr.length)) {
                  _context.next = 67;
                  break;
                }

                _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2), _field2 = _arr$_i[0], value = _arr$_i[1];
                validators = this._settings.validators[_field2];

                if (!validators) {
                  _context.next = 32;
                  break;
                }

                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 16;

                for (_iterator3 = validators[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  validator = _step3.value;
                  _error = validator(value);

                  if (_error) {
                    errors.add(_field2, _error);
                  }
                }

                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](16);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t0;

              case 24:
                _context.prev = 24;
                _context.prev = 25;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 27:
                _context.prev = 27;

                if (!_didIteratorError3) {
                  _context.next = 30;
                  break;
                }

                throw _iteratorError3;

              case 30:
                return _context.finish(27);

              case 31:
                return _context.finish(24);

              case 32:
                asyncValidators = this._settings.asyncValidators[_field2];

                if (!asyncValidators) {
                  _context.next = 64;
                  break;
                }

                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context.prev = 37;
                _iterator4 = asyncValidators[Symbol.iterator]();

              case 39:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context.next = 50;
                  break;
                }

                asyncValidator = _step4.value;
                awaitStack.push(_field2);
                _context.t1 = promises;
                _context.next = 45;
                return asyncValidator(value);

              case 45:
                _context.t2 = _context.sent;

                _context.t1.push.call(_context.t1, _context.t2);

              case 47:
                _iteratorNormalCompletion4 = true;
                _context.next = 39;
                break;

              case 50:
                _context.next = 56;
                break;

              case 52:
                _context.prev = 52;
                _context.t3 = _context["catch"](37);
                _didIteratorError4 = true;
                _iteratorError4 = _context.t3;

              case 56:
                _context.prev = 56;
                _context.prev = 57;

                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }

              case 59:
                _context.prev = 59;

                if (!_didIteratorError4) {
                  _context.next = 62;
                  break;
                }

                throw _iteratorError4;

              case 62:
                return _context.finish(59);

              case 63:
                return _context.finish(56);

              case 64:
                _i++;
                _context.next = 9;
                break;

              case 67:
                // Add sync and async group validators
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 70;

                for (_iterator = this._settings.groupValidators[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  groupValidator = _step.value;

                  if (_utils.default.isIntersection(groupValidator.fields, fields)) {
                    groupValidator.fn(record, errors);
                  }
                }

                _context.next = 78;
                break;

              case 74:
                _context.prev = 74;
                _context.t4 = _context["catch"](70);
                _didIteratorError = true;
                _iteratorError = _context.t4;

              case 78:
                _context.prev = 78;
                _context.prev = 79;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 81:
                _context.prev = 81;

                if (!_didIteratorError) {
                  _context.next = 84;
                  break;
                }

                throw _iteratorError;

              case 84:
                return _context.finish(81);

              case 85:
                return _context.finish(78);

              case 86:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 89;
                _iterator2 = this._settings.asyncGroupValidators[Symbol.iterator]();

              case 91:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 103;
                  break;
                }

                asyncGroupValidator = _step2.value;

                if (!_utils.default.isIntersection(asyncGroupValidator.fields, fields)) {
                  _context.next = 100;
                  break;
                }

                awaitStack.push(null);
                _context.t5 = promises;
                _context.next = 98;
                return asyncGroupValidator.fn(record, errors);

              case 98:
                _context.t6 = _context.sent;

                _context.t5.push.call(_context.t5, _context.t6);

              case 100:
                _iteratorNormalCompletion2 = true;
                _context.next = 91;
                break;

              case 103:
                _context.next = 109;
                break;

              case 105:
                _context.prev = 105;
                _context.t7 = _context["catch"](89);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t7;

              case 109:
                _context.prev = 109;
                _context.prev = 110;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 112:
                _context.prev = 112;

                if (!_didIteratorError2) {
                  _context.next = 115;
                  break;
                }

                throw _iteratorError2;

              case 115:
                return _context.finish(112);

              case 116:
                return _context.finish(109);

              case 117:
                _context.next = 119;
                return Promise.all(promises);

              case 119:
                asyncErrors = _context.sent;

                while (asyncErrors.length) {
                  error = asyncErrors.pop();
                  field = awaitStack.pop();

                  if (error && field) {
                    errors.add(field, error);
                  }
                }

                return _context.abrupt("return", errors);

              case 122:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[16, 20, 24, 32], [25,, 27, 31], [37, 52, 56, 64], [57,, 59, 63], [70, 74, 78, 86], [79,, 81, 85], [89, 105, 109, 117], [110,, 112, 116]]);
      }));

      return function isValidRecord(_x) {
        return _isValidRecord.apply(this, arguments);
      };
    }()
  }], [{
    key: "create",
    value: function create() {
      return new Validator();
    }
  }]);
  return Validator;
}();

var _default = Validator;
exports.default = _default;
module.exports = exports.default;