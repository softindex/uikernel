/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type IListModelReadResult<TKey, TMetadata extends {}> = {
  id: TKey;
  label: string[] | string;
  metadata?: TMetadata;
  type?: 'empty' | 'group' | 'header' | 'subitem';
}[];

export interface IListModel<TKey, TMetadata extends {}> {
  getLabel: (id: TKey) => Promise<string>;
  read: (search?: string) => Promise<IListModelReadResult<TKey, TMetadata>>;
}
