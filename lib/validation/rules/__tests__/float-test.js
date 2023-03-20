"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const float_1 = __importDefault(require("../float"));
describe('Without range and can be empty', () => {
    const validator = (0, float_1.default)(null, null, 'test');
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
    it('null should be valid', () => {
        expect(validator(null)).toBeUndefined();
    });
    it('undefined should be valid', () => {
        expect(validator(undefined)).toBeUndefined();
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
    it('"1ab" should not be valid', () => {
        expect(validator('abc')).toBeDefined();
    });
});
describe('Without range and can not be empty', () => {
    const validator = float_1.default.notNull(null, null, 'test');
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
    it('"1ab" should not be valid', () => {
        expect(validator('abc')).toBeDefined();
    });
});
describe('With range [-1, 1] and can be empty', () => {
    const validator = (0, float_1.default)(-1, 1, 'test');
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
    it('null should be valid', () => {
        expect(validator(null)).toBeUndefined();
    });
    it('undefined should be valid', () => {
        expect(validator(undefined)).toBeUndefined();
    });
    it('0 should be valid', () => {
        expect(validator(0)).toBeUndefined();
    });
    it('1 should be valid', () => {
        expect(validator(1)).toBeUndefined();
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
    it('"1ab" should not be valid', () => {
        expect(validator('abc')).toBeDefined();
    });
});
describe('With range [-1, 1] and can not be empty', () => {
    const validator = float_1.default.notNull(-1, 1, 'test');
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
    it('0 should be valid', () => {
        expect(validator(0)).toBeUndefined();
    });
    it('1 should be valid', () => {
        expect(validator(1)).toBeUndefined();
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
    it('"1ab" should not be valid', () => {
        expect(validator('abc')).toBeDefined();
    });
});
describe('Error message is not defined', () => {
    const validator = (0, float_1.default)(null, null);
    it('Should be return default message', () => {
        expect(validator(NaN)).toBe('Invalid float');
    });
});
//# sourceMappingURL=float-test.js.map