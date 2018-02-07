/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventEmitter from '../common/Events';
import toPromise from '../common/toPromise';
import Validator from '../common/validation/validators/common';
import ValidationErrors from '../common/validation/ValidationErrors';
import utils from '../common/utils';
import ThrottleError from '../common/ThrottleError';

class FormService {
  constructor(fields = null) {
    this._data = null;
    this._changes = null;
    this._errors = new ValidationErrors();
    this._warnings = new ValidationErrors();
    this._warningsValidator = null;
    this._eventEmitter = new EventEmitter();
    this._isNotInitialized = true;
    this.fields = fields;
    this.validateForm = utils.throttle(this.validateForm.bind(this));
    this._onModelChange = this._onModelChange.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
    this.clearError = this.clearError.bind(this);
    this.clearValidations = this.clearValidations.bind(this);
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
  async init(settings) {
    if (!settings.model) {
      throw Error('You must specify the model');
    }

    this._data = settings.data || null;
    this._changes = settings.changes || {};
    this._isSubmitting = false;
    this.showDependentFields = settings.showDependentFields || false;
    this._partialErrorChecking = settings.partialErrorChecking; // Current mode
    this._partialErrorCheckingDefault = settings.partialErrorChecking; // Default mode
    this.model = settings.model; // FormModel
    this.submitAll = settings.submitAll;
    this._warningsValidator = settings.warningsValidator || new Validator();

    this.validating = false;
    this.pendingClearErrors = [];
    this.submitting = false;
    this._isNotInitialized = false;

    if (settings.hasOwnProperty('fields')) {
      this.fields = settings.fields;
    }
    if (!this._data) {
      this._data = await toPromise(settings.model.getData.bind(settings.model))(settings.fields);
    }

    this.model.on('update', this._onModelChange);
    this._setState();

    if (!settings.partialErrorChecking) {
      try {
        await this.validateForm();
      } catch (e) {
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
      }
    }
  }

  getAll() {
    const isLoaded = this._isLoaded();

    if (!isLoaded) {
      const emptyData = {
        isLoaded,
        data: {},
        originalData: {},
        changes: {},
        fields: {},
        isSubmitting: false
      };
      if (this.fields) {
        for (const field of this.fields) {
          emptyData.fields[field] = {
            value: null,
            isChanged: false,
            errors: null
          };
        }
      }
      return emptyData;
    }

    const data = this._getData();
    const changes = this._getChangesFields();

    return {
      isLoaded,
      data,
      originalData: this._data,
      changes,
      fields: this._getFields(data, changes),
      isSubmitting: this._isSubmitting
    };
  }

  /**
   * Update form value. Is used as the Editors onChange handler
   *
   * @param {string}  field  Parameter
   * @param {*}       value  Event or data
   */
  async updateField(field, value) {
    await this.set({
      [field]: utils.parseValueFromEvent(value)
    });
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

  clearValidations(field) {
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

  clearError(field) {
    console.warn('Deprecated: FormService method "clearError" renamed to "clearValidations"');
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

  async validateField(field, value) {
    await this.set({
      [field]: utils.parseValueFromEvent(value)
    }, true);
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
   */
  async submit() {
    if (this._isNotInitialized || this._isSubmitting) {
      return;
    }

    const changes = this._getChanges();

    this._isSubmitting = true;
    this._partialErrorChecking = false;

    this._setState();

    // Send changes to model
    let data;
    let validationErrors;
    try {
      data = await this.model.submit(changes);
    } catch (err) {
      if (!(err instanceof ValidationErrors)) {
        this._isSubmitting = false;
        this._setState();
        throw err;
      }
      validationErrors = err;
    }

    this._isSubmitting = false;

    const newChanges = this._getChanges();
    const actualChanges = utils.isEqual(changes, newChanges);

    if (actualChanges) {
      if (validationErrors) {
        this._errors = validationErrors;
      } else {
        this._errors = new ValidationErrors();
        this._changes = {};
      }
    }

    this._setState();

    if (validationErrors) {
      throw validationErrors;
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
    this._partialErrorChecking = this._partialErrorCheckingDefault;
    this._setState();
  }

  setPartialErrorChecking(value) {
    this._partialErrorChecking = value;
    this._setState();
  }

  getPartialErrorChecking() {
    return this._partialErrorChecking;
  }

  async validateForm() {
    if (this._isNotInitialized) {
      return;
    }

    this.validating = true;

    try {
      await Promise.all([
        this._runValidator(this.model, this._getChanges, '_errors'),
        this._runValidator(this._warningsValidator, this._getData, '_warnings')
      ]);
    } finally {
      this.validating = false;

      let field;
      while (field = this.pendingClearErrors.pop()) {
        this._warnings.clearField(field);
        this._errors.clearField(field);
      }

      this._setState();
    }

    const errorsWithPartialChecking = this._applyPartialErrorChecking(this._errors);
    const warningsWithPartialChecking = this._applyPartialErrorChecking(this._warnings);

    if (!errorsWithPartialChecking.isEmpty()) {
      return {
        errors: errorsWithPartialChecking,
        warnings: warningsWithPartialChecking
      };
    }
  }

  _getFields(data, changes) {
    const fields = this.fields;
    const errors = this._applyPartialErrorChecking(this._errors);
    const warnings = this._applyPartialErrorChecking(this._warnings);
    return fields.reduce((newFields, fieldName) => {
      newFields[fieldName] = {};
      newFields[fieldName].value = data[fieldName];
      newFields[fieldName].isChanged = changes.hasOwnProperty(fieldName);
      newFields[fieldName].errors = errors ? errors.getFieldErrors(fieldName) : null;
      newFields[fieldName].warnings = warnings ? warnings.getFieldErrors(fieldName) : null;
      return newFields;
    }, {});
  }

  /**
   * Check is data loaded
   *
   * @returns {boolean}
   */
  _isLoaded() {
    return this &&
      Boolean(this._data);
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
   * Filter form fields
   *
   * @returns {ValidationErrors} Form fields
   */
  _applyPartialErrorChecking(fields) {
    const filterFields = fields;

    // If gradual validation is on, we need
    // to remove unchanged records from changes object
    if (!this._partialErrorChecking) {
      return filterFields;
    }

    // Look through all form fields
    for (const field in this._data) {
      if (!this._changes.hasOwnProperty(field)) {
        filterFields.clearField(field);
      }
    }

    return filterFields;
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

    try {
      validErrors = await validator.isValidRecord(data);
    } catch (e) {
      this[output].clear();
      throw e;
    }

    if (utils.isEqual(data, getData())) {
      this[output] = validErrors;
    }
  }
}

export default FormService;
