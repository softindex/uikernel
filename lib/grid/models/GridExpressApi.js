"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_errors_1 = __importDefault(require("http-errors"));
const multer_1 = __importDefault(require("multer"));
const asyncServerRouteHandler_1 = __importDefault(require("../../common/asyncServerRouteHandler"));
const parseJson_1 = __importDefault(require("../../common/parseJson"));
const ValidationErrors_1 = __importDefault(require("../../validation/ValidationErrors"));
const DEFAULT_MAX_FILE_SIZE = 104857600;
class GridExpressApi {
    static create(multipartFormData = false, maxFileSize = DEFAULT_MAX_FILE_SIZE) {
        return new GridExpressApi(multipartFormData, maxFileSize);
    }
    constructor(multipartFormData, maxFileSize) {
        const upload = (0, multer_1.default)({
            limits: {
                fileSize: maxFileSize
            }
        });
        this.middlewares = {
            readGet: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const settings = {
                        fields: []
                    };
                    if (req.query.limit) {
                        settings.limit = parseInt(req.query.limit.toString(), 10);
                    }
                    if (req.query.offset) {
                        settings.offset = parseInt(req.query.offset.toString(), 10);
                    }
                    if (req.query.sort) {
                        settings.sort = (0, parseJson_1.default)(req.query.sort, 'Invalid JSON in "sort"');
                    }
                    if (req.query.fields) {
                        settings.fields = (0, parseJson_1.default)(req.query.fields, 'Invalid JSON in "fields"');
                    }
                    if (req.query.extra) {
                        settings.extra = (0, parseJson_1.default)(req.query.extra, 'Invalid JSON in "extra"');
                    }
                    if (req.query.filters) {
                        settings.filters = (0, parseJson_1.default)(req.query.filters, 'Invalid JSON in "filters"');
                    }
                    const model = this.getModel(req, res);
                    const result = await model.read(settings);
                    this.sendResult(res, result);
                })
            ],
            readPost: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const settings = {
                        fields: []
                    };
                    const body = req.body;
                    if (body.limit) {
                        settings.limit = parseInt(String(body.limit), 10);
                    }
                    if (body.offset) {
                        settings.offset = parseInt(String(body.offset), 10);
                    }
                    if (body.sort) {
                        settings.sort = body.sort;
                    }
                    if (body.fields) {
                        settings.fields = body.fields;
                    }
                    if (body.extra) {
                        settings.extra = body.extra;
                    }
                    if (body.filters) {
                        settings.filters = body.filters;
                    }
                    const model = this.getModel(req, res);
                    const result = await model.read(settings);
                    this.sendResult(res, result);
                })
            ],
            validate: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const model = this.getModel(req, res);
                    const body = req.body;
                    const errors = await model.isValidRecord(body.record, body.id);
                    this.sendResult(res, errors.toJSON());
                })
            ],
            getRecord: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const cols = (0, parseJson_1.default)(req.query.cols, 'Invalid JSON in "cols"');
                    const recordId = (0, parseJson_1.default)(req.params.recordId, 'Invalid JSON in "recordId"');
                    const model = this.getModel(req, res);
                    const result = await model.getRecord(recordId, cols);
                    this.sendResult(res, result);
                })
            ],
            update: [
                ...(multipartFormData ? [upload.any()] : []),
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    var _a;
                    const model = this.getModel(req, res);
                    let body;
                    if (multipartFormData) {
                        const filesByRecordId = {};
                        for (const { fieldname, buffer } of req.files) {
                            const { recordId, field } = (0, parseJson_1.default)(decodeURI(fieldname), 'Incorrect name for field containing file data');
                            const recordFiles = (_a = filesByRecordId[recordId]) !== null && _a !== void 0 ? _a : {};
                            recordFiles[field] = buffer;
                            filesByRecordId[recordId] = recordFiles;
                        }
                        body = (0, parseJson_1.default)(req.body.rest, 'Incorrect "rest" json').map(([recordId, record]) => {
                            return [
                                recordId,
                                {
                                    ...record,
                                    ...filesByRecordId[recordId]
                                }
                            ];
                        });
                    }
                    else {
                        body = req.body;
                    }
                    if (!Array.isArray(body)) {
                        throw (0, http_errors_1.default)(422, 'Wrong data type to update');
                    }
                    const data = await model.update(body);
                    this.sendResult(res, this.transformUpdateResult(data));
                })
            ],
            create: [
                ...(multipartFormData ? [upload.any()] : []),
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const model = this.getModel(req, res);
                    let body;
                    if (multipartFormData) {
                        body = (0, parseJson_1.default)(req.body.rest);
                        for (const { fieldname, buffer } of req.files) {
                            const parsedFieldName = (0, parseJson_1.default)(decodeURI(fieldname), 'Invalid JSON in field name');
                            body[parsedFieldName] = buffer;
                        }
                    }
                    else {
                        body = req.body;
                    }
                    let result;
                    let validationErrors;
                    try {
                        result = await model.create(body);
                    }
                    catch (error) {
                        if (!(error instanceof ValidationErrors_1.default)) {
                            throw error;
                        }
                        validationErrors = error;
                    }
                    if (validationErrors) {
                        this.sendResult(res, { data: null, error: validationErrors.toJSON() });
                    }
                    else {
                        this.sendResult(res, { data: result, error: null });
                    }
                })
            ]
        };
    }
    model(model) {
        if (typeof model === 'function') {
            this.getModel = model;
        }
        else {
            this.getModel = () => model;
        }
        return this;
    }
    getRouter() {
        return (0, express_1.Router)()
            .get('/', this.middlewares.readGet)
            .post('/read', this.middlewares.readPost)
            .post('/validation', this.middlewares.validate)
            .get('/:recordId', this.middlewares.getRecord)
            .put('/', this.middlewares.update)
            .post('/', this.middlewares.create);
    }
    read(middlewares) {
        this.addMidelwares('readGet', middlewares);
        this.addMidelwares('readPost', middlewares);
        return this;
    }
    validate(middlewares) {
        return this.addMidelwares('validate', middlewares);
    }
    getRecord(middlewares) {
        return this.addMidelwares('getRecord', middlewares);
    }
    update(middlewares) {
        return this.addMidelwares('update', middlewares);
    }
    create(middlewares) {
        return this.addMidelwares('create', middlewares);
    }
    addMidelwares(method, middleware) {
        const middlewares = Array.isArray(middleware) ? middleware : [middleware];
        this.middlewares[method] = middlewares.concat(this.middlewares[method]);
        return this;
    }
    getModel(_req, _res) {
        throw new Error('Model is not defined.');
    }
    transformUpdateResult(data) {
        const result = {
            changes: [],
            errors: [],
            validation: []
        };
        return data.reduce((result, [key, record]) => {
            if (record instanceof Error) {
                result.errors.push([key, record]);
            }
            else if (record instanceof ValidationErrors_1.default) {
                result.validation.push([key, record.toJSON()]);
            }
            else {
                result.changes.push([key, record]);
            }
            return result;
        }, result);
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.default = GridExpressApi;
//# sourceMappingURL=GridExpressApi.js.map