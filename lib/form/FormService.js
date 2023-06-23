"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ThrottleError_1 = __importDefault(require("../common/error/ThrottleError"));
const EventsModel_1 = __importDefault(require("../common/EventsModel"));
const throttle_1 = __importDefault(require("../common/throttle"));
const utils_1 = require("../common/utils");
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
const ValidatorBuilder_1 = __importDefault(require("../validation/ValidatorBuilder"));
class FormService {
    constructor(fields = []) {
        this.validating = false;
        this.submitting = false;
        this.eventEmitter = new EventsModel_1.default();
        this.errors = new ValidationErrors_1.default();
        this.warnings = new ValidationErrors_1.default();
        this.hiddenValidationFields = [];
        this.changes = {};
        this.partialErrorChecking = false;
        this.partialErrorCheckingDefault = false;
        this.submitAll = false;
        this.initalizedState = {
            initialized: false,
            data: undefined,
            model: null,
            warningsValidator: null
        };
        this.updateField = async (field, value, validate = false) => {
            const changes = {};
            changes[field] = (0, utils_1.parseValueFromEvent)(value);
            await this.set(changes, validate);
        };
        this.clearValidation = (fields) => {
            if (!this.initalizedState.initialized) {
                return;
            }
            if (Array.isArray(fields)) {
                this.hiddenValidationFields.push(...fields);
            }
            else {
                this.hiddenValidationFields.push(fields);
            }
            this.setState();
        };
        this.clearError = (field) => {
            (0, utils_1.warn)('Deprecated: FormService method "clearError" renamed to "clearValidation"');
            this.clearValidation(field);
        };
        this.validateField = async (field, value) => {
            console.warn('Deprecated: Use "updateField" method with "validate" param instead of "validateField" method');
            await this.updateField(field, value, true);
        };
        this.clearChanges = () => {
            if (!this.initalizedState.initialized) {
                return;
            }
            this.errors.clear();
            this.warnings.clear();
            this.changes = {};
            this.partialErrorChecking = this.partialErrorCheckingDefault;
            this.setState();
        };
        this.validateForm = async () => {
            try {
                return await this.throttledValidateForm();
            }
            catch (error) {
                if (!(error instanceof ThrottleError_1.default)) {
                    throw error;
                }
            }
            return undefined;
        };
        this.throttledValidateForm = async () => {
            if (!this.initalizedState.initialized) {
                return;
            }
            const countOfHiddenValidationFieldsToRemove = this.hiddenValidationFields.length;
            this.validating = true;
            let result;
            try {
                result = await Promise.all([
                    this.runValidator(this.initalizedState.model, this.getChanges, 'errors'),
                    this.runValidator(this.initalizedState.warningsValidator, this.getData, 'warnings')
                ]);
            }
            finally {
                if (!result || (result[0] && result[1])) {
                    this.validating = false;
                    this.hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);
                    this.setState();
                }
            }
            const displayedErrors = this.getDisplayedErrors(this.errors);
            const displayedWarning = this.getDisplayedErrors(this.warnings);
            return {
                errors: !displayedErrors.isEmpty() ? displayedErrors : null,
                warnings: !displayedWarning.isEmpty() ? displayedWarning : null
            };
        };
        this.onModelChange = (changes) => {
            this.initalizedState.data = { ...this.initalizedState.data, ...changes };
            this.setState();
        };
        this.getData = () => {
            return { ...this.initalizedState.data, ...this.changes };
        };
        this.getChanges = () => {
            if (this.submitAll) {
                return this.getData();
            }
            return this.changes;
        };
        this.fields = fields;
        this.throttledValidateForm = (0, throttle_1.default)(this.throttledValidateForm);
    }
    async init({ fields, model, data, changes = {}, warningsValidator = ValidatorBuilder_1.default.createEmptyValidator(), partialErrorChecking = false, submitAll = false }) {
        this.changes = changes;
        this.hiddenValidationFields = [];
        this.partialErrorCheckingDefault = this.partialErrorChecking = partialErrorChecking;
        this.submitAll = submitAll;
        this.validating = false;
        this.submitting = false;
        this.initalizedState.data = data;
        this.initalizedState.model = model;
        this.initalizedState.warningsValidator = warningsValidator;
        this.initalizedState.initialized = true;
        if (fields) {
            this.fields = fields;
        }
        if (!this.initalizedState.data) {
            this.initalizedState.data = (await this.initalizedState.model.getData([
                ...this.fields
            ]));
        }
        this.initalizedState.model.on('update', this.onModelChange);
        this.setState();
        if (!this.partialErrorChecking) {
            await this.validateForm();
        }
    }
    getAll() {
        var _a;
        if (!this.isLoaded()) {
            return this.getEmptyState();
        }
        const data = this.getData();
        const changes = this.getChangesFields();
        const errors = this.getDisplayedErrors(this.errors);
        const warnings = this.getDisplayedErrors(this.warnings);
        return {
            isLoaded: true,
            data,
            originalData: (_a = this.initalizedState.data) !== null && _a !== void 0 ? _a : {},
            changes,
            errors,
            warnings,
            fields: this.getFields(data, changes, errors, warnings),
            isSubmitting: this.submitting
        };
    }
    addChangeListener(func) {
        this.eventEmitter.on('update', func);
    }
    removeChangeListener(func) {
        this.eventEmitter.off('update', func);
        if (this.eventEmitter.listenerCount('update') === 0 && this.initalizedState.initialized) {
            this.initalizedState.model.off('update', this.onModelChange);
        }
    }
    removeAllListeners() {
        var _a;
        this.eventEmitter.removeAllListeners('update');
        (_a = this.initalizedState.model) === null || _a === void 0 ? void 0 : _a.off('update', this.onModelChange);
    }
    async set(data, validate = false) {
        if (!this.isLoaded() || !this.initalizedState.initialized) {
            return;
        }
        this.changes = (0, utils_1.getRecordChanges)(this.initalizedState.model.getValidationDependency.bind(this.initalizedState.model), this.initalizedState.data, this.changes, data);
        const changedFields = (0, utils_1.keys)(data);
        const validationDependencies = this.initalizedState.model.getValidationDependency(changedFields);
        this.clearValidation(changedFields.concat(validationDependencies));
        if (validate) {
            try {
                await this.validateForm();
            }
            catch (error) {
                if (!(error instanceof ThrottleError_1.default)) {
                    throw error;
                }
            }
        }
    }
    async submitData(data) {
        if (!this.initalizedState.initialized) {
            return;
        }
        await this.set(data);
        return await this.submit();
    }
    async submit() {
        if (!this.initalizedState.initialized || this.submitting) {
            return;
        }
        const changes = this.getChanges();
        this.submitting = true;
        this.partialErrorChecking = false;
        const countOfHiddenValidationFieldsToRemove = this.hiddenValidationFields.length;
        this.setState();
        let data;
        let validationErrors;
        try {
            data = await this.initalizedState.model.submit(changes);
        }
        catch (error) {
            if (!(error instanceof ValidationErrors_1.default)) {
                this.submitting = false;
                this.setState();
                throw error;
            }
            validationErrors = error;
        }
        this.submitting = false;
        const newChanges = this.getChanges();
        const actualChanges = (0, utils_1.isEqual)(changes, newChanges);
        if (actualChanges) {
            if (validationErrors) {
                this.errors = validationErrors;
            }
            else {
                this.errors = new ValidationErrors_1.default();
                this.changes = {};
            }
        }
        this.hiddenValidationFields.splice(0, countOfHiddenValidationFieldsToRemove);
        this.setState();
        if (validationErrors) {
            throw validationErrors;
        }
        return data;
    }
    clearFieldChanges(field) {
        if (!this.initalizedState.initialized) {
            return;
        }
        this.errors.clearField(field);
        this.warnings.clearField(field);
        delete this.changes[field];
        this.setState();
    }
    setPartialErrorChecking(value) {
        this.partialErrorChecking = value;
        this.setState();
    }
    getPartialErrorChecking() {
        return this.partialErrorChecking;
    }
    getFields(data, changes, errors, warnings) {
        const proxy = new Proxy({}, {
            get(_target, fieldName) {
                return {
                    value: data[fieldName],
                    isChanged: changes.hasOwnProperty(fieldName),
                    errors: errors.getFieldErrors(fieldName),
                    warnings: warnings.getFieldErrors(fieldName)
                };
            }
        });
        for (const field of this.fields) {
            proxy[field] = proxy[field];
        }
        return proxy;
    }
    isLoaded() {
        return this.initalizedState.data !== undefined;
    }
    getChangesFields() {
        const changes = {};
        for (const field in this.changes) {
            if (!this.isDependentField(field)) {
                changes[field] = this.changes[field];
            }
        }
        return changes;
    }
    getDisplayedErrors(validationErrors) {
        var _a;
        const filteredErrors = validationErrors.clone();
        const data = (_a = this.initalizedState.data) !== null && _a !== void 0 ? _a : {};
        for (const field of validationErrors.getErrors().keys()) {
            const isFieldPristine = !this.changes.hasOwnProperty(field) || (0, utils_1.isEqual)(this.changes[field], data[field]);
            if (this.hiddenValidationFields.includes(field) || (this.partialErrorChecking && isFieldPristine)) {
                filteredErrors.clearField(field);
            }
        }
        return filteredErrors;
    }
    setState() {
        this.eventEmitter.trigger('update', this.getAll());
    }
    isDependentField(field) {
        var _a;
        return (this.changes.hasOwnProperty(field) && (0, utils_1.isEqual)(this.changes[field], (_a = this.initalizedState.data) === null || _a === void 0 ? void 0 : _a[field]));
    }
    async runValidator(validator, getData, output) {
        const data = getData();
        if ((0, utils_1.isEmpty)(data)) {
            this[output].clear();
            return true;
        }
        let validErrors;
        try {
            validErrors = await validator.isValidRecord(data);
        }
        catch (error) {
            this[output].clear();
            throw error;
        }
        if (!(0, utils_1.isEqual)(data, getData())) {
            return false;
        }
        this[output] = validErrors;
        return true;
    }
    getEmptyState() {
        const data = {};
        const changes = {};
        const errors = new ValidationErrors_1.default();
        const warnings = new ValidationErrors_1.default();
        const fields = this.getFields(data, changes, errors, warnings);
        return {
            fields,
            isLoaded: false,
            isSubmitting: false,
            originalData: {},
            data,
            changes,
            errors,
            warnings
        };
    }
}
exports.default = FormService;
//# sourceMappingURL=FormService.js.map