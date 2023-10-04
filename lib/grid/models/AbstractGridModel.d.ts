import type { EventListener, IObservable, OptionalRecord } from '../../common/types';
import ValidationErrors from '../../validation/ValidationErrors';
import type { GridModelReadParams, IGridModel, GridModelReadResult, GridModelUpdateResult } from './types/IGridModel';
declare abstract class AbstractGridModel<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters, TListenerArgsByEventName extends Record<string, unknown[]>> implements IGridModel<TKey, TEditableRecord, TRecord, TFilters>, IObservable<TListenerArgsByEventName> {
    private eventsModel;
    create(_record: OptionalRecord<TEditableRecord>): Promise<TKey>;
    read<TField extends keyof TRecord & string>(_params: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<GridModelReadResult<TKey, TRecord, TField>>;
    getRecord<TField extends keyof TRecord & string>(_id: TKey, _fields: TField[]): Promise<Pick<TRecord, TField> | null>;
    update(_changes: [TKey, Partial<TEditableRecord>][]): Promise<GridModelUpdateResult<TKey, TEditableRecord, TRecord>>;
    isValidRecord(_record: OptionalRecord<TRecord>, _recordId?: TKey | null): Promise<ValidationErrors<keyof TEditableRecord & string>>;
    getValidationDependency(_fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    off<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    protected trigger<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, ...args: TListenerArgsByEventName[TEventName]): void;
}
export default AbstractGridModel;
