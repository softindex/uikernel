"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = __importDefault(require("../rules/boolean"));
const date_1 = __importDefault(require("../rules/date"));
const enum_1 = __importDefault(require("../rules/enum"));
const float_1 = __importDefault(require("../rules/float"));
const integer_1 = __importDefault(require("../rules/integer"));
const notNull_1 = __importDefault(require("../rules/notNull"));
const regExp_1 = __importDefault(require("../rules/regExp"));
const set_1 = __importDefault(require("../rules/set"));
const ValidationErrors_1 = __importDefault(require("../ValidationErrors"));
const Validator_1 = __importDefault(require("../Validator"));
describe('ValidationError', () => {
    describe('Check "static createWithError" method', () => {
        it('Should create ValidationErrors instance with one error', () => {
            const validationError = ValidationErrors_1.default.createWithError('test', 'error');
            expect(validationError.toJSON()).toEqual({ test: [{ message: 'error' }] });
        });
    });
    it('add', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        validationError.add('test2', 'error2');
        expect(validationError.toJSON()).toEqual({ test: [{ message: 'error' }], test2: [{ message: 'error2' }] });
    });
    it('hasError', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.hasError('test')).toBeTruthy();
    });
    it('getFieldErrorMessages', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.getFieldErrorMessages('test')).toEqual(['error']);
    });
    it('getFailedFields', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.getFailedFields()).toEqual(['test']);
    });
    it('isEmpty', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.isEmpty()).not.toBeTruthy();
    });
    it('clearField', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.clearField('test').toJSON()).toEqual({});
    });
    it('clear', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.clear().toJSON()).toEqual({});
    });
    it('clone', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        expect(validationError.clone()).not.toBe(validationError);
        expect(validationError.clone().toJSON()).toEqual({ test: [{ message: 'error' }] });
    });
    it('merge', () => {
        const validationError = ValidationErrors_1.default.createFromJSON({ test: ['error'] });
        const errorToMerge = ValidationErrors_1.default.createFromJSON({ test2: [{ message: 'error2' }] });
        expect(validationError.merge(errorToMerge).toJSON()).toEqual({
            test: [{ message: 'error' }],
            test2: [{ message: 'error2' }]
        });
    });
});
describe('validators', () => {
    it('boolean', () => {
        const validator = (0, boolean_1.default)('err text');
        const validatorNotNull = boolean_1.default.notNull('err text');
        expect(validator(true)).toBeUndefined();
        expect(validator('rtrtr')).toBe('err text');
        expect(validatorNotNull(false)).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('date', () => {
        const validator = (0, date_1.default)(0, 500000, 'err text');
        const validatorNotNull = date_1.default.notNull(0, 500000, 'err text');
        expect(validator(245545)).toBeUndefined();
        expect(validator('1979-12-31T23:10:00.000Z')).toBe('err text');
        expect(validatorNotNull('1970-01-01T01:00:00.000Z')).toBe('err text');
        expect(validatorNotNull('1970-01-01T03:00:00.000Z')).toBeUndefined();
        expect(validatorNotNull(600000)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('enum', () => {
        const validator = (0, enum_1.default)(['a', 'b', 'c'], 'err text');
        const validatorNotNull = enum_1.default.notNull(['a', 'b', 'c'], 'err text');
        expect(validator('a')).toBeUndefined();
        expect(validator('rtrtr')).toBe('err text');
        expect(validatorNotNull('b')).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('float', () => {
        const validator = (0, float_1.default)(3, 10, 'err text');
        const validatorNotNull = float_1.default.notNull(3, 10, 'err text');
        expect(validator(4)).toBeUndefined();
        expect(validator('rtrtr')).toBe('err text');
        expect(validatorNotNull(7)).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('notNull', () => {
        const validator = (0, notNull_1.default)('err text');
        expect(validator(4)).toBeUndefined();
        expect(validator(null)).toBe('err text');
    });
    it('integer', () => {
        const validator = (0, integer_1.default)(3, 10, 'err text');
        const validatorNotNull = integer_1.default.notNull(3, 10, 'err text');
        expect(validator(4)).toBeUndefined();
        expect(validator('rtrtr')).toBe('err text');
        expect(validatorNotNull(7)).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('regExp', () => {
        const validator = (0, regExp_1.default)(/abc/, 'err text');
        const validatorNotNull = regExp_1.default.notNull(/abc/, 'err text');
        expect(validator('abcd')).toBeUndefined();
        expect(validator('rtrtr')).toBe('err text');
        expect(validatorNotNull('abcd')).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
    it('set', () => {
        const validator = (0, set_1.default)(['a', 'b', 'c'], 'err text');
        const validatorNotNull = set_1.default.notNull(['a', 'b', 'c'], 'err text');
        expect(validator(['a'])).toBeUndefined();
        expect(validator(['a', 'rtrtr'])).toBe('err text');
        expect(validatorNotNull(['b'])).toBeUndefined();
        expect(validatorNotNull(34)).toBe('err text');
        expect(validatorNotNull(undefined)).toBe('err text');
    });
});
describe('Validator', () => {
    const validatorBoolean = (0, boolean_1.default)('err text');
    let validator;
    beforeEach(() => {
        validator = new Validator_1.default();
    });
    it('field', async () => {
        validator.field('name', validatorBoolean);
        let result = await validator.isValidRecord({ name: true });
        expect(result.toJSON()).toEqual({});
        result = await validator.isValidRecord({ name: 6456 });
        expect(result.toJSON()).toEqual({ name: [{ message: 'err text' }] });
    });
});
//# sourceMappingURL=validation-test.js.map