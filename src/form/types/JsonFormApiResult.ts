/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {XOR} from 'ts-essentials';
import {ValidationErrorsToJsonResult} from '../../validation/ValidationErrors';

export type JsonFormApiResult<TRecord> = {
  getData: Partial<Pick<TRecord, keyof TRecord & string>>;
  getValidationDependency: (keyof TRecord & string)[];
  submit: XOR<
    {data: Partial<TRecord>; error: null},
    {data: null; error: ValidationErrorsToJsonResult<keyof TRecord & string>}
  >;
  validate: ValidationErrorsToJsonResult<keyof TRecord & string>;
};
