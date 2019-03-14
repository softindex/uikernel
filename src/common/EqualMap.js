class EqualMap extends Map {
  constructor(iterable) {
    super(iterable);
  }

  set(key, value) {
    Map.prototype.set.call(
      this,
      typeof key === 'object' ? JSON.stringify(key) : key,
      value
    );
  }

  get(key) {
    return Map.prototype.get.call(
      this,
      typeof key === 'object' ? JSON.stringify(key) : key
    );
  }

  delete(key) {
    return Map.prototype.delete.call(this, typeof key === 'object' ? JSON.stringify(key) : key);
  }

  has(key) {
    return Map.prototype.has.call(
      this,
      typeof key === 'object' ? JSON.stringify(key) : key
    );
  }

  stringifiedKeys() {
    return Map.prototype.keys.call(this);
  }

  keys() {
    const keys = Map.prototype.keys.call(this);
    return [...keys].reduce((accum, elem) => {
      const parsed = JSON.parse(elem);
      return typeof parsed === 'object' ? [...accum, parsed] : [...accum, elem];
    }, []);
  }

  entries() {
    const entries = Map.prototype.entries.call(this);
    return [...entries].reduce((accum, elem) => {
      const parsedKey = JSON.parse(elem[0]);
      return typeof parsedKey === 'object' ? [...accum, [parsedKey, elem[1]]] : [...accum, elem];
    }, []);
  }

  *[Symbol.iterator]() {
    for (const [key, value] of Map.prototype[Symbol.iterator].call(this)) {
      const parsed = JSON.parse(key);
      yield [typeof parsed === 'object' ? parsed : key, value];
    }
  }
}

module.exports = EqualMap;
