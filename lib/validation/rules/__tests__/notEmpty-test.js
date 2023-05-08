"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notEmpty_1 = __importDefault(require("../notEmpty"));
const ERROR_TEST = 'test invalid value';
describe('notEmpty validator', () => {
    const validator = (0, notEmpty_1.default)(ERROR_TEST);
    it('"1" should be valid', () => {
        expect(validator('1')).toBeUndefined();
    });
    it('"" should not be valid', () => {
        expect(validator('')).toEqual(ERROR_TEST);
    });
    it('\\r\\n\\t should not be valid', () => {
        expect(validator('\r\n\t')).toEqual(ERROR_TEST);
    });
    it('"  " should not be valid', () => {
        expect(validator(' ')).toEqual(ERROR_TEST);
    });
    it('NaN should not be valid', () => {
        expect(validator(NaN)).toEqual(ERROR_TEST);
    });
    it('null should not be valid', () => {
        expect(validator(null)).toEqual(ERROR_TEST);
    });
    it('undefined should not be valid', () => {
        expect(validator(undefined)).toEqual(ERROR_TEST);
    });
    it('0 should not be valid', () => {
        expect(validator(0)).toEqual(ERROR_TEST);
    });
    it('1 should be valid', () => {
        expect(validator(1)).toBeUndefined();
    });
    it('-1 should be valid', () => {
        expect(validator(-1)).toBeUndefined();
    });
    it('1.123 should be valid', () => {
        expect(validator(1.123)).toBeUndefined();
    });
    it('-1.123 should be valid', () => {
        expect(validator(-1.123)).toBeUndefined();
    });
    it('{} should not be valid', () => {
        expect(validator({})).toEqual(ERROR_TEST);
    });
    it('[] should not be valid', () => {
        expect(validator([])).toEqual(ERROR_TEST);
    });
    it('Infinity should not be valid', () => {
        expect(validator(Infinity)).toEqual(ERROR_TEST);
    });
    it('"1a" should be valid', () => {
        expect(validator('ab')).toBeUndefined();
    });
    it('"1ab" should be valid', () => {
        expect(validator('abc')).toBeUndefined();
    });
});
describe('Error message is not defined', () => {
    const validator = (0, notEmpty_1.default)();
    it('Should be return default message', () => {
        expect(validator(NaN)).toBe('Can not be empty');
    });
});
//# sourceMappingURL=notEmpty-test.js.map