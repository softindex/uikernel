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
    Map.prototype.set.call(
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

  keys() {
    const keys = Map.prototype.keys.call(this);
    return [...keys].reduce((accum, elem) => {
      const parsed = JSON.parse(elem);
      return [...accum, parsed];
    }, []);
  }

  entries() {
    const entries = Map.prototype.entries.call(this);
    return [...entries].reduce((accum, elem) => {
      const parsedKey = JSON.parse(elem[0]);
      return [...accum, [parsedKey, elem[1]]];
    }, []);
  }

  *[Symbol.iterator]() {
    for (const [key, value] of Map.prototype[Symbol.iterator].call(this)) {
      const parsed = JSON.parse(key);
      yield [parsed, value];
    }
  }
}

module.exports = EqualMap;
