"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ThrottleError extends Error {
    constructor(parentStack) {
        super();
        this.name = 'ThrottleError';
        this.message = 'Too many function call';
        this.stack = 'Error: ' + this.message + '\n' + (0, utils_1.getStack)(1);
        if (parentStack) {
            this.stack += '\n' + parentStack;
        }
    }
}
exports.default = ThrottleError;
//# sourceMappingURL=ThrottleError.js.map