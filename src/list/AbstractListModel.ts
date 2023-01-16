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
abstract class AbstractListModel<TKey> implements IListModel<TKey> {
  /**
   * Get data
   */
  read(_search?: string): Promise<IListModelReadResult<TKey>> {
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
