"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class ArgumentsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ArgumentsError';
        this.status = this.statusCode = 422;
        this.stack = (0, utils_1.getStack)();
    }
}
exports.default = ArgumentsError;
//# sourceMappingURL=ArgumentsError.js.map