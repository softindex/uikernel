/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lodashMap from 'lodash/map';
import ArgumentsError from '../common/error/ArgumentsError';
import {isIntersection, keys} from '../common/utils';
import type {IValidator} from './types/IValidator';
import type {ValidatorSettings} from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';

class Validator<TRecord extends Record<string, unknown>> implements IValidator<TRecord> {
  constructor(private settings: ValidatorSettings<TRecord, keyof TRecord & string>) {}

  /**
   * Get all dependent fields validation needs
   */
  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    const uniqueFields = new Set(fields);
    const result = new Set<keyof TRecord & string>();
    let length: number | undefined;

    const groupValidatorsFields = lodashMap(
      [...this.settings.groupValidators, ...this.settings.asyncGroupValidators],
      'fields'
    );
    const allGroupedDependenciesFields = [...groupValidatorsFields, ...this.settings.asyncDependencies];

    while (length !== result.size) {
      length = result.size;

      for (const groupFields of allGroupedDependenciesFields) {
        if (!isIntersection(groupFields, fields) && !isIntersection(groupFields, [...result])) {
          continue;
        }

        for (const field of groupFields) {
          if (uniqueFields.has(field) || result.has(field)) {
            continue;
          }

          result.add(field);
        }
      }
    }

    return [...result];
  }

  /**
   * Check client record validity
   */
  async isValidRecord(
    record: Partial<TRecord>,
    additionalValues?: Partial<TRecord>
  ): Promise<ValidationErrors<keyof TRecord & string>> {
    const fields = keys(record);
    const additionalFields = additionalValues ? keys(additionalValues) : [];
    const errors = new ValidationErrors<keyof TRecord & string>();

    const dependentFields = this.getValidationDependency(fields);
    const notPassedDependentFields = dependentFields.filter((e) => {
      return !additionalFields.includes(e);
    });
    if (notPassedDependentFields.length) {
      throw new ArgumentsError('Not enough fields for validator: ' + notPassedDependentFields.join(', '));
    }

    // Add sync and async validators
    for (const field of fields) {
      const value = record[field];
      const validators = this.settings.validators[field] || [];
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          errors.add(field, error);
        }
      }

      const asyncValidators = this.settings.asyncValidators[field] || [];
      for (const asyncValidator of asyncValidators) {
        const error = await asyncValidator(value);
        if (error) {
          errors.add(field, error);
        }
      }
    }

    // Add sync and async group validators
    for (const groupValidator of this.settings.groupValidators) {
      if (isIntersection(groupValidator.fields, fields)) {
        groupValidator.fn(record, errors);
      }
    }

    for (const asyncGroupValidator of this.settings.asyncGroupValidators) {
      if (isIntersection(asyncGroupValidator.fields, fields)) {
        await asyncGroupValidator.fn(record, errors);
      }
    }

    return errors;
  }
}

export default Validator;
