/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ArrayWithAtLeastOneElement} from '../common/types';
import {IValidator} from './types/IValidator';
import {GroupValidationFunction, ValidationFunction, ValidatorSettings} from './types/ValidatorSettings';
import Validator from './Validator';

class ValidatorBuilder<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string
> {
  static create<
    TRecord extends Record<string, unknown>,
    TEditableField extends keyof TRecord & string = keyof TRecord & string
  >(): ValidatorBuilder<TRecord, TEditableField> {
    return new ValidatorBuilder();
  }

  static createEmptyValidator<TRecord extends Record<string, unknown>>(): IValidator<TRecord> {
    return ValidatorBuilder.create<TRecord>().build();
  }

  private settings: ValidatorSettings<TRecord, TEditableField> = {
    validators: {},
    groupValidators: [],
    asyncValidators: {},
    asyncGroupValidators: [],
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
  fields(
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'sync'>
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
  asyncDependence(fields: ArrayWithAtLeastOneElement<TEditableField>): this {
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
  asyncFields(
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'async'>
  ): this {
    this.settings.asyncGroupValidators.push({
      fields,
      fn: groupValidationFunction
    });

    return this;
  }

  build(): IValidator<TRecord> {
    return new Validator(this.settings as ValidatorSettings<TRecord, string>);
  }
}

export default ValidatorBuilder;
