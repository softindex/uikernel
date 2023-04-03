import { IObservable } from '../../common/types';
import { IGridModel } from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import { IFormModel } from '../types/IFormModel';
declare class GridToFormCreate<TKey, TRecord extends Record<string, unknown>, TFilters> implements IFormModel<TRecord>, IObservable<Record<string, unknown[]>> {
    private gridModel;
    private initialData;
    constructor(gridModel: IGridModel<TKey, TRecord, TFilters> & IObservable<Record<string, unknown[]>>, initialData?: Partial<TRecord>);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[] | readonly TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on(): this;
    off(): this;
}
export default GridToFormCreate;
