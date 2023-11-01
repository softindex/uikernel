import React from 'react';
import EqualMap from '../common/EqualMap';
import type { IObservable } from '../common/types';
import type { IValidator } from '../validation/types/IValidator';
import ValidationErrors from '../validation/ValidationErrors';
import type { GridModelListenerArgsByEventName } from './models/types/GridModelListenerArgsByEventName';
import type { IGridModel, GridModelReadResult, GridModelSortMode } from './models/types/IGridModel';
import type { GridColumns } from './types/GridColumns';
import type { GridEditor, IGridRef, SortRuleType } from './types/IGridRef';
type Props<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters, TColumns extends Partial<GridColumns<TKey, TEditableRecord, TRecord>>, TMultipleSorting extends boolean> = {
    autoSubmit?: boolean;
    className?: string;
    columns: TColumns;
    defaultSort?: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>;
    defaultViewCount: number;
    height?: number;
    model?: IGridModel<TKey, TEditableRecord, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>;
    multipleSorting?: TMultipleSorting;
    page: number;
    pageSizeLabel: string;
    partialErrorChecking: boolean;
    selectAllStatus?: string;
    selected: TKey[];
    sort?: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>;
    statuses?: EqualMap<TKey, Set<string>>;
    viewColumns?: (string & keyof TColumns)[] | {
        [K in string & keyof TColumns]?: boolean;
    };
    viewCount?: number;
    viewVariants?: number[] | null;
    warningsValidator?: IValidator<TRecord, keyof TEditableRecord & string>;
    onChange?: (changes: EqualMap<TKey, Partial<TEditableRecord>>) => void;
    onChangeViewCount?: (viewCount: number) => void;
    onDestroy?: () => void;
    onError?: (error: Error) => void;
    onInit?: () => void;
    onPageLoad?: (data: GridModelReadResult<TKey, TRecord, string & keyof TRecord>) => void;
    onSelectedChange?: (selected: TKey[], selectedCount: number) => void;
    onSorting?: <TColumnId extends string & keyof TColumns & keyof TRecord>(newSorts: SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord>, column?: TColumnId, direction?: GridModelSortMode) => void;
    onToggleSelectAll?: () => void;
    onToggleSelected?: (recordId: TKey) => void;
    shouldChangePage?: (page: number) => Promise<boolean>;
};
type State<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TColumnId extends string, TMultipleSorting extends boolean> = {
    changes: EqualMap<TKey, Partial<TEditableRecord>>;
    count: number;
    data: EqualMap<TKey, TRecord> | null;
    editor: GridEditor<TKey, TColumnId>;
    errors: EqualMap<TKey, ValidationErrors<keyof TEditableRecord & string>>;
    extra: EqualMap<TKey, TRecord>;
    page: number;
    partialErrorChecking: boolean;
    selectBlackListMode: boolean;
    selected: TKey[];
    showLoader: boolean;
    sort: SortRuleType<TMultipleSorting, TColumnId & keyof TRecord>;
    statuses: EqualMap<TKey, Set<string>>;
    totals: Partial<TRecord>;
    viewCount: number;
    warnings: EqualMap<TKey, ValidationErrors<keyof TEditableRecord & string>>;
};
declare class GridComponent<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters, TColumns extends Partial<GridColumns<TKey, TEditableRecord, TRecord>>, TMultipleSorting extends boolean = false> extends React.Component<Props<TKey, TEditableRecord, TRecord, TFilters, TColumns, TMultipleSorting>, State<TKey, TEditableRecord, TRecord, string & keyof TColumns, TMultipleSorting>> implements IGridRef<TKey, TEditableRecord, TRecord, TFilters, TColumns, TMultipleSorting> {
    static defaultProps: {
        readonly page: 0;
        readonly defaultViewCount: 0;
        readonly partialErrorChecking: false;
        readonly selected: readonly [];
        readonly pageSizeLabel: "Page Size";
    };
    private statusesOnlyViaPropsEnabled;
    private mounted;
    private throttledUpdateTable;
    constructor(props: Readonly<Props<TKey, TEditableRecord, TRecord, TFilters, TColumns, TMultipleSorting>>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props<TKey, TEditableRecord, TRecord, TFilters, TColumns, TMultipleSorting>>): void;
    updateTable: () => Promise<void>;
    isSelectBlackMode(): boolean;
    unselectAll(): void;
    getRecord(recordId: TKey): Partial<TRecord> | null;
    getRecordChanges: (recordId: TKey) => Partial<TRecord>;
    getRecordWarnings(recordId: TKey): ValidationErrors<keyof TEditableRecord & string>;
    getRecordErrors(recordId: TKey): ValidationErrors<keyof TEditableRecord & string>;
    getErrors(): [TKey, ValidationErrors<keyof TEditableRecord & string>][] | null;
    getModel(): (IGridModel<TKey, TEditableRecord, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>) | undefined;
    clearRecordChanges(recordId: TKey): void;
    set(recordId: TKey, recordChanges: Partial<TRecord>, validate?: boolean): void;
    save(): Promise<void>;
    unselectRecord(recordId: TKey, ignoreBlackList?: boolean): void;
    selectRecord(recordId: TKey, ignoreBlackList?: boolean): void;
    selectAll(): void;
    getSelectAllStatus(): string | undefined;
    clearAllChanges(): void;
    reset(): void;
    resetSorting(): void;
    removeRecordStatusAll(status: string): void;
    setSelectedRecords(selectedIds: TKey[], blackListMode: boolean): void;
    createEditor: (event: React.MouseEvent<HTMLElement>, recordId: TKey, colId: string & keyof TColumns, ref?: string | null) => void;
    getCurrentPage(): number;
    getCountRecords(): number;
    handleNextPage: () => void;
    setPage(page: number): void;
    handlePrevPage: () => void;
    handleChangeViewCount: (viewCount: number) => void;
    setViewCount(viewCount: number): void;
    getPagesCount(): number;
    getViewCount(): number;
    addRecordStatus(recordId: TKey, status: string): void;
    addRecordStatusGroup(recordIds: TKey[], status: string): void;
    removeRecordStatus(recordId: TKey, status: string): void;
    hasRecordStatus(recordId: TKey, status: string): boolean;
    getAllWithStatus(status: string): TKey[];
    getAllSelected(): TKey[];
    getSortDirection(): SortRuleType<TMultipleSorting, string & keyof TColumns & keyof TRecord> | undefined;
    sort(column: string & keyof TColumns & keyof TRecord, direction: GridModelSortMode): void;
    handleFirstPage: () => void;
    handleLastPage: () => void;
    handleRefreshTable: () => void;
    toggleSelectAll(): void;
    isSelected(recordId: TKey): boolean;
    toggleSelected(recordId: TKey): void;
    render(): JSX.Element;
    private unsafeUpdateTable;
    private updateTableInBackground;
    private onRecordsCreated;
    private loadData;
    private getAdditionalIds;
    private getFieldsToRender;
    private sortingToArray;
    private equalPick;
    private getRecordWithChanges;
    private setRowChanges;
    private removeExtraRecord;
    private removeExtraRecords;
    private emitChangeSelectedNum;
    private setData;
    private setRecordData;
    private isRecordLoaded;
    private getRowID;
    private getDefaultSort;
    private isSortingPropsMode;
    private onBlurEditor;
    private onBlurEditorInBackground;
    private validateRow;
    private checkWarnings;
    private checkValidatorErrors;
    private onFocusEditor;
    private onChangeEditor;
    private getValidPage;
    private removeExtraRecordIfNeed;
    private isViewCountPropsMode;
    private handleColumnClick;
    private getStatuses;
    private getEditorFieldName;
}
export default GridComponent;
