export type FormModelListenerArgsByEventName<TRecord extends Record<string, unknown>> = {
    update: [Partial<TRecord>];
};
