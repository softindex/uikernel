"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMockedMethod_1 = __importDefault(require("./createMockedMethod"));
function createMockInstance(Schema) {
    function Instance() { }
    const schemaPrototype = Schema.prototype;
    Instance.prototype = Object.create(schemaPrototype);
    const mockSource = {};
    return new Proxy(Reflect.construct(Instance, []), {
        get(target, property) {
            if (typeof target[property] !== 'function') {
                return target[property];
            }
            if (!(property in mockSource)) {
                mockSource[property] = (0, createMockedMethod_1.default)(schemaPrototype.constructor.name, property.toString());
            }
            return mockSource[property];
        },
        set(target, property, value) {
            target[property] = value;
            mockSource[property] = value;
            return true;
        }
    });
}
exports.default = createMockInstance;
//# sourceMappingURL=createMockInstance.js.map