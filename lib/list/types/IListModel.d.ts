export type SelectableListOption<TKey, TMetadata extends Record<string, unknown>> = {
    id: TKey;
    label: string[] | string;
    metadata?: TMetadata;
    type?: 'empty' | 'header' | 'subitem';
};
export type UnselectableListOption = {
    label: string[] | string;
    type: 'group';
};
export type ListOption<TKey, TMetadata extends Record<string, unknown>> = SelectableListOption<TKey, TMetadata> | UnselectableListOption;
export type ListModelReadResult<TKey, TMetadata extends Record<string, unknown>> = ListOption<TKey, TMetadata>[];
export interface IListModel<TKey, TMetadata extends Record<string, unknown>> {
    getLabel: (id: TKey) => Promise<string>;
    read: (search?: string) => Promise<ListModelReadResult<TKey, TMetadata>>;
}
