/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../ValidationErrors';
import ArgumentsError from '../../ArgumentsError';
import utils from '../../utils';
import toPromise from '../../toPromise';
import callbackify from '../../callbackify';

class Validator {
  /**
   * Validation check model
   *
   * @constructor
   */
  constructor() {
    this._settings = {
      validators: {},
      groupValidators: [],
      asyncValidators: {},
      asyncGroupValidators: [],
      asyncDependenies: []
    };
  }

  static create() {
    return new Validator();
  }

  /**
   * Add field sync validators
   *
   * @param {string}      field       Field name
   * @param {...Function} validators  Field validators
   * @returns {Validator} validator
   */
  field(field, ...validators) {
    if (!this._settings.validators[field]) {
      this._settings.validators[field] = [];
    }
    this._settings.validators[field] = this._settings.validators[field].concat(validators);
    return this;
  }

  /**
   * Specify multiple sync validators for fields group
   *
   * @param {Array}      fields              Fields array
   * @param {Function}   validatorFunction   Validator function
   * @returns {Validator} validator
   */
  fields(fields, validatorFunction) {
    this._settings.groupValidators.push({
      fields: fields,
      fn: validatorFunction
    });
    return this;
  }

  /**
   * Point which fields server validation needs
   *
   * @param {Array}   fields   Fields array
   * @returns {Validator} validator
   */
  asyncDependence(fields) {
    this._settings.asyncDependenies.push(fields);
    return this;
  }

  /**
   * Add field async validators
   *
   * @param {string}     field               Field name
   * @param {Function}   validatorFunction   Validator function
   * @returns {Validator} validator
   */
  asyncField(field, validatorFunction) {
    if (!this._settings.asyncValidators[field]) {
      this._settings.asyncValidators[field] = [];
    }
    this._settings.asyncValidators[field].push(validatorFunction);
    return this;
  }

  /**
   * Specify multiple async validators for fields group
   *
   * @param {Array}      fields              Fields array
   * @param {Function}   validatorFunction   Validator function
   * @returns {Validator} validator
   */
  asyncFields(fields, validatorFunction) {
    this._settings.asyncGroupValidators.push({
      fields: fields,
      fn: validatorFunction
    });
    return this;
  }

  /**
   * Get all dependent fields validation needs
   *
   * @param {Array}   fields    Fields array
   * @returns {Array} fields
   */
  getValidationDependency(fields) {
    const result = [];
    let length;
    const groups = utils.pluck(
      this._settings.groupValidators.concat(this._settings.asyncGroupValidators),
      'fields'
    ).concat(this._settings.asyncDependenies);

    while (length !== result.length) {
      length = result.length;

      for (let i = 0; i < groups.length; i++) {
        if (!utils.isIntersection(groups[i], fields) && !utils.isIntersection(groups[i], result)) {
          continue;
        }
        for (let j = 0; j < groups[i].length; j++) {
          const field = groups[i][j];
          if (fields.indexOf(field) >= 0 || result.indexOf(field) >= 0) {
            continue;
          }
          result.push(field);
        }
      }
    }
    return result;
  }
}

/**
 * Check client record validity
 *
 * @param {Object}  record   Record
 * @returns {ValidationErrors|null} Record validity
 */
Validator.prototype.isValidRecord = callbackify(async function (record) {
  const fields = Object.keys(record);
  const errors = new ValidationErrors();
  const awaitStack = [];
  const promises = [];

  const dependentFields = this.getValidationDependency(fields);
  if (dependentFields.length) {
    throw new ArgumentsError('Not enough fields for validator: ' + dependentFields.join(', '));
  }

  // Add sync and async validators
  for (const [field, value] of Object.entries(record)) {
    const validators = this._settings.validators[field];
    if (validators) {
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          errors.add(field, error);
        }
      }
    }

    const asyncValidators = this._settings.asyncValidators[field];
    if (asyncValidators) {
      for (const asyncValidator of asyncValidators) {
        awaitStack.push(field);
        promises.push(
          await toPromise(asyncValidator)(value)
        );
      }
    }
  }

  // Add sync and async group validators
  for (const groupValidator of this._settings.groupValidators) {
    if (utils.isIntersection(groupValidator.fields, fields)) {
      groupValidator.fn(record, errors);
    }
  }

  for (const asyncGroupValidator of this._settings.asyncGroupValidators) {
    if (utils.isIntersection(asyncGroupValidator.fields, fields)) {
      awaitStack.push(null);
      promises.push(
        await toPromise(asyncGroupValidator.fn)(record, errors)
      );
    }
  }

  const asyncErrors = await Promise.all(promises);
  while (asyncErrors.length) {
    const error = asyncErrors.pop();
    const field = awaitStack.pop();

    if (error && field) {
      errors.add(field, error);
    }
  }

  return errors;
});

export default Validator;
