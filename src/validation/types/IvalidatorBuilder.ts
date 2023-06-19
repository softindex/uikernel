/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ArrayWithAtLeastOneElement} from '../../common/types';
import type {IValidator} from './IValidator';
import type {GroupValidationFunction, ValidationFunction} from './ValidatorSettings';

export interface IValidatorBuilder<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string
> {
  /**
   * Point which fields server validation needs
   */
  asyncDependence: (fields: ArrayWithAtLeastOneElement<TEditableField>) => this;

  /**
   * Add field async validators
   */
  asyncField: <TField extends TEditableField>(
    field: TField,
    validationFunction: ValidationFunction<TRecord[TField], 'async'>
  ) => this;

  /**
   * Specify multiple async validators for fields group
   */
  asyncFields: (
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'async'>
  ) => this;

  build: () => IValidator<TRecord>;

  /**
   * Add field sync validators
   */
  field: <TField extends TEditableField>(
    field: TField,
    ...validationFunctions: ArrayWithAtLeastOneElement<ValidationFunction<TRecord[TField], 'sync'>>
  ) => this;

  /**
   * Specify multiple sync validators for fields group
   */
  fields: (
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>,
    groupValidationFunction: GroupValidationFunction<TRecord, TEditableField, 'sync'>
  ) => this;
}
