"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection = {};
const variables = {
    get: (key) => collection[key],
    set: (key, value) => {
        collection[key] = value;
    }
};
exports.default = variables;
//# sourceMappingURL=variables.js.map