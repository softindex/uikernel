export type ArrayWithAtLeastOneElement<T> = [T, ...T[]];
export type AllAsOptionalWithRequired<T extends Record<string, unknown>, U extends string & keyof T> = {
    [K in Exclude<string & keyof T, U>]?: T[K];
} & {
    [K in U]-?: T[K];
};
export type AnyFunction<TResult = any> = (...args: any[]) => TResult;
export type EventListener<TParams extends unknown[]> = (...args: TParams) => void;
export interface IObservable<TListenerArgsByEventName extends Record<string, unknown[]>> {
    off: <TEventName extends string & keyof TListenerArgsByEventName>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>) => this;
    on: <TEventName extends string & keyof TListenerArgsByEventName>(eventName: TEventName, cb: EventListener<TListenerArgsByEventName[TEventName]>) => this;
}
export type OptionalRecord<TRecord> = {
    [TKey in keyof TRecord]?: TRecord[TKey] | null;
};
