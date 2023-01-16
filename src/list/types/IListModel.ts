/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type IListModelReadResult<TKey> = {id: TKey; label: string}[];

export interface IListModel<TKey> {
  getLabel: (id: TKey) => Promise<string>;
  read: (search?: string) => Promise<IListModelReadResult<TKey>>;
}
