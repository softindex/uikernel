export type ListModelReadResult<TKey, TMetadata extends Record<string, unknown>> = {
    id: TKey;
    label: string[] | string;
    metadata?: TMetadata;
    type?: 'empty' | 'group' | 'header' | 'subitem';
}[];
export interface IListModel<TKey, TMetadata extends Record<string, unknown>> {
    getLabel: (id: TKey) => Promise<string>;
    read: (search?: string) => Promise<ListModelReadResult<TKey, TMetadata>>;
}
