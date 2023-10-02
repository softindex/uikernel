"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regExp_1 = __importDefault(require("../regExp"));
describe('Can be empty', () => {
    const validator = (0, regExp_1.default)(/^.{3,}$/, 'test');
    it('"1" should not be valid', () => {
        expect(validator('1')).toBeDefined();
    });
    it('"" should be valid', () => {
        expect(validator('')).toBeUndefined();
    });
    it('\\r\\n\\t should not be valid', () => {
        expect(validator('\r\n\t')).toBeDefined();
    });
    it('" " should not be valid', () => {
        expect(validator(' ')).toBeDefined();
    });
    it('NaN should not be valid', () => {
        expect(validator(NaN)).toBeDefined();
    });
    it('null should be valid', () => {
        expect(validator(null)).toBeUndefined();
    });
    it('undefined should be valid', () => {
        expect(validator(undefined)).toBeUndefined();
    });
    it('0 should not be valid', () => {
        expect(validator(0)).toBeDefined();
    });
    it('1 should not be valid', () => {
        expect(validator(1)).toBeDefined();
    });
    it('-1 should not be valid', () => {
        expect(validator(-1)).toBeDefined();
    });
    it('1.123 should not be valid', () => {
        expect(validator(1.123)).toBeDefined();
    });
    it('-1.123 should not be valid', () => {
        expect(validator(-1.123)).toBeDefined();
    });
    it('{} should not be valid', () => {
        expect(validator({})).toBeDefined();
    });
    it('[] should not be valid', () => {
        expect(validator([])).toBeDefined();
    });
    it('Infinity should not be valid', () => {
        expect(validator(Infinity)).toBeDefined();
    });
    it('"1a" should not be valid', () => {
        expect(validator('ab')).toBeDefined();
    });
    it('"1ab" should be valid', () => {
        expect(validator('abc')).toBeUndefined();
    });
});
describe('Can not be empty', () => {
    const validator = regExp_1.default.notNull(/^.{3,}$/, 'test');
    it('"1" should not be valid', () => {
        expect(validator('1')).toBeDefined();
    });
    it('"" should not be valid', () => {
        expect(validator('')).toBeDefined();
    });
    it('\\r\\n\\t should not be valid', () => {
        expect(validator('\r\n\t')).toBeDefined();
    });
    it('" " should not be valid', () => {
        expect(validator(' ')).toBeDefined();
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
    it('0 should not be valid', () => {
        expect(validator(0)).toBeDefined();
    });
    it('1 should not be valid', () => {
        expect(validator(1)).toBeDefined();
    });
    it('-1 should not be valid', () => {
        expect(validator(-1)).toBeDefined();
    });
    it('1.123 should not be valid', () => {
        expect(validator(1.123)).toBeDefined();
    });
    it('-1.123 should not be valid', () => {
        expect(validator(-1.123)).toBeDefined();
    });
    it('{} should not be valid', () => {
        expect(validator({})).toBeDefined();
    });
    it('[] should not be valid', () => {
        expect(validator([])).toBeDefined();
    });
    it('Infinity should not be valid', () => {
        expect(validator(Infinity)).toBeDefined();
    });
    it('"1a" should not be valid', () => {
        expect(validator('ab')).toBeDefined();
    });
    it('"1ab" should be valid', () => {
        expect(validator('abc')).toBeUndefined();
    });
});
describe('Error message is not defined', () => {
    const validator = (0, regExp_1.default)(/./);
    it('Should be return default message', () => {
        expect(validator(NaN)).toBe('Invalid value');
    });
});
//# sourceMappingURL=regExp.js.map