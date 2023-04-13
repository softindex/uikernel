"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const assert_1 = require("../common/assert");
const defaultXhr_1 = __importDefault(require("../common/defaultXhr"));
const EventsModel_1 = __importDefault(require("../common/EventsModel"));
const parseJson_1 = __importDefault(require("../common/parseJson"));
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
const Validator_1 = __importDefault(require("../validation/Validator"));
const MAX_URI_LENGTH = 2048;
class FormXhrModel {
    constructor(settings) {
        var _a, _b, _c, _d, _e;
        this.multipartFormDataEncoded = (_a = settings.multipartFormData) !== null && _a !== void 0 ? _a : false;
        this.validator = (_b = settings.validator) !== null && _b !== void 0 ? _b : new Validator_1.default();
        this.validateOnClient = (_c = settings.validateOnClient) !== null && _c !== void 0 ? _c : false;
        this.xhr = (_d = settings.xhr) !== null && _d !== void 0 ? _d : defaultXhr_1.default;
        this.eventsModel = (_e = settings.eventsModel) !== null && _e !== void 0 ? _e : new EventsModel_1.default();
        this.apiURL = settings.api
            .replace(/([^/])\?/, '$1/?')
            .replace(/^[^?]*[^/]$/, '$&/');
    }
    async getData(fields = []) {
        const parsedURL = url_1.default.parse(this.apiURL, true);
        parsedURL.query.fields = JSON.stringify(fields);
        parsedURL.search = null;
        if (url_1.default.format(parsedURL).length > MAX_URI_LENGTH) {
            return await this.getDataPostRequest(fields);
        }
        return (await this.xhr({
            method: 'GET',
            uri: url_1.default.format(parsedURL),
            json: true
        }));
    }
    async submit(record) {
        const formData = new FormData();
        if (this.multipartFormDataEncoded) {
            const ordinaryData = {};
            for (const prop in record) {
                if (!Object.prototype.hasOwnProperty.call(record, prop)) {
                    continue;
                }
                const value = record[prop];
                if (value instanceof File) {
                    formData.append(prop, value);
                }
                else {
                    ordinaryData[prop] = value;
                }
            }
            formData.append('rest', JSON.stringify(ordinaryData));
        }
        const rawBody = await this.xhr({
            method: 'POST',
            ...(!this.multipartFormDataEncoded && {
                headers: {
                    'Content-type': 'application/json'
                }
            }),
            uri: this.apiURL,
            body: this.multipartFormDataEncoded ? formData : JSON.stringify(record)
        });
        const { data, error } = (0, parseJson_1.default)(rawBody);
        if (error) {
            throw ValidationErrors_1.default.createFromJSON(error);
        }
        (0, assert_1.assertNonNullish)(data, '"data" unknown');
        this.eventsModel.trigger('update', data);
        return data;
    }
    async isValidRecord(record) {
        var _a;
        if (this.validateOnClient) {
            return this.validator.isValidRecord(record);
        }
        const parsedURL = url_1.default.parse(this.apiURL, true);
        parsedURL.pathname = url_1.default.resolve((_a = parsedURL.pathname) !== null && _a !== void 0 ? _a : '', 'validation');
        let response;
        try {
            response = (await this.xhr({
                method: 'POST',
                uri: url_1.default.format(parsedURL),
                body: record,
                json: true
            }));
        }
        catch (error) {
            if (error.statusCode === 413) {
                const validationErrors = await this.validator.isValidRecord(record);
                if (!validationErrors.isEmpty()) {
                    return validationErrors;
                }
            }
            throw error;
        }
        return ValidationErrors_1.default.createFromJSON(response);
    }
    getValidationDependency(fields) {
        return this.validator.getValidationDependency(fields);
    }
    on(eventName, cb) {
        this.eventsModel.on(eventName, cb);
        return this;
    }
    off(eventName, cb) {
        this.eventsModel.off(eventName, cb);
        return this;
    }
    removeAllListeners(eventName) {
        this.eventsModel.removeAllListeners(eventName);
    }
    async getDataPostRequest(fields) {
        var _a;
        const parsedURL = url_1.default.parse(this.apiURL, true);
        parsedURL.pathname = url_1.default.resolve((_a = parsedURL.pathname) !== null && _a !== void 0 ? _a : '', 'data');
        return (await this.xhr({
            method: 'POST',
            json: true,
            uri: url_1.default.format(parsedURL),
            body: { fields }
        }));
    }
}
exports.default = FormXhrModel;
//# sourceMappingURL=FormXhrModel.js.map