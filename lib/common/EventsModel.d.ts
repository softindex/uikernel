import { EventListener, IObservable } from './types';
declare class EventsModel<TListenerArgsByEventName extends Record<string, unknown[]>> implements IObservable<TListenerArgsByEventName> {
    private subscribers;
    on<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    off<TEventName extends keyof TListenerArgsByEventName & string>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>): this;
    trigger<TEventName extends keyof TListenerArgsByEventName & string>(event: TEventName, ...params: TListenerArgsByEventName[TEventName]): void;
    listenerCount(event: keyof TListenerArgsByEventName & string): number;
    removeAllListeners(event: keyof TListenerArgsByEventName & string): void;
}
export default EventsModel;
