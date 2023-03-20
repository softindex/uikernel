/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ListModelReadResult<TKey, TMetadata extends Record<string, unknown>> = {
  id: TKey;
  label: string[] | string;
  metadata?: TMetadata;
  type?: 'empty' | 'group' | 'header' | 'subitem';
}[];

export interface IListModel<TKey, TMetadata extends Record<string, unknown>> {
  getLabel: (id: TKey) => Promise<string>;
  read: (search?: string) => Promise<ListModelReadResult<TKey, TMetadata>>;
}
