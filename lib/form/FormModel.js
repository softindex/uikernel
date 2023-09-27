"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorBuilder_1 = __importDefault(require("../validation/ValidatorBuilder"));
const AbstractFormModel_1 = __importDefault(require("./AbstractFormModel"));
class FormModel extends AbstractFormModel_1.default {
    static create(defaultValues, validator) {
        return new FormModel(validator !== null && validator !== void 0 ? validator : ValidatorBuilder_1.default.createEmptyValidator(), defaultValues !== null && defaultValues !== void 0 ? defaultValues : {});
    }
    constructor(validator, data) {
        super();
        this.validator = validator;
        this.data = data;
    }
    async getData(fields) {
        if (!fields) {
            return { ...this.data };
        }
        const record = {};
        for (const field of fields) {
            record[field] = this.data[field];
        }
        return record;
    }
    async submit(changes) {
        const validErrors = await this.isValidRecord(changes);
        if (!validErrors.isEmpty()) {
            throw validErrors;
        }
        this.data = { ...this.data, ...changes };
        this.trigger('update', changes);
        return changes;
    }
    async isValidRecord(record) {
        return await this.validator.isValidRecord(record);
    }
    getValidationDependency(fields) {
        return this.validator.getValidationDependency(fields);
    }
}
exports.default = FormModel;
//# sourceMappingURL=FormModel.js.map