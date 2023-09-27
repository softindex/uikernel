"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notNull_1 = __importDefault(require("../notNull"));
describe('notNull validator', () => {
    const validator = (0, notNull_1.default)('test');
    it('"1" should be valid', () => {
        expect(validator('1')).toBeUndefined();
    });
    it('"" should not be valid', () => {
        expect(validator('')).toBeDefined();
    });
    it('\\r\\n\\t should be valid', () => {
        expect(validator('\r\n\t')).toBeUndefined();
    });
    it('" " should be valid', () => {
        expect(validator(' ')).toBeUndefined();
    });
    it('NaN should not be valid', () => {
        expect(validator(NaN)).toBeDefined();
    });
    it('null should not be valid', () => {
        expect(validator(null)).toBeDefined();
    });
    it('undefined should not be valid', () => {
        expect(validator(undefined)).toBeDefined();
    });
    it('0 should be valid', () => {
        expect(validator(0)).toBeUndefined();
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
    it('{} should be valid', () => {
        expect(validator({})).toBeUndefined();
    });
    it('[] should be valid', () => {
        expect(validator([])).toBeUndefined();
    });
    it('Infinity should not be valid', () => {
        expect(validator(Infinity)).toBeDefined();
    });
    it('"1a" should be valid', () => {
        expect(validator('ab')).toBeUndefined();
    });
    it('"1ab" should be valid', () => {
        expect(validator('abc')).toBeUndefined();
    });
});
describe('Error message is not defined', () => {
    const validator = (0, notNull_1.default)();
    it('Should be return default message', () => {
        expect(validator(NaN)).toBe('Can not be empty');
    });
});
//# sourceMappingURL=notNull-test.js.map