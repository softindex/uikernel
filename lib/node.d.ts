import FormExpressApi from './form/FormExpressApi';
import exportGridData from './grid/export/exportGridData';
import GridExpressApi from './grid/models/GridExpressApi';
import ListExpressApi from './list/ListExpressApi';
declare const UIKernel: {
    gridExpressApi: typeof GridExpressApi.create;
    listExpressApi: typeof ListExpressApi.create;
    formExpressApi: typeof FormExpressApi.create;
    exportGridData: typeof exportGridData;
    toJSON: import("./grid/export/exporters/toJSON").JsonExportRunner;
    toCSV: import("./grid/export/exporters/toCSV").CSVExportRunner;
    applyGridFilters: typeof import("./grid/models/applyGridFilters").default;
    Grid: typeof import("./grid/Component").default;
    PureGrid: typeof import("./grid/PureGridComponent").default;
    Form: typeof import("./form/FormService").default;
    connectForm: typeof import("./form/connectForm").default;
    createValidator: typeof import("./validation/Validator").default.create;
    Validator: typeof import("./validation/Validator").default;
    ValidationErrors: typeof import("./validation/ValidationErrors").default;
    Models: {
        Grid: {
            Xhr: typeof import("./grid/models/GridXhrModel").default;
            Collection: typeof import("./grid/models/GridCollectionModel").default;
        };
        Events: typeof import("./common/EventsModel").default;
        Form: typeof import("./form/FormModel").default;
        FormXhr: typeof import("./form/FormXhrModel").default;
        List: {
            Xhr: typeof import("./list/ListXhrModel").default;
        };
    };
    AbstractModels: {
        Form: typeof import("./form/AbstractFormModel").default;
        Grid: typeof import("./grid/models/AbstractGridModel").default;
        List: typeof import("./list/AbstractListModel").default;
    };
    Adapters: {
        Grid: {
            ToFormUpdate: typeof import("./form/adapters/GridToFormUpdate").default;
            ToFormCreate: typeof import("./form/adapters/GridToFormCreate").default;
        };
    };
    Editors: {
        Select: typeof import("./editors/Select").default;
        SuggestBox: typeof import("./editors/SuggestBox").default;
        DatePicker: typeof import("./editors/DatePicker").default;
        Checkbox: typeof import("./editors/Checkbox").default;
        Number: typeof import("./editors/Number").default;
    };
    ArgumentsError: typeof import("./common/error/ArgumentsError").default;
    ThrottleError: typeof import("./common/error/ThrottleError").default;
    Validators: {
        boolean: import("./validation/rules/boolean").BooleanValidation;
        date: import("./validation/rules/date").DateValidation;
        enum: import("./validation/rules/enum").EnumValidation;
        set: import("./validation/rules/set").SetValidation;
        float: import("./validation/rules/float").FloatValidation;
        regExp: import("./validation/rules/regExp").RegExpValidation;
        notNull: typeof import("./validation/rules/notNull").default;
        number: import("./validation/rules/integer").IntegerValidation;
        integer: import("./validation/rules/integer").IntegerValidation;
        notEmpty: typeof import("./validation/rules/notEmpty").default;
    };
    Mixins: {
        Form: typeof import("./form/mixin");
    };
    useForm: typeof import("./form/useForm").default;
    _get: import("./common/variables").VariableGetter;
    _set: import("./common/variables").VariableSetter;
};
export default UIKernel;
