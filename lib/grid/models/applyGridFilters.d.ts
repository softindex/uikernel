import { IObservable } from '../../common/types';
import { GridModelListenerArgsByEventName } from './types/GridModelListenerArgsByEventName';
import { IGridModel } from './types/IGridModel';
declare function applyGridFilters<TKey, TRecord extends Record<string, unknown>, TFilters extends Record<string, unknown>, TListenerArgsByEventName extends GridModelListenerArgsByEventName<TKey, TRecord>>(model: IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName>, filters: TFilters): IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName>;
export default applyGridFilters;
