"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ThrottleError_1 = __importDefault(require("../error/ThrottleError"));
const throttle_1 = __importDefault(require("../throttle"));
async function makeRequest(data) {
    return new Promise((resolve) => {
        setImmediate(() => resolve(data));
    });
}
describe('Throttle', () => {
    it('Should handle one by one if called in turn', async () => {
        const request = (0, throttle_1.default)(makeRequest);
        const firstResponse = await request(1);
        expect(firstResponse).toBe(1);
        const secondResponse = await request(2);
        expect(secondResponse).toBe(2);
        const lastResponse = await request(3);
        expect(lastResponse).toBe(3);
    });
    it('Should handle last if called simultaneously', async () => {
        const request = (0, throttle_1.default)(makeRequest);
        let receivedError1;
        let receivedError2;
        let receivedResult;
        const firstRequest = request(1).catch((error) => {
            receivedError1 = error;
        });
        const secondRequest = request(2).catch((error) => {
            receivedError2 = error;
        });
        const lastRequest = request(3).then((data) => {
            receivedResult = data;
            expect(data).toBe(3);
        });
        await Promise.all([firstRequest, secondRequest, lastRequest]);
        expect(receivedError1).toBeInstanceOf(ThrottleError_1.default);
        expect(receivedError2).toBeInstanceOf(ThrottleError_1.default);
        expect(receivedResult).toBe(3);
    });
    it('Should let catch all ThrottleErrors without unhandled promise rejection', async () => {
        const throttledRequest = (0, throttle_1.default)(makeRequest);
        async function asyncFuncCatchingThrottleErrors(result) {
            try {
                await throttledRequest();
            }
            catch (e) {
                if (!(e instanceof ThrottleError_1.default)) {
                    throw e;
                }
            }
            return result;
        }
        const result1 = await Promise.all([asyncFuncCatchingThrottleErrors(), asyncFuncCatchingThrottleErrors()]);
        const result2 = await Promise.all([
            asyncFuncCatchingThrottleErrors(1),
            asyncFuncCatchingThrottleErrors('1')
        ]);
        expect(result1).toStrictEqual([undefined, undefined]);
        expect(result2).toStrictEqual([1, '1']);
    });
});
//# sourceMappingURL=throttle-test.js.map