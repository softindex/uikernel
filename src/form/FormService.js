/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventEmitter from '../common/Events';
import toPromise from '../common/toPromise';
import Validator from '../common/validation/Validator/common';
import ValidationErrors from '../common/validation/ValidationErrors';
import utils from '../common/utils';
import ThrottleError from '../common/ThrottleError';

class FormService {
  constructor() {
    this._data = null;
    this._changes = null;
    this._errors = new ValidationErrors();
    this._warnings = new ValidationErrors();
    this._globalError = null;
    this._warningsValidator = null;
    this._eventEmitter = new EventEmitter();
    this._isNotInitialized = true;
    this.validateForm = utils.throttle(this.validateForm.bind(this));
    this._onModelChange = this._onModelChange.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
    this.clearError = this.clearError.bind(this);
    this.updateField = this.updateField.bind(this);
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
   * @param {bool}              [settings._partialErrorChecking=false]   Activate partial gradual form validation
   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
   */
  async init(settings) {
    if (!settings.model) {
      throw Error('You must specify the model form in this.init()');
    }

    this._data = settings.data || null;
    this._changes = settings.changes || {};
    this.showDependentFields = settings.showDependentFields || false;
    this._partialErrorChecking = settings._partialErrorChecking; // Current mode
    this._partialErrorCheckingDefault = settings._partialErrorChecking; // Default mode
    this.model = settings.model; // FormModel
    this.fields = settings.fields;
    this.submitAll = settings.submitAll;
    this._warningsValidator = settings.warningsValidator || new Validator();

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

    try {
      await this.validateForm();
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
    }
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
      errors: this._getValidationErrors(),
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
  async updateField(fields, values) {
    if (this._isNotInitialized) {
      return;
    }

    values = utils.parseValueFromEvent(values);

    if (!Array.isArray(fields)) {
      fields = [fields];
      values = [values];
    }
    await this.set(utils.zipObject(fields, values));
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
        this._warnings.clearField(oneField);
      });
    } else {
      this._errors.clearField(field);
      this._warnings.clearField(field);
    }

    this._setState();
  }

  validateField(fields, values) {
    this.updateField(fields, values);
    try {
      this.validateForm();
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
    }
  }

  /**
   * Set data in the form
   *
   * @param {Object}    data              Data
   * @param {bool}      [validate=false]  Validate form
   */
  async set(data, validate) {
    if (!this._isLoaded()) {
      return;
    }

    this._changes = utils.getRecordChanges(this.model, this._data, this._changes, data);

    this._setState();

    if (validate) {
      try {
        await this.validateForm();
      } catch (e) {
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
      }
    }
  }

  async submitData(data) {
    if (this._isNotInitialized) {
      return;
    }

    await this.set(data);
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
    this._partialErrorChecking = false;

    this._setState();

    // Send changes to model
    let data;
    let err;
    try {
      data = await this.model.submit(changes);
    } catch (error) {
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
    this._warnings.clearField(field);
    delete this._changes[field];
    this._setState();
  }

  clearChanges() {
    if (this._isNotInitialized) {
      return;
    }

    this._errors.clear();
    this._warnings.clear();
    this._changes = {};
    this._globalError = false;
    this._partialErrorChecking = this._partialErrorCheckingDefault;
    this._setState();
  }

  setPartialErrorChecking(value) {
    this._partialErrorChecking = value;
    this._setState();
  }

  getPartialErrorChecking() {
    return {
      _partialErrorChecking: this._partialErrorChecking,
      _partialErrorCheckingDefault: this._partialErrorCheckingDefault
    };
  }

  async validateForm() {
    if (this._isNotInitialized) {
      return;
    }

    this.validating = true;
    this._globalError = null;

    await Promise.all([
      this._runValidator(this.model, this._getChanges, '_errors'),
      this._runValidator(this._warningsValidator, this._getData, '_warnings')
    ]);

    this.validating = false;

    let field;
    while (field = this.pendingClearErrors.pop()) {
      this._warnings.clearField(field);
      this._errors.clearField(field);
    }

    this._setState();

    const errorsWithPartialChecking = this._getValidationErrors();
    if (!errorsWithPartialChecking.isEmpty()) {
      return errorsWithPartialChecking;
    }
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
    for (const field in this._changes) {
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
    const errors = ValidationErrors.merge(this._errors, this._warnings);

    // If gradual validation is on, we need
    // to remove unchanged records from errors object
    if (!this._partialErrorChecking) {
      return errors;
    }

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

  _getData() {
    return Object.assign({}, this._data, this._changes);
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

  async _runValidator(validator, getData, output) {
    const data = getData();
    let validErrors;
    let err;

    try {
      validErrors = await validator.isValidRecord(data);
    } catch (e) {
      err = e;
    }

    if (!utils.isEqual(data, getData())) {
      return;
    }

    if (err) {
      this[output].clear();
    } else {
      this[output] = validErrors;
    }

    if (err) {
      this._globalError = err;
    }
  }
}

export default FormService;
