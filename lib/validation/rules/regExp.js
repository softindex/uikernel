"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
function baseValidator(notNull, regExp, error = 'Invalid value', value) {
    if ((0, isNil_1.default)(value) || value === '') {
        if (notNull) {
            return error;
        }
        return;
    }
    if (typeof value !== 'string' || !regExp.test(value)) {
        return error;
    }
    return;
}
const validator = (regExp, error) => baseValidator.bind(null, false, regExp, error);
validator.notNull = (regExp, error) => baseValidator.bind(null, true, regExp, error);
exports.default = validator;
//# sourceMappingURL=regExp.js.map