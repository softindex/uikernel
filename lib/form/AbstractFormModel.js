"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventsModel_1 = __importDefault(require("../common/EventsModel"));
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
class AbstractFormModel {
    constructor() {
        this.eventsModel = new EventsModel_1.default();
    }
    getData(_fields) {
        return Promise.resolve({});
    }
    submit(_record) {
        return Promise.resolve({});
    }
    isValidRecord(_record) {
        return Promise.resolve(new ValidationErrors_1.default());
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
    trigger(event, ...args) {
        return this.eventsModel.trigger(event, ...args);
    }
}
exports.default = AbstractFormModel;
//# sourceMappingURL=AbstractFormModel.js.map