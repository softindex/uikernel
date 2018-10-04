'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Events = require('../common/Events');

var _Events2 = _interopRequireDefault(_Events);

var _common = require('../common/validation/validators/common');

var _common2 = _interopRequireDefault(_common);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _ThrottleError = require('../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormService = function () {
  function FormService() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck3.default)(this, FormService);

    this._data = null;
    this._changes = null;
    this._errors = new _ValidationErrors2.default();
    this._warnings = new _ValidationErrors2.default();
    this._warningsValidator = null;
    this._eventEmitter = new _Events2.default();
    this._isNotInitialized = true;
    this.fields = fields;
    this._validateForm = _utils2.default.throttle(this._validateForm.bind(this));
    this.validateForm = this.validateForm.bind(this);
    this._onModelChange = this._onModelChange.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
    this.clearError = this.clearError.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.updateField = this.updateField.bind(this);
    this.validateField = this.validateField.bind(this);
    this._getData = this._getData.bind(this);
    this._getChanges = this._getChanges.bind(this);
  }

  /**
   * Initialize form
   *
   * @param {Object}            settings                                Configuration
   * @param {Array}             settings.fields                         Fields list, that are required to display
   * @param {FormModel}         settings.model                          Model of form
   * @param {Object}            [settings.data]                         Preset data
   * @param {Object}            [settings.changes                       Preset changes
   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
   * @param {bool}              [settings.partialErrorChecking=false]   Activate partial gradual form validation
   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
   * @param {Validator}         [settings.warningsValidator]            Warnings validator for fields
   */


  (0, _createClass3.default)(FormService, [{
    key: 'init',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(settings) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (settings.model) {
                  _context.next = 2;
                  break;
                }

                throw Error('You must specify the model');

              case 2:

                this._data = settings.data || null;
                this._changes = settings.changes || {};
                this._isSubmitting = false;
                this.showDependentFields = settings.showDependentFields || false;
                this._partialErrorChecking = settings.partialErrorChecking; // Current mode
                this._partialErrorCheckingDefault = settings.partialErrorChecking; // Default mode
                this.model = settings.model; // FormModel
                this.submitAll = settings.submitAll;
                this._warningsValidator = settings.warningsValidator || new _common2.default();

                this.validating = false;
                this._pendingClearValidation = [];
                this.submitting = false;
                this._isNotInitialized = false;

                if (settings.hasOwnProperty('fields')) {
                  this.fields = settings.fields;
                }

                if (this._data) {
                  _context.next = 20;
                  break;
                }

                _context.next = 19;
                return settings.model.getData(this.fields);

              case 19:
                this._data = _context.sent;

              case 20:

                this.model.on('update', this._onModelChange);
                this._setState();

                if (settings.partialErrorChecking) {
                  _context.next = 25;
                  break;
                }

                _context.next = 25;
                return this.validateForm();

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x2) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'getAll',
    value: function getAll() {
      var isLoaded = this._isLoaded();

      if (!isLoaded) {
        var emptyData = {
          isLoaded: isLoaded,
          data: {},
          originalData: {},
          changes: {},
          errors: new _ValidationErrors2.default(),
          warnings: new _ValidationErrors2.default(),
          fields: {},
          isSubmitting: false
        };

        var fields = {};
        if (this.fields) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(this.fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var field = _step.value;

              fields[field] = {
                value: null,
                isChanged: false,
                errors: null
              };
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
        emptyData.fields = this._wrapFields(fields);
        return emptyData;
      }

      var data = this._getData();
      var changes = this._getChangesFields();
      var errors = this._applyPartialErrorChecking(this._errors);
      var warnings = this._applyPartialErrorChecking(this._warnings);

      return {
        isLoaded: isLoaded,
        data: data,
        originalData: this._data,
        changes: changes,
        errors: errors,
        warnings: warnings,
        // Note that we return errors and warnings both in bunch as a property and for each field separately
        // - it is redundantly, but handy :)
        fields: this._getFields(data, changes, errors, warnings),
        isSubmitting: this._isSubmitting
      };
    }

    /**
     * Update form value. Is used as the Editors onChange handler
     *
     * @param {string}  field  Parameter
     * @param {*}       value  Event or data
     */

  }, {
    key: 'updateField',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(field, value) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.set((0, _defineProperty3.default)({}, field, _utils2.default.parseValueFromEvent(value)));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateField(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updateField;
    }()
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(func) {
      this._eventEmitter.on('update', func);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(func) {
      this._eventEmitter.off('update', func);
      if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
        this.model.off('update', this._onModelChange);
      }
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      this._eventEmitter.removeAllListeners('update');
      this.model.off('update', this._onModelChange);
    }
  }, {
    key: 'clearValidation',
    value: function clearValidation(field) {
      var _this = this;

      if (this._isNotInitialized) {
        return;
      }

      if (this.validating) {
        this._pendingClearValidation.push(field);
      }

      if (Array.isArray(field)) {
        field.forEach(function (oneField) {
          _this._errors.clearField(oneField);
          _this._warnings.clearField(oneField);
        });
      } else {
        this._errors.clearField(field);
        this._warnings.clearField(field);
      }

      this._setState();
    }
  }, {
    key: 'clearError',
    value: function clearError(field) {
      console.warn('Deprecated: FormService method "clearError" renamed to "clearValidation"');
      this.clearValidation(field);
    }
  }, {
    key: 'validateField',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(field, value) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.set((0, _defineProperty3.default)({}, field, _utils2.default.parseValueFromEvent(value)), true);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function validateField(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return validateField;
    }()

    /**
     * Set data in the form
     *
     * @param {Object}    data              Data
     * @param {bool}      [validate=false]  Validate form
     */

  }, {
    key: 'set',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(data, validate) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._isLoaded()) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:

                this._changes = _utils2.default.getRecordChanges(this.model, this._data, this._changes, data);

                this._setState();

                if (!validate) {
                  _context4.next = 14;
                  break;
                }

                _context4.prev = 5;
                _context4.next = 8;
                return this.validateForm();

              case 8:
                _context4.next = 14;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4['catch'](5);

                if (_context4.t0 instanceof _ThrottleError2.default) {
                  _context4.next = 14;
                  break;
                }

                throw _context4.t0;

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      function set(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: 'submitData',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(data) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return');

              case 2:
                _context5.next = 4;
                return this.set(data);

              case 4:
                _context5.next = 6;
                return this.submit();

              case 6:
                return _context5.abrupt('return', _context5.sent);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function submitData(_x9) {
        return _ref5.apply(this, arguments);
      }

      return submitData;
    }()

    /**
     * Send form data to the model
     */

  }, {
    key: 'submit',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var changes, data, validationErrors, newChanges, actualChanges;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this._isNotInitialized || this._isSubmitting)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:
                changes = this._getChanges();


                this._isSubmitting = true;
                this._partialErrorChecking = false;

                this._setState();

                // Send changes to model
                data = void 0;
                validationErrors = void 0;
                _context6.prev = 8;
                _context6.next = 11;
                return this.model.submit(changes);

              case 11:
                data = _context6.sent;
                _context6.next = 21;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6['catch'](8);

                if (_context6.t0 instanceof _ValidationErrors2.default) {
                  _context6.next = 20;
                  break;
                }

                this._isSubmitting = false;
                this._setState();
                throw _context6.t0;

              case 20:
                validationErrors = _context6.t0;

              case 21:

                this._isSubmitting = false;

                newChanges = this._getChanges();
                actualChanges = _utils2.default.isEqual(changes, newChanges);


                if (actualChanges) {
                  if (validationErrors) {
                    this._errors = validationErrors;
                  } else {
                    this._errors = new _ValidationErrors2.default();
                    this._changes = {};
                  }
                }

                this._setState();

                if (!validationErrors) {
                  _context6.next = 28;
                  break;
                }

                throw validationErrors;

              case 28:
                return _context6.abrupt('return', data);

              case 29:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[8, 14]]);
      }));

      function submit() {
        return _ref6.apply(this, arguments);
      }

      return submit;
    }()
  }, {
    key: 'clearFieldChanges',
    value: function clearFieldChanges(field) {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clearField(field);
      this._warnings.clearField(field);
      delete this._changes[field];
      this._setState();
    }
  }, {
    key: 'clearChanges',
    value: function clearChanges() {
      if (this._isNotInitialized) {
        return;
      }

      this._errors.clear();
      this._warnings.clear();
      this._changes = {};
      this._partialErrorChecking = this._partialErrorCheckingDefault;
      this._setState();
    }
  }, {
    key: 'setPartialErrorChecking',
    value: function setPartialErrorChecking(value) {
      this._partialErrorChecking = value;
      this._setState();
    }
  }, {
    key: 'getPartialErrorChecking',
    value: function getPartialErrorChecking() {
      return this._partialErrorChecking;
    }
  }, {
    key: 'validateForm',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this._validateForm();

              case 3:
                return _context7.abrupt('return', _context7.sent);

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7['catch'](0);

                if (_context7.t0 instanceof _ThrottleError2.default) {
                  _context7.next = 10;
                  break;
                }

                throw _context7.t0;

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      function validateForm() {
        return _ref7.apply(this, arguments);
      }

      return validateForm;
    }()
  }, {
    key: '_validateForm',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var field, errorsWithPartialChecking, warningsWithPartialChecking;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return');

              case 2:

                this.validating = true;

                _context8.prev = 3;
                _context8.next = 6;
                return _promise2.default.all([this._runValidator(this.model, this._getChanges, '_errors'), this._runValidator(this._warningsValidator, this._getData, '_warnings')]);

              case 6:
                _context8.prev = 6;

                this.validating = false;

                field = void 0;

                while (field = this._pendingClearValidation.pop()) {
                  this._warnings.clearField(field);
                  this._errors.clearField(field);
                }

                this._setState();
                return _context8.finish(6);

              case 12:
                errorsWithPartialChecking = this._applyPartialErrorChecking(this._errors);
                warningsWithPartialChecking = this._applyPartialErrorChecking(this._warnings);
                return _context8.abrupt('return', {
                  errors: !errorsWithPartialChecking.isEmpty() ? errorsWithPartialChecking : null,
                  warnings: !warningsWithPartialChecking.isEmpty() ? warningsWithPartialChecking : null
                });

              case 15:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[3,, 6, 12]]);
      }));

      function _validateForm() {
        return _ref8.apply(this, arguments);
      }

      return _validateForm;
    }()
  }, {
    key: '_getFields',
    value: function _getFields(data, changes, errors, warnings) {
      var fields = this.fields.reduce(function (newFields, fieldName) {
        newFields[fieldName] = {};
        newFields[fieldName].value = data[fieldName];
        newFields[fieldName].isChanged = changes.hasOwnProperty(fieldName);
        newFields[fieldName].errors = errors ? errors.getFieldErrorMessages(fieldName) : null;
        newFields[fieldName].warnings = warnings ? warnings.getFieldErrorMessages(fieldName) : null;
        return newFields;
      }, {});
      return this._wrapFields(fields);
    }

    /**
     * Check is data loaded
     *
     * @returns {boolean}
     */

  }, {
    key: '_isLoaded',
    value: function _isLoaded() {
      return this && Boolean(this._data);
    }

    /**
     * Get form changes
     *
     * @return {{}}
     */

  }, {
    key: '_getChangesFields',
    value: function _getChangesFields() {
      // TODO _getChanges
      var changes = {};
      for (var field in this._changes) {
        if (!this._isDependentField(field)) {
          changes[field] = this._changes[field];
        }
      }
      return changes;
    }

    /**
     * Filter errors depending on the partialErrorChecking mode
     *
     * @param {ValidationErrors}  validationErrors
     * @returns {ValidationErrors} Form fields
     */

  }, {
    key: '_applyPartialErrorChecking',
    value: function _applyPartialErrorChecking(validationErrors) {
      var filteredErrors = validationErrors;

      // If gradual validation is on, we need
      // to remove unchanged records from changes object
      if (!this._partialErrorChecking) {
        return filteredErrors;
      }

      // Look through all form fields
      for (var field in this._data) {
        if (!this._changes.hasOwnProperty(field) || _utils2.default.isEqual(this._changes[field], this._data[field])) {
          filteredErrors.clearField(field);
        }
      }

      return filteredErrors;
    }
  }, {
    key: '_setState',
    value: function _setState() {
      this._eventEmitter.trigger('update', this.getAll());
    }

    /**
     * Model records changes handler
     *
     * @param {Object} changes  Changes
     * @private
     */

  }, {
    key: '_onModelChange',
    value: function _onModelChange(changes) {
      this._data = (0, _extends3.default)({}, this._data, changes);
      this._setState();
    }
  }, {
    key: '_getData',
    value: function _getData() {
      return (0, _assign2.default)({}, this._data, this._changes);
    }
  }, {
    key: '_getChanges',
    value: function _getChanges() {
      // Send all data or just changed fields in addiction of form configuration
      if (this.submitAll) {
        return this._getData();
      }
      return this._changes;
    }
  }, {
    key: '_isDependentField',
    value: function _isDependentField(field) {
      return this._changes.hasOwnProperty(field) && _utils2.default.isEqual(this._changes[field], this._data[field]);
    }
  }, {
    key: '_runValidator',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(validator, getData, output) {
        var data, validErrors;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                data = getData();

                if (!_utils2.default.isEmpty(data)) {
                  _context9.next = 4;
                  break;
                }

                this[output].clear();
                return _context9.abrupt('return');

              case 4:
                validErrors = void 0;
                _context9.prev = 5;
                _context9.next = 8;
                return validator.isValidRecord(data);

              case 8:
                validErrors = _context9.sent;
                _context9.next = 15;
                break;

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9['catch'](5);

                this[output].clear();
                throw _context9.t0;

              case 15:

                if (_utils2.default.isEqual(data, getData())) {
                  this[output] = validErrors;
                }

              case 16:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[5, 11]]);
      }));

      function _runValidator(_x10, _x11, _x12) {
        return _ref9.apply(this, arguments);
      }

      return _runValidator;
    }()
  }, {
    key: '_wrapFields',
    value: function _wrapFields(fields) {
      return new Proxy(fields, {
        get: function get(target, fieldName) {
          return target[fieldName] || {
            value: null,
            isChanged: false,
            errors: null,
            warnings: null
          };
        }
      });
    }
  }]);
  return FormService;
}(); /**
      * Copyright (с) 2015-present, SoftIndex LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree.
      */

exports.default = FormService;
module.exports = exports['default'];