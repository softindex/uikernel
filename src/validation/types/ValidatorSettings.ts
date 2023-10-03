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
  value: TValue
) => ValidationResult<string | undefined, TAsync>;

export type GroupValidationFunction<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string,
  TAsync extends 'async' | 'sync'
> = (record: TRecord, errors: ValidationErrors<TEditableField>) => ValidationResult<void, TAsync>;

export type GroupValidators<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string,
  TGroupValidators extends (keyof TRecord & string)[],
  TAsync extends 'async' | 'sync'
> = {
  [TIndex in keyof TGroupValidators]: {
    fields: ArrayWithAtLeastOneElement<TGroupValidators[TIndex]>;
    fn: GroupValidationFunction<
      Pick<TRecord, TGroupValidators[TIndex]>,
      TGroupValidators[TIndex] & TEditableField,
      TAsync
    >;
  };
};

export type ValidatorSettings<
  TRecord extends Record<string, unknown>,
  TEditableField extends keyof TRecord & string,
  TAsyncGroupValidators extends (keyof TRecord & string)[],
  TGroupValidators extends (keyof TRecord & string)[]
> = {
  asyncDependencies: ArrayWithAtLeastOneElement<keyof TRecord & string>[];
  asyncGroupValidators: GroupValidators<TRecord, TEditableField, TAsyncGroupValidators, 'async'>;
  asyncValidators: {
    [K in TEditableField]?: ValidationFunction<TRecord[K], 'async'>[];
  };
  groupValidators: GroupValidators<TRecord, TEditableField, TGroupValidators, 'sync'>;
  validators: {
    [K in TEditableField]?: ValidationFunction<TRecord[K], 'sync'>[];
  };
};
