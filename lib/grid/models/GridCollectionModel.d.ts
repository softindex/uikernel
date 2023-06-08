import { StrictOmit } from 'ts-essentials';
import { AllAsOptionalWithRequired, IObservable } from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import Validator from '../../validation/Validator';
import AbstractGridModel from './AbstractGridModel';
import { GridModelListenerArgsByEventName } from './types/GridModelListenerArgsByEventName';
import { IGridModel, GridModelReadParams, GridModelReadResult, GridModelUpdateResult } from './types/IGridModel';
type GridCollectionModelParams<TKey, TRecord extends Record<string, unknown>, TFilters> = {
    data: [TKey, TRecord][];
    requiredFields: (keyof TRecord & string)[];
    validator: Validator<TRecord>;
    filtersHandler: (data: [TKey, TRecord][], filters: TFilters) => [TKey, TRecord][];
    generateId: (existsIds: TKey[]) => TKey;
};
declare class GridCollectionModel<TKey, TRecord extends Record<string, unknown>, TFilters> extends AbstractGridModel<TKey, TRecord, TFilters, GridModelListenerArgsByEventName<TKey, TRecord>> implements IGridModel<TKey, TRecord, TFilters>, IObservable<GridModelListenerArgsByEventName<TKey, TRecord>> {
    private data;
    private requiredFields;
    private validator;
    private filtersHandler;
    private generateId;
    static getNumberIdGeneration(): (existsIds: number[]) => number;
    static createWithNumberId<TRecord extends Record<string, unknown>, TFilters>({ data, filtersHandler, requiredFields, validator }: Partial<StrictOmit<GridCollectionModelParams<number, TRecord, TFilters>, 'generateId'>>): GridCollectionModel<number, TRecord, TFilters>;
    static create<TKey, TRecord extends Record<string, unknown>, TFilters>({ generateId, data, filtersHandler, requiredFields, validator }: AllAsOptionalWithRequired<GridCollectionModelParams<TKey, TRecord, TFilters>, 'generateId'>): GridCollectionModel<TKey, TRecord, TFilters>;
    constructor(data: GridCollectionModelParams<TKey, TRecord, TFilters>['data'], requiredFields: GridCollectionModelParams<TKey, TRecord, TFilters>['requiredFields'], validator: GridCollectionModelParams<TKey, TRecord, TFilters>['validator'], filtersHandler: GridCollectionModelParams<TKey, TRecord, TFilters>['filtersHandler'] | undefined, generateId: GridCollectionModelParams<TKey, TRecord, TFilters>['generateId']);
    setData(data: [TKey, TRecord][]): void;
    getData(): [TKey, TRecord][];
    delete(recordIds: TKey[]): Promise<void>;
    create(record: Partial<TRecord> | [TKey, TRecord]): Promise<TKey>;
    read<TField extends keyof TRecord & string>({ fields, extra, filters, limit, offset, sort }: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<GridModelReadResult<TKey, TRecord, TField>>;
    getRecord<TField extends keyof TRecord & string>(id: TKey, fields: TField[]): Promise<Pick<TRecord, TField> | null>;
    update(changes: [TKey, Partial<TRecord>][]): Promise<GridModelUpdateResult<TKey, TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    private createId;
    private getRecordByID;
    private createRecordAndEmit;
}
export default GridCollectionModel;
