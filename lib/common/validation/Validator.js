"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ValidationErrors = _interopRequireDefault(require("./ValidationErrors"));

var _ArgumentsError = _interopRequireDefault(require("../ArgumentsError"));

var _utils = require("../utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Validator = /*#__PURE__*/function () {
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
    value:
    /**
     * Add field sync validators
     *
     * @param {string}      field       Field name
     * @param {...Function} validators  Field validators
     * @returns {Validator} validator
     */
    function field(_field) {
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
    value: function () {
      var _isValidRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(record) {
        var fields, errors, awaitStack, promises, dependentFields, _i, _Object$entries, _Object$entries$_i, field, value, validators, _iterator, _step, validator, error, asyncValidators, _iterator2, _step2, asyncValidator, _iterator3, _step3, groupValidator, _iterator4, _step4, asyncGroupValidator, asyncErrors, _error, _field2;

        return _regenerator["default"].wrap(function _callee$(_context) {
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
                  _context.next = 38;
                  break;
                }

                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), field = _Object$entries$_i[0], value = _Object$entries$_i[1];
                validators = this._settings.validators[field];

                if (validators) {
                  _iterator = _createForOfIteratorHelper(validators);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      validator = _step.value;
                      error = validator(value);

                      if (error) {
                        errors.add(field, error);
                      }
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                }

                asyncValidators = this._settings.asyncValidators[field];

                if (!asyncValidators) {
                  _context.next = 35;
                  break;
                }

                _iterator2 = _createForOfIteratorHelper(asyncValidators);
                _context.prev = 15;

                _iterator2.s();

              case 17:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 27;
                  break;
                }

                asyncValidator = _step2.value;
                awaitStack.push(field);
                _context.t0 = promises;
                _context.next = 23;
                return asyncValidator(value);

              case 23:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

              case 25:
                _context.next = 17;
                break;

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t2 = _context["catch"](15);

                _iterator2.e(_context.t2);

              case 32:
                _context.prev = 32;

                _iterator2.f();

                return _context.finish(32);

              case 35:
                _i++;
                _context.next = 8;
                break;

              case 38:
                // Add sync and async group validators
                _iterator3 = _createForOfIteratorHelper(this._settings.groupValidators);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    groupValidator = _step3.value;

                    if ((0, _utils.isIntersection)(groupValidator.fields, fields)) {
                      groupValidator.fn(record, errors);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                _iterator4 = _createForOfIteratorHelper(this._settings.asyncGroupValidators);
                _context.prev = 41;

                _iterator4.s();

              case 43:
                if ((_step4 = _iterator4.n()).done) {
                  _context.next = 54;
                  break;
                }

                asyncGroupValidator = _step4.value;

                if (!(0, _utils.isIntersection)(asyncGroupValidator.fields, fields)) {
                  _context.next = 52;
                  break;
                }

                awaitStack.push(null);
                _context.t3 = promises;
                _context.next = 50;
                return asyncGroupValidator.fn(record, errors);

              case 50:
                _context.t4 = _context.sent;

                _context.t3.push.call(_context.t3, _context.t4);

              case 52:
                _context.next = 43;
                break;

              case 54:
                _context.next = 59;
                break;

              case 56:
                _context.prev = 56;
                _context.t5 = _context["catch"](41);

                _iterator4.e(_context.t5);

              case 59:
                _context.prev = 59;

                _iterator4.f();

                return _context.finish(59);

              case 62:
                _context.next = 64;
                return Promise.all(promises);

              case 64:
                asyncErrors = _context.sent;

                while (asyncErrors.length) {
                  _error = asyncErrors.pop();
                  _field2 = awaitStack.pop();

                  if (_error && _field2) {
                    errors.add(_field2, _error);
                  }
                }

                return _context.abrupt("return", errors);

              case 67:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[15, 29, 32, 35], [41, 56, 59, 62]]);
      }));

      function isValidRecord(_x) {
        return _isValidRecord.apply(this, arguments);
      }

      return isValidRecord;
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
exports["default"] = _default;
module.exports = exports.default;