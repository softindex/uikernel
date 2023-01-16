/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type GridModelListenerArgsByEventName<TKey, TRecord extends {}> = {
  create: [TKey[]];
  delete: [TKey[]];
  update: [[TKey, Partial<TRecord>][]];
};
