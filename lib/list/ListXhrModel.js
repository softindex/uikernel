"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const defaultXhr_1 = __importDefault(require("../common/defaultXhr"));
class ListXhrModel {
    constructor(apiUrl, xhr = defaultXhr_1.default) {
        this.apiUrl = apiUrl;
        this.xhr = xhr;
        this.apiUrl = apiUrl
            .replace(/([^/])\?/, '$1/?')
            .replace(/^[^?]*[^/]$/, '$&/');
    }
    async read(search) {
        const parsedURL = url_1.default.parse(this.apiUrl, true);
        parsedURL.search = null;
        if (search) {
            parsedURL.query.v = search;
        }
        return (await this.xhr({
            method: 'GET',
            json: true,
            uri: url_1.default.format(parsedURL)
        }));
    }
    async getLabel(id) {
        var _a;
        const parsedURL = url_1.default.parse(this.apiUrl, true);
        parsedURL.pathname = url_1.default.resolve((_a = parsedURL.pathname) !== null && _a !== void 0 ? _a : '', `label/${JSON.stringify(id)}`);
        return (await this.xhr({
            method: 'GET',
            json: true,
            uri: url_1.default.format(parsedURL)
        }));
    }
}
exports.default = ListXhrModel;
//# sourceMappingURL=ListXhrModel.js.map