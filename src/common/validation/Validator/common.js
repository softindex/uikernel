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

var suspend = require('suspend');
var ValidationErrors = require('../ValidationErrors');
var ArgumentsError = require('../../ArgumentsError');
var utils = require('../../utils');

/**
 * Validation check model
 *
 * @constructor
 */
var Validator = function () {
  if (!(this instanceof Validator)) {
    return new Validator();
  }

  this._settings = {
    validators: {},
    groupValidators: [],
    asyncValidators: {},
    asyncGroupValidators: [],
    asyncDependenies: []
  };

  this.isValidRecord = this.isValidRecord.bind(this);
  this.getValidationDependency = this.getValidationDependency.bind(this);
};

/**
 * Add field sync validators
 *
 * @param {string}  field   Field name
 * @returns {Validator} validator
 */
Validator.prototype.field = function (field) {
  if (!this._settings.validators[field]) {
    this._settings.validators[field] = [];
  }
  this._settings.validators[field] = this._settings.validators[field].concat(
    [].slice.call(arguments, 1)
  );
  return this;
};

/**
 * Specify multiple sync validators for fields group
 *
 * @param {Array}      fields              Fields array
 * @param {Function}   validatorFunction   Validator function
 * @returns {Validator} validator
 */
Validator.prototype.fields = function (fields, validatorFunction) {
  this._settings.groupValidators.push({
    fields: fields,
    fn: validatorFunction
  });
  return this;
};

/**
 * Point which fields server validation needs
 *
 * @param {Array}   fields   Fields array
 * @returns {Validator} validator
 */
Validator.prototype.asyncDependence = function (fields) {
  this._settings.asyncDependenies.push(fields);
  return this;
};

/**
 * Add field async validators
 *
 * @param {string}     field               Field name
 * @param {Function}   validatorFunction   Validator function
 * @returns {Validator} validator
 */
Validator.prototype.asyncField = function (field, validatorFunction) {
  if (!this._settings.asyncValidators[field]) {
    this._settings.asyncValidators[field] = [];
  }
  this._settings.asyncValidators[field].push(validatorFunction);
  return this;
};

/**
 * Specify multiple async validators for fields group
 *
 * @param {Array}      fields              Fields array
 * @param {Function}   validatorFunction   Validator function
 * @returns {Validator} validator
 */
Validator.prototype.asyncFields = function (fields, validatorFunction) {
  this._settings.asyncGroupValidators.push({
    fields: fields,
    fn: validatorFunction
  });
  return this;
};

/**
 * Get all dependent fields validation needs
 *
 * @param {Array}   fields    Fields array
 * @returns {Array} fields
 */
Validator.prototype.getValidationDependency = function (fields) {
  var result = [];
  var length;
  var groups = utils.pluck(
    this._settings.groupValidators.concat(this._settings.asyncGroupValidators),
    'fields'
  ).concat(this._settings.asyncDependenies);

  while (length !== result.length) {
    length = result.length;

    for (var i = 0; i < groups.length; i++) {
      if (!utils.isIntersection(groups[i], fields) && !utils.isIntersection(groups[i], result)) {
        continue;
      }
      for (var j = 0; j < groups[i].length; j++) {
        var field = groups[i][j];
        if (fields.indexOf(field) >= 0 || result.indexOf(field) >= 0) {
          continue;
        }
        result.push(field);
      }
    }
  }
  return result;
};

/**
 * Check client record validity
 *
 * @param {Object}  record   Record
 * @returns {ValidationErrors|null} Record validity
 */
Validator.prototype.isValidRecord = suspend.callback(function * (record) {
  var fields = Object.keys(record);
  var errors = new ValidationErrors();
  var yieldStack = [];
  var i;
  var j;
  var error;
  var field;
  var validators;
  var asyncValidators;
  var groupValidator;
  var dependentFields;
  var asyncGroupValidator;

  dependentFields = this.getValidationDependency(fields);
  if (dependentFields.length) {
    throw new ArgumentsError('Not enough fields for validator: ' + dependentFields.join(', '));
  }

  // Add sync and async validators
  for (i in record) {
    validators = this._settings.validators[i];
    if (validators) {
      for (j = 0; j < validators.length; j++) {
        error = validators[j](record[i]);
        if (error) {
          errors.add(i, error);
        }
      }
    }

    asyncValidators = this._settings.asyncValidators[i];
    if (asyncValidators) {
      for (j = 0; j < asyncValidators.length; j++) {
        yieldStack.push(i);
        asyncValidators[j](record[i], suspend.fork());
      }
    }
  }

  // Add sync and async group validators
  for (i = 0; i < this._settings.groupValidators.length; i++) {
    groupValidator = this._settings.groupValidators[i];
    if (utils.isIntersection(groupValidator.fields, fields)) {
      groupValidator.fn(record, errors);
    }
  }

  for (i = 0; i < this._settings.asyncGroupValidators.length; i++) {
    asyncGroupValidator = this._settings.asyncGroupValidators[i];
    if (utils.isIntersection(asyncGroupValidator.fields, fields)) {
      yieldStack.push(null);
      asyncGroupValidator.fn(record, errors, suspend.fork());
    }
  }

  var asyncErrors = yield suspend.join();
  while (asyncErrors.length) {
    error = asyncErrors.pop();
    field = yieldStack.pop();

    if (error && field) {
      errors.add(field, error);
    }
  }

  return errors;
});

module.exports = Validator;
