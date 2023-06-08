import React from 'react';
import EqualMap from '../common/EqualMap';
import ValidationErrors from '../validation/ValidationErrors';
import { GridColumns } from './types/GridColumns';
import { GridEditor, IGridRef, SortElementProps } from './types/IGridRef';
type Props<TKey, TRecord extends Record<string, unknown>, TFilters, TColumns extends Partial<GridColumns<TKey, TRecord>>, TMultipleSorting extends boolean> = {
    changes: EqualMap<TKey, Partial<TRecord>>;
    classNames: string[];
    columns: TColumns;
    count: number;
    editor: GridEditor<TKey, string & keyof TColumns>;
    errors: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
    extraRecords: EqualMap<TKey, TRecord>;
    gridRef: IGridRef<TKey, TRecord, TFilters, TColumns, TMultipleSorting>;
    height: number | undefined;
    page: number;
    pageSizeLabel: string;
    records: EqualMap<TKey, TRecord> | null;
    showLoader: boolean;
    sort: SortElementProps<string & keyof TColumns & keyof TRecord> | SortElementProps<string & keyof TColumns & keyof TRecord>[] | null | undefined;
    statuses: EqualMap<TKey, Set<string>>;
    totals: Partial<TRecord>;
    viewColumns: (string & keyof TColumns)[] | {
        [K in string & keyof TColumns]?: boolean;
    } | undefined;
    viewCount: number;
    viewVariants: number[];
    warnings: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
    onCellClick: (event: React.MouseEvent<HTMLTableElement>, recordId: TKey, colId: string & keyof TColumns, ref: string | null) => void;
    onChangeViewCount: (viewCount: number) => void;
    onClickFirstPage: () => void;
    onClickLastPage: () => void;
    onClickNextPage: () => void;
    onClickPrevPage: () => void;
    onColumnClick: (column: string & keyof TColumns) => void;
    onRefreshTable: () => void;
};
declare class PureGridComponent<TKey, TRecord extends Record<string, unknown>, TFilters, TColumns extends Partial<GridColumns<TKey, TRecord>>, TMultipleSorting extends boolean> extends React.Component<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>> {
    static defaultProps: {
        readonly viewCount: 10;
        readonly viewVariants: readonly [10, 20, 30, 40, 50, 100, 200, 300, 500];
    };
    private recordMap;
    private tBodyElement;
    private columnsWithEscapeError;
    componentDidUpdate(prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>): void;
    render(): JSX.Element;
    private initRecordsMap;
    private shouldRenderBody;
    private getRowsToRerender;
    private checkPropForRerender;
    private isRecordLoaded;
    private checkEditorForRender;
    private checkRecordsForRender;
    private renderBody;
    private renderRow;
    private renderCell;
    private unmountEditor;
    private renderEditor;
    private getRowHTML;
    private getRowClassNames;
    private getCellHTML;
    private escapeRecord;
    private hasWarning;
    private hasError;
    private checkFieldInValidation;
    private isChanged;
    private getRowStatusNames;
    private isSelected;
    private formHeader;
    private getSortParams;
    private getColumnClass;
    private isViewColumn;
    private getHeaderCellHTML;
    private handleBodyClick;
    private renderPagination;
    private renderTotals;
    private getEditorFieldName;
}
export default PureGridComponent;
