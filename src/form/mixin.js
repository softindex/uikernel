/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../common/utils';
import callbackify from '../common/callbackify';
import toPromise from '../common/toPromise';
import Validator from '../common/validation/Validator/common';
import ValidationErrors from '../common/validation/ValidationErrors';

/**
 * Grid form mixin
 * @mixin
 */
const FormMixin = {
  getInitialState: function () {
    this._validateForm = utils.throttle(this._validateForm);

    if (this._handleModelChange.name.indexOf('bound ') !== 0) { // Support React.createClass and mixin-decorators
      this._handleModelChange = this._handleModelChange.bind(this);
      this._getData = this._getData.bind(this);
      this._getChanges = this._getChanges.bind(this);
      this.validateForm = this.validateForm.bind(this);
    }

    return {
      _formMixin: null
    };
  },

  componentWillMount: function () {
    this._isUnmounted = false;
  },

  componentWillUnmount: function () {
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
  initForm: callbackify(async function (settings) {
    this._initState(settings);

    if (!this.state._formMixin.data) {
      let data;
      let err;
      try {
        data = await toPromise(settings.model::settings.model.getData)(settings.fields);
      } catch (e) {
        err = e;
      }

      if (this._isUnmounted) {
        return;
      }

      if (err) {
        this.state._formMixin.globalError = err;
        await toPromise(this::this.setState, true)(this.state);
        throw err;
      }

      this.state._formMixin.data = data;
    }

    this.state._formMixin.model.on('update', this._handleModelChange);
    await toPromise(this::this.setState, true)(this.state);
    await toPromise(this.validateForm, true)();
  }, true),

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  isLoaded: function () {
    return this.state && this.state._formMixin &&
      Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
  },

  /**
   * Get form changes
   *
   * @return {{}}
   */
  getChanges: function () {
    const changes = {};
    for (const field in this.state._formMixin.changes) {
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
  hasChanges: function (field) {
    if (this._isNotInitialized()) {
      return false;
    }

    const state = this.state._formMixin;

    if (field === undefined) {
      return !utils.isEmpty(state.changes);
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
  hasError: function (field) {
    if (this._isNotInitialized()) {
      return false;
    }

    const state = this.state._formMixin;

    // Check group of fields
    if (Array.isArray(field)) {
      for (const entry of field) {
        if (this.hasError(entry)) {
          return true;
        }
      }
      return false;
    }

    // If partial check is on and field is changed,
    // do not display an error
    if (state.partialErrorChecking) {
      if (!state.changes.hasOwnProperty(field) || utils.isEqual(state.changes[field], state.data[field])) {
        return false;
      }
    }

    return this.state._formMixin.errors.hasError(field) || this.state._formMixin.warnings.hasError(field);
  },

  clearError: function (field, cb) {
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
  getOriginalData: function () {
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
  getData: function () {
    if (this._isNotInitialized()) {
      return {};
    }
    return utils.cloneDeep(this._getData());
  },

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  getValidationErrors: function () {
    if (this._isNotInitialized()) {
      return new ValidationErrors();
    }

    let field;
    let errors = ValidationErrors.merge(this.state._formMixin.errors, this.state._formMixin.warnings);

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

  getFieldErrors: function (field) {
    if (this._isNotInitialized()) {
      return false;
    }

    // If partial check is on and field is changed,
    // do not display an error
    if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
      return null;
    }

    const errors = this.state._formMixin.errors.getFieldErrors(field) || [];
    const warnings = this.state._formMixin.warnings.getFieldErrors(field) || [];

    return errors.concat(warnings);
  },

  /**
   * Get global error data, if it's present
   *
   * @returns {Error|null}
   */
  getGlobalError: function () {
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
  updateField: function (fields, values) {
    if (this._isNotInitialized()) {
      return;
    }

    values = utils.parseValueFromEvent(values);

    if (!Array.isArray(fields)) {
      fields = [fields];
      values = [values];
    }

    this.set(utils.zipObject(fields, values));
    if (this.state._formMixin.autoSubmit) {
      this.submit(this.state._formMixin.autoSubmitHandler);
    }
  },

  validateField: function (fields, values, cb) {
    if (this.state._formMixin.autoSubmit) {
      throw Error('Use updateField method to update value in autoSubmit mode');
    }
    this.updateField(fields, values);
    this.validateForm(cb);
  },

  validateForm: function (cb) {
    this._validateForm(function (err) {
      if (typeof cb === 'function') {
        return cb(err);
      } else if (err) {
        if (!(err instanceof ValidationErrors)) {
          console.error(err);
        }
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
  set: function (data, validate, cb) {
    if (!this.isLoaded()) {
      return;
    }

    if (typeof validate === 'function' && !cb) {
      cb = validate;
      validate = false;
    }

    const state = this.state._formMixin;
    state.changes = utils.getRecordChanges(state.model, state.data, state.changes, data);

    if (validate) {
      this.validateForm(cb);
      return;
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  submitData: function (data, cb) {
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
  submit: callbackify(async function () {
    if (this._isNotInitialized()) {
      return;
    }

    if (!this.state._formMixin.autoSubmit && this.isSubmitting()) {
      return;
    }

    this.state._formMixin.submitting = true;

    const changes = this._getChanges();

    this.state._formMixin.globalError = null;
    this.state._formMixin.partialErrorChecking = false;

    this.setState(this.state);

    // Send changes to model
    let data;
    let err;
    try {
      data = await toPromise(this.state._formMixin.model::this.state._formMixin.model.submit)(changes);
    } catch (e) {
      err = e;
    }

    if (this._isUnmounted) {
      return;
    }

    this.state._formMixin.submitting = false;

    const newChanges = this._getChanges();
    const actualChanges = utils.isEqual(changes, newChanges);
    const validationError = err instanceof ValidationErrors;

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
      this.state._formMixin.errors = new ValidationErrors();
      this.state._formMixin.changes = {};
    } else {
      utils.forEach(changes, function (value, field) {
        if (utils.isEqual(value, newChanges[field])) {
          delete this.state._formMixin.changes[field];
        }
      }, this);
    }

    await toPromise(this::this.setState, true)(this.state);

    if (err) {
      throw err;
    }
    return data;
  }, true),

  clearFieldChanges: function (field, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clearField(field);
    this.state._formMixin.warnings.clearField(field);
    delete this.state._formMixin.changes[field];
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  clearChanges: function (cb) {
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

  setPartialErrorChecking: function (value, cb) {
    this.state._formMixin.partialErrorChecking = value;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  isSubmitting: function () {
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
  _handleModelChange: function (changes) {
    Object.assign(this.state._formMixin.data, utils.cloneDeep(changes));
    if (!this._isUnmounted) {
      this.setState(this.state);
    }
  },

  _initState: function (settings) {
    if (!settings.model) {
      throw Error('You must specify the model form in this.initForm()');
    }

    this.state._formMixin = {
      data: settings.data,
      changes: settings.changes || {},
      errors: new ValidationErrors(),
      warnings: new ValidationErrors(),
      globalError: null,
      validating: false,
      pendingClearErrors: [],
      submitting: false,
      showDependentFields: settings.showDependentFields || false,
      warningsValidator: settings.warningsValidator || new Validator(),

      partialErrorChecking: settings.partialErrorChecking, // Current mode
      partialErrorCheckingDefault: settings.partialErrorChecking, // Default mode

      model: settings.model, // FormModel
      fields: settings.fields,
      submitAll: settings.submitAll,
      autoSubmit: settings.autoSubmit,
      autoSubmitHandler: settings.autoSubmitHandler
    };
  },

  _isNotInitialized: function () {
    return !this.state || !this.state._formMixin;
  },

  _validateForm: function (cb, stop) {
    if (this._isNotInitialized()) {
      return stop();
    }

    let completed = 0;
    let completeError;
    const onComplete = function (err) {
      let field;

      if (this._isUnmounted) {
        if (err) {
          console.error(err);
        }
        return;
      }

      if (err) {
        completeError = err;
      }

      if (++completed < 2) {// Wait two callbacks
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

        const errorsWithPartialChecking = this.getValidationErrors();
        cb(errorsWithPartialChecking.isEmpty() ? null : errorsWithPartialChecking);
      });
    }.bind(this);

    this.state._formMixin.validating = true;

    this._runValidator(this.state._formMixin.model, this._getChanges, 'errors', onComplete);
    this._runValidator(this.state._formMixin.warningsValidator, this._getData, 'warnings', onComplete);
  },

  _runValidator: function (validator, getData, output, cb) {
    const data = getData();
    validator.isValidRecord(data)
      .then(validErrors => {
        if (this._isUnmounted || !utils.isEqual(data, getData())) {
          return;
        }
        this.state._formMixin[output] = validErrors;
        cb();
      })
      .catch(err => {
        if (this._isUnmounted || !utils.isEqual(data, getData())) {
          console.error(err);
          return;
        }
        this.state._formMixin[output].clear();
        cb(err);
      });
  },

  _getData: function () {
    if (!this.state._formMixin.data) {
      return null;
    }
    return Object.assign({}, this.state._formMixin.data, this.state._formMixin.changes);
  },

  _getChanges: function () {
    // Send all data or just changed fields in addiction of form configuration
    if (this.state._formMixin.submitAll) {
      return this._getData();
    }
    return utils.clone(this.state._formMixin.changes);
  },

  _isDependentField: function (field) {
    const state = this.state._formMixin;
    return state.changes.hasOwnProperty(field) && utils.isEqual(state.changes[field], state.data[field]);
  }
};

export default FormMixin;
