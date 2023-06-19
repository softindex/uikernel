"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNonNullish = void 0;
const ArgumentsError_1 = __importDefault(require("./error/ArgumentsError"));
const assert = (value, message) => {
    if (!value) {
        throw new ArgumentsError_1.default(`Wrong value: "${String(value)}"\nMessage: ${message !== null && message !== void 0 ? message : 'Expect trusty value'}`);
    }
};
const assertNonNullish = (value, message) => {
    assert(value !== undefined && value !== null, message !== null && message !== void 0 ? message : `Unexpected value "${String(value)}"`);
};
exports.assertNonNullish = assertNonNullish;
exports.default = assert;
//# sourceMappingURL=assert.js.map