import {IsNever} from 'ts-essentials';
import ArgumentsError from './error/ArgumentsError';

type Assert = (value: unknown, message?: string) => asserts value;

const assert: Assert = (value, message) => {
  if (!value) {
    throw new ArgumentsError(`Wrong value: "${String(value)}"\nMessage: ${message ?? 'Expect trusty value'}`);
  }
};

type ShouldBePossibleNullOrUndefinedAndSomeOtherType<T> = IsNever<Extract<T, null | undefined>> extends true
  ? never
  : IsNever<NonNullable<T>> extends true
  ? never
  : T;

type AssertNonNullish = <T>(
  value: ShouldBePossibleNullOrUndefinedAndSomeOtherType<T>,
  message?: string
) => asserts value is NonNullable<ShouldBePossibleNullOrUndefinedAndSomeOtherType<T>>;

export const assertNonNullish: AssertNonNullish = (value, message) => {
  assert(value !== undefined && value !== null, message ?? `Unexpected value "${String(value)}"`);
};

export default assert;
