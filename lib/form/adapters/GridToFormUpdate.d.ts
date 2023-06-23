import type { EventListener, IObservable } from '../../common/types';
import type { GridModelListenerArgsByEventName } from '../../grid/models/types/GridModelListenerArgsByEventName';
import type { IGridModel } from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import type { FormModelListenerArgsByEventName } from '../types/FormModelListenerArgsByEventName';
import type { IFormModel } from '../types/IFormModel';
declare class GridToFormUpdate<TKey, TRecord extends Record<string, unknown>, TFilters> implements IFormModel<TRecord>, IObservable<FormModelListenerArgsByEventName<TRecord>> {
    private gridModel;
    private id;
    private onUpdateHandlers;
    constructor(gridModel: IGridModel<TKey, TRecord, TFilters> & IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>, id: TKey);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(eventName: TEventName, cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>): this;
    off<TEventName extends keyof FormModelListenerArgsByEventName<TRecord>>(eventName: TEventName, cb: EventListener<FormModelListenerArgsByEventName<TRecord>[TEventName]>): this;
}
export default GridToFormUpdate;
