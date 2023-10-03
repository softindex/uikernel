"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const assert_1 = require("../common/assert");
const utils_1 = require("../common/utils");
const float_1 = __importDefault(require("../validation/rules/float"));
const isInvalidFloat = (value) => Boolean((0, float_1.default)(null, null)(value));
class NumberEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.input = null;
        this.onChangeHandler = ({ target }) => {
            const valueAsNumber = parseFloat(target.value);
            if (target.value === '' && target.validity.valid) {
                this.state.value = null;
            }
            else if (isInvalidFloat(valueAsNumber)) {
                this.state.value = '';
            }
            else {
                this.state.value = valueAsNumber;
            }
            this.props.onChange(this.state.value);
        };
        this.state = {
            value: props.value
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a, _b;
        if (!(0, utils_1.isEqual)(this.state.value, nextProps.value)) {
            (0, assert_1.assertNonNullish)(this.input, 'input ref unavailable');
            this.state.value = nextProps.value;
            this.input.value = (_b = (_a = this.state.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
        }
    }
    render() {
        var _a;
        const { value, ...props } = this.props;
        return (react_1.default.createElement("input", { step: "any", ...props, type: "number", ref: (input) => {
                this.input = input;
            }, onChange: this.onChangeHandler, defaultValue: (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : '' }));
    }
}
exports.default = NumberEditor;
//# sourceMappingURL=Number.js.map