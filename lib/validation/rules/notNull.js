"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
const utils_1 = require("../../common/utils");
function noNull(error = 'Can not be empty') {
    return (value) => {
        if ((0, isNil_1.default)(value) || value === '' || (typeof value === 'number' && !(0, utils_1.isCorrectNumber)(value))) {
            return error;
        }
        return;
    };
}
exports.default = noNull;
//# sourceMappingURL=notNull.js.map