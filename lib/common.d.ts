import ArgumentsError from './common/error/ArgumentsError';
import ThrottleError from './common/error/ThrottleError';
import Events from './common/EventsModel';
import './common/setImmediate';
import Checkbox from './editors/Checkbox';
import DatePicker from './editors/DatePicker';
import Number from './editors/Number';
import Select from './editors/Select';
import SuggestBox from './editors/SuggestBox';
import AbstractFormModel from './form/AbstractFormModel';
import ToFormCreate from './form/adapters/GridToFormCreate';
import ToFormUpdate from './form/adapters/GridToFormUpdate';
import connectForm from './form/connectForm';
import FormModel from './form/FormModel';
import FormService from './form/FormService';
import FormXhrModel from './form/FormXhrModel';
import * as FormMixin from './form/mixin';
import useForm from './form/useForm';
import Component from './grid/Component';
import AbstractGridModel from './grid/models/AbstractGridModel';
import applyGridFilters from './grid/models/applyGridFilters';
import GridCollectionModel from './grid/models/GridCollectionModel';
import GridXhrModel from './grid/models/GridXhrModel';
import PureGridComponent from './grid/PureGridComponent';
import AbstractListModel from './list/AbstractListModel';
import ListXhrModel from './list/ListXhrModel';
import notEmptyValidationRule from './validation/rules/notEmpty';
import notNullValidationRule from './validation/rules/notNull';
import ValidationErrors from './validation/ValidationErrors';
import Validator from './validation/Validator';
declare const UIKernel: {
    applyGridFilters: typeof applyGridFilters;
    Grid: typeof Component;
    PureGrid: typeof PureGridComponent;
    Form: typeof FormService;
    connectForm: typeof connectForm;
    createValidator: typeof Validator.create;
    Validator: typeof Validator;
    ValidationErrors: typeof ValidationErrors;
    Models: {
        Grid: {
            Xhr: typeof GridXhrModel;
            Collection: typeof GridCollectionModel;
        };
        Events: typeof Events;
        Form: typeof FormModel;
        FormXhr: typeof FormXhrModel;
        List: {
            Xhr: typeof ListXhrModel;
        };
    };
    AbstractModels: {
        Form: typeof AbstractFormModel;
        Grid: typeof AbstractGridModel;
        List: typeof AbstractListModel;
    };
    Adapters: {
        Grid: {
            ToFormUpdate: typeof ToFormUpdate;
            ToFormCreate: typeof ToFormCreate;
        };
    };
    Editors: {
        Select: typeof Select;
        SuggestBox: typeof SuggestBox;
        DatePicker: typeof DatePicker;
        Checkbox: typeof Checkbox;
        Number: typeof Number;
    };
    ArgumentsError: typeof ArgumentsError;
    ThrottleError: typeof ThrottleError;
    Validators: {
        boolean: import("./validation/rules/boolean").BooleanValidation;
        date: import("./validation/rules/date").DateValidation;
        enum: import("./validation/rules/enum").EnumValidation;
        set: import("./validation/rules/set").SetValidation;
        float: import("./validation/rules/float").FloatValidation;
        regExp: import("./validation/rules/regExp").RegExpValidation;
        notNull: typeof notNullValidationRule;
        number: import("./validation/rules/integer").IntegerValidation;
        integer: import("./validation/rules/integer").IntegerValidation;
        notEmpty: typeof notEmptyValidationRule;
    };
    Mixins: {
        Form: typeof FormMixin;
    };
    useForm: typeof useForm;
    _get: import("./common/variables").VariableGetter;
    _set: import("./common/variables").VariableSetter;
};
export default UIKernel;
