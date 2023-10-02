"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = __importDefault(require("../date"));
describe('Can be empty', () => {
    it('null should be valid', () => {
        expect((0, date_1.default)(null, null, 'test')(null)).toBeUndefined();
    });
    it('"" should be invalid', () => {
        expect((0, date_1.default)(null, null, 'test')('')).toBe('test');
    });
    it('Should not return error if date correct', () => {
        expect((0, date_1.default)(null, null, 'test')('2018-01-02')).toBeUndefined();
        expect((0, date_1.default)(null, null, 'test')(new Date('2018-01-02'))).toBeUndefined();
        expect((0, date_1.default)(null, null, 'test')(new Date())).toBeUndefined();
        expect((0, date_1.default)(null, null, 'test')(Date.now())).toBeUndefined();
    });
    it('Should return error if date incorrect', () => {
        expect((0, date_1.default)(null, null, 'error msg')('abc')).toBe('error msg');
        expect((0, date_1.default)(null, null, 'error msg')(true)).toBe('error msg');
        expect((0, date_1.default)(null, null, 'error msg')(false)).toBe('error msg');
        expect((0, date_1.default)(null, null, 'error msg')(function () { })).toBe('error msg');
        expect((0, date_1.default)(null, null, 'error msg')([])).toBe('error msg');
    });
    it('Should return error if date < minDate', () => {
        expect((0, date_1.default)('2018-01-10', null, 'test')('2018-01-02')).toBe('test');
    });
    it('Should not return error if date <= minDate', () => {
        expect((0, date_1.default)('2018-01-10', null, 'test')('2018-01-10')).toBeUndefined();
    });
    it('Should not return error if date > minDate', () => {
        expect((0, date_1.default)('2018-01-10', null, 'test')('2018-01-11')).toBeUndefined();
    });
    it('Should return error if date > maxDate', () => {
        expect((0, date_1.default)(null, '2018-01-02', 'test')('2018-01-10')).toBe('test');
    });
    it('Should not return error if date >= maxDate', () => {
        expect((0, date_1.default)(null, '2018-01-10', 'test')('2018-01-10')).toBeUndefined();
    });
    it('Should not return error if date < maxDate', () => {
        expect((0, date_1.default)(null, '2018-01-10', 'test')('2018-01-02')).toBeUndefined();
    });
    it('Should not return error if date < maxDate && date > minDate', () => {
        expect((0, date_1.default)('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toBeUndefined();
    });
});
describe('Can not be empty', () => {
    it('null should be invalid', () => {
        expect(date_1.default.notNull(null, null, 'test')(null)).toBe('test');
    });
    it('"" should be invalid', () => {
        expect(date_1.default.notNull(null, null, 'test')('')).toBe('test');
    });
    it('Should not return error if date correct', () => {
        expect(date_1.default.notNull(null, null, 'test')('2018-01-02')).toBeUndefined();
        expect(date_1.default.notNull(null, null, 'test')(new Date('2018-01-02'))).toBeUndefined();
        expect(date_1.default.notNull(null, null, 'test')(new Date())).toBeUndefined();
        expect(date_1.default.notNull(null, null, 'test')(Date.now())).toBeUndefined();
    });
    it('Should return error if date incorrect', () => {
        expect(date_1.default.notNull(null, null, 'test')('abc')).toBe('test');
    });
    it('Should return error if date < minDate', () => {
        expect(date_1.default.notNull('2018-01-10', null, 'test')('2018-01-02')).toBe('test');
    });
    it('Should not return error if date <= minDate', () => {
        expect(date_1.default.notNull('2018-01-10', null, 'test')('2018-01-10')).toBeUndefined();
    });
    it('Should not return error if date > minDate', () => {
        expect(date_1.default.notNull('2018-01-10', null, 'test')('2018-01-11')).toBeUndefined();
    });
    it('Should return error if date > maxDate', () => {
        expect(date_1.default.notNull(null, '2018-01-02', 'test')('2018-01-10')).toBe('test');
    });
    it('Should not return error if date >= maxDate', () => {
        expect(date_1.default.notNull(null, '2018-01-10', 'test')('2018-01-10')).toBeUndefined();
    });
    it('Should not return error if date < maxDate', () => {
        expect(date_1.default.notNull(null, '2018-01-10', 'test')('2018-01-02')).toBeUndefined();
    });
    it('Should not return error if date < maxDate && date > minDate', () => {
        expect(date_1.default.notNull('2018-01-10', '2018-01-20', 'test')('2018-01-15')).toBeUndefined();
    });
});
describe('Error message is not defined', () => {
    const validator = (0, date_1.default)(undefined, undefined);
    it('Should be return default message', () => {
        expect(validator('abc')).toBe('Invalid date');
    });
});
//# sourceMappingURL=date-test.js.map