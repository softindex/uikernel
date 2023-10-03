/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {OptionalRecord} from '../../common/types';
import type ValidationErrors from '../ValidationErrors';

export interface IValidator<TRecord, TEditableField extends keyof TRecord & string> {
  getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
  isValidRecord: (record: OptionalRecord<TRecord>) => Promise<ValidationErrors<TEditableField>>;
}
