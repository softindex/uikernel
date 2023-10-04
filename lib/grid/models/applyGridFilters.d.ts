import type { IObservable } from '../../common/types';
import type { GridModelListenerArgsByEventName } from './types/GridModelListenerArgsByEventName';
import type { IGridModel } from './types/IGridModel';
declare function applyGridFilters<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TFilters extends Record<string, unknown>, TListenerArgsByEventName extends GridModelListenerArgsByEventName<TKey, TRecord>>(model: IGridModel<TKey, TEditableRecord, TRecord, TFilters> & IObservable<TListenerArgsByEventName>, filters: TFilters): IGridModel<TKey, TEditableRecord, TRecord, TFilters> & IObservable<TListenerArgsByEventName>;
export default applyGridFilters;
