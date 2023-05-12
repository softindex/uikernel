/// <reference types="jest" />
declare function createMockedMethod<TResult>(className: string, methodName: string): jest.Mock<TResult>;
export default createMockedMethod;
