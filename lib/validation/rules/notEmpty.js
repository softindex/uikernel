"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
function notEmpty(error = 'Can not be empty') {
    return (value) => {
        if ((0, utils_1.isEmpty)(value) || (typeof value === 'number' && !(0, utils_1.isCorrectNumber)(value))) {
            return error;
        }
        return;
    };
}
exports.default = notEmpty;
//# sourceMappingURL=notEmpty.js.map