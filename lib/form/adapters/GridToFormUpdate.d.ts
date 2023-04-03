import { EventListener, IObservable } from '../../common/types';
import { GridModelListenerArgsByEventName } from '../../grid/models/types/GridModelListenerArgsByEventName';
import { IGridModel } from '../../grid/models/types/IGridModel';
import ValidationErrors from '../../validation/ValidationErrors';
import { IFormModel } from '../types/IFormModel';
type RequiredGridModelListenerArgsByEventName<TKey, TRecord extends Record<string, unknown>> = Pick<GridModelListenerArgsByEventName<TKey, TRecord>, 'update'>;
declare class GridToFormUpdate<TKey, TRecord extends Record<string, unknown>, TListenerArgsByEventName extends {
    [x: string]: unknown[];
    update: [Partial<TRecord>];
}, TFilters> implements IFormModel<TRecord>, IObservable<TListenerArgsByEventName> {
    private gridModel;
    private id;
    private eventsModel;
    private onUpdateHandlers;
    constructor(gridModel: IGridModel<TKey, TRecord, TFilters> & IObservable<RequiredGridModelListenerArgsByEventName<TKey, TRecord>>, id: TKey);
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(changes: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    off<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
}
export default GridToFormUpdate;
