"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Events = _interopRequireDefault(require("../common/Events"));

var _Validator = _interopRequireDefault(require("../common/validation/Validator"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _utils = _interopRequireDefault(require("../common/utils"));

var _ThrottleError = _interopRequireDefault(require("../common/ThrottleError"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FormService =
/*#__PURE__*/
function () {
  function FormService() {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck2.default)(this, FormService);
    this._data = null;
    this._changes = null;
    this._errors = new _ValidationErrors.default();
    this._warnings = new _ValidationErrors.default();
    this._warningsValidator = null;
    this._eventEmitter = new _Events.default();
    this._isNotInitialized = true;
    this.fields = fields;
    this._validateForm = _utils.default.throttle(this._validateForm.bind(this));
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


  (0, _createClass2.default)(FormService, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(settings) {
        return _regenerator.default.wrap(function _callee$(_context) {
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
                this._warningsValidator = settings.warningsValidator || new _Validator.default();
                this.validating = false;
                this._hiddenValidationFields = [];
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
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function init(_x) {
        return _init.apply(this, arguments);
      };
    }()
  }, {
    key: "getAll",
    value: function getAll() {
      var isLoaded = this._isLoaded();

      if (!isLoaded) {
        var emptyData = {
          isLoaded: isLoaded,
          data: {},
          originalData: {},
          changes: {},
          errors: new _ValidationErrors.default(),
          warnings: new _ValidationErrors.default(),
          isSubmitting: false
        };
        emptyData.fields = this._getFields(emptyData.data, emptyData.changes, emptyData.errors, emptyData.warnings);
        return emptyData;
      }

      var data = this._getData();

      var changes = this._getChangesFields();

      var errors = this._getDisplayedErrors(this._errors);

      var warnings = this._getDisplayedErrors(this._warnings);

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
    key: "updateField",
    value: function () {
      var _updateField = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(field, value) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.set((0, _defineProperty2.default)({}, field, _utils.default.parseValueFromEvent(value)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function updateField(_x2, _x3) {
        return _updateField.apply(this, arguments);
      };
    }()
  }, {
    key: "addChangeListener",
    value: function addChangeListener(func) {
      this._eventEmitter.on('update', func);
    }
  }, {
    key: "removeChangeListener",
    value: function removeChangeListener(func) {
      this._eventEmitter.off('update', func);

      if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
        this.model.off('update', this._onModelChange);
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this._eventEmitter.removeAllListeners('update');

      this.model.off('update', this._onModelChange);
    }
    /**
     * @param {string|string[]} fields
     */

  }, {
    key: "clearValidation",
    value: function clearValidation(fields) {
      if (this._isNotInitialized) {
        return;
      } // We keep info about _hiddenValidationFields for cases when clearValidation was called while validateForm was
      // called and haven't finished, so then old validation result shouldn't show errors for _hiddenValidationFields
      // fields, but the next called validations will clear _hiddenValidationFields so the fields will get errors again.
      // Use case: a user changed field 'name', a validation started, the user focused field 'age' so we called
      // clearValidation('age'), the validation finished and returned errors for fields 'name' and 'age', but we
      // shouldn't show error for field 'age' because the user has just focused it. Then user blured field 'age', a new
      // validation stated and it should show errors for field 'age'.


      if (Array.isArray(fields)) {
        var _this$_hiddenValidati;

        (_this$_hiddenValidati = this._hiddenValidationFields).push.apply(_this$_hiddenValidati, (0, _toConsumableArray2.default)(fields));
      } else {
        this._hiddenValidationFields.push(fields);
      }

      this._setState();
    }
  }, {
    key: "clearError",
    value: function clearError(field) {
      console.warn('Deprecated: FormService method "clearError" renamed to "clearValidation"');
      this.clearValidation(field);
    }
  }, {
    key: "validateField",
    value: function () {
      var _validateField = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(field, value) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.set((0, _defineProperty2.default)({}, field, _utils.default.parseValueFromEvent(value)), true);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function validateField(_x4, _x5) {
        return _validateField.apply(this, arguments);
      };
    }()
    /**
     * Set data in the form
     *
     * @param {Object}    data              Data
     * @param {bool}      [validate=false]  Validate form
     */

  }, {
    key: "set",
    value: function () {
      var _set = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(data, validate) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._isLoaded()) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                this._changes = _utils.default.getRecordChanges(this.model, this._data, this._changes, data);

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
                _context4.t0 = _context4["catch"](5);

                if (_context4.t0 instanceof _ThrottleError.default) {
                  _context4.next = 14;
                  break;
                }

                throw _context4.t0;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      return function set(_x6, _x7) {
        return _set.apply(this, arguments);
      };
    }()
  }, {
    key: "submitData",
    value: function () {
      var _submitData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(data) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return");

              case 2:
                _context5.next = 4;
                return this.set(data);

              case 4:
                _context5.next = 6;
                return this.submit();

              case 6:
                return _context5.abrupt("return", _context5.sent);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function submitData(_x8) {
        return _submitData.apply(this, arguments);
      };
    }()
    /**
     * Send form data to the model
     */

  }, {
    key: "submit",
    value: function () {
      var _submit = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6() {
        var changes, countOfHiddenValidationFieldsToRemove, data, validationErrors, newChanges, actualChanges;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this._isNotInitialized || this._isSubmitting)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                changes = this._getChanges();
                this._isSubmitting = true;
                this._partialErrorChecking = false;
                countOfHiddenValidationFieldsToRemove = this._hiddenValidationFields.length;

                this._setState(); // Send changes to model


                _context6.prev = 7;
                _context6.next = 10;
                return this.model.submit(changes);

              case 10:
                data = _context6.sent;
                _context6.next = 20;
                break;

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](7);

                if (_context6.t0 instanceof _ValidationErrors.default) {
                  _context6.next = 19;
                  break;
                }

                this._isSubmitting = false;

                this._setState();

                throw _context6.t0;

              case 19:
                validationErrors = _context6.t0;

              case 20:
                this._isSubmitting = false;
                newChanges = this._getChanges();
                actualChanges = _utils.default.isEqual(changes, newChanges);

                if (actualChanges) {
                  if (validationErrors) {
                    this._errors = validationErrors;
                  } else {
                    this._errors = new _ValidationErrors.default();
                    this._changes = {};
                  }
                }

                this._hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);

                this._setState();

                if (!validationErrors) {
                  _context6.next = 28;
                  break;
                }

                throw validationErrors;

              case 28:
                return _context6.abrupt("return", data);

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[7, 13]]);
      }));

      return function submit() {
        return _submit.apply(this, arguments);
      };
    }()
  }, {
    key: "clearFieldChanges",
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
    key: "clearChanges",
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
    key: "setPartialErrorChecking",
    value: function setPartialErrorChecking(value) {
      this._partialErrorChecking = value;

      this._setState();
    }
  }, {
    key: "getPartialErrorChecking",
    value: function getPartialErrorChecking() {
      return this._partialErrorChecking;
    }
  }, {
    key: "validateForm",
    value: function () {
      var _validateForm2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this._validateForm();

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](0);

                if (_context7.t0 instanceof _ThrottleError.default) {
                  _context7.next = 10;
                  break;
                }

                throw _context7.t0;

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 6]]);
      }));

      return function validateForm() {
        return _validateForm2.apply(this, arguments);
      };
    }()
  }, {
    key: "_validateForm",
    value: function () {
      var _validateForm3 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8() {
        var countOfHiddenValidationFieldsToRemove, displayedErrors, displayedWarning;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this._isNotInitialized) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                // We should remove only those hiddenValidationFields that were present before validation started and keep those
                // that were added after validation started (so it is possible and ok that field 'name' may be present 2 times:
                // 1 for old validation call and 1 for the new).
                // Take into account that _validateForm is throttled, so next calls will be skipped or scheduled after current call
                // finishes. It means we don't need to care about parallel calls because they are impossible.
                countOfHiddenValidationFieldsToRemove = this._hiddenValidationFields.length;
                this.validating = true;
                _context8.prev = 4;
                _context8.next = 7;
                return Promise.all([this._runValidator(this.model, this._getChanges, '_errors'), this._runValidator(this._warningsValidator, this._getData, '_warnings')]);

              case 7:
                _context8.prev = 7;
                this.validating = false;

                this._hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);

                this._setState();

                return _context8.finish(7);

              case 12:
                displayedErrors = this._getDisplayedErrors(this._errors);
                displayedWarning = this._getDisplayedErrors(this._warnings);
                return _context8.abrupt("return", {
                  errors: !displayedErrors.isEmpty() ? displayedErrors : null,
                  warnings: !displayedWarning.isEmpty() ? displayedWarning : null
                });

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[4,, 7, 12]]);
      }));

      return function _validateForm() {
        return _validateForm3.apply(this, arguments);
      };
    }()
  }, {
    key: "_getFields",
    value: function _getFields(data, changes, errors, warnings) {
      var proxy = new Proxy({}, {
        get: function get(target, fieldName) {
          return {
            value: data[fieldName],
            isChanged: changes.hasOwnProperty(fieldName),
            errors: errors.getFieldErrorMessages(fieldName),
            warnings: warnings.getFieldErrorMessages(fieldName)
          };
        }
      }); // Explicit declaration of fields in an object

      if (this.fields) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var field = _step.value;
            proxy[field] = proxy[field];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return proxy;
    }
    /**
     * Check is data loaded
     *
     * @returns {boolean}
     */

  }, {
    key: "_isLoaded",
    value: function _isLoaded() {
      return this._data !== null;
    }
    /**
     * Get form changes
     *
     * @return {{}}
     */

  }, {
    key: "_getChangesFields",
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
     * Filter errors depending on the partialErrorChecking mode and clearValidation method
     *
     * @param {ValidationErrors}  validationErrors
     * @returns {ValidationErrors} Form fields
     */

  }, {
    key: "_getDisplayedErrors",
    value: function _getDisplayedErrors(validationErrors) {
      var filteredErrors = validationErrors.clone();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = validationErrors.getErrors().keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var field = _step2.value;

          var isFieldPristine = !this._changes.hasOwnProperty(field) || _utils.default.isEqual(this._changes[field], this._data[field]);

          if (this._hiddenValidationFields.includes(field) || this._partialErrorChecking && isFieldPristine) {
            filteredErrors.clearField(field);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return filteredErrors;
    }
  }, {
    key: "_setState",
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
    key: "_onModelChange",
    value: function _onModelChange(changes) {
      this._data = (0, _objectSpread2.default)({}, this._data, changes);

      this._setState();
    }
  }, {
    key: "_getData",
    value: function _getData() {
      return Object.assign({}, this._data, this._changes);
    }
  }, {
    key: "_getChanges",
    value: function _getChanges() {
      // Send all data or just changed fields in addiction of form configuration
      if (this.submitAll) {
        return this._getData();
      }

      return this._changes;
    }
  }, {
    key: "_isDependentField",
    value: function _isDependentField(field) {
      return this._changes.hasOwnProperty(field) && _utils.default.isEqual(this._changes[field], this._data[field]);
    }
  }, {
    key: "_runValidator",
    value: function () {
      var _runValidator2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9(validator, getData, output) {
        var data, validErrors;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                data = getData();

                if (!_utils.default.isEmpty(data)) {
                  _context9.next = 4;
                  break;
                }

                this[output].clear();
                return _context9.abrupt("return");

              case 4:
                _context9.prev = 4;
                _context9.next = 7;
                return validator.isValidRecord(data);

              case 7:
                validErrors = _context9.sent;
                _context9.next = 14;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](4);
                this[output].clear();
                throw _context9.t0;

              case 14:
                if (_utils.default.isEqual(data, getData())) {
                  this[output] = validErrors;
                }

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[4, 10]]);
      }));

      return function _runValidator(_x9, _x10, _x11) {
        return _runValidator2.apply(this, arguments);
      };
    }()
  }]);
  return FormService;
}();

var _default = FormService;
exports.default = _default;
module.exports = exports.default;