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

var utils = require('../common/utils');
var ValidationErrors = require('../common/validation/ValidationErrors');

/**
 * Grid form mixin
 * @mixin
 */
var FormMixin = {
  getInitialState: function () {
    this._validateForm = utils.throttle(this._validateForm);
    return {
      _formMixin: null
    };
  },

  componentWillUnmount: function () {
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
   * @param {bool}              [settings.autoSubmit]                   Automatic submit before updateField
   * @param {Function}          [settings.autoSubmitHandler]            Automatic submit handler
   * @param {Function}          [cb]                                    CallBack function
   */
  initForm: function (settings, cb) {
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
        if (!ctx.isMounted()) {
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
  isLoaded: function () {
    return this.state && this.state._formMixin &&
      Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
  },

  /**
   * Check if form field is changed
   *
   * @param  {string}   field  Field name
   * @return {boolean}
   */
  hasChanges: function (field) {
    if (this._isNotInitialized()) {
      return false;
    }

    return this.state._formMixin.changes.hasOwnProperty(field);
  },

  /**
   * Check if form field has validity errors
   *
   * @param  {string}   field  Field name
   * @return {boolean}
   */
  hasError: function (field) {
    if (this._isNotInitialized()) {
      return false;
    }

    // If partial check is on and field is changed,
    // do not display an error
    if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
      return false;
    }

    return this.state._formMixin.errors.hasError(field);
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
      }, this);
    } else {
      this.state._formMixin.errors.clearField(field);
    }

    this.setState(this.state, typeof cb === 'function' ? cb : null);
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

    var errors;
    var field;

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
    } else {
      errors = this.state._formMixin.errors;
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

    return this.state._formMixin.errors.getFieldErrors(field);
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
  updateField: function (fields, values, cb) {
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
      this.submit(this.state._formMixin.autoSubmitHandler, cb);
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
      }
    });
  },

  /**
   * Set data in the form
   *
   * @param {Object}    data  Data
   * @param {Function}  [cb]    CallBack
   */
  set: function (data, cb) {
    if (this._isNotInitialized()) {
      return;
    }

    var state = this.state._formMixin;

    utils.assign(state.changes, data);

    for (var i in state.changes) {
      if (utils.isEqual(state.data[i], state.changes[i])) {
        delete state.changes[i];
      }
    }

    utils.assign(state.changes, utils.pick(
      state.data,
      state.model.getValidationDependency(Object.keys(state.changes))
    ));

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
  submit: function (cb) {
    if (this._isNotInitialized()) {
      return;
    }

    var changes = this._getChanges();

    this.state._formMixin.globalError = null;
    this.state._formMixin.partialErrorChecking = false;

    // Send changes to model
    this.state._formMixin.model.submit(changes, function (err, data) {
      if (!this.isMounted()) {
        return;
      }

      var newChanges = this._getChanges();
      var actualChanges = utils.isEqual(changes, newChanges);
      var validationError = err instanceof ValidationErrors;

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

      this.setState(this.state, function () {
        if (typeof cb === 'function') {
          cb(err, data);
        }
      });
    }.bind(this));
  },

  clearChanges: function (cb) {
    if (this._isNotInitialized()) {
      return;
    }

    this.state._formMixin.errors.clear();
    this.state._formMixin.changes = {};
    this.state._formMixin.globalError = false;
    this.state._formMixin.partialErrorChecking = this.state._formMixin.partialErrorCheckingDefault;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  setPartialErrorChecking: function (value, cb) {
    this.state._formMixin.partialErrorChecking = value;
    this.setState(this.state, typeof cb === 'function' ? cb : null);
  },

  /**
   * Model records changes handler
   *
   * @param {Object} changes  Changes
   * @private
   */
  _handleModelChange: function (changes) {
    utils.assign(this.state._formMixin.data, utils.cloneDeep(changes));
    if (this.isMounted()) {
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
      globalError: null,
      validating: false,
      pendingClearErrors: [],

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

    var data = this._getData();

    this.state._formMixin.validating = true;

    this.state._formMixin.model.isValidRecord(data, function (err, validErrors) {
      var field;

      this.state._formMixin.validating = false;

      if (!this.isMounted() || !utils.isEqual(data, this._getData())) {
        return stop();
      }

      if (err) {
        this.state._formMixin.errors.clear();
      } else {
        this.state._formMixin.errors = validErrors;
        while (field = this.state._formMixin.pendingClearErrors.pop()) {
          this.state._formMixin.errors.clearField(field);
        }
      }

      this.setState(this.state, function () {
        if (!err && !validErrors.isEmpty()) {
          return cb(validErrors);
        }
        cb(err);
      });
    }.bind(this));
  },

  _getData: function () {
    if (!this.state._formMixin.data) {
      return null;
    }
    return utils.assign({}, this.state._formMixin.data, this.state._formMixin.changes);
  },

  _getChanges: function () {
    // Send all data or just changed fields in addiction of form configuration
    if (this.state._formMixin.submitAll) {
      return this._getData();
    }
    return utils.clone(this.state._formMixin.changes);
  }
};

module.exports = FormMixin;
