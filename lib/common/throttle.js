"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ThrottleError_1 = __importDefault(require("./error/ThrottleError"));
const utils_1 = require("./utils");
function throttle(func) {
    let worked = false;
    let nextArguments;
    let nextResolve;
    return function (...args) {
        return (throttlePromise(func)
            .apply(this, args));
    };
    function throttlePromise(func) {
        return function run(...args) {
            const parentStack = '\n' + (0, utils_1.getStack)();
            return new Promise((resolve, reject) => {
                if (worked) {
                    if (nextResolve) {
                        const error = new ThrottleError_1.default(parentStack);
                        error.message += `\ndata = ${String(args[0])}`;
                        nextResolve(Promise.reject(error));
                    }
                    nextArguments = args;
                    nextResolve = resolve;
                    return;
                }
                worked = true;
                func
                    .apply(this, args)
                    .then((result) => {
                    worked = false;
                    if (nextResolve && nextArguments) {
                        nextResolve(run.apply(this, nextArguments));
                        nextResolve = undefined;
                        nextArguments = undefined;
                        const error = new ThrottleError_1.default(parentStack);
                        reject(error);
                        return;
                    }
                    resolve(result);
                })
                    .catch((err) => {
                    worked = false;
                    if (nextResolve && nextArguments) {
                        nextResolve(run.apply(this, nextArguments));
                        nextResolve = undefined;
                        nextArguments = undefined;
                    }
                    reject(err);
                });
            });
        };
    }
}
exports.default = throttle;
//# sourceMappingURL=throttle.js.map