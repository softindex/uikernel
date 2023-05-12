"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const omit_1 = __importDefault(require("lodash/omit"));
const react_1 = __importDefault(require("react"));
const utils_1 = require("../common/utils");
const DEFAULT_PROPS = {
    options: []
};
class SelectEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleChange = ({ target }) => {
            const currentOption = this.getOptions()[Number(target.value)];
            const [value, label] = currentOption instanceof Array
                ? currentOption
                : [currentOption, currentOption];
            this.props.onChange(value);
            if (this.props.onLabelChange) {
                this.props.onLabelChange(label);
            }
        };
        this.state = {
            options: props.options,
            loading: Boolean(props.model)
        };
    }
    componentDidMount() {
        if (!this.props.model) {
            return;
        }
        this.props.model
            .read('')
            .then((data) => {
            this.setState({
                options: [[null, ''], ...data],
                loading: false
            });
        })
            .catch((err) => {
            console.error(err);
        });
    }
    getOptions() {
        return this.props.model ? this.state.options : this.props.options;
    }
    render() {
        const options = this.getOptions();
        const valueIndex = options.findIndex((option) => {
            return (0, utils_1.isEqual)(option instanceof Array ? option[0] : option, this.props.value);
        });
        return (react_1.default.createElement("select", { ...(0, omit_1.default)(this.props, ['value', 'options']), value: valueIndex, onChange: this.handleChange, disabled: this.props.disabled || this.state.loading }, options.map((item, index) => {
            const optionProps = item instanceof Array && item[2] instanceof Object ? item[2] : {};
            return (react_1.default.createElement("option", { key: index, value: index, ...optionProps }, item instanceof Array ? item[1] : item));
        })));
    }
}
SelectEditor.defaultProps = DEFAULT_PROPS;
exports.default = SelectEditor;
//# sourceMappingURL=Select.js.map