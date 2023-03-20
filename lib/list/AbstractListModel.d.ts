import { IListModel, ListModelReadResult } from './types/IListModel';
declare abstract class AbstractListModel<TKey, TMetadata extends Record<string, unknown>> implements IListModel<TKey, TMetadata> {
    read(_search?: string): Promise<ListModelReadResult<TKey, TMetadata>>;
    getLabel(_id: TKey): Promise<string>;
}
export default AbstractListModel;
