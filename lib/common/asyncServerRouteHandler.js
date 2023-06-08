"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncServerRouteHandler(handler) {
    return (req, res, next) => {
        handler(req, res).catch(next);
    };
}
exports.default = asyncServerRouteHandler;
//# sourceMappingURL=asyncServerRouteHandler.js.map