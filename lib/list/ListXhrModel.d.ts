import type { DefaultXhr } from '../common/defaultXhr';
import type { IListModel, ListModelReadResult } from './types/IListModel';
declare class ListXhrModel<TKey, TMetadata extends Record<string, unknown>> implements IListModel<TKey, TMetadata> {
    private apiUrl;
    private xhr;
    constructor(apiUrl: string, xhr?: DefaultXhr);
    read(search?: string): Promise<ListModelReadResult<TKey, TMetadata>>;
    getLabel(id: TKey): Promise<string>;
}
export default ListXhrModel;
