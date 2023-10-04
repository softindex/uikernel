"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("../../common/assert");
const utils_1 = require("../../common/utils");
const ValidationErrors_1 = __importDefault(require("../../validation/ValidationErrors"));
class GridToFormUpdate {
    constructor(gridModel, id) {
        this.gridModel = gridModel;
        this.id = id;
        this.onUpdateHandlers = [];
    }
    async getData(fields) {
        const data = await this.gridModel.getRecord(this.id, fields !== null && fields !== void 0 ? fields : []);
        if (!data) {
            throw new Error('Invalid recordId');
        }
        return data;
    }
    async submit(changes) {
        const record = { ...changes };
        const [[, result] = []] = await this.gridModel.update([[this.id, record]]);
        (0, assert_1.assertNonNullish)(result, 'received unexpected result type from gridModel.update');
        if (result instanceof Error || result instanceof ValidationErrors_1.default) {
            throw result;
        }
        return result;
    }
    async isValidRecord(record) {
        return await this.gridModel.isValidRecord(record, this.id);
    }
    getValidationDependency(fields) {
        return this.gridModel.getValidationDependency(fields);
    }
    on(eventName, cb) {
        const onChange = (changes) => {
            for (const [key, record] of changes) {
                if ((0, utils_1.isEqual)(key, this.id)) {
                    cb(record);
                }
            }
        };
        this.onUpdateHandlers.push({
            originalCallback: cb,
            wrappedCallback: onChange
        });
        this.gridModel.on(eventName, onChange);
        return this;
    }
    off(eventName, cb) {
        this.onUpdateHandlers = this.onUpdateHandlers.filter((handler) => {
            if (handler.originalCallback === cb) {
                this.gridModel.off(eventName, handler.wrappedCallback);
                return false;
            }
            return true;
        });
        return this;
    }
}
exports.default = GridToFormUpdate;
//# sourceMappingURL=GridToFormUpdate.js.map