"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("lodash/map"));
const ArgumentsError_1 = __importDefault(require("../common/error/ArgumentsError"));
const utils_1 = require("../common/utils");
const ValidationErrors_1 = __importDefault(require("./ValidationErrors"));
class Validator {
    constructor() {
        this.settings = {
            validators: {},
            groupValidators: [],
            asyncValidators: {},
            asyncGroupValidators: [],
            asyncDependenies: []
        };
    }
    static create() {
        return new Validator();
    }
    field(field, ...validationFunctions) {
        const validators = this.settings.validators[field] || [];
        validators.concat(validationFunctions);
        this.settings.validators[field] = validators.concat(validationFunctions);
        return this;
    }
    fields(fields, groupValidationFunction) {
        this.settings.groupValidators.push({
            fields,
            fn: groupValidationFunction
        });
        return this;
    }
    asyncDependence(fields) {
        this.settings.asyncDependenies.push(fields);
        return this;
    }
    asyncField(field, validationFunction) {
        const asyncValidators = this.settings.asyncValidators[field] || [];
        asyncValidators.push(validationFunction);
        this.settings.asyncValidators[field] = asyncValidators;
        return this;
    }
    asyncFields(fields, groupValidationFunction) {
        this.settings.asyncGroupValidators.push({
            fields,
            fn: groupValidationFunction
        });
        return this;
    }
    getValidationDependency(fields) {
        const uniqueFields = new Set(fields);
        const result = new Set();
        let length;
        const groupValidatorsFields = (0, map_1.default)([...this.settings.groupValidators, ...this.settings.asyncGroupValidators], 'fields');
        const allGroupedDependenciesFields = [...groupValidatorsFields, ...this.settings.asyncDependenies];
        while (length !== result.size) {
            length = result.size;
            for (const groupFields of allGroupedDependenciesFields) {
                if (!(0, utils_1.isIntersection)(groupFields, fields) && !(0, utils_1.isIntersection)(groupFields, [...result])) {
                    continue;
                }
                for (const field of groupFields) {
                    if (uniqueFields.has(field) || result.has(field)) {
                        continue;
                    }
                    result.add(field);
                }
            }
        }
        return [...result];
    }
    async isValidRecord(record) {
        const fields = (0, utils_1.keys)(record);
        const errors = new ValidationErrors_1.default();
        const dependentFields = this.getValidationDependency(fields);
        if (dependentFields.length) {
            throw new ArgumentsError_1.default('Not enough fields for validator: ' + dependentFields.join(', '));
        }
        for (const field of fields) {
            const value = record[field];
            const validators = this.settings.validators[field] || [];
            for (const validator of validators) {
                const error = validator(value);
                if (error) {
                    errors.add(field, error);
                }
            }
            const asyncValidators = this.settings.asyncValidators[field] || [];
            for (const asyncValidator of asyncValidators) {
                const error = await asyncValidator(value);
                if (error) {
                    errors.add(field, error);
                }
            }
        }
        for (const groupValidator of this.settings.groupValidators) {
            if ((0, utils_1.isIntersection)(groupValidator.fields, fields)) {
                groupValidator.fn(record, errors);
            }
        }
        for (const asyncGroupValidator of this.settings.asyncGroupValidators) {
            if ((0, utils_1.isIntersection)(asyncGroupValidator.fields, fields)) {
                await asyncGroupValidator.fn(record, errors);
            }
        }
        return errors;
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map