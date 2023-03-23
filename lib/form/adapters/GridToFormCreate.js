"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("lodash/pick"));
class GridToFormCreate {
    constructor(gridModel, initialData = {}) {
        this.gridModel = gridModel;
        this.initialData = initialData;
    }
    async getData(fields) {
        if (fields === null || fields === void 0 ? void 0 : fields.length) {
            return (0, pick_1.default)(this.initialData, fields);
        }
        return this.initialData;
    }
    async submit(changes) {
        await this.gridModel.create(changes);
        return changes;
    }
    async isValidRecord(record) {
        return await this.gridModel.isValidRecord(record);
    }
    getValidationDependency(fields) {
        return this.gridModel.getValidationDependency(fields);
    }
    on() {
        return this;
    }
    off() {
        return this;
    }
}
exports.default = GridToFormCreate;
//# sourceMappingURL=GridToFormCreate.js.map