/// <reference types="jest" />
import type { Newable } from 'ts-essentials';
declare function createMockInstance<TClass>(Schema: Newable<TClass>): jest.Mocked<TClass>;
export default createMockInstance;
