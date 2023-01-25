/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../../validation/ValidationErrors';

export type IGridModelCustomError = Error & Record<string, unknown>;

export type IGridModelSortMode = 'asc' | 'default' | 'desc';

export type IGridModelReadParams<TKey, TRecord extends Record<string, unknown>, TFilters> = {
  extra?: TKey[];
  fields: (keyof TRecord & string)[];
  filters?: TFilters;
  limit?: number;
  offset?: number;
  sort?: [keyof TRecord & string, IGridModelSortMode][];
};

export type IGridModelUpdateResult<TKey, TRecord> = [
  TKey,
  IGridModelCustomError | Partial<TRecord> | ValidationErrors<keyof TRecord & string>
][];

export type IGridModelReadResult<TKey, TRecord extends Record<string, unknown>> = {
  /**
   * Extra records
   */
  ids?: TKey[];
  count?: number;
  /**
   * In all records count
   */
  extraRecords?: [TKey, Partial<TRecord>][];
  /**
   * Primary records
   */
  records: [TKey, Partial<TRecord>][];
  totals?: Partial<TRecord>;
};

export interface IGridModel<TKey, TRecord extends Record<string, unknown>, TFilters> {
  /**
   * Add a record
   */
  create: (record: Partial<TRecord>) => Promise<TKey>;

  /**
   * Get the particular record
   */
  getRecord: (id: TKey, fields: (keyof TRecord & string)[]) => Promise<Partial<TRecord>>;

  /**
   * Get all dependent fields, that are required for validation
   */
  getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];

  /**
   * Validation check
   */
  isValidRecord: (
    record: Partial<TRecord>,
    recordId?: TKey | null
  ) => Promise<ValidationErrors<keyof TRecord & string>>;

  /**
   * Get records list
   */
  read: (
    params: IGridModelReadParams<TKey, TRecord, TFilters>
  ) => Promise<IGridModelReadResult<TKey, TRecord>>;

  /**
   * Apply record changes
   */
  update: (changes: [TKey, Partial<TRecord>][]) => Promise<IGridModelUpdateResult<TKey, TRecord>>;
}
