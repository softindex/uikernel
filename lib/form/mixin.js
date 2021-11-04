"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../common/utils");

var _toPromise = _interopRequireDefault(require("../common/toPromise"));

var _Validator = _interopRequireDefault(require("../common/validation/Validator"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _callbackify = _interopRequireDefault(require("../common/callbackify"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Grid form mixin
 * @mixin
 */
var FormMixin = {
  getInitialState: function getInitialState() {
    this._validateForm = (0, _utils.throttle)(this._validateForm);

    if (this._handleModelChange.name.indexOf('bound ') !== 0) {
      // Support React.createClass and mixin-decorators
      this._handleModelChange = this._handleModelChange.bind(this);
      this._getData = this._getData.bind(this);
      this._getChanges = this._getChanges.bind(this);
      this.validateForm = this.validateForm.bind(this);
    }

    return {
      _formMixin: null
    };
  },
  componentWillMount: function componentWillMount() {
    this._isUnmounted = false;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isUnmounted = true;

    if (!this._isNotInitialized()) {
      this.state._formMixin.model.off('update', this._handleModelChange);
    }
  },

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
   * @param {bool}              [settings.autoSubmit]                   Automatic submit before updateField
   * @param {Function}          [settings.autoSubmitHandler]            Automatic submit handler
   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
   * @param {Function}          [cb]                                    CallBack function
   */
  initForm: (0, _callbackify["default"])( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(settings) {
      var data, err;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this._initState(settings);

              if (this.state._formMixin.data) {
                _context.next = 19;
                break;
              }

              _context.prev = 2;
              _context.next = 5;
              return settings.model.getData(settings.fields);

            case 5:
              data = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              err = _context.t0;

            case 11:
              if (!this._isUnmounted) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return");

            case 13:
              if (!err) {
                _context.next = 18;
                break;
              }

              this.state._formMixin.globalError = err;
              _context.next = 17;
              return (0, _toPromise["default"])(this.setState.bind(this), true)(this.state);

            case 17:
              throw err;

            case 18:
              this.state._formMixin.data = data;

            case 19:
              this.state._formMixin.model.on('update', this._handleModelChange);

              _context.next = 22;
              return (0, _toPromise["default"])(this.setState.bind(this), true)(this.state);

            case 22:
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
      }, _callee, this, [[2, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), true),

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  isLoaded: function isLoaded() {
    return this.state && this.state._formMixin && Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
  },

  /**
   * Get form changes
   *
   * @return {{}}
   */
  getChanges: function getChanges() {
    var changes = {};

    for (var field in this.state._formMixin.changes) {
      if (!this._isDependentField(field)) {
        changes[field] = this.state._formMixin.changes[field];
      }
    }

    return changes;
  },

  /**
   * Check if form field (or entire form) is changed
   *
   * @param  {string}   field  Field name
   * @return {boolean}
   */
  hasChanges: function hasChanges(field) {
    if (this._isNotInitialized()) {
      return false;
    }

    var state = this.state._formMixin;

    if (field === undefined) {
      return !(0, _utils.isEmpty)(state.changes);
    }

    if (!state.showDependentFields && this._isDependentField(field)) {
      return false;
    }

    return state.changes.hasOwnProperty(field);
  },

  /**
   * Check if form field has validity errors
   *
   * @param  {string|string[]}   field  Field name or array of names
   * @return {boolean}
   */
  hasError: function hasError(field) {
    if (this._isNotInitialized()) {
      return false;
    }

    var state = this.state._formMixin; // Check group of fields

    if (Array.isArray(field)) {
      var _iterator = _createForOfIteratorHelper(field),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;

          if (this.hasError(entry)) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    } // If partial check is on and field is changed,
    // do not display an error


    if (state.partialErrorChecking) {
      if (!state.changes.hasOwnProperty(field) || (0, _utils.isEqual)(state.changes[field], state.data[field])) {
        return false;
      }
    }

    return this.state._formMixin.errors.hasError(field) || this.state._formMixin.warnings.hasError(field);
  },
  clearError: function clearError(field, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    if (this.state._formMixin.validating) {
      this.state._formMixin.pendingClearErrors.push(field);
    }

    if (Array.isArray(field)) {
      field.forEach(function (oneField) {
        this.state._formMixin.errors.clearField(oneField);

        this.state._formMixin.warnings.clearField(oneField);
      }, this);
    } else {
      this.state._formMixin.errors.clearField(field);

      this.state._formMixin.warnings.clearField(field);
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  clearValidation: function clearValidation(field, cb) {
    this.clearError(field, cb);
  },

  /**
   * Get form data without changes
   *
   * @return {Object|null}
   */
  getOriginalData: function getOriginalData() {
    if (this._isNotInitialized()) {
      return {};
    }

    return this.state._formMixin.data || null;
  },

  /**
   * Get form data
   *
   * @return {Object|null}
   */
  getData: function getData() {
    if (this._isNotInitialized()) {
      return {};
    }

    return (0, _utils.cloneDeep)(this._getData());
  },

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  getValidationErrors: function getValidationErrors() {
    if (this._isNotInitialized()) {
      return new _ValidationErrors["default"]();
    }

    var field;

    var errors = _ValidationErrors["default"].merge(this.state._formMixin.errors, this.state._formMixin.warnings); // If gradual validation is on, we need
    // to remove unchanged records from errors object


    if (this.state._formMixin.partialErrorChecking) {
      errors = this.state._formMixin.errors.clone(); // Look through all form fields

      for (field in this.state._formMixin.data) {
        // If field is unchanged, remove errors, that regard to this field
        if (!this.state._formMixin.changes.hasOwnProperty(field) || (0, _utils.isEqual)(this.state._formMixin.changes[field], this.state._formMixin.data[field])) {
          errors.clearField(field);
        }
      }
    }

    return errors;
  },
  getFieldErrors: function getFieldErrors(field) {
    if (this._isNotInitialized()) {
      return false;
    } // If partial check is on and field is changed,
    // do not display an error


    if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
      return null;
    }

    var errors = this.state._formMixin.errors.getFieldErrors(field) || [];
    var warnings = this.state._formMixin.warnings.getFieldErrors(field) || [];
    return errors.concat(warnings);
  },

  /**
   * Get global error data, if it's present
   *
   * @returns {Error|null}
   */
  getGlobalError: function getGlobalError() {
    if (this._isNotInitialized()) {
      return null;
    }

    return this.state._formMixin.globalError;
  },

  /**
   * Update form value. Is used as the Editors onChange handler.
   * Causes component redraw.
   *
   * @param {string}           field   Parameter
   * @param {*}                value   Event or data
   */
  updateField: function updateField(field, value) {
    if (this._isNotInitialized()) {
      return;
    }

    this.set((0, _defineProperty2["default"])({}, field, (0, _utils.parseValueFromEvent)(value)));
  },
  validateField: function validateField(field, value, cb) {
    this.set((0, _defineProperty2["default"])({}, field, (0, _utils.parseValueFromEvent)(value)), true, cb);
  },
  validateForm: function validateForm(cb) {
    this._validateForm(function (err) {
      if (typeof cb === 'function') {
        return cb(err);
      } else if (err) {
        if (!(err instanceof _ValidationErrors["default"])) {
          console.error(err);
        }
      }
    });
  },

  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {boolean}      [validate=false]  Validate form
   * @param {Function}  [cb]              CallBack
   */
  set: function set(data, validate, cb) {
    var _this = this;

    if (!this.isLoaded()) {
      return;
    }

    if (typeof validate === 'function' && !cb) {
      cb = validate;
      validate = false;
    }

    var state = this.state._formMixin;
    state.changes = (0, _utils.getRecordChanges)(state.model, state.data, state.changes, data);
    var changedFields = Object.keys(data);

    var validationDependencies = this.state._formMixin.model.getValidationDependency(changedFields);

    var _iterator2 = _createForOfIteratorHelper(changedFields.concat(validationDependencies)),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var field = _step2.value;

        this.state._formMixin.errors.clearField(field); // clear validation


        this.state._formMixin.warnings.clearField(field);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    if (this.state._formMixin.autoSubmit) {
      this.submit(function (err, result) {
        _this.state._formMixin.autoSubmitHandler(err, result);

        if (typeof cb === 'function') {
          cb(err, result);
        }
      });
      return;
    }

    if (validate) {
      this.setState(this.state, function () {
        return _this.validateForm(cb);
      });
      return;
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  submitData: function submitData(data, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.set(data);
    this.submit(cb);
  },

  /**
   * Send form data to the model
   *
   * @param {Function}  [cb]  CallBack function
   */
  submit: (0, _callbackify["default"])( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var changes, data, err, newChanges, actualChanges, validationError;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!this._isNotInitialized()) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            if (!(!this.state._formMixin.autoSubmit && this.isSubmitting())) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return");

          case 4:
            this.state._formMixin.submitting = true;
            changes = this._getChanges();
            this.state._formMixin.globalError = null;
            this.state._formMixin.partialErrorChecking = false;
            this.setState(this.state); // Send changes to model

            _context2.prev = 9;
            _context2.next = 12;
            return this.state._formMixin.model.submit(changes);

          case 12:
            data = _context2.sent;
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](9);
            err = _context2.t0;

          case 18:
            if (!this._isUnmounted) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return");

          case 20:
            this.state._formMixin.submitting = false;
            newChanges = this._getChanges();
            actualChanges = (0, _utils.isEqual)(changes, newChanges);
            validationError = err instanceof _ValidationErrors["default"]; // Replacing empty error to null

            if (validationError && err.isEmpty()) {
              err = null;
            }

            if (err) {
              if (validationError) {
                if (actualChanges) {
                  this.state._formMixin.errors = err;
                }
              } else {
                this.state._formMixin.globalError = err;
              }
            } else if (actualChanges) {
              this.state._formMixin.errors = new _ValidationErrors["default"]();
              this.state._formMixin.changes = {};
            } else {
              (0, _utils.forEach)(changes, function (value, field) {
                if ((0, _utils.isEqual)(value, newChanges[field])) {
                  delete this.state._formMixin.changes[field];
                }
              }, this);
            }

            _context2.next = 28;
            return (0, _toPromise["default"])(this.setState.bind(this), true)(this.state);

          case 28:
            if (!err) {
              _context2.next = 30;
              break;
            }

            throw err;

          case 30:
            return _context2.abrupt("return", data);

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[9, 15]]);
  }))),
  clearFieldChanges: function clearFieldChanges(field, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clearField(field);

    this.state._formMixin.warnings.clearField(field);

    delete this.state._formMixin.changes[field];
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  clearChanges: function clearChanges(cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clear();

    this.state._formMixin.warnings.clear();

    this.state._formMixin.changes = {};
    this.state._formMixin.globalError = false;
    this.state._formMixin.partialErrorChecking = this.state._formMixin.partialErrorCheckingDefault;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  setPartialErrorChecking: function setPartialErrorChecking(value, cb) {
    this.state._formMixin.partialErrorChecking = value;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },
  isSubmitting: function isSubmitting() {
    if (this._isNotInitialized()) {
      return false;
    }

    return this.state._formMixin.submitting;
  },

  /**
   * Model records changes handler
   *
   * @param {Object} changes  Changes
   * @private
   */
  _handleModelChange: function _handleModelChange(changes) {
    Object.assign(this.state._formMixin.data, (0, _utils.cloneDeep)(changes));

    if (!this._isUnmounted) {
      this.setState(this.state);
    }
  },
  _initState: function _initState(settings) {
    if (!settings.model) {
      throw new Error('You must specify the model form in this.initForm()');
    }

    this.state._formMixin = {
      data: settings.data,
      changes: settings.changes || {},
      errors: new _ValidationErrors["default"](),
      warnings: new _ValidationErrors["default"](),
      globalError: null,
      validating: false,
      pendingClearErrors: [],
      submitting: false,
      showDependentFields: settings.showDependentFields || false,
      warningsValidator: settings.warningsValidator || new _Validator["default"](),
      partialErrorChecking: settings.partialErrorChecking,
      // Current mode
      partialErrorCheckingDefault: settings.partialErrorChecking,
      // Default mode
      model: settings.model,
      // FormModel
      fields: settings.fields,
      submitAll: settings.submitAll,
      autoSubmit: settings.autoSubmit,
      autoSubmitHandler: settings.autoSubmitHandler
    };
  },
  _isNotInitialized: function _isNotInitialized() {
    return !this.state || !this.state._formMixin;
  },
  _validateForm: function _validateForm(cb, stop) {
    if (this._isNotInitialized()) {
      return stop();
    }

    var completed = 0;
    var completeError;

    var onComplete = function (err) {
      var field;

      if (this._isUnmounted) {
        if (err) {
          console.error(err);
        }

        return;
      }

      if (err) {
        completeError = err;
      }

      if (++completed < 2) {
        // Wait two callbacks
        return;
      }

      this.state._formMixin.validating = false;

      while (field = this.state._formMixin.pendingClearErrors.pop()) {
        this.state._formMixin.warnings.clearField(field);

        this.state._formMixin.errors.clearField(field);
      }

      this.setState(this.state, function () {
        if (completeError) {
          cb(completeError);
          return;
        }

        var errorsWithPartialChecking = this.getValidationErrors();
        cb(errorsWithPartialChecking.isEmpty() ? null : errorsWithPartialChecking);
      });
    }.bind(this);

    this.state._formMixin.validating = true;

    this._runValidator(this.state._formMixin.model, this._getChanges, 'errors', onComplete);

    this._runValidator(this.state._formMixin.warningsValidator, this._getData, 'warnings', onComplete);
  },
  _runValidator: function _runValidator(validator, getData, output, cb) {
    var _this2 = this;

    var data = getData();
    validator.isValidRecord(data).then(function (validErrors) {
      if (!_this2._isUnmounted && (0, _utils.isEqual)(data, getData())) {
        _this2.state._formMixin[output] = validErrors;
      }

      cb();
    })["catch"](function (err) {
      if (!_this2._isUnmounted && (0, _utils.isEqual)(data, getData())) {
        _this2.state._formMixin[output].clear();
      }

      cb(err);
    });
  },
  _getData: function _getData() {
    if (!this.state._formMixin.data) {
      return null;
    }

    return Object.assign({}, this.state._formMixin.data, this.state._formMixin.changes);
  },
  _getChanges: function _getChanges() {
    // Send all data or just changed fields in addiction of form configuration
    if (this.state._formMixin.submitAll) {
      return this._getData();
    }

    return (0, _utils.clone)(this.state._formMixin.changes);
  },
  _isDependentField: function _isDependentField(field) {
    var state = this.state._formMixin;
    return state.changes.hasOwnProperty(field) && (0, _utils.isEqual)(state.changes[field], state.data[field]);
  }
};
var _default = FormMixin;
exports["default"] = _default;
module.exports = exports.default;