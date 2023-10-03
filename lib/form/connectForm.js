"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormService_1 = __importDefault(require("./FormService"));
function connectForm(fields = []) {
    return (Component) => {
        class ComponentWithFormService extends react_1.default.Component {
            constructor(props) {
                super(props);
                this.form = new FormService_1.default(fields);
                this.onFormChange = (newFormState) => {
                    this.setState(newFormState);
                };
                this.state = this.form.getAll();
            }
            async componentDidMount() {
                const state = this.form.getAll();
                if (state.isLoaded) {
                    this.setState(state);
                }
                this.form.addChangeListener(this.onFormChange);
            }
            componentWillUnmount() {
                this.form.removeChangeListener(this.onFormChange);
            }
            render() {
                return react_1.default.createElement(Component, { ...this.props, formData: this.state, formService: this.form });
            }
        }
        return ComponentWithFormService;
    };
}
exports.default = connectForm;
//# sourceMappingURL=connectForm.js.map