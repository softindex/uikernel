import ValidationErrors from '../../../validation/ValidationErrors';
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
export type GridModelUpdateResult<TKey, TRecord> = [
    TKey,
    GridModelCustomError | Partial<TRecord> | ValidationErrors<keyof TRecord & string>
][];
export type GridModelReadResult<TKey, TRecord extends Record<string, unknown>, TField extends string & keyof TRecord> = {
    ids?: TKey[];
    count?: number;
    extraRecords?: [TKey, Pick<TRecord, TField>][];
    records: [TKey, Pick<TRecord, TField>][];
    totals?: Partial<Pick<TRecord, TField>>;
};
export interface IGridModel<TKey, TRecord extends Record<string, unknown>, TFilters> {
    create: (record: Partial<TRecord>) => Promise<TKey>;
    getRecord: <TField extends keyof TRecord & string>(id: TKey, fields: TField[]) => Promise<Pick<TRecord, TField>>;
    getValidationDependency: (fields: (keyof TRecord & string)[]) => (keyof TRecord & string)[];
    isValidRecord: (record: Partial<TRecord>, recordId?: TKey | null) => Promise<ValidationErrors<keyof TRecord & string>>;
    read: <TField extends string & keyof TRecord>(params: GridModelReadParams<TKey, TRecord, TField, TFilters>) => Promise<GridModelReadResult<TKey, TRecord, TField>>;
    update: (changes: [TKey, Partial<TRecord>][]) => Promise<GridModelUpdateResult<TKey, TRecord>>;
}
