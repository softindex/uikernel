/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lodashMap from 'lodash/map';
import ArgumentsError from '../common/error/ArgumentsError';
import type {ArrayWithAtLeastOneElement, OptionalRecord} from '../common/types';
import {isIntersection, keys} from '../common/utils';
import type {IValidator} from './types/IValidator';
import type {
  GroupValidationFunction,
  ValidationFunction,
  ValidatorSettings,
  GroupValidators
} from './types/ValidatorSettings';
import ValidationErrors from './ValidationErrors';

/**
 * @deprecated use ValidatorBuilder instead
 */
class DeprecatedValidator<
  TRecord extends Record<string, unknown>,
  TAsyncGroupValidators extends (keyof TRecord & string)[] = [],
  TGroupValidators extends (keyof TRecord & string)[] = []
> implements IValidator<TRecord, keyof TRecord & string>
{
  static create<TRecord extends Record<string, unknown>>(): DeprecatedValidator<TRecord> {
    return new DeprecatedValidator();
  }

  private settings: ValidatorSettings<
    TRecord,
    keyof TRecord & string,
    TAsyncGroupValidators,
    TGroupValidators
  > = {
    validators: {},
    groupValidators: [] as GroupValidators<TRecord, keyof TRecord & string, TGroupValidators, 'sync'>,
    asyncValidators: {},
    asyncGroupValidators: [] as GroupValidators<
      TRecord,
      keyof TRecord & string,
      TAsyncGroupValidators,
      'async'
    >,
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
  fields<TField extends keyof TRecord & string>(
    fields: ArrayWithAtLeastOneElement<TField>,
    groupValidationFunction: GroupValidationFunction<TRecord, TField, keyof TRecord & string, 'sync'>
  ): DeprecatedValidator<TRecord, TAsyncGroupValidators, [...TGroupValidators, TField]> {
    (
      this.settings.groupValidators as GroupValidators<
        TRecord,
        keyof TRecord & string,
        [...TGroupValidators, TField],
        'sync'
      >
    ).push({
      fields,
      fn: groupValidationFunction
    });

    return this as never;
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
  asyncFields<TField extends keyof TRecord & string>(
    fields: ArrayWithAtLeastOneElement<TField>,
    groupValidationFunction: GroupValidationFunction<TRecord, TField, keyof TRecord & string, 'async'>
  ): DeprecatedValidator<TRecord, [...TAsyncGroupValidators, TField], TGroupValidators> {
    (
      this.settings.asyncGroupValidators as GroupValidators<
        TRecord,
        keyof TRecord & string,
        [...TAsyncGroupValidators, TField],
        'async'
      >
    ).push({
      fields,
      fn: groupValidationFunction
    });

    return this as never;
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
    record: OptionalRecord<TRecord>,
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
      const value = record[field] as TRecord[keyof TRecord & string];
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
        groupValidator.fn(record as Pick<TRecord, keyof TRecord & string>, errors);
      }
    }

    for (const asyncGroupValidator of this.settings.asyncGroupValidators) {
      if (isIntersection(asyncGroupValidator.fields, fields)) {
        await asyncGroupValidator.fn(record as Pick<TRecord, keyof TRecord & string>, errors);
      }
    }

    return errors;
  }
}

export default DeprecatedValidator;
