/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class EqualMap<TKey, TValue> implements Map<TKey, TValue> {
  private map = new Map<string, TValue>();

  constructor(entries?: Iterable<[TKey, TValue]>) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  set(key: TKey, value: TValue): this {
    this.map.set(JSON.stringify(key), value);
    return this;
  }

  get(key: TKey): ReturnType<Map<TKey, TValue>['get']> {
    return this.map.get(JSON.stringify(key));
  }

  clear(): ReturnType<Map<TKey, TValue>['clear']> {
    return this.map.clear();
  }

  get size(): Map<TKey, TValue>['size'] {
    return this.map.size;
  }

  get [Symbol.toStringTag](): string {
    return this.map[Symbol.toStringTag];
  }

  delete(key: TKey): ReturnType<Map<TKey, TValue>['delete']> {
    return this.map.delete(JSON.stringify(key));
  }

  forEach(
    func: (value: TValue, key: TKey, map: EqualMap<TKey, TValue>) => void,
    thisArg?: EqualMap<TKey, TValue>
  ): void {
    for (const [key, value] of this.entries()) {
      func.call(thisArg, value, key, this);
    }
  }

  has(key: TKey): ReturnType<Map<TKey, TValue>['has']> {
    return this.map.has(JSON.stringify(key));
  }

  *keys(): ReturnType<Map<TKey, TValue>['keys']> {
    for (const key of this.map.keys()) {
      const parsed = JSON.parse(key);
      yield parsed;
    }
  }

  *values(): ReturnType<Map<TKey, TValue>['values']> {
    for (const value of this.map.values()) {
      yield value;
    }
  }

  *entries(): ReturnType<Map<TKey, TValue>['entries']> {
    for (const [key, value] of this.map.entries()) {
      const parsed = JSON.parse(key);
      yield [parsed, value];
    }
  }

  *[Symbol.iterator](): Generator<[TKey, TValue], void> {
    for (const [key, value] of this.map[Symbol.iterator]()) {
      const parsed = JSON.parse(key);
      yield [parsed, value];
    }
  }
}

export default EqualMap;
