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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ValidationErrors = require('../ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _ArgumentsError = require('../../ArgumentsError');

var _ArgumentsError2 = _interopRequireDefault(_ArgumentsError);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _toPromise = require('../../toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _callbackify = require('../../callbackify');

var _callbackify2 = _interopRequireDefault(_callbackify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validator = function () {
  /**
   * Validation check model
   *
   * @constructor
   */
  function Validator() {
    (0, _classCallCheck3.default)(this, Validator);

    this._settings = {
      validators: {},
      groupValidators: [],
      asyncValidators: {},
      asyncGroupValidators: [],
      asyncDependenies: []
    };
  }

  (0, _createClass3.default)(Validator, [{
    key: 'field',


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

      for (var _len = arguments.length, validators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
    key: 'fields',
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
    key: 'asyncDependence',
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
    key: 'asyncField',
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
    key: 'asyncFields',
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
    key: 'getValidationDependency',
    value: function getValidationDependency(fields) {
      var result = [];
      var length = void 0;
      var groups = _utils2.default.pluck(this._settings.groupValidators.concat(this._settings.asyncGroupValidators), 'fields').concat(this._settings.asyncDependenies);

      while (length !== result.length) {
        length = result.length;

        for (var i = 0; i < groups.length; i++) {
          if (!_utils2.default.isIntersection(groups[i], fields) && !_utils2.default.isIntersection(groups[i], result)) {
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
  }], [{
    key: 'create',
    value: function create() {
      return new Validator();
    }
  }]);
  return Validator;
}();

/**
 * Check client record validity
 *
 * @param {Object}  record   Record
 * @returns {ValidationErrors|null} Record validity
 */
/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

Validator.prototype.isValidRecord = (0, _callbackify2.default)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(record) {
    var fields, errors, awaitStack, promises, dependentFields, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, _field2, value, validators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, validator, _error, asyncValidators, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, asyncValidator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, groupValidator, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, asyncGroupValidator, asyncErrors, error, field;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = (0, _keys2.default)(record);
            errors = new _ValidationErrors2.default();
            awaitStack = [];
            promises = [];
            dependentFields = this.getValidationDependency(fields);

            if (!dependentFields.length) {
              _context.next = 7;
              break;
            }

            throw new _ArgumentsError2.default('Not enough fields for validator: ' + dependentFields.join(', '));

          case 7:

            // Add sync and async validators
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator = (0, _getIterator3.default)((0, _entries2.default)(record));

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 70;
              break;
            }

            _step$value = (0, _slicedToArray3.default)(_step.value, 2), _field2 = _step$value[0], value = _step$value[1];
            validators = this._settings.validators[_field2];

            if (!validators) {
              _context.next = 35;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 19;

            for (_iterator4 = (0, _getIterator3.default)(validators); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              validator = _step4.value;
              _error = validator(value);

              if (_error) {
                errors.add(_field2, _error);
              }
            }
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](19);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 30:
            _context.prev = 30;

            if (!_didIteratorError4) {
              _context.next = 33;
              break;
            }

            throw _iteratorError4;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(27);

          case 35:
            asyncValidators = this._settings.asyncValidators[_field2];

            if (!asyncValidators) {
              _context.next = 67;
              break;
            }

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 40;
            _iterator5 = (0, _getIterator3.default)(asyncValidators);

          case 42:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context.next = 53;
              break;
            }

            asyncValidator = _step5.value;

            awaitStack.push(_field2);
            _context.t1 = promises;
            _context.next = 48;
            return (0, _toPromise2.default)(asyncValidator)(value);

          case 48:
            _context.t2 = _context.sent;

            _context.t1.push.call(_context.t1, _context.t2);

          case 50:
            _iteratorNormalCompletion5 = true;
            _context.next = 42;
            break;

          case 53:
            _context.next = 59;
            break;

          case 55:
            _context.prev = 55;
            _context.t3 = _context['catch'](40);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t3;

          case 59:
            _context.prev = 59;
            _context.prev = 60;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 62:
            _context.prev = 62;

            if (!_didIteratorError5) {
              _context.next = 65;
              break;
            }

            throw _iteratorError5;

          case 65:
            return _context.finish(62);

          case 66:
            return _context.finish(59);

          case 67:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 70:
            _context.next = 76;
            break;

          case 72:
            _context.prev = 72;
            _context.t4 = _context['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context.t4;

          case 76:
            _context.prev = 76;
            _context.prev = 77;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 79:
            _context.prev = 79;

            if (!_didIteratorError) {
              _context.next = 82;
              break;
            }

            throw _iteratorError;

          case 82:
            return _context.finish(79);

          case 83:
            return _context.finish(76);

          case 84:

            // Add sync and async group validators
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 87;
            for (_iterator2 = (0, _getIterator3.default)(this._settings.groupValidators); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              groupValidator = _step2.value;

              if (_utils2.default.isIntersection(groupValidator.fields, fields)) {
                groupValidator.fn(record, errors);
              }
            }

            _context.next = 95;
            break;

          case 91:
            _context.prev = 91;
            _context.t5 = _context['catch'](87);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t5;

          case 95:
            _context.prev = 95;
            _context.prev = 96;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 98:
            _context.prev = 98;

            if (!_didIteratorError2) {
              _context.next = 101;
              break;
            }

            throw _iteratorError2;

          case 101:
            return _context.finish(98);

          case 102:
            return _context.finish(95);

          case 103:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 106;
            _iterator3 = (0, _getIterator3.default)(this._settings.asyncGroupValidators);

          case 108:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context.next = 120;
              break;
            }

            asyncGroupValidator = _step3.value;

            if (!_utils2.default.isIntersection(asyncGroupValidator.fields, fields)) {
              _context.next = 117;
              break;
            }

            awaitStack.push(null);
            _context.t6 = promises;
            _context.next = 115;
            return (0, _toPromise2.default)(asyncGroupValidator.fn)(record, errors);

          case 115:
            _context.t7 = _context.sent;

            _context.t6.push.call(_context.t6, _context.t7);

          case 117:
            _iteratorNormalCompletion3 = true;
            _context.next = 108;
            break;

          case 120:
            _context.next = 126;
            break;

          case 122:
            _context.prev = 122;
            _context.t8 = _context['catch'](106);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t8;

          case 126:
            _context.prev = 126;
            _context.prev = 127;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 129:
            _context.prev = 129;

            if (!_didIteratorError3) {
              _context.next = 132;
              break;
            }

            throw _iteratorError3;

          case 132:
            return _context.finish(129);

          case 133:
            return _context.finish(126);

          case 134:
            _context.next = 136;
            return _promise2.default.all(promises);

          case 136:
            asyncErrors = _context.sent;

            while (asyncErrors.length) {
              error = asyncErrors.pop();
              field = awaitStack.pop();


              if (error && field) {
                errors.add(field, error);
              }
            }

            return _context.abrupt('return', errors);

          case 139:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 72, 76, 84], [19, 23, 27, 35], [28,, 30, 34], [40, 55, 59, 67], [60,, 62, 66], [77,, 79, 83], [87, 91, 95, 103], [96,, 98, 102], [106, 122, 126, 134], [127,, 129, 133]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = Validator;
module.exports = exports['default'];