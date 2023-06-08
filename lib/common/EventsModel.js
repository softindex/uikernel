"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsModel {
    constructor() {
        this.subscribers = {};
    }
    on(eventName, cb) {
        const listeners = this.subscribers[eventName] || [];
        this.subscribers[eventName] = listeners;
        listeners.push(cb);
        return this;
    }
    off(eventName, cb) {
        const listeners = this.subscribers[eventName] || [];
        this.subscribers[eventName] = listeners.filter((listener) => listener !== cb);
        return this;
    }
    trigger(event, ...params) {
        for (const subscriber of this.subscribers[event] || []) {
            subscriber(...params);
        }
    }
    listenerCount(event) {
        var _a, _b;
        return (_b = (_a = this.subscribers[event]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    removeAllListeners(event) {
        this.subscribers[event] = [];
    }
}
exports.default = EventsModel;
//# sourceMappingURL=EventsModel.js.map