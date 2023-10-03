/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ArrayWithAtLeastOneElement} from '../common/types';
import type {IValidator} from './types/IValidator';
import type {
  GroupValidationFunction,
  GroupValidators,
  ValidationFunction,
  ValidatorSettings
} from './types/ValidatorSettings';
import Validator from './Validator';

class ValidatorBuilder<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string,
  TAsyncGroupValidators extends (keyof TRecord & string)[] = [],
  TGroupValidators extends (keyof TRecord & string)[] = []
> {
  static createEmptyValidator<
    TRecord extends Record<string, unknown>,
    TEditable extends keyof TRecord & string
  >(): IValidator<TRecord, TEditable> {
    return new ValidatorBuilder<TRecord, TEditable>().build();
  }

  private settings: ValidatorSettings<TRecord, TEditableField, TAsyncGroupValidators, TGroupValidators> = {
    validators: {},
    groupValidators: [] as GroupValidators<TRecord, TEditableField, TGroupValidators, 'sync'>,
    asyncValidators: {},
    asyncGroupValidators: [] as GroupValidators<TRecord, TEditableField, TAsyncGroupValidators, 'async'>,
    asyncDependencies: []
  };

  /**
   * Add field sync validators
   */
  field<TField extends TEditableField>(
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
    groupValidationFunction: GroupValidationFunction<Pick<TRecord, TField>, TField & TEditableField, 'sync'>
  ): ValidatorBuilder<TRecord, TEditableField, TAsyncGroupValidators, [...TGroupValidators, TField]> {
    (
      this.settings.groupValidators as GroupValidators<
        TRecord,
        TEditableField,
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
  asyncField<TField extends TEditableField>(
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
    groupValidationFunction: GroupValidationFunction<Pick<TRecord, TField>, TField & TEditableField, 'async'>
  ): ValidatorBuilder<TRecord, TEditableField, [...TAsyncGroupValidators, TField], TGroupValidators> {
    (
      this.settings.asyncGroupValidators as GroupValidators<
        TRecord,
        TEditableField,
        [...TAsyncGroupValidators, TField],
        'async'
      >
    ).push({
      fields,
      fn: groupValidationFunction
    });

    return this as never;
  }

  build(): IValidator<TRecord, TEditableField> {
    return new Validator(this.settings);
  }
}

export default ValidatorBuilder;
