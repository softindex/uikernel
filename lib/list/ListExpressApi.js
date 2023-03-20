"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncServerRouteHandler_1 = __importDefault(require("../common/asyncServerRouteHandler"));
const parseJson_1 = __importDefault(require("../common/parseJson"));
class ListExpressApi {
    constructor() {
        this.middlewares = {
            read: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    var _a;
                    const model = this.getModel(req, res);
                    const data = await model.read((_a = req.query.v) === null || _a === void 0 ? void 0 : _a.toString());
                    this.sendResult(res, data);
                })
            ],
            getLabel: [
                (0, asyncServerRouteHandler_1.default)(async (req, res) => {
                    const id = (0, parseJson_1.default)(req.params.id);
                    const model = this.getModel(req, res);
                    const data = await model.getLabel(id);
                    this.sendResult(res, data);
                })
            ]
        };
    }
    static create() {
        return new ListExpressApi();
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
        return (0, express_1.Router)().get('/', this.middlewares.read).get('/label/:id', this.middlewares.getLabel);
    }
    read(middleware) {
        const middlewares = Array.isArray(middleware) ? middleware : [middleware];
        this.middlewares.read = middlewares.concat(this.middlewares.read);
        return this;
    }
    getLabel(middleware) {
        const middlewares = Array.isArray(middleware) ? middleware : [middleware];
        this.middlewares.getLabel = middlewares.concat(this.middlewares.getLabel);
        return this;
    }
    getModel(_req, _res) {
        throw new Error('Model is not defined.');
    }
    sendResult(res, data) {
        res.json(typeof data === 'number' ? data.toString() : data);
    }
}
exports.default = ListExpressApi;
//# sourceMappingURL=ListExpressApi.js.map