"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("raf/polyfill");
require("@babel/polyfill");
const enzyme_1 = __importDefault(require("enzyme"));
const enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
enzyme_1.default.configure({
    adapter: new enzyme_adapter_react_16_1.default()
});
//# sourceMappingURL=setupTestFramework.js.map