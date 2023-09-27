"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xhr_1 = __importDefault(require("xhr"));
const RequestError_1 = __importDefault(require("./error/RequestError"));
const variables_1 = __importDefault(require("./variables"));
function defaultRequest(settings) {
    return new Promise((resolve, reject) => {
        const callStack = new Error().stack;
        (0, xhr_1.default)(settings, (exception, response, body) => {
            var _a;
            const statusCode = (_a = response === null || response === void 0 ? void 0 : response.statusCode) !== null && _a !== void 0 ? _a : 0;
            if (statusCode >= 200 && statusCode < 300) {
                resolve(body);
                return;
            }
            if (exception || !statusCode) {
                const error = new RequestError_1.default('Network Error', statusCode, exception, callStack);
                reject(error);
                return;
            }
            const error = new RequestError_1.default('', statusCode, undefined, callStack);
            if (body) {
                try {
                    const parsedBody = JSON.parse(body);
                    error.message = parsedBody.message || body;
                }
                catch (e) {
                    error.message = body;
                }
            }
            if (!error.message) {
                error.message = `Status Code: ${statusCode}.`;
            }
            reject(error);
        });
    });
}
if (!variables_1.default.get('xhr')) {
    variables_1.default.set('xhr', defaultRequest);
}
const defaultXhr = (settings) => variables_1.default.get('xhr')(settings);
exports.default = defaultXhr;
//# sourceMappingURL=defaultXhr.js.map