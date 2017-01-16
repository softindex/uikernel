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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _common = require('../common/validation/Validator/common');

var _common2 = _interopRequireDefault(_common);

var _ValidationErrors = require('../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Grid form mixin
 * @mixin
 */
var FormMixin = {
  getInitialState: function getInitialState() {
    this._validateForm = _utils2.default.throttle(this._validateForm);

    if (this._handleModelChange.name.indexOf('bound ') !== 0) {
      // Support React.createClass and mixin-decorators
      this._handleModelChange = this._handleModelChange.bind(this);
      this._getData = this._getData.bind(this);
      this._getChanges = this._getChanges.bind(this);
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
  initForm: function initForm(settings, cb) {
    var ctx = this;

    ctx._initState(settings);

    function done() {
      ctx.state._formMixin.model.on('update', ctx._handleModelChange);
      ctx.setState(ctx.state, function () {
        ctx._validateForm(function () {
          if (cb) {
            // Don't send validation errors
            cb();
          }
        });
      });
    }

    if (!ctx.state._formMixin.data) {
      settings.model.getData(settings.fields, function (err, data) {
        if (ctx._isUnmounted) {
          return;
        }
        if (err) {
          ctx.state._formMixin.globalError = err;
          ctx.setState(ctx.state, function () {
            if (cb) {
              return cb(err);
            }
            throw err;
          });
          return;
        }
        ctx.state._formMixin.data = data;
        done();
      });
    } else {
      done();
    }
  },

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
      return !_utils2.default.isEmpty(state.changes);
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

    var state = this.state._formMixin;

    // Check group of fields
    if (Array.isArray(field)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(field), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          if (this.hasError(entry)) {
            return true;
          }
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

      return false;
    }

    // If partial check is on and field is changed,
    // do not display an error
    if (state.partialErrorChecking) {
      if (!state.changes.hasOwnProperty(field) || _utils2.default.isEqual(state.changes[field], state.data[field])) {
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
    return _utils2.default.cloneDeep(this._getData());
  },

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  getValidationErrors: function getValidationErrors() {
    if (this._isNotInitialized()) {
      return new _ValidationErrors2.default();
    }

    var field = void 0;
    var errors = _ValidationErrors2.default.merge(this.state._formMixin.errors, this.state._formMixin.warnings);

    // If gradual validation is on, we need
    // to remove unchanged records from errors object
    if (this.state._formMixin.partialErrorChecking) {
      errors = this.state._formMixin.errors.clone();

      // Look through all form fields
      for (field in this.state._formMixin.data) {
        // If field is unchanged, remove errors, that regard to this field
        if (!this.state._formMixin.changes.hasOwnProperty(field)) {
          errors.clearField(field);
        }
      }
    }

    return errors;
  },

  getFieldErrors: function getFieldErrors(field) {
    if (this._isNotInitialized()) {
      return false;
    }

    // If partial check is on and field is changed,
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
   * Update form value. Is used as the Editors onSubmit handler.
   * Causes component redraw.
   *
   * @param {string|string[]}  fields  Parameters
   * @param {*}                values   Event or data
   * @param {Function}         [cb]       CallBack
   */
  updateField: function updateField(fields, values, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    values = _utils2.default.parseValueFromEvent(values);

    if (!Array.isArray(fields)) {
      fields = [fields];
      values = [values];
    }

    this.set(_utils2.default.zipObject(fields, values));
    if (this.state._formMixin.autoSubmit) {
      this.submit(this.state._formMixin.autoSubmitHandler, cb);
    }
  },

  validateField: function validateField(fields, values, cb) {
    if (this.state._formMixin.autoSubmit) {
      throw Error('Use updateField method to update value in autoSubmit mode');
    }
    this.updateField(fields, values);
    this.validateForm(cb);
  },

  validateForm: function validateForm(cb) {
    this._validateForm(function (err) {
      if (typeof cb === 'function') {
        return cb(err);
      }
    });
  },

  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {bool}      [validate=false]  Validate form
   * @param {Function}  [cb]              CallBack
   */
  set: function set(data, validate, cb) {
    if (!this.isLoaded()) {
      return;
    }

    if (typeof validate === 'function' && !cb) {
      cb = validate;
      validate = false;
    }

    var state = this.state._formMixin;
    state.changes = _utils2.default.getRecordChanges(state.model, state.data, state.changes, data);

    if (validate) {
      this.validateForm(cb);
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
  submit: function submit(cb) {
    if (this._isNotInitialized()) {
      return;
    }

    if (!this.state._formMixin.autoSubmit && this.isSubmitting()) {
      return;
    }

    this.state._formMixin.submitting = true;

    var changes = this._getChanges();

    this.state._formMixin.globalError = null;
    this.state._formMixin.partialErrorChecking = false;

    this.setState(this.state);

    // Send changes to model
    this.state._formMixin.model.submit(changes, function (err, data) {
      if (this._isUnmounted) {
        return;
      }

      this.state._formMixin.submitting = false;

      var newChanges = this._getChanges();
      var actualChanges = _utils2.default.isEqual(changes, newChanges);
      var validationError = err instanceof _ValidationErrors2.default;

      // Replacing empty error to null
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
        this.state._formMixin.errors = new _ValidationErrors2.default();
        this.state._formMixin.changes = {};
      } else {
        _utils2.default.forEach(changes, function (value, field) {
          if (_utils2.default.isEqual(value, newChanges[field])) {
            delete this.state._formMixin.changes[field];
          }
        }, this);
      }

      this.setState(this.state, function () {
        if (typeof cb === 'function') {
          cb(err, data);
        }
      });
    }.bind(this));
  },

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
    (0, _assign2.default)(this.state._formMixin.data, _utils2.default.cloneDeep(changes));
    if (!this._isUnmounted) {
      this.setState(this.state);
    }
  },

  _initState: function _initState(settings) {
    if (!settings.model) {
      throw Error('You must specify the model form in this.initForm()');
    }

    this.state._formMixin = {
      data: settings.data,
      changes: settings.changes || {},
      errors: new _ValidationErrors2.default(),
      warnings: new _ValidationErrors2.default(),
      globalError: null,
      validating: false,
      pendingClearErrors: [],
      submitting: false,
      showDependentFields: settings.showDependentFields || false,
      warningsValidator: settings.warningsValidator || new _common2.default(),

      partialErrorChecking: settings.partialErrorChecking, // Current mode
      partialErrorCheckingDefault: settings.partialErrorChecking, // Default mode

      model: settings.model, // FormModel
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
    var completeError = void 0;
    var onComplete = function (err) {
      var field = void 0;

      if (this._isUnmounted) {
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
    var data = getData();
    validator.isValidRecord(data, function (err, validErrors) {
      if (this._isUnmounted || !_utils2.default.isEqual(data, getData())) {
        return;
      }

      if (err) {
        this.state._formMixin[output].clear();
      } else {
        this.state._formMixin[output] = validErrors;
      }

      cb(err);
    }.bind(this));
  },

  _getData: function _getData() {
    if (!this.state._formMixin.data) {
      return null;
    }
    return (0, _assign2.default)({}, this.state._formMixin.data, this.state._formMixin.changes);
  },

  _getChanges: function _getChanges() {
    // Send all data or just changed fields in addiction of form configuration
    if (this.state._formMixin.submitAll) {
      return this._getData();
    }
    return _utils2.default.clone(this.state._formMixin.changes);
  },

  _isDependentField: function _isDependentField(field) {
    var state = this.state._formMixin;
    return state.changes.hasOwnProperty(field) && _utils2.default.isEqual(state.changes[field], state.data[field]);
  }
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

exports.default = FormMixin;
module.exports = exports['default'];