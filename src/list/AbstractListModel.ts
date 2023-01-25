/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {IListModel, IListModelReadResult} from './types/IListModel';

/**
 * Abstract List model
 */
abstract class AbstractListModel<TKey, TMetadata extends Record<string, unknown>>
  implements IListModel<TKey, TMetadata>
{
  /**
   * Get data
   */
  read(_search?: string): Promise<IListModelReadResult<TKey, TMetadata>> {
    return Promise.resolve([]);
  }

  /**
   * Get option name using Id
   */
  getLabel(_id: TKey): Promise<string> {
    return Promise.resolve('');
  }
}

export default AbstractListModel;
