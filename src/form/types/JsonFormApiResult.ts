/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {XOR} from 'ts-essentials';
import type {ValidationErrorsToJsonResult} from '../../validation/ValidationErrors';

export type JsonFormApiResult<TRecord, TEditableField extends keyof TRecord & string> = {
  getData: Partial<Pick<TRecord, keyof TRecord & string>>;
  getValidationDependency: (keyof TRecord & string)[];
  submit: XOR<
    {data: Partial<TRecord>; error: null},
    {data: null; error: ValidationErrorsToJsonResult<TEditableField>}
  >;
  validate: ValidationErrorsToJsonResult<TEditableField>;
};
