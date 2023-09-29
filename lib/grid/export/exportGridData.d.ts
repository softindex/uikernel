import type { AnyFunction } from '../../common/types';
import type { IGridModel, GridModelSortMode } from '../models/types/IGridModel';
import type { GridColumns } from '../types/GridColumns';
type FormatColumnsResult<TField extends string> = Record<TField, string>;
type FormatRecordResult<TField extends string> = Record<TField, string>;
type FormatDataResult<TColumn extends string> = {
    columns: FormatColumnsResult<TColumn>;
    records: FormatRecordResult<TColumn>[];
    totals?: FormatRecordResult<TColumn>;
};
export type ExportGridDataParams<TRecord extends Record<string, unknown>> = {
    limit?: number;
    offset?: number;
    sort?: {
        column: keyof TRecord & string;
        direction: GridModelSortMode;
    };
};
export type ExportGridDataResult<TExportRunner extends AnyFunction> = TExportRunner extends AnyFunction<Promise<infer RESULT>> ? RESULT : ReturnType<TExportRunner>;
declare function exportGridData<TRecord extends Record<string, unknown>, TColumn extends string, TViewColumn extends TColumn, TExportRunner extends (data: FormatDataResult<TViewColumn>) => Promise<{
    data: unknown;
    mime: string;
}>>(gridModel: IGridModel<unknown, TRecord, unknown>, columns: Partial<GridColumns<unknown, TRecord, TColumn>>, viewColumns: TViewColumn[], exportRunner: TExportRunner, settings: ExportGridDataParams<TRecord>): Promise<ExportGridDataResult<TExportRunner>>;
export default exportGridData;
