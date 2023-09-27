"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
const functionsNames = [];
function toPromise(func, hideWarning) {
    const funcName = func.name;
    function promiseWarn(text) {
        if (!hideWarning) {
            if (!functionsNames.includes(funcName)) {
                (0, utils_1.warn)(text);
                functionsNames.push(funcName);
            }
        }
    }
    return function (...mainArguments) {
        let promise;
        const callbackPromise = new Promise((resolve, reject) => {
            function toPromiseCallback(err, data) {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
            toPromiseCallback.__ignoreUIKernelWarning = true;
            mainArguments.push(toPromiseCallback);
            promise = func(...mainArguments);
        });
        if (promise) {
            if (promise.then && promise.catch) {
                return promise;
            }
            promiseWarn(`The return value is not a Promise in '${funcName}'.\n` +
                `Arguments: ${JSON.stringify(mainArguments)}\n` +
                `Returns: ${JSON.stringify(promise)}`);
            return callbackPromise;
        }
        promiseWarn(`You are using callback in: '${funcName}'. Use promise instead.\n` +
            `Arguments: ${JSON.stringify(mainArguments)}`);
        return callbackPromise;
    };
}
exports.default = toPromise;
//# sourceMappingURL=toPromise.js.map