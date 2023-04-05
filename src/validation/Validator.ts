/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lodashMap from 'lodash/map';
import ArgumentsError from '../common/error/ArgumentsError';
import {ArrayWithAtLeastOneElement} from '../common/types';
import {isIntersection, keys} from '../common/utils';
import ValidationErrors from './ValidationErrors';

type ValidationResult<T, TAsync extends 'async' | 'sync'> = TAsync extends 'sync' ? T : Promise<T>;

type ValidationFunction<TValue, TAsync extends 'async' | 'sync'> = (
  value: TValue | undefined
) => ValidationResult<string | undefined, TAsync>;
type GroupValidationFunction<TRecord extends Record<string, unknown>, TAsync extends 'async' | 'sync'> = (
  record: Partial<TRecord>,
  errors: ValidationErrors<keyof TRecord & string>
) => ValidationResult<void, TAsync>;

type ValidatorSettings<TRecord extends Record<string, unknown>> = {
  asyncDependencies: ArrayWithAtLeastOneElement<keyof TRecord & string>[];
  asyncGroupValidators: {
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>;
    fn: GroupValidationFunction<TRecord, 'async'>;
  }[];
  asyncValidators: {
    [K in keyof TRecord & string]?: ValidationFunction<TRecord[K], 'async'>[];
  };
  groupValidators: {
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>;
    fn: GroupValidationFunction<TRecord, 'sync'>;
  }[];
  validators: {
    [K in keyof TRecord & string]?: ValidationFunction<TRecord[K], 'sync'>[];
  };
};

export interface IValidator<TRecord> {
  getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
  isValidRecord: (record: Partial<TRecord>) => Promise<ValidationErrors<keyof TRecord & string>>;
}

class Validator<TRecord extends Record<string, unknown>> implements IValidator<TRecord> {
  static create<TRecord extends Record<string, unknown>>(): Validator<TRecord> {
    return new Validator();
  }

  private settings: ValidatorSettings<TRecord> = {
    validators: {},
    groupValidators: [],
    asyncValidators: {},
    asyncGroupValidators: [],
    asyncDependencies: []
  };

  /**
   * Add field sync validators
   */
  field<TField extends keyof TRecord & string>(
    field: TField,
    ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>
  ): this {
    const validators = this.settings.validators[field] || [];
    validators.concat(validationFunctions);
    this.settings.validators[field] = validators.concat(validationFunctions);

    return this;
  }

  /**
   * Specify multiple sync validators for fields group
   */
  fields(
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, 'sync'>
  ): this {
    this.settings.groupValidators.push({
      fields,
      fn: groupValidationFunction
    });

    return this;
  }

  /**
   * Point which fields server validation needs
   */
  asyncDependence(fields: ArrayWithAtLeastOneElement<keyof TRecord & string>): this {
    this.settings.asyncDependencies.push(fields);
    return this;
  }

  /**
   * Add field async validators
   */
  asyncField<TField extends keyof TRecord & string>(
    field: TField,
    validationFunction: ValidationFunction<TRecord[TField], 'async'>
  ): this {
    const asyncValidators = this.settings.asyncValidators[field] || [];
    asyncValidators.push(validationFunction);
    this.settings.asyncValidators[field] = asyncValidators;

    return this;
  }

  /**
   * Specify multiple async validators for fields group
   */
  asyncFields(
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, 'async'>
  ): this {
    this.settings.asyncGroupValidators.push({
      fields,
      fn: groupValidationFunction
    });

    return this;
  }

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
    addValues?: Partial<TRecord>
  ): Promise<ValidationErrors<keyof TRecord & string>> {
    const fields = keys(record);
    const addFields = addValues ? keys(addValues) : [];
    const errors = new ValidationErrors<keyof TRecord & string>();

    const dependentFields = this.getValidationDependency(fields);
    const notPassedDependentFields = dependentFields.filter((e) => !addFields.includes(e));
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
