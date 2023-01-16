/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {XOR} from 'ts-essentials';
import {ValidationErrorsToJsonResult, ValidationJSONError} from '../../../validation/ValidationErrors';
import {IGridModelReadResult} from './IGridModel';

export type JsonGridApiResult<TKey, TRecord extends {}> = {
  create: XOR<
    {data: TKey; error: null},
    {data: null; error: ValidationErrorsToJsonResult<keyof TRecord & string>}
  >;
  getRecord: Partial<TRecord>;
  read: IGridModelReadResult<TKey, TRecord>;
  update: {
    changes: [TKey, Partial<TRecord>][];
    errors: [TKey, ValidationJSONError][];
    validation: [TKey, ValidationErrorsToJsonResult<keyof TRecord & string>][];
  };
  validate: ValidationErrorsToJsonResult<keyof TRecord & string>;
};
