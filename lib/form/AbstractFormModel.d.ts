import EventsModel from '../common/EventsModel';
import { IObservable, EventListener } from '../common/types';
import ValidationErrors from '../validation/ValidationErrors';
import { IFormModel } from './types/IFormModel';
declare abstract class AbstractFormModel<TRecord extends Record<string, unknown>, TListenerArgsByEventName extends Record<string, unknown[]>> implements IFormModel<TRecord>, IObservable<TListenerArgsByEventName> {
    protected eventsModel: EventsModel<TListenerArgsByEventName>;
    getData(): Promise<Partial<TRecord>>;
    getData<TField extends keyof TRecord & string>(fields: TField[]): Promise<Partial<Pick<TRecord, TField>>>;
    submit(_record: Partial<TRecord>): Promise<Partial<TRecord>>;
    isValidRecord(_record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>>;
    getValidationDependency(_fields: (keyof TRecord & string)[]): (keyof TRecord & string)[];
    on<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    off<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    protected trigger<TEventName extends keyof TListenerArgsByEventName & string>(event: TEventName, ...args: TListenerArgsByEventName[TEventName]): void;
}
export default AbstractFormModel;
