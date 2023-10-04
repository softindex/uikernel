"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const assert_1 = require("../common/assert");
const asyncServerRouteHandler_1 = __importDefault(require("../common/asyncServerRouteHandler"));
const parseJson_1 = __importDefault(require("../common/parseJson"));
const ValidationErrors_1 = __importDefault(require("../validation/ValidationErrors"));
const DEFAULT_MAX_FILE_SIZE = 104857600;
class FormExpressApi {
    static create(settings = {}) {
        return new FormExpressApi(settings);
    }
    constructor({ multipartFormData = false, maxFileSize = DEFAULT_MAX_FILE_SIZE } = {}) {
        this.middlewares = {
            getData: [],
            getDataPost: [],
            submit: [],
            validate: []
        };
        const upload = (0, multer_1.default)({
            limits: {
                fileSize: maxFileSize
            }
        });
        this.addMiddleware('getData', (0, asyncServerRouteHandler_1.default)(async (req, res) => {
            const fields = req.query.fields ? (0, parseJson_1.default)(req.query.fields.toString()) : undefined;
            const result = await this.getModel(req, res).getData(fields);
            this.sendResult(res, result);
        }));
        this.addMiddleware('getDataPost', (0, asyncServerRouteHandler_1.default)(async (req, res) => {
            const { fields } = req.body;
            const result = await this.getModel(req, res).getData(fields !== null && fields !== void 0 ? fields : undefined);
            this.sendResult(res, result);
        }));
        this.addMiddleware('submit', [
            ...(multipartFormData ? [upload.any()] : []),
            (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                const model = this.getModel(req, res);
                let body;
                if (multipartFormData) {
                    body = (0, parseJson_1.default)(req.body.rest);
                    const files = req.files;
                    for (const { fieldname, buffer } of files) {
                        const parsedFieldName = (0, parseJson_1.default)(decodeURI(fieldname), 'Invalid JSON in field name');
                        body[parsedFieldName] = buffer;
                    }
                }
                else {
                    body = req.body;
                }
                let data;
                let validationErrors;
                try {
                    data = await model.submit(body);
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
                    (0, assert_1.assertNonNullish)(data, '"data" unknown');
                    this.sendResult(res, { data, error: null });
                }
            })
        ]);
        this.addMiddleware('validate', (0, asyncServerRouteHandler_1.default)(async (req, res) => {
            const model = this.getModel(req, res);
            const validationErrors = await model.isValidRecord(req.body);
            this.sendResult(res, validationErrors.toJSON());
        }));
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
            .get('/', this.middlewares.getData)
            .post('/', this.middlewares.submit)
            .get('/data', this.middlewares.getData)
            .post('/data', this.middlewares.getDataPost)
            .post('/validation', this.middlewares.validate);
    }
    getData(middleware) {
        return this.addMiddleware('getData', middleware);
    }
    submit(middleware) {
        return this.addMiddleware('submit', middleware);
    }
    validate(middleware) {
        return this.addMiddleware('validate', middleware);
    }
    addMiddleware(method, middleware) {
        const middlewares = Array.isArray(middleware) ? middleware : [middleware];
        this.middlewares[method] = middlewares.concat(this.middlewares[method]);
        return this;
    }
    getModel(_req, _res) {
        throw new Error('Model is not defined.');
    }
    sendResult(res, result) {
        res.json(result);
    }
}
exports.default = FormExpressApi;
//# sourceMappingURL=FormExpressApi.js.map