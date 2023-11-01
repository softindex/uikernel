"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
var Direction;
(function (Direction) {
    Direction["Asc"] = "asc";
    Direction["Desc"] = "desc";
    Direction["Default"] = "default";
})(Direction || (Direction = {}));
const DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN = [Direction.Asc, Direction.Desc, Direction.Default];
describe('getNextSingleSorting', () => {
    [
        { from: Direction.Asc, to: Direction.Desc },
        { from: Direction.Desc, to: Direction.Default },
        { from: Direction.Default, to: Direction.Asc }
    ].forEach(({ from, to }) => {
        it(`Should change direction from "${from}" to "${to}"`, () => {
            const result = (0, utils_1.getNextSingleSorting)('a', { column: 'a', direction: from }, DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
            expect(result).toStrictEqual({ column: 'a', direction: to });
        });
    });
    it('Should change column from "a" to "b"', () => {
        const result = (0, utils_1.getNextSingleSorting)('b', { column: 'a', direction: Direction.Desc }, DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual({ column: 'b', direction: Direction.Asc });
    });
    it(`Should set sorting by "a" from unsorting rule`, () => {
        const result = (0, utils_1.getNextSingleSorting)('a', null, DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual({ column: 'a', direction: Direction.Asc });
    });
});
describe('getNextMultipleSorting', () => {
    it('Should change direction from "asc" to "desc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('a', [{ column: 'a', direction: Direction.Asc }], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([{ column: 'a', direction: Direction.Desc }]);
    });
    it('Should return empty sorting from "desc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('a', [{ column: 'a', direction: Direction.Desc }], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([]);
    });
    it('Should set "asc" direction from empty sorting', () => {
        const result = (0, utils_1.getNextMultipleSorting)('a', [], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([{ column: 'a', direction: Direction.Asc }]);
    });
    it('Should set "asc" direction from "default"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('a', [{ column: 'a', direction: Direction.Default }], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([{ column: 'a', direction: Direction.Asc }]);
    });
    it('Should move column "a" to end & reset direction for moved column', () => {
        const result = (0, utils_1.getNextMultipleSorting)('a', [
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Asc }
        ], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Asc },
            { column: 'a', direction: Direction.Asc }
        ]);
    });
    it('Should change only direction for last column from "asc" to "desc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('c', [
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Asc }
        ], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Desc }
        ]);
    });
    it('Should change only direction for last column from "default" to "asc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('c', [
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Default }
        ], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Asc }
        ]);
    });
    it('Should remove last column with direction "desc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('c', [
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Desc }
        ], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc }
        ]);
    });
    it('Should add new column to end with direction "asc"', () => {
        const result = (0, utils_1.getNextMultipleSorting)('c', [
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc }
        ], DEFAULT_SORT_CYCLE_FOR_NEXT_COLUMN);
        expect(result).toStrictEqual([
            { column: 'a', direction: Direction.Desc },
            { column: 'b', direction: Direction.Desc },
            { column: 'c', direction: Direction.Asc }
        ]);
    });
});
//# sourceMappingURL=utils-test.js.map