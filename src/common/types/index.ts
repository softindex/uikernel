/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../validation/ValidationErrors';

export type Records<K, R> = {
  count?: number;
  records: Array<[K, R]>;
};

export type ReadSettings<F> = {
  fields: Array<string>;
  filters?: F;
  limit?: number;
  offset?: number;
  sort?: Array<[string, 'asc' | 'desc' | 'default']>;
};

export interface IServerGridModel<K, R, F> {
  create(record: R): Promise<[K, R]>;
  getRecord(id: K, fields: Array<string>): Promise<R>;
  getValidationDependency(fields: Array<string>): Array<string>;
  isValidRecord(record: R, recordId: K | null): Promise<ValidationErrors>;
  read(settings: ReadSettings<F>): Promise<Records<K, R>>;
  update(records: Array<[K, R]>): Promise<Array<[K, R | ValidationErrors]>>;
}
