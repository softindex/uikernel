/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

import EventEmitter from '../common/Events';
import toPromise from '../common/toPromise';
import ValidationErrors from '../common/validation/ValidationErrors';
import utils from '../common/utils';

/**
 * Grid form mixin
 * @mixin
 */
// class Store extends EventEmitter{
//   constructor(){
//     super();
//   }
// }
class FormMixin extends EventEmitter {

  _setState() {
    this.eventEmitter.trigger('update', this.getAll());
  }

  constructor() {
    super();
    this.data = {};
    this.isLoaded = false;
    this.changes = {};
    this.errors = {};
    this.globalError = null;
    this._isUnmounted = false;
    this.eventEmitter = new EventEmitter();
    this._validateForm = utils.throttle(this._validateForm);
    this._handleModelChange = this._handleModelChange.bind(this);
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
   * @param {bool}              [settings.autoSubmit]                   Automatic submit before updateField
   * @param {Function}          [settings.autoSubmitHandler]            Automatic submit handler
   */
  async initForm(settings) {
    const ctx = this;
    if (!settings.model) {
      throw Error('You must specify the model form in this.initForm()');
    }

    this.data = settings.data;
    this.changes = settings.changes || {};
    this.errors = new ValidationErrors();
    this.globalError = null;
    this.validating = false;
    this.pendingClearErrors = [];
    this.submitting = false;
    this.showDependentFields = settings.showDependentFields || false;

    this.partialErrorChecking = settings.partialErrorChecking; // Current mode
    this.partialErrorCheckingDefault = settings.partialErrorChecking; // Default mode

    this.model = settings.model; // FormModel
    this.fields = settings.fields;
    this.submitAll = settings.submitAll;
    this.autoSubmit = settings.autoSubmit;
    this.autoSubmitHandler = settings.autoSubmitHandler;

    async function done() {
      ctx.model.on('update', ctx._handleModelChange);
      await toPromise(ctx._setState.bind(ctx))(ctx);
      await toPromise(ctx._validateForm.bind(ctx))();
    }

    if (!ctx.data) {
      let data;
      try {
        data = await toPromise(settings.model.getData.bind(settings.model))(settings.fields);
      }
      catch (err) {
        ctx.globalError = err;
        await toPromise(ctx._setState.bind(ctx))(ctx);
        return;
      }

      if (ctx._isUnmounted) {
        return;
      }
      ctx.data = data;
      return done();
    } else {
      return done();
    }
  }

  /**
   * Update form value. Is used as the Editors onSubmit handler.
   * Causes component redraw.
   *
   * @param {string|string[]}  fields  Parameters
   * @param {*}                values   Event or data
   */
  updateField(fields, values) {//event
    if (arguments.length == 1)
      return updateField.bind(this, fields);
    else return updateField.bind(this)(fields, values);

    async function updateField (fields, values) {
      if (this._isNotInitialized()) {
        return;
      }

      values = utils.parseValueFromEvent(values);

      if (!Array.isArray(fields)) {
        fields = [fields];
        values = [values];
      }
      this.set(utils.zipObject(fields, values));
      if (this.autoSubmit) {
        const data = await this.submit();
        this.autoSubmitHandler(null, data)
      }
    }
  }

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  _componentIsLoaded() {
    return this &&
      Boolean(this.data || this.globalError);
  }

  /**
   * Get form changes
   *
   * @return {{}}
   */
  _getChangesFields() {
    const changes = {};
    for (let field in this.changes) {
      if (!this._isDependentField(field)) {
        changes[field] = this.changes[field];
      }
    }
    return changes;
  }
  /**
   * Get form data without changes
   *
   * @return {Object|null}
   */
  _getOriginalData() {
    if (this._isNotInitialized()) {
      return {};
    }
    return this.data || null;
  }

  /**
   * Get form data
   *
   * @return {Object|null}
   */
  // getData() {
  //   if (this._isNotInitialized()) {
  //     return {};
  //   }
  //   return this._getData();
  // }

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  _getValidationErrors() {
    if (this._isNotInitialized()) {
      return new ValidationErrors();
    }

    let errors;
    let field;

    // If gradual validation is on, we need
    // to remove unchanged records from errors object
    if (this.partialErrorChecking) {
      errors = this.errors.clone();

      // Look through all form fields
      for (field in this.data) {
        // If field is unchanged, remove errors, that regard to this field
        if (!this.changes.hasOwnProperty(field)) {
          errors.clearField(field);
        }
      }
    } else {
      errors = this.errors;
    }

    return errors;
  }
  /**
   * Get global error data, if it's present
   *
   * @returns {Error|null}
   */
  _getGlobalError() {
    if (this._isNotInitialized()) {
      return null;
    }
    return this.globalError;
  }

  _isSubmitting() {
    if (this._isNotInitialized()) {
      return false;
    }

    return this.submitting;
  }

  /**
   * Model records changes handler
   *
   * @param {Object} changes  Changes
   * @private
   */
  _handleModelChange(changes) {
    utils.assign(this.data, utils.cloneDeep(changes));
    if (!this._isUnmounted) {
      this._setState(this);
    }
  }

  // _initState(settings) {
  //
  // }

  _isNotInitialized() {
    return !this;
  }

  _validateForm(cb, stop) {
    if (this._isNotInitialized()) {
      return stop();
    }

    const data = this._getChanges();

    this.validating = true;

    this.model.isValidRecord(data, function (err, validErrors) {
      let field;

      this.validating = false;

      if (this._isUnmounted || !utils.isEqual(data, this._getChanges())) {
        return stop();
      }

      if (err) {
        this.errors.clear();
      } else {
        this.errors = validErrors;
        while (field = this.pendingClearErrors.pop()) {
          this.errors.clearField(field);
        }
      }

      this._setState(this, function () {
        const errorsWithPartialChecking = this._getValidationErrors();
        if (!err && !errorsWithPartialChecking.isEmpty()) {
          return cb(errorsWithPartialChecking);
        }
        cb(err);
      });
    }.bind(this));
  }

  _getData() {
    if (!this.data) {
      return null;
    }
    return utils.assign({}, this.data, this.changes);
  }

  _getChanges() {
    // Send all data or just changed fields in addiction of form configuration
    if (this.submitAll) {
      return this._getData();
    }
    return this.changes;
  }

  _isDependentField(field) {
    const state = this;
    return state.changes.hasOwnProperty(field) && utils.isEqual(state.changes[field], state.data[field]);
  }

  getAll() {
    return {
      data: this._getData(),
      originalData: this._getOriginalData(),
      isLoaded: this._componentIsLoaded(),
      changes: this._getChangesFields(),
      errors: this._getValidationErrors()._fields || {},
      globalError: this._getGlobalError(),
      submitting: this._isSubmitting()
    };
  }

  addChangeListener(func) {
    this.eventEmitter.on('update', func);
    // console.log(this.model._adapter.model._subscribers);
  }

  removeChangeListener(func) {
    this._isUnmounted = true;
    if (!this._isNotInitialized()) {
      this.eventEmitter.off('update', func);
      return;
    }
    if (this.eventEmitter._subscribers['update'].length === 0) {
      this.model.off('update', this._handleModelChange);
    }
  }

  removeAllListeners(){
    this.eventEmitter._subscribers['update'] = [];
    this.model.off('update', this._handleModelChange);
  }

  clearError(field) {//event
      if (this._isNotInitialized()) {
        return;
      }

      if (this.validating) {
        this.pendingClearErrors.push(field);
      }

      if (Array.isArray(field)) {
        field.forEach(function (oneField) {
          this.errors.clearField(oneField);
        }, this);
      } else {
        this.errors.clearField(field);
      }

      return toPromise(this._setState.bind(this))(this);
    }

  validateField(fields, values) {
    if (arguments.length == 1)
      return this.validateField.bind(this, fields);

    if (this.autoSubmit) {
      throw Error('Use updateField method to update value in autoSubmit mode');
    }
    this.updateField(fields, values);
    return this.validateForm();
  }

  validateForm() {

    return toPromise(this._validateForm.bind(this))()
  }

  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {bool}      [validate=false]  Validate form
   */
  set (data, validate) {
    if (!this._componentIsLoaded()) {
      return;
    }

    const state = this;
    state.changes = utils.getRecordChanges(state.model, state.data, state.changes, data);

    if (validate) {
      return toPromise(this.validateForm.bind(this));
    }

    return toPromise(this._setState.bind(this))(this);
  }

  async submitData(data) {
    if (this._isNotInitialized()) {
      return;
    }

    this.set(data);
    return await this.submit();
  }

  /**
   * Send form data to the model
   *
   */
  async submit() {
      if (this._isNotInitialized()) {
        return;
      }

      if (!this.autoSubmit && this._isSubmitting()) {
        return;
      }

      this.submitting = true;

      const changes = this._getChanges();

      this.globalError = null;
      this.partialErrorChecking = false;

      this._setState(this);

      // Send changes to model
      let model = this.model;
      let data;
      let err;
      try {
        data = await toPromise(model.submit.bind(model))(changes);
      }
      catch (error) {
        err = error;
      }
      if (this._isUnmounted) {
        return;
      }

      this.submitting = false;

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
            this.errors = err;
          }
        } else {
          this.globalError = err;
        }
      } else if (actualChanges) {
        this.errors = new ValidationErrors();
        this.changes = {};
      } else {
        utils.forEach(changes, function (value, field) {
          if (utils.isEqual(value, newChanges[field])) {
            delete this.changes[field];
          }
        }, this);
      }

      await toPromise(this._setState.bind(this))(this);

      if (err)
        throw err;
      else return data;
    }

  clearFieldChanges(field) {
    if (this._isNotInitialized()) {
      return;
    }

    this.errors.clearField(field);
    delete this.changes[field];
    return toPromise(this._setState.bind(this))(this);
  }

  clearChanges() {
    if (this._isNotInitialized()) {
      return;
    }

    this.errors.clear();
    this.changes = {};
    this.globalError = false;
    this.partialErrorChecking = this.partialErrorCheckingDefault;
    return toPromise(this._setState.bind(this))(this);
  }

  setPartialErrorChecking (value) {
    this.partialErrorChecking = value;
    return toPromise(this._setState.bind(this))(this);
  }

}

module.exports = FormMixin;