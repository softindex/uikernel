"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const functionsNames = [];
function callbackify(func, hideWarning = false) {
    const funcName = func.name;
    return function (...args) {
        const lastArgumentIndex = args.length - 1;
        const cb = args[lastArgumentIndex];
        if (typeof cb === 'function' && !cb.__ignoreUIKernelWarning) {
            if (!functionsNames.includes(funcName) && !hideWarning) {
                (0, utils_1.warn)(`You are using callback in: '${funcName}'. Use promise instead.\n${JSON.stringify(args)}`);
                functionsNames.push(funcName);
            }
            const result = func.apply(this, args);
            if (result === null || result === void 0 ? void 0 : result.then) {
                result
                    .then((data) => {
                    cb(null, data);
                })
                    .catch((err) => {
                    cb(err);
                });
            }
        }
        else {
            return func.apply(this, args);
        }
    };
}
exports.default = callbackify;
//# sourceMappingURL=callbackify.js.map