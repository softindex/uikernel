import type React from 'react';
import type { IObservable } from '../../common/types';
import type ValidationErrors from '../../validation/ValidationErrors';
import type { GridModelListenerArgsByEventName } from '../models/types/GridModelListenerArgsByEventName';
import type { IGridModel, GridModelSortMode } from '../models/types/IGridModel';
import type { GridColumns } from './GridColumns';
export type SortElementProps<TColumnId extends string> = {
    column: TColumnId;
    direction: GridModelSortMode;
};
export type SortRuleType<TMultipleSorting extends boolean, TColumnId extends string> = (TMultipleSorting extends true ? SortElementProps<TColumnId>[] : SortElementProps<TColumnId>) | null;
export type GridEditor<TKey, TColumnId extends string> = {
    column: TColumnId;
    element: JSX.Element;
    recordId: TKey;
} | {
    column?: undefined;
    element?: undefined;
    recordId?: undefined;
};
export interface IGridRef<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters, TColumns extends Partial<GridColumns<TKey, TEditableRecord, TRecord>>, TMultipleSorting extends boolean> {
    addRecordStatus: (recordId: TKey, status: string) => void;
    addRecordStatusGroup: (recordIds: TKey[], status: string) => void;
    clearAllChanges: () => void;
    clearRecordChanges: (recordId: TKey) => void;
    createEditor: (event: React.MouseEvent<HTMLElement>, recordId: TKey, colId: string & keyof TColumns, ref?: string) => void;
    getAllSelected: () => TKey[];
    getAllWithStatus: (status: string) => TKey[];
    getCountRecords: () => number;
    getCurrentPage: () => number;
    getErrors: () => [TKey, ValidationErrors<keyof TEditableRecord & string>][] | null;
    getModel: () => (IGridModel<TKey, TEditableRecord, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>) | undefined;
    getPagesCount: () => number;
    getRecord: (recordId: TKey) => Partial<TRecord> | null;
    getRecordChanges: (recordId: TKey) => Partial<TRecord>;
    getRecordErrors: (recordId: TKey) => ValidationErrors<keyof TEditableRecord & string>;
    getRecordWarnings: (recordId: TKey) => ValidationErrors<keyof TEditableRecord & string>;
    getSelectAllStatus: () => string | undefined;
    getSortDirection: () => SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord> | undefined;
    getViewCount: () => number;
    handleChangeViewCount: (viewCount: number) => void;
    handleFirstPage: () => void;
    handleLastPage: () => void;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    handleRefreshTable: () => void;
    hasRecordStatus: (recordId: TKey, status: string) => boolean;
    isSelectBlackMode: () => boolean;
    isSelected: (recordId: TKey) => boolean;
    removeRecordStatus: (recordId: TKey, status: string) => void;
    removeRecordStatusAll: (status: string) => void;
    reset: () => void;
    resetSorting: () => void;
    save: () => Promise<void>;
    selectAll: () => void;
    selectRecord: (recordId: TKey, ignoreBlackList?: boolean) => void;
    set: (recordId: TKey, recordChanges: Partial<TRecord>, validate?: boolean) => void;
    setPage: (page: number) => void;
    setSelectedRecords: (selectedIds: TKey[], blackListMode: boolean) => void;
    setViewCount: (viewCount: number) => void;
    sort: (column: string & keyof TColumns & keyof TRecord, direction: GridModelSortMode) => void;
    toggleSelectAll: () => void;
    toggleSelected: (recordId: TKey) => void;
    unselectAll: () => void;
    unselectRecord: (recordId: TKey, ignoreBlackList?: boolean) => void;
    updateTable: () => Promise<void>;
}
