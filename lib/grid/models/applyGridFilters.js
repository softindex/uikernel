"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorate_1 = __importDefault(require("../../common/decorate"));
function applyGridFilters(model, filters) {
    return (0, decorate_1.default)(model, {
        async read(options) {
            options.filters = {
                ...filters,
                ...options.filters
            };
            return await model.read(options);
        }
    });
}
exports.default = applyGridFilters;
//# sourceMappingURL=applyGridFilters.js.map