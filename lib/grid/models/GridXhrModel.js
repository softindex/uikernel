"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const defaultXhr_1 = __importDefault(require("../../common/defaultXhr"));
const parseJson_1 = __importDefault(require("../../common/parseJson"));
const utils_1 = require("../../common/utils");
const ValidationErrors_1 = __importDefault(require("../../validation/ValidationErrors"));
const Validator_1 = __importDefault(require("../../validation/Validator"));
const AbstractGridModel_1 = __importDefault(require("./AbstractGridModel"));
const MAX_URI_LENGTH = 2048;
class GridXhrModel extends AbstractGridModel_1.default {
    constructor({ api, validator = new Validator_1.default(), xhr = defaultXhr_1.default, validateOnClient = false, multipartFormData = false }) {
        super();
        this.validator = validator;
        this.xhr = xhr;
        this.validateOnClient = validateOnClient;
        this.multipartFormDataEncoded = multipartFormData;
        this.apiUrl = api
            .replace(/([^/])\?/, '$1/?')
            .replace(/^[^?]*[^/]$/, '$&/');
    }
    async create(record) {
        const formData = new FormData();
        if (this.multipartFormDataEncoded) {
            const ordinaryData = {};
            for (const prop in record) {
                if (!Object.prototype.hasOwnProperty.call(record, prop)) {
                    continue;
                }
                const value = record[prop];
                if (value instanceof File) {
                    formData.append(JSON.stringify(prop), value);
                }
                else {
                    ordinaryData[prop] = value;
                }
            }
            formData.append('rest', JSON.stringify(ordinaryData));
        }
        const rawBody = await this.xhr({
            method: 'POST',
            uri: this.apiUrl,
            body: this.multipartFormDataEncoded ? formData : JSON.stringify(record),
            ...(!this.multipartFormDataEncoded && { headers: { 'Content-type': 'application/json' } })
        });
        const { data, error } = (0, parseJson_1.default)(rawBody);
        if (error) {
            throw ValidationErrors_1.default.createFromJSON(error);
        }
        this.trigger('create', [data]);
        return data;
    }
    async read(settings) {
        const queryUrl = this.getQueryUrl(settings);
        if (url_1.default.format(queryUrl).length > MAX_URI_LENGTH) {
            return await this.readPostRequest(settings);
        }
        return (await this.xhr({
            method: 'GET',
            uri: url_1.default.format(queryUrl),
            json: true
        }));
    }
    async getRecord(id, fields) {
        var _a;
        const parsedUrl = url_1.default.parse(this.apiUrl, true);
        parsedUrl.query.cols = JSON.stringify(fields);
        parsedUrl.pathname = url_1.default.resolve((_a = parsedUrl.pathname) !== null && _a !== void 0 ? _a : '', JSON.stringify(id));
        parsedUrl.search = null;
        return (await this.xhr({
            method: 'GET',
            uri: url_1.default.format(parsedUrl),
            json: true
        }));
    }
    async update(changes) {
        const formDataChanges = new FormData();
        if (this.multipartFormDataEncoded) {
            const ordinaryRecordChanges = [];
            for (const [recordId, record] of changes) {
                const fileFieldNames = new Set();
                for (const field in record) {
                    if (!Object.prototype.hasOwnProperty.call(record, field)) {
                        continue;
                    }
                    const value = record[field];
                    if (value instanceof File) {
                        formDataChanges.append(JSON.stringify({ recordId, field }), value);
                        fileFieldNames.add(field);
                    }
                }
                const filteredRecord = (0, utils_1.keys)(record)
                    .filter((key) => !fileFieldNames.has(key))
                    .reduce((agr, key) => ({ ...agr, [key]: record[key] }), {});
                ordinaryRecordChanges.push([recordId, filteredRecord]);
            }
            formDataChanges.append('rest', JSON.stringify(ordinaryRecordChanges));
        }
        const rawBody = await this.xhr({
            method: 'PUT',
            ...(!this.multipartFormDataEncoded && {
                headers: {
                    'Content-type': 'application/json'
                }
            }),
            uri: this.apiUrl,
            body: this.multipartFormDataEncoded ? formDataChanges : JSON.stringify(changes)
        });
        const parsedBody = (0, parseJson_1.default)(rawBody);
        const result = [];
        if (parsedBody.changes.length) {
            this.trigger('update', parsedBody.changes);
            result.push(...parsedBody.changes);
        }
        for (const [key, validationErros] of parsedBody.validation) {
            result.push([key, ValidationErrors_1.default.createFromJSON(validationErros)]);
        }
        for (const [key, customError] of parsedBody.errors) {
            const preparedError = Object.assign(new Error(), customError);
            result.push([key, preparedError]);
        }
        return result;
    }
    async isValidRecord(record, recordId) {
        var _a;
        if (this.validateOnClient) {
            return await this.validator.isValidRecord(record);
        }
        const parsedUrl = url_1.default.parse(this.apiUrl, true);
        parsedUrl.pathname = url_1.default.resolve((_a = parsedUrl.pathname) !== null && _a !== void 0 ? _a : '', 'validation');
        let response;
        try {
            response = (await this.xhr({
                method: 'POST',
                uri: url_1.default.format(parsedUrl),
                body: {
                    record,
                    id: recordId
                },
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
    getQueryUrl({ fields, extra, filters, limit, offset, sort }) {
        const parsedUrl = url_1.default.parse(this.apiUrl, true);
        parsedUrl.query.fields = JSON.stringify(fields);
        parsedUrl.query.offset = String(offset !== null && offset !== void 0 ? offset : 0);
        if (limit) {
            parsedUrl.query.limit = limit.toString();
        }
        if (filters) {
            parsedUrl.query.filters = JSON.stringify(filters);
        }
        if (sort) {
            parsedUrl.query.sort = JSON.stringify(sort);
        }
        if (extra) {
            parsedUrl.query.extra = JSON.stringify(extra);
        }
        parsedUrl.search = null;
        return parsedUrl;
    }
    async readPostRequest({ fields, extra, filters, limit, offset, sort }) {
        var _a;
        const requestBody = {
            fields,
            offset: offset !== null && offset !== void 0 ? offset : 0
        };
        if (limit) {
            requestBody.limit = limit;
        }
        if (filters) {
            requestBody.filters = filters;
        }
        if (sort) {
            requestBody.sort = sort;
        }
        if (extra) {
            requestBody.extra = extra;
        }
        const parsedUrl = url_1.default.parse(this.apiUrl, true);
        parsedUrl.pathname = url_1.default.resolve((_a = parsedUrl.pathname) !== null && _a !== void 0 ? _a : '', 'read');
        return (await this.xhr({
            method: 'POST',
            json: true,
            uri: url_1.default.format(parsedUrl),
            body: requestBody
        }));
    }
}
exports.default = GridXhrModel;
//# sourceMappingURL=GridXhrModel.js.map