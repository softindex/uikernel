"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importStar(require("../assert"));
describe('assert', () => {
    [false, null, undefined, 0, ''].forEach((value) => {
        it(`Should throw error on "${String(value)}"`, () => {
            let receivedError;
            try {
                (0, assert_1.default)(value);
            }
            catch (error) {
                receivedError = error;
            }
            expect(receivedError).toBeDefined();
        });
    });
    it(`Should skip "true"`, () => {
        expect((0, assert_1.default)(true)).toBeUndefined();
    });
    it(`Should skip "1"`, () => {
        expect((0, assert_1.default)(1)).toBeUndefined();
    });
    it(`Should skip "[]"`, () => {
        expect((0, assert_1.default)([])).toBeUndefined();
    });
    it(`Should skip "{}"`, () => {
        expect((0, assert_1.default)({})).toBeUndefined();
    });
});
describe('assertNonNullish', () => {
    it('Should skip strict value with single type, but not "undefined" or "null"', () => {
        const getNumber = () => 0;
        const getBoolean = () => false;
        const getObject = () => ({});
        const getArray = () => [];
        const getFunction = () => () => undefined;
        const getString = () => '';
        const result = [
            (0, assert_1.assertNonNullish)(getNumber()),
            (0, assert_1.assertNonNullish)(getBoolean()),
            (0, assert_1.assertNonNullish)(getObject()),
            (0, assert_1.assertNonNullish)(getArray()),
            (0, assert_1.assertNonNullish)(getFunction()),
            (0, assert_1.assertNonNullish)(Function.prototype),
            (0, assert_1.assertNonNullish)(getString())
        ];
        expect(result).toBeDefined();
    });
    it('Should throw error on "null"', () => {
        const getNull = () => null;
        const getUndefinedOrNull = () => null;
        let receivedError;
        try {
            (0, assert_1.assertNonNullish)(getNull());
            (0, assert_1.assertNonNullish)(getUndefinedOrNull());
        }
        catch (error) {
            receivedError = error;
        }
        expect(receivedError).toBeDefined();
    });
    it('Should throw error on "undefined"', () => {
        const getUndefined = () => undefined;
        let receivedError;
        try {
            (0, assert_1.assertNonNullish)(getUndefined());
        }
        catch (error) {
            receivedError = error;
        }
        expect(receivedError).toBeDefined();
    });
    it('Should skip not "null" or "undefined" value', () => {
        function testAssertNonNullishWithGenericObject(record) {
            (0, assert_1.assertNonNullish)(record);
        }
        testAssertNonNullishWithGenericObject({});
        const getNullOrNumber = () => 0;
        const getNullOrBoolean = () => false;
        const getNullOrObject = () => ({});
        const getNullOrArray = () => [];
        const getNullOrFunction = () => () => undefined;
        const getNullOrString = () => '';
        const getUndefinedOrNumber = () => 0;
        const getUndefinedOrBoolean = () => false;
        const getUndefinedOrObject = () => ({});
        const getUndefinedOrArray = () => [];
        const getUndefinedOrFunction = () => () => undefined;
        const getUndefinedOrString = () => '';
        const getNullOrUndefinedOrNumber = () => 1;
        const getNullOrUndefinedOrTrue = () => true;
        const getNullOrUndefinedOrFalse = () => false;
        const getNullOrUndefinedOrObject = () => ({});
        const getNullOrUndefinedOrArray = () => [];
        const getNullOrUndefinedOrFunc = () => () => undefined;
        const getNullOrUndefinedOrString = () => '';
        const result = [
            (0, assert_1.assertNonNullish)(getNullOrNumber()),
            (0, assert_1.assertNonNullish)(getNullOrBoolean()),
            (0, assert_1.assertNonNullish)(getNullOrObject()),
            (0, assert_1.assertNonNullish)(getNullOrArray()),
            (0, assert_1.assertNonNullish)(getNullOrFunction()),
            (0, assert_1.assertNonNullish)(getNullOrString()),
            (0, assert_1.assertNonNullish)(getUndefinedOrNumber()),
            (0, assert_1.assertNonNullish)(getUndefinedOrBoolean()),
            (0, assert_1.assertNonNullish)(getUndefinedOrObject()),
            (0, assert_1.assertNonNullish)(getUndefinedOrArray()),
            (0, assert_1.assertNonNullish)(getUndefinedOrFunction()),
            (0, assert_1.assertNonNullish)(getUndefinedOrString()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrNumber()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrTrue()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrFalse()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrObject()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrArray()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrFunc()),
            (0, assert_1.assertNonNullish)(getNullOrUndefinedOrString())
        ];
        expect(result).toBeDefined();
    });
});
//# sourceMappingURL=assert-test.js.map