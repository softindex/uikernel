"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createMockedMethod(className, methodName) {
    return jest.fn(() => {
        throw new Error(`"${className}.${methodName}" not implemented yet`);
    });
}
exports.default = createMockedMethod;
//# sourceMappingURL=createMockedMethod.js.map