/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type React from 'react';
import type {IObservable} from '../../common/types';
import type ValidationErrors from '../../validation/ValidationErrors';
import type {GridModelListenerArgsByEventName} from '../models/types/GridModelListenerArgsByEventName';
import type {IGridModel, GridModelSortMode} from '../models/types/IGridModel';
import type {GridColumns} from './GridColumns';

export type SortElementProps<TColumnId extends string> = {
  column: TColumnId;
  direction: GridModelSortMode;
};

export type SortRuleType<TMultipleSorting extends boolean, TColumnId extends string> =
  | (TMultipleSorting extends true ? SortElementProps<TColumnId>[] : SortElementProps<TColumnId>)
  | null;

export type GridEditor<TKey, TColumnId extends string> =
  | {
      column: TColumnId;
      element: JSX.Element;
      recordId: TKey;
    }
  | {
      column?: undefined;
      element?: undefined;
      recordId?: undefined;
    };

export interface IGridRef<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters,
  TColumns extends Partial<GridColumns<TKey, TRecord>>,
  TMultipleSorting extends boolean
> {
  /**
   * Add record status
   */
  addRecordStatus: (recordId: TKey, status: string) => void;

  /**
   * Add status to records group
   */
  addRecordStatusGroup: (recordIds: TKey[], status: string) => void;

  /**
   * Clear all table changes
   */
  clearAllChanges: () => void;

  /**
   * Clear record changes
   */
  clearRecordChanges: (recordId: TKey) => void;

  /**
   * Set editor on grid
   */
  createEditor: (
    event: React.MouseEvent<HTMLElement>,
    recordId: TKey,
    colId: string & keyof TColumns,
    ref?: string
  ) => void;

  /**
   * Get all selected records
   */
  getAllSelected: () => TKey[];

  /**
   * Get all record IDs that have the status
   */
  getAllWithStatus: (status: string) => TKey[];

  /**
   * Get current page count
   */
  getCountRecords: () => number;

  /**
   * Get current page index number
   */
  getCurrentPage: () => number;

  /**
   * Get validation errors
   */
  getErrors: () => [TKey, ValidationErrors<string & keyof TRecord>][] | null;

  /**
   * Get table model
   */
  getModel: () =>
    | (IGridModel<TKey, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>)
    | undefined;

  /**
   * Get pages count
   */
  getPagesCount: () => number;

  /**
   * Get record data
   */
  getRecord: (recordId: TKey) => Partial<TRecord> | null;

  /**
   * Get record changes object
   */
  getRecordChanges: (recordId: TKey) => Partial<TRecord>;

  /**
   * Get record errors object
   * @deprecated - was marked as private, but not used in the component
   */
  getRecordErrors: (recordId: TKey) => ValidationErrors<string & keyof TRecord>;

  getRecordWarnings: (recordId: TKey) => ValidationErrors<string & keyof TRecord>;

  /**
   * @deprecated
   */
  getSelectAllStatus: () => string | undefined;

  /**
   * Get sort direction
   */
  getSortDirection: () => SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord> | undefined;

  getViewCount: () => number;

  /**
   * Change event handler of displayed rows count in a table
   */
  handleChangeViewCount: (viewCount: number) => void;

  /**
   * Move to first page event handler
   */
  handleFirstPage: () => void;

  /**
   * Move to last page event handler
   */
  handleLastPage: () => void;

  /**
   * Move to next page event handler
   *
   */
  handleNextPage: () => void;

  /**
   * Move to previous page event handler
   */
  handlePrevPage: () => void;

  /**
   * Refresh table handler
   */
  handleRefreshTable: () => void;

  /**
   * Check record status presence
   */
  hasRecordStatus: (recordId: TKey, status: string) => boolean;

  /**
   * Get current records selection mode
   */
  isSelectBlackMode: () => boolean;

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   */
  isSelected: (recordId: TKey) => boolean;

  /**
   * Remove record status
   * @deprecated
   */
  removeRecordStatus: (recordId: TKey, status: string) => void;

  /**
   * Remove records status
   * @deprecated
   */
  removeRecordStatusAll: (status: string) => void;

  /**
   * Reset to initial table state
   */
  reset: () => void;

  /**
   * Reset to default sort parameters
   */
  resetSorting: () => void;

  /**
   * Save grid changes
   */
  save: () => Promise<void>;

  /**
   * Select all records
   * Switches records selection mode to "blacklist"
   */
  selectAll: () => void;

  /**
   * Select a record
   */
  selectRecord: (recordId: TKey, ignoreBlackList?: boolean) => void;

  /**
   * Change table record
   * This method marks changed fields and validates them
   */
  set: (recordId: TKey, recordChanges: Partial<TRecord>, validate?: boolean) => void;

  /**
   * Move to other page
   */
  setPage: (page: number) => void;

  /**
   * Select only these records
   */
  setSelectedRecords: (selectedIds: TKey[], blackListMode: boolean) => void;

  /**
   * Set displayed elements count
   */
  setViewCount: (viewCount: number) => void;

  /**
   * Sort by column
   */
  sort: (column: string & keyof TColumns & keyof TRecord, direction: GridModelSortMode) => void;

  /**
   * Switch records selection mode
   */
  toggleSelectAll: () => void;

  /**
   * Switch "select"
   */
  toggleSelected: (recordId: TKey) => void;

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll: () => void;

  /**
   * Unselect record
   */
  unselectRecord: (recordId: TKey, ignoreBlackList?: boolean) => void;

  /**
   * Fetch server data
   */
  updateTable: () => Promise<void>;
}
