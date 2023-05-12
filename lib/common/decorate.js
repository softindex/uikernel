"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Decorator(obj, decor) {
    Object.assign(this, decor);
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        const originalMethod = obj[key];
        if (typeof originalMethod === 'function' && !decor[key]) {
            Object.assign(this, { [key]: originalMethod.bind(obj) });
        }
    }
}
function decorate(obj, decor) {
    Decorator.prototype = obj;
    return new Decorator(obj, decor);
}
exports.default = decorate;
//# sourceMappingURL=decorate.js.map