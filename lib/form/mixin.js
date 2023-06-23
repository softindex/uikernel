"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clone_1 = __importDefault(require("lodash/clone"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const callbackify_1 = __importDefault(require("../common/callbackify"));
const ThrottleError_1 = __importDefault(require("../common/error/ThrottleError"));
const throttle_1 = __importDefault(require("../common/throttle"));
const toPromise_1 = __importDefault(require("../common/toPromise"));
const utils_1 = require("../common/utils");
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
const ValidatorBuilder_1 = __importDefault(require("../validation/ValidatorBuilder"));
const FormMixin = {
    getInitialState: function () {
        const throttledValidateForm = (0, throttle_1.default)(this._validateForm);
        this._validateForm = () => {
            return throttledValidateForm().catch((error) => {
                if (!(error instanceof ThrottleError_1.default)) {
                    throw error;
                }
            });
        };
        if (this._handleModelChange.name.indexOf('bound ') !== 0) {
            this._handleModelChange = this._handleModelChange.bind(this);
            this._getData = this._getData.bind(this);
            this._getChanges = this._getChanges.bind(this);
            this.validateForm = this.validateForm.bind(this);
        }
        return {
            _formMixin: null
        };
    },
    componentWillMount: function () {
        this._isUnmounted = false;
    },
    componentWillUnmount: function () {
        this._isUnmounted = true;
        if (!this._isNotInitialized()) {
            this.state._formMixin.model.off('update', this._handleModelChange);
        }
    },
    initForm: (0, callbackify_1.default)(async function (settings) {
        this._initState(settings);
        if (!this.state._formMixin.data) {
            let data;
            let err;
            try {
                data = await settings.model.getData(settings.fields);
            }
            catch (e) {
                err = e;
            }
            if (this._isUnmounted) {
                return;
            }
            if (err) {
                this.state._formMixin.globalError = err;
                await (0, toPromise_1.default)(this.setState.bind(this), true)(this.state);
                throw err;
            }
            this.state._formMixin.data = data;
        }
        this.state._formMixin.model.on('update', this._handleModelChange);
        await (0, toPromise_1.default)(this.setState.bind(this), true)(this.state);
        if (!settings.partialErrorChecking) {
            await this.validateForm();
        }
    }, true),
    isLoaded: function () {
        var _a;
        return ((_a = this.state) === null || _a === void 0 ? void 0 : _a._formMixin) && Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
    },
    getChanges: function () {
        const changes = {};
        for (const field in this.state._formMixin.changes) {
            if (!this._isDependentField(field)) {
                changes[field] = this.state._formMixin.changes[field];
            }
        }
        return changes;
    },
    hasChanges: function (field) {
        if (this._isNotInitialized()) {
            return false;
        }
        const state = this.state._formMixin;
        if (field === undefined) {
            return !(0, utils_1.isEmpty)(state.changes);
        }
        if (!state.showDependentFields && this._isDependentField(field)) {
            return false;
        }
        return state.changes.hasOwnProperty(field);
    },
    hasError: function (field) {
        if (this._isNotInitialized()) {
            return false;
        }
        const state = this.state._formMixin;
        if (Array.isArray(field)) {
            for (const entry of field) {
                if (this.hasError(entry)) {
                    return true;
                }
            }
            return false;
        }
        if (state.partialErrorChecking) {
            if (!state.changes.hasOwnProperty(field) || (0, utils_1.isEqual)(state.changes[field], state.data[field])) {
                return false;
            }
        }
        return this.state._formMixin.errors.hasError(field) || this.state._formMixin.warnings.hasError(field);
    },
    clearError: function (field, cb) {
        if (this._isNotInitialized()) {
            return;
        }
        if (this.state._formMixin.validating) {
            this.state._formMixin.pendingClearErrors.push(field);
        }
        if (Array.isArray(field)) {
            field.forEach(function (oneField) {
                this.state._formMixin.errors.clearField(oneField);
                this.state._formMixin.warnings.clearField(oneField);
            }, this);
        }
        else {
            this.state._formMixin.errors.clearField(field);
            this.state._formMixin.warnings.clearField(field);
        }
        this.setState(this.state, typeof cb === 'function' ? cb : null);
    },
    clearValidation: function (field, cb) {
        this.clearError(field, cb);
    },
    getOriginalData: function () {
        if (this._isNotInitialized()) {
            return {};
        }
        return this.state._formMixin.data || null;
    },
    getData: function () {
        if (this._isNotInitialized()) {
            return {};
        }
        return (0, cloneDeep_1.default)(this._getData());
    },
    getValidationErrors: function () {
        if (this._isNotInitialized()) {
            return new ValidationErrors_1.default();
        }
        let field;
        let errors = ValidationErrors_1.default.merge(this.state._formMixin.errors, this.state._formMixin.warnings);
        if (this.state._formMixin.partialErrorChecking) {
            errors = this.state._formMixin.errors.clone();
            for (field in this.state._formMixin.data) {
                if (!this.state._formMixin.changes.hasOwnProperty(field) ||
                    (0, utils_1.isEqual)(this.state._formMixin.changes[field], this.state._formMixin.data[field])) {
                    errors.clearField(field);
                }
            }
        }
        return errors;
    },
    getFieldErrors: function (field) {
        if (this._isNotInitialized()) {
            return false;
        }
        if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
            return null;
        }
        const errors = this.state._formMixin.errors.getFieldErrors(field) || [];
        const warnings = this.state._formMixin.warnings.getFieldErrors(field) || [];
        return errors.concat(warnings);
    },
    getGlobalError: function () {
        if (this._isNotInitialized()) {
            return null;
        }
        return this.state._formMixin.globalError;
    },
    updateField: function (field, value) {
        if (this._isNotInitialized()) {
            return;
        }
        this.set({
            [field]: (0, utils_1.parseValueFromEvent)(value)
        });
    },
    validateField: function (field, value, cb) {
        this.set({
            [field]: (0, utils_1.parseValueFromEvent)(value)
        }, true, cb);
    },
    validateForm: function (cb) {
        const handler = typeof cb === 'function'
            ? cb
            : (error) => {
                if (error && !(error instanceof ValidationErrors_1.default)) {
                    console.error(error);
                }
            };
        this._validateForm()
            .then(() => handler(null))
            .catch(handler);
    },
    set: function (data, validate, cb) {
        if (!this.isLoaded()) {
            return;
        }
        let callback = cb;
        let needValidate = validate;
        if (typeof validate === 'function' && !cb) {
            callback = validate;
            needValidate = false;
        }
        const state = this.state._formMixin;
        state.changes = (0, utils_1.getRecordChanges)(state.model.getValidationDependency.bind(state.model), state.data, state.changes, data);
        const changedFields = Object.keys(data);
        const validationDependencies = this.state._formMixin.model.getValidationDependency(changedFields);
        for (const field of changedFields.concat(validationDependencies)) {
            this.state._formMixin.errors.clearField(field);
            this.state._formMixin.warnings.clearField(field);
        }
        if (this.state._formMixin.autoSubmit) {
            this.submit((err, result) => {
                this.state._formMixin.autoSubmitHandler(err, result);
                if (typeof callback === 'function') {
                    callback(err, result);
                }
            });
            return;
        }
        if (needValidate) {
            this.setState(this.state, () => this.validateForm(callback));
            return;
        }
        this.setState(this.state, typeof callback === 'function' ? callback : null);
    },
    submitData: function (data, cb) {
        if (this._isNotInitialized()) {
            return;
        }
        this.set(data);
        this.submit(cb);
    },
    submit: (0, callbackify_1.default)(async function () {
        if (this._isNotInitialized()) {
            return;
        }
        if (!this.state._formMixin.autoSubmit && this.isSubmitting()) {
            return;
        }
        this.state._formMixin.submitting = true;
        const changes = this._getChanges();
        this.state._formMixin.globalError = null;
        this.state._formMixin.partialErrorChecking = false;
        this.setState(this.state);
        let data;
        let err;
        try {
            data = await this.state._formMixin.model.submit(changes);
        }
        catch (e) {
            err = e;
        }
        if (this._isUnmounted) {
            return;
        }
        this.state._formMixin.submitting = false;
        const newChanges = this._getChanges();
        const actualChanges = (0, utils_1.isEqual)(changes, newChanges);
        const validationError = err instanceof ValidationErrors_1.default;
        if (validationError && err.isEmpty()) {
            err = null;
        }
        if (err) {
            if (validationError) {
                if (actualChanges) {
                    this.state._formMixin.errors = err;
                }
            }
            else {
                this.state._formMixin.globalError = err;
            }
        }
        else if (actualChanges) {
            this.state._formMixin.errors = new ValidationErrors_1.default();
            this.state._formMixin.changes = {};
        }
        else {
            (0, utils_1.forEach)(changes, (value, field) => {
                if ((0, utils_1.isEqual)(value, newChanges[field])) {
                    delete this.state._formMixin.changes[field];
                }
            });
        }
        await (0, toPromise_1.default)(this.setState.bind(this), true)(this.state);
        if (err) {
            throw err;
        }
        return data;
    }),
    clearFieldChanges: function (field, cb) {
        if (this._isNotInitialized()) {
            return;
        }
        this.state._formMixin.errors.clearField(field);
        this.state._formMixin.warnings.clearField(field);
        delete this.state._formMixin.changes[field];
        this.setState(this.state, typeof cb === 'function' ? cb : null);
    },
    clearChanges: function (cb) {
        if (this._isNotInitialized()) {
            return;
        }
        this.state._formMixin.errors.clear();
        this.state._formMixin.warnings.clear();
        this.state._formMixin.changes = {};
        this.state._formMixin.globalError = false;
        this.state._formMixin.partialErrorChecking = this.state._formMixin.partialErrorCheckingDefault;
        this.setState(this.state, typeof cb === 'function' ? cb : null);
    },
    setPartialErrorChecking: function (value, cb) {
        this.state._formMixin.partialErrorChecking = value;
        this.setState(this.state, typeof cb === 'function' ? cb : null);
    },
    isSubmitting: function () {
        if (this._isNotInitialized()) {
            return false;
        }
        return this.state._formMixin.submitting;
    },
    _handleModelChange: function (changes) {
        Object.assign(this.state._formMixin.data, (0, cloneDeep_1.default)(changes));
        if (!this._isUnmounted) {
            this.setState(this.state);
        }
    },
    _initState: function (settings) {
        if (!settings.model) {
            throw new Error('You must specify the model form in this.initForm()');
        }
        this.state._formMixin = {
            data: settings.data,
            changes: settings.changes || {},
            errors: new ValidationErrors_1.default(),
            warnings: new ValidationErrors_1.default(),
            globalError: null,
            validating: false,
            pendingClearErrors: [],
            submitting: false,
            showDependentFields: settings.showDependentFields || false,
            warningsValidator: settings.warningsValidator || ValidatorBuilder_1.default.createEmptyValidator(),
            partialErrorChecking: settings.partialErrorChecking,
            partialErrorCheckingDefault: settings.partialErrorChecking,
            model: settings.model,
            fields: settings.fields,
            submitAll: settings.submitAll,
            autoSubmit: settings.autoSubmit,
            autoSubmitHandler: settings.autoSubmitHandler
        };
    },
    _isNotInitialized: function () {
        var _a;
        return !((_a = this.state) === null || _a === void 0 ? void 0 : _a._formMixin);
    },
    _validateForm: function () {
        if (this._isNotInitialized()) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            let completed = 0;
            let completeError;
            const onComplete = (err) => {
                let field;
                if (this._isUnmounted) {
                    if (err) {
                        console.error(err);
                    }
                    return;
                }
                if (err) {
                    completeError = err;
                }
                if (++completed < 2) {
                    return;
                }
                this.state._formMixin.validating = false;
                while ((field = this.state._formMixin.pendingClearErrors.pop())) {
                    this.state._formMixin.warnings.clearField(field);
                    this.state._formMixin.errors.clearField(field);
                }
                this.setState(this.state, function () {
                    if (completeError) {
                        reject(completeError);
                        return;
                    }
                    const errorsWithPartialChecking = this.getValidationErrors();
                    if (errorsWithPartialChecking.isEmpty()) {
                        resolve();
                        return;
                    }
                    reject(errorsWithPartialChecking);
                });
            };
            this.state._formMixin.validating = true;
            this._runValidator(this.state._formMixin.model, this._getChanges, 'errors', onComplete);
            this._runValidator(this.state._formMixin.warningsValidator, this._getData, 'warnings', onComplete);
        });
    },
    _runValidator: function (validator, getData, output, cb) {
        const data = getData();
        validator
            .isValidRecord(data)
            .then((validErrors) => {
            if (!this._isUnmounted && (0, utils_1.isEqual)(data, getData())) {
                this.state._formMixin[output] = validErrors;
            }
            cb();
        })
            .catch((err) => {
            if (!this._isUnmounted && (0, utils_1.isEqual)(data, getData())) {
                this.state._formMixin[output].clear();
            }
            cb(err);
        });
    },
    _getData: function () {
        if (!this.state._formMixin.data) {
            return null;
        }
        return { ...this.state._formMixin.data, ...this.state._formMixin.changes };
    },
    _getChanges: function () {
        if (this.state._formMixin.submitAll) {
            return this._getData();
        }
        return (0, clone_1.default)(this.state._formMixin.changes);
    },
    _isDependentField: function (field) {
        const state = this.state._formMixin;
        return state.changes.hasOwnProperty(field) && (0, utils_1.isEqual)(state.changes[field], state.data[field]);
    }
};
module.exports = FormMixin;
//# sourceMappingURL=mixin.js.map