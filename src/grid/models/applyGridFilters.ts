/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import decorate from '../../common/decorate';
import type {IObservable} from '../../common/types';
import type {GridModelListenerArgsByEventName} from './types/GridModelListenerArgsByEventName';
import type {IGridModel} from './types/IGridModel';

/**
 * Defines filter values while reading Grid model data
 */
function applyGridFilters<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters extends Record<string, unknown>,
  TListenerArgsByEventName extends GridModelListenerArgsByEventName<TKey, TRecord>
>(
  model: IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName>,
  filters: TFilters
): IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName> {
  return decorate<IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName>>(model, {
    async read(options) {
      options.filters = {
        ...filters,
        ...options.filters
      };
      return await model.read(options);
    }
  });
}

export default applyGridFilters;
