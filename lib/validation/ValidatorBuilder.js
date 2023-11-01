"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = __importDefault(require("./Validator"));
class ValidatorBuilder {
    constructor() {
        this.settings = {
            validators: {},
            groupValidators: [],
            asyncValidators: {},
            asyncGroupValidators: [],
            asyncDependencies: []
        };
    }
    static createEmptyValidator() {
        return new ValidatorBuilder().build();
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
        this.settings.asyncDependencies.push(fields);
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
    build() {
        return new Validator_1.default(this.settings);
    }
}
exports.default = ValidatorBuilder;
//# sourceMappingURL=ValidatorBuilder.js.map