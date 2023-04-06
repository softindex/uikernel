"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventsModel_1 = __importDefault(require("../../common/EventsModel"));
const ValidationErrors_1 = __importDefault(require("../../validation/ValidationErrors"));
class AbstractGridModel {
    constructor() {
        this.eventsModel = new EventsModel_1.default();
    }
    async create(_record) {
        throw Error('method "create" not implemented yet');
    }
    async read(_params) {
        return {
            records: []
        };
    }
    async getRecord(_id, _fields) {
        throw new Error('method getRecord not implemented yet');
    }
    async update(_changes) {
        return [];
    }
    async isValidRecord(_record, _recordId) {
        return new ValidationErrors_1.default();
    }
    getValidationDependency(_fields) {
        return [];
    }
    on(eventName, cb) {
        this.eventsModel.on(eventName, cb);
        return this;
    }
    off(eventName, cb) {
        this.eventsModel.off(eventName, cb);
        return this;
    }
    trigger(eventName, ...args) {
        this.eventsModel.trigger(eventName, ...args);
    }
}
exports.default = AbstractGridModel;
//# sourceMappingURL=AbstractGridModel.js.map