import { EventListener, IObservable } from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import { GridModelReadParams, IGridModel, GridModelReadResult, GridModelUpdateResult } from './types/IGridModel';
declare abstract class AbstractGridModel<TKey, TRecord extends Record<string, unknown>, TFilters, TListenerArgsByEventName extends Record<string, unknown[]>> implements IGridModel<TKey, TRecord, TFilters>, IObservable<TListenerArgsByEventName> {
    private eventsModel;
    create(_record: Partial<TRecord>): Promise<TKey>;
    read<TField extends keyof TRecord & string>(_params: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<GridModelReadResult<TKey, TRecord, TField>>;
    getRecord<TField extends keyof TRecord & string>(_id: TKey, _fields: TField[]): Promise<Pick<TRecord, TField>>;
    update(_changes: [TKey, Partial<TRecord>][]): Promise<GridModelUpdateResult<TKey, TRecord>>;
    isValidRecord(_record: Partial<TRecord>, _recordId?: TKey | null): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(_fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    off<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    protected trigger<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, ...args: TListenerArgsByEventName[TEventName]): void;
}
export default AbstractGridModel;
