/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../../validation/ValidationErrors';

export type GridModelCustomError = Error & Record<string, unknown>;

export type GridModelSortMode = 'asc' | 'default' | 'desc';

export type GridModelReadParams<
  TKey,
  TRecord extends Record<string, unknown>,
  TField extends keyof TRecord & string,
  TFilters
> = {
  extra?: TKey[];
  fields: TField[];
  filters?: TFilters;
  limit?: number;
  offset?: number;
  sort?: [keyof TRecord & string, GridModelSortMode][];
};

export type GridModelUpdateResult<TKey, TRecord> = [
  TKey,
  GridModelCustomError | Partial<TRecord> | ValidationErrors<keyof TRecord & string>
][];

export type GridModelReadResult<
  TKey,
  TRecord extends Record<string, unknown>,
  TField extends string & keyof TRecord
> = {
  /**
   * Extra records
   */
  ids?: TKey[];
  count?: number;
  /**
   * In all records count
   */
  extraRecords?: [TKey, Pick<TRecord, TField>][];
  /**
   * Primary records
   */
  records: [TKey, Pick<TRecord, TField>][];
  totals?: Partial<Pick<TRecord, TField>>;
};

export interface IGridModel<TKey, TRecord extends Record<string, unknown>, TFilters> {
  /**
   * Add a record
   */
  create: (record: Partial<TRecord>) => Promise<TKey>;

  /**
   * Get the particular record
   */
  getRecord: <TField extends keyof TRecord & string>(
    id: TKey,
    fields: TField[]
  ) => Promise<Pick<TRecord, TField> | null>;

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
  read: <TField extends string & keyof TRecord>(
    params: GridModelReadParams<TKey, TRecord, TField, TFilters>
  ) => Promise<GridModelReadResult<TKey, TRecord, TField>>;

  /**
   * Apply record changes
   */
  update: (changes: [TKey, Partial<TRecord>][]) => Promise<GridModelUpdateResult<TKey, TRecord>>;
}
