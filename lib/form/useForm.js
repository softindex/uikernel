"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const FormService_1 = __importDefault(require("./FormService"));
function useForm(settings, onError = console.error) {
    const formService = (0, react_1.useMemo)(() => new FormService_1.default([]), []);
    const [formState, setFormState] = (0, react_1.useState)(() => formService.getAll());
    (0, react_1.useEffect)(() => {
        formService.init(settings).catch(onError);
        formService.addChangeListener(setFormState);
        return () => formService.removeChangeListener(setFormState);
    }, [formService]);
    return [formState, formService];
}
exports.default = useForm;
//# sourceMappingURL=useForm.js.map