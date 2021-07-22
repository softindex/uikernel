/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class EqualMap extends Map {
  constructor(iterable) {
    super(iterable);
  }

  set(key, value) {
    return Map.prototype.set.call(
      this,
      JSON.stringify(key),
      value
    );
  }

  get(key) {
    return Map.prototype.get.call(
      this,
      JSON.stringify(key)
    );
  }

  delete(key) {
    return Map.prototype.delete.call(this, JSON.stringify(key));
  }

  has(key) {
    return Map.prototype.has.call(
      this,
      JSON.stringify(key)
    );
  }

  *keys() {
    for (const jsonKey of Map.prototype.keys.call(this)) {
      yield JSON.parse(jsonKey);
    }
  }

  *entries() {
    for (const [jsonKey, value] of Map.prototype.entries.call(this)) {
      yield [JSON.parse(jsonKey), value];
    }
  }

  *[Symbol.iterator]() {
    for (const [key, value] of Map.prototype[Symbol.iterator].call(this)) {
      const parsed = JSON.parse(key);
      yield [parsed, value];
    }
  }
}

module.exports = EqualMap;
