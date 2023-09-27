"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const GlobalFileClass = global.File;
class FileMock {
    constructor(size, name) {
        this.size = size;
        this.name = name;
        this._metadata = Math.random();
    }
}
describe('Utils.isEqual', () => {
    beforeAll(() => {
        global.File = FileMock;
    });
    it('Should return false if comparands have different types', () => {
        expect((0, utils_1.isEqual)({}, '')).toBeFalsy();
    });
    it('Should return true if comparands are files and have same size and name', () => {
        expect((0, utils_1.isEqual)(new FileMock(100, 'file'), new FileMock(100, 'file'))).toBeTruthy();
    });
    it('Shouldn`t return true if comparands are files and have same size and name', () => {
        expect((0, utils_1.isEqual)(new FileMock(100, 'file'), new FileMock(200, 'file'))).toBeFalsy();
    });
    afterAll(() => {
        global.File = GlobalFileClass;
    });
});
//# sourceMappingURL=utils-test.js.map