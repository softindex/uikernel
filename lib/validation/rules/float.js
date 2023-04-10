"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
const utils_1 = require("../../common/utils");
function baseValidator(notNull, min, max, error = 'Invalid float', value) {
    if ((0, isNil_1.default)(value)) {
        if (notNull) {
            return error;
        }
        return;
    }
    if (typeof value !== 'number' ||
        !(0, utils_1.isCorrectNumber)(value) ||
        (typeof min === 'number' && value < min) ||
        (typeof max === 'number' && value > max)) {
        return error;
    }
    return;
}
const validator = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);
exports.default = validator;
//# sourceMappingURL=float.js.map