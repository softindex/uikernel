"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationErrors {
    constructor() {
        this.fields = new Map();
    }
    static createFromJSON(jsonObject) {
        const validationErrors = new ValidationErrors();
        for (const key in jsonObject) {
            if (!Object.prototype.hasOwnProperty.call(jsonObject, key)) {
                continue;
            }
            const value = jsonObject[key];
            if (value) {
                value.forEach((errMessage) => validationErrors.add(key, errMessage));
            }
        }
        return validationErrors;
    }
    static createWithError(field, error) {
        const validationErrors = new ValidationErrors();
        validationErrors.add(field, error);
        return validationErrors;
    }
    static merge(validationErrors1, validationErrors2) {
        return ValidationErrors.createFromJSON({ ...validationErrors1.toJSON(), ...validationErrors2.toJSON() });
    }
    add(field, error) {
        var _a;
        const transformedError = this.formErrorValue(error);
        const fieldErrors = (_a = this.fields.get(field)) !== null && _a !== void 0 ? _a : [];
        if (!fieldErrors.includes(transformedError)) {
            fieldErrors.push(transformedError);
        }
        this.fields.set(field, fieldErrors);
        return this;
    }
    hasError(field) {
        return this.fields.has(field);
    }
    getFieldErrors(field) {
        var _a;
        return (_a = this.fields.get(field)) !== null && _a !== void 0 ? _a : [];
    }
    getFieldErrorMessages(field) {
        const fieldErrors = this.fields.get(field);
        if (fieldErrors) {
            return fieldErrors.map((error) => error.message);
        }
        return [];
    }
    getFailedFields() {
        return [...this.fields.keys()];
    }
    isEmpty() {
        return this.fields.size === 0;
    }
    clearField(field) {
        this.fields.delete(field);
        return this;
    }
    clear() {
        this.fields = new Map();
        return this;
    }
    toJSON() {
        const json = {};
        for (const [key, value] of this.fields) {
            json[key] = value;
        }
        return json;
    }
    clone() {
        return ValidationErrors.createFromJSON(this.toJSON());
    }
    merge(validationErrors) {
        var _a;
        for (const [field, newErrors] of validationErrors.getErrors()) {
            const errors = (_a = this.fields.get(field)) !== null && _a !== void 0 ? _a : [];
            errors.push(...newErrors);
            this.fields.set(field, errors);
        }
        return this;
    }
    getErrors() {
        return this.fields;
    }
    formErrorValue(error) {
        if (typeof error === 'string') {
            return {
                message: error
            };
        }
        if (!error.message) {
            throw new Error('Invalid error value. Error must be string or object with "message" property.');
        }
        return error;
    }
}
exports.default = ValidationErrors;
//# sourceMappingURL=ValidationErrors.js.map