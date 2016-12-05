/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import EventEmitter from '../common/Events';
import toPromise from '../common/toPromise';
import ValidationErrors from '../common/validation/ValidationErrors';
import utils from '../common/utils';

class FormService {

  constructor() {
    this._data = null;
    this._changes = null;
    this._errors = null;
    this._globalError = null;
    this._eventEmitter = new EventEmitter();
    this._isNotInitialized = true;
    this.validateForm = utils.throttle(this.validateForm);
    this._onModelChange = this._onModelChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
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
   */
  async init(settings) {
    if (!settings.model) {
      throw Error('You must specify the model form in this.init()');
    }

    this._data = settings.data || null;
    this._changes = settings.changes || {};
    this.showDependentFields = settings.showDependentFields || false;
    this.partialErrorChecking = settings.partialErrorChecking; // Current mode
    this.partialErrorCheckingDefault = settings.partialErrorChecking; // Default mode
    this.model = settings.model; // FormModel
    this.fields = settings.fields;
    this.submitAll = settings.submitAll;

    this.validating = false;
    this.pendingClearErrors = [];
    this.submitting = false;
    this._isNotInitialized = false;

    if (!this._data) {
      let data;
      try {
        data = await toPromise(settings.model.getData.bind(settings.model))(settings.fields);
      } catch (err) {
        this._globalError = err;
        this._setState();
        return;
      }
      this._data = data;
    }

    this.model.on('update', this._onModelChange);
    this._setState();
    await this.validateForm();
  }

  getAll() {
    const isLoaded = this._isLoaded();

    if (!isLoaded) {
      return {
        isLoaded,
        data: {},
        originalData: {},
        changes: {},
        errors: new ValidationErrors(),
        globalError: null,
        isSubmitting: false
      };
    }

    return {
      isLoaded,
      data: this._getData(),
      originalData: this._data,
      changes: this._getChangesFields(),
      errors: this._getValidationErrors() ? this._getValidationErrors()._fields : {},
      globalError: this._globalError,
      isSubmitting: this.isSubmitting
    };
  }

  /**
   * Update form value. Is used as the Editors onSubmit handler.
   * Causes component redraw.
   *
   * @param {string|string[]}  fields  Parameters
   * @param {*}                values   Event or data
   */
  updateField(fields, values) {
    if (this._isNotInitialized) {
      return;
    }

    values = utils.parseValueFromEvent(values);

    if (!Array.isArray(fields)) {
      fields = [fields];
      values = [values];
    }
    this.set(utils.zipObject(fields, values));
  }

  addChangeListener(func) {
    this._eventEmitter.on('update', func);
  }

  removeChangeListener(func) {
    this._eventEmitter.off('update', func);
    if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
      this.model.off('update', this._onModelChange);
    }
  }

  removeAllListeners() {
    this._eventEmitter.removeAllListeners('update');
    this.model.off('update', this._onModelChange);
  }

  clearError(field) {
    if (this._isNotInitialized) {
      return;
    }

    if (this.validating) {
      this.pendingClearErrors.push(field);
    }

    if (Array.isArray(field)) {
      field.forEach(oneField => {
        this._errors.clearField(oneField);
      });
    } else {
      this._errors.clearField(field);
    }

    this._setState();
  }

  validateField(fields, values) {
    this.updateField(fields, values);
    return this.validateForm();
  }
  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {bool}      [validate=false]  Validate form
   */
  set(data, validate) {
    if (!this._isLoaded()) {
      return;
    }

    this._changes = utils.getRecordChanges(this.model, this._data, this._changes, data);

    this._setState();

    if (validate) {
      this.validateForm();
    }
  }

  async submitData(data) {
    if (this._isNotInitialized) {
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
    if (this._isNotInitialized) {
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const changes = this._getChanges();

    this._globalError = null;
    this.partialErrorChecking = false;

    this._setState();

    // Send changes to model
    let data;
    let err;
    try {
      data = await this.model.submit(changes);
    }
    catch (error) {
      err = error;
    }

    this.isSubmitting = false;

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
          this._errors = err;
        }
      } else {
        this._globalError = err;
      }
    } else if (actualChanges) {
      this._errors = new ValidationErrors();
      this._changes = {};
    } else {
      utils.forEach(changes, (value, field) => {
        if (utils.isEqual(value, newChanges[field])) {
          delete this._changes[field];
        }
      });
    }

    this._setState();

    if (err) {
      throw err;
    }

    return data;
  }

  clearFieldChanges(field) {
    if (this._isNotInitialized) {
      return;
    }

    this._errors.clearField(field);
    delete this._changes[field];
    this._setState();
  }

  clearChanges() {
    if (this._isNotInitialized) {
      return;
    }

    this._errors.clear();
    this._changes = {};
    this._globalError = false;
    this.partialErrorChecking = this.partialErrorCheckingDefault;
    this._setState();
  }

  setPartialErrorChecking(value) {
    this.partialErrorChecking = value;
    this._setState();
  }

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  _isLoaded() {
    return this &&
      Boolean(this._data || this._globalError);
  }

  /**
   * Get form changes
   *
   * @return {{}}
   */
  _getChangesFields() { // TODO _getChanges
    const changes = {};
    for (let field in this._changes) {
      if (!this._isDependentField(field)) {
        changes[field] = this._changes[field];
      }
    }
    return changes;
  }

  /**
   * Get form errors
   *
   * @returns {ValidationErrors} Form errors
   */
  _getValidationErrors() {
    // If gradual validation is on, we need
    // to remove unchanged records from errors object
    if (!this.partialErrorChecking || !this._errors) {
      return this._errors;
    }

    const errors = this._errors.clone();

    // Look through all form fields
    for (const field in this._data) {
      // If field is unchanged, remove errors, that regard to this field
      if (!this._changes.hasOwnProperty(field)) {
        errors.clearField(field);
      }
    }

    return errors;
  }

  _setState() {
    this._eventEmitter.trigger('update', this.getAll());
  }

  /**
   * Model records changes handler
   *
   * @param {Object} changes  Changes
   * @private
   */
  _onModelChange(changes) {
    this._data = {...this._data, ...changes};
    this._setState();
  }

  async validateForm() {
    if (this._isNotInitialized) {
      return;
    }

    const data = this._getChanges();

    this.validating = true;
    let validErrors;
    let err;
    try {
      validErrors = await this.model.isValidRecord(data);
    } catch (error) {
      err = error;
    }

    this.validating = false;

    if (!utils.isEqual(data, this._getChanges())) {
      return;
    }

    if (err) {
      this._errors.clear();
    } else {
      this._errors = validErrors;
      let field;
      while (field = this.pendingClearErrors.pop()) {
        this._errors.clearField(field);
      }
    }

    this._setState();

    if (err) {
      throw  err;
    }

    const errorsWithPartialChecking = this._getValidationErrors();
    if (!errorsWithPartialChecking.isEmpty()) {
      return errorsWithPartialChecking;
    }
  }

  _getData() {
    return utils.assign({}, this._data, this._changes);
  }

  _getChanges() {
    // Send all data or just changed fields in addiction of form configuration
    if (this.submitAll) {
      return this._getData();
    }
    return this._changes;
  }

  _isDependentField(field) {
    return this._changes.hasOwnProperty(field) && utils.isEqual(this._changes[field], this._data[field]);
  }

}

export default FormService;
