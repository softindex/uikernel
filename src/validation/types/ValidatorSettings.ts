/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ArrayWithAtLeastOneElement} from '../../common/types';
import type ValidationErrors from '../ValidationErrors';

export type ValidationResult<T, TAsync extends 'async' | 'sync'> = TAsync extends 'sync' ? T : Promise<T>;

export type ValidationFunction<TValue, TAsync extends 'async' | 'sync'> = (
  value: TValue | undefined
) => ValidationResult<string | undefined, TAsync>;
export type GroupValidationFunction<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string,
  TAsync extends 'async' | 'sync'
> = (record: Partial<TRecord>, errors: ValidationErrors<TEditableField>) => ValidationResult<void, TAsync>;

export type ValidatorSettings<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string
> = {
  asyncDependencies: ArrayWithAtLeastOneElement<keyof TRecord & string>[];
  asyncGroupValidators: {
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>;
    fn: GroupValidationFunction<TRecord, TEditableField, 'async'>;
  }[];
  asyncValidators: {
    [K in TEditableField]?: ValidationFunction<TRecord[K], 'async'>[];
  };
  groupValidators: {
    fields: ArrayWithAtLeastOneElement<keyof TRecord & string>;
    fn: GroupValidationFunction<TRecord, TEditableField, 'sync'>;
  }[];
  validators: {
    [K in TEditableField]?: ValidationFunction<TRecord[K], 'sync'>[];
  };
};
