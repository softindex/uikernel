"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
function baseValidator(notNull, error = 'Not boolean', value) {
    if ((0, isNil_1.default)(value)) {
        if (notNull) {
            return error;
        }
        return;
    }
    if (typeof value !== 'boolean') {
        return error;
    }
    return;
}
const validator = (error) => baseValidator.bind(null, false, error);
validator.notNull = (error) => baseValidator.bind(null, true, error);
exports.default = validator;
//# sourceMappingURL=boolean.js.map