"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestError extends Error {
    constructor(message, statusCode, cause, parentCallStack) {
        super(message);
        this.statusCode = statusCode;
        this.cause = cause;
        if (parentCallStack) {
            this.stack += '\n' + parentCallStack;
        }
    }
}
exports.default = RequestError;
//# sourceMappingURL=RequestError.js.map