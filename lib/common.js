"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArgumentsError_1 = __importDefault(require("./common/error/ArgumentsError"));
const ThrottleError_1 = __importDefault(require("./common/error/ThrottleError"));
const EventsModel_1 = __importDefault(require("./common/EventsModel"));
require("./common/setImmediate");
const variables_1 = __importDefault(require("./common/variables"));
const Checkbox_1 = __importDefault(require("./editors/Checkbox"));
const DatePicker_1 = __importDefault(require("./editors/DatePicker"));
const Number_1 = __importDefault(require("./editors/Number"));
const Select_1 = __importDefault(require("./editors/Select"));
const SuggestBox_1 = __importDefault(require("./editors/SuggestBox"));
const AbstractFormModel_1 = __importDefault(require("./form/AbstractFormModel"));
const GridToFormCreate_1 = __importDefault(require("./form/adapters/GridToFormCreate"));
const GridToFormUpdate_1 = __importDefault(require("./form/adapters/GridToFormUpdate"));
const connectForm_1 = __importDefault(require("./form/connectForm"));
const FormModel_1 = __importDefault(require("./form/FormModel"));
const FormService_1 = __importDefault(require("./form/FormService"));
const FormXhrModel_1 = __importDefault(require("./form/FormXhrModel"));
const FormMixin = __importStar(require("./form/mixin"));
const useForm_1 = __importDefault(require("./form/useForm"));
const Component_1 = __importDefault(require("./grid/Component"));
const AbstractGridModel_1 = __importDefault(require("./grid/models/AbstractGridModel"));
const applyGridFilters_1 = __importDefault(require("./grid/models/applyGridFilters"));
const GridCollectionModel_1 = __importDefault(require("./grid/models/GridCollectionModel"));
const GridXhrModel_1 = __importDefault(require("./grid/models/GridXhrModel"));
const PureGridComponent_1 = __importDefault(require("./grid/PureGridComponent"));
const AbstractListModel_1 = __importDefault(require("./list/AbstractListModel"));
const ListXhrModel_1 = __importDefault(require("./list/ListXhrModel"));
const DeprecatedValidator_1 = __importDefault(require("./validation/DeprecatedValidator"));
const boolean_1 = __importDefault(require("./validation/rules/boolean"));
const date_1 = __importDefault(require("./validation/rules/date"));
const enum_1 = __importDefault(require("./validation/rules/enum"));
const float_1 = __importDefault(require("./validation/rules/float"));
const integer_1 = __importDefault(require("./validation/rules/integer"));
const notEmpty_1 = __importDefault(require("./validation/rules/notEmpty"));
const notNull_1 = __importDefault(require("./validation/rules/notNull"));
const regExp_1 = __importDefault(require("./validation/rules/regExp"));
const set_1 = __importDefault(require("./validation/rules/set"));
const ValidationErrors_1 = __importDefault(require("./validation/ValidationErrors"));
const ValidatorBuilder_1 = __importDefault(require("./validation/ValidatorBuilder"));
const UIKernel = {
    applyGridFilters: applyGridFilters_1.default,
    Grid: Component_1.default,
    PureGrid: PureGridComponent_1.default,
    Form: FormService_1.default,
    connectForm: connectForm_1.default,
    createValidator: DeprecatedValidator_1.default.create,
    ValidatorBuilder: ValidatorBuilder_1.default,
    ValidationErrors: ValidationErrors_1.default,
    Models: {
        Grid: {
            Xhr: GridXhrModel_1.default,
            Collection: GridCollectionModel_1.default
        },
        Events: EventsModel_1.default,
        Form: FormModel_1.default,
        FormXhr: FormXhrModel_1.default,
        List: {
            Xhr: ListXhrModel_1.default
        }
    },
    AbstractModels: {
        Form: AbstractFormModel_1.default,
        Grid: AbstractGridModel_1.default,
        List: AbstractListModel_1.default
    },
    Adapters: {
        Grid: {
            ToFormUpdate: GridToFormUpdate_1.default,
            ToFormCreate: GridToFormCreate_1.default
        }
    },
    Editors: {
        Select: Select_1.default,
        SuggestBox: SuggestBox_1.default,
        DatePicker: DatePicker_1.default,
        Checkbox: Checkbox_1.default,
        Number: Number_1.default
    },
    ArgumentsError: ArgumentsError_1.default,
    ThrottleError: ThrottleError_1.default,
    Validators: {
        boolean: boolean_1.default,
        date: date_1.default,
        enum: enum_1.default,
        set: set_1.default,
        float: float_1.default,
        regExp: regExp_1.default,
        notNull: notNull_1.default,
        number: integer_1.default,
        integer: integer_1.default,
        notEmpty: notEmpty_1.default
    },
    Mixins: {
        Form: FormMixin
    },
    useForm: useForm_1.default,
    _get: variables_1.default.get,
    _set: variables_1.default.set
};
exports.default = UIKernel;
//# sourceMappingURL=common.js.map