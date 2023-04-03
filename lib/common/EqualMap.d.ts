declare class EqualMap<TKey, TValue> implements Map<TKey, TValue> {
    private map;
    constructor(entries?: Iterable<[TKey, TValue]>);
    set(key: TKey, value: TValue): this;
    get(key: TKey): ReturnType<Map<TKey, TValue>['get']>;
    clear(): ReturnType<Map<TKey, TValue>['clear']>;
    get size(): Map<TKey, TValue>['size'];
    get [Symbol.toStringTag](): string;
    delete(key: TKey): ReturnType<Map<TKey, TValue>['delete']>;
    forEach(func: (value: TValue, key: TKey, map: EqualMap<TKey, TValue>) => void, thisArg?: EqualMap<TKey, TValue>): void;
    has(key: TKey): ReturnType<Map<TKey, TValue>['has']>;
    keys(): ReturnType<Map<TKey, TValue>['keys']>;
    values(): ReturnType<Map<TKey, TValue>['values']>;
    entries(): ReturnType<Map<TKey, TValue>['entries']>;
    [Symbol.iterator](): Generator<[TKey, TValue], void>;
}
export default EqualMap;
