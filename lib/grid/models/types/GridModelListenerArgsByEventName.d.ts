export type GridModelListenerArgsByEventName<TKey, TRecord extends Record<string, unknown>> = {
    create: [TKey[]];
    delete: [TKey[]];
    update: [[TKey, Partial<TRecord>][]];
};
