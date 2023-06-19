import type { IsNever } from 'ts-essentials';
type Assert = (value: unknown, message?: string) => asserts value;
declare const assert: Assert;
type OnlyNullable<T> = IsNever<Extract<T, null | undefined>> extends true ? never : IsNever<NonNullable<T>> extends true ? never : T;
type AssertNonNullish = <T>(value: OnlyNullable<T>, message?: string) => asserts value is NonNullable<OnlyNullable<T>>;
export declare const assertNonNullish: AssertNonNullish;
export default assert;
