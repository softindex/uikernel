"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
function baseValidator(notNull, variants, error = 'Not in variants', value) {
    if ((0, isNil_1.default)(value)) {
        if (notNull) {
            return error;
        }
        return;
    }
    if (!variants.includes(value)) {
        return error;
    }
    return;
}
const validator = (variants, error) => baseValidator.bind(null, false, variants, error);
validator.notNull = (variants, error) => baseValidator.bind(null, true, variants, error);
exports.default = validator;
//# sourceMappingURL=enum.js.map