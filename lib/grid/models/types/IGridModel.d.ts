import type { OptionalRecord } from '../../../common/types';
import type ValidationErrors from '../../../validation/ValidationErrors';
export type GridModelCustomError = Error & Record<string, unknown>;
export type GridModelSortMode = 'asc' | 'default' | 'desc';
export type GridModelReadParams<TKey, TRecord extends Record<string, unknown>, TField extends keyof TRecord & string, TFilters> = {
    extra?: TKey[];
    fields: TField[];
    filters?: TFilters;
    limit?: number;
    offset?: number;
    sort?: [keyof TRecord & string, GridModelSortMode][];
};
export type GridModelUpdateResult<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord> = [TKey, GridModelCustomError | Partial<TRecord> | ValidationErrors<keyof TEditableRecord & string>][];
export type GridModelReadResult<TKey, TRecord extends Record<string, unknown>, TField extends string & keyof TRecord> = {
    ids?: TKey[];
    count?: number;
    extraRecords?: [TKey, Pick<TRecord, TField>][];
    records: [TKey, Pick<TRecord, TField>][];
    totals?: Partial<Pick<TRecord, TField>>;
};
export interface IGridModel<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters> {
    create: (record: OptionalRecord<TEditableRecord>) => Promise<TKey>;
    getRecord: <TField extends keyof TRecord & string>(id: TKey, fields: TField[]) => Promise<Pick<TRecord, TField> | null>;
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: OptionalRecord<TRecord>, recordId?: TKey | null) => Promise<ValidationErrors<keyof TEditableRecord & string>>;
    read: <TField extends string & keyof TRecord>(params: GridModelReadParams<TKey, TRecord, TField, TFilters>) => Promise<GridModelReadResult<TKey, TRecord, TField>>;
    update: (changes: [TKey, Partial<TEditableRecord>][]) => Promise<GridModelUpdateResult<TKey, TEditableRecord, TRecord>>;
}
