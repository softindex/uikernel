/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import decorate from '../../common/decorate';
import {IObservable} from '../../common/types';
import {GridModelListenerArgsByEventName} from './types/GridModelListenerArgsByEventName';
import {IGridModel} from './types/IGridModel';

/**
 * Defines filter values while reading Grid model data
 */
function applyGridFilters<
  TKey,
  TRecord extends {},
  TFilters extends {},
  TListenerArgsByEventName extends GridModelListenerArgsByEventName<TKey, TRecord>
>(
  model: IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName>,
  filters: TFilters
): IGridModel<TKey, TRecord, TFilters> & IObservable<TListenerArgsByEventName> {
  return decorate(model, {
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
