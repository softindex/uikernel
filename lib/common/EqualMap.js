"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EqualMap {
    constructor(entries) {
        this.map = new Map();
        if (entries) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    set(key, value) {
        this.map.set(JSON.stringify(key), value);
        return this;
    }
    get(key) {
        return this.map.get(JSON.stringify(key));
    }
    clear() {
        return this.map.clear();
    }
    get size() {
        return this.map.size;
    }
    get [Symbol.toStringTag]() {
        return this.map[Symbol.toStringTag];
    }
    delete(key) {
        return this.map.delete(JSON.stringify(key));
    }
    forEach(func, thisArg) {
        for (const [key, value] of this.entries()) {
            func.call(thisArg, value, key, this);
        }
    }
    has(key) {
        return this.map.has(JSON.stringify(key));
    }
    *keys() {
        for (const key of this.map.keys()) {
            const parsed = JSON.parse(key);
            yield parsed;
        }
    }
    *values() {
        for (const value of this.map.values()) {
            yield value;
        }
    }
    *entries() {
        for (const [key, value] of this.map.entries()) {
            const parsed = JSON.parse(key);
            yield [parsed, value];
        }
    }
    *[Symbol.iterator]() {
        for (const [key, value] of this.map[Symbol.iterator]()) {
            const parsed = JSON.parse(key);
            yield [parsed, value];
        }
    }
}
exports.default = EqualMap;
//# sourceMappingURL=EqualMap.js.map