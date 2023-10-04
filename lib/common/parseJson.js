"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentsError_1 = __importDefault(require("./error/ArgumentsError"));
function parseJson(json, errorMessage = 'Incorrect JSON') {
    try {
        return JSON.parse(json);
    }
    catch (err) {
        throw new ArgumentsError_1.default(errorMessage);
    }
}
exports.default = parseJson;
//# sourceMappingURL=parseJson.js.map