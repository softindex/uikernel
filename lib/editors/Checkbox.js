"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Checkbox({ indeterminate, ...otherProps }) {
    return (react_1.default.createElement("input", { ...otherProps, type: "checkbox", ref: (input) => {
            if (input) {
                input.indeterminate = indeterminate;
            }
        } }));
}
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map