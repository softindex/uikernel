"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
const INVALID_DATE = 'Invalid Date';
function baseValidator(notNull, min, max, error = 'Invalid date', value) {
    if ((0, isNil_1.default)(value)) {
        if (notNull) {
            return error;
        }
        return;
    }
    const date = toDate(value);
    if (!date) {
        return error;
    }
    const [minDate, maxDate] = [toDate(min), toDate(max)];
    if (minDate && minDate > date) {
        return error;
    }
    if (maxDate && maxDate < date) {
        return error;
    }
    return;
}
const validator = (min, max, error) => baseValidator.bind(null, false, min, max, error);
validator.notNull = (min, max, error) => baseValidator.bind(null, true, min, max, error);
function toDate(value) {
    const typeOfValue = typeof value;
    if (typeOfValue !== 'number' && typeOfValue !== 'string' && !(value instanceof Date)) {
        return null;
    }
    const date = new Date(value);
    if (date.toString() === INVALID_DATE) {
        return null;
    }
    if (typeof value === 'string') {
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    }
    return date;
}
exports.default = validator;
//# sourceMappingURL=date.js.map