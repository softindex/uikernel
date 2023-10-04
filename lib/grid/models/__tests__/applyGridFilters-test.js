"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applyGridFilters_1 = __importDefault(require("../applyGridFilters"));
describe('applyGridFilters test', () => {
    let model;
    let newModel;
    let filters;
    beforeEach(() => {
        model = {
            read: jest.fn(async (arg) => arg)
        };
        filters = { search: '77' };
    });
    it('Should apply filters', async () => {
        newModel = (0, applyGridFilters_1.default)(model, filters);
        expect(await newModel.read({ filters: { test: 1 } })).toEqual({ filters: { ...filters, test: 1 } });
    });
    it('Should apply all filters from previous calls', async () => {
        newModel = (0, applyGridFilters_1.default)(model, filters);
        newModel = (0, applyGridFilters_1.default)(newModel, { a: 1, b: 2 });
        newModel = (0, applyGridFilters_1.default)(newModel, { a: null, b: 4 });
        newModel = (0, applyGridFilters_1.default)(newModel, { c: 3 });
        newModel = (0, applyGridFilters_1.default)(newModel, { c: 5 });
        expect(await newModel.read({})).toEqual({ filters: { a: null, b: 4, c: 5, search: '77' } });
    });
});
//# sourceMappingURL=applyGridFilters-test.js.map