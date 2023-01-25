import assert, {assertNonNullish} from '../assert';

describe('assert', () => {
  [false, null, undefined, 0, ''].forEach((value) => {
    it(`Should throw error on "${String(value)}"`, () => {
      let receivedError;
      try {
        assert(value);
      } catch (error) {
        receivedError = error;
      }

      expect(receivedError).toBeDefined();
    });
  });

  it(`Should skip "true"`, () => {
    expect(assert(true)).toBeUndefined();
  });

  it(`Should skip "1"`, () => {
    expect(assert(1)).toBeUndefined();
  });

  it(`Should skip "[]"`, () => {
    expect(assert([])).toBeUndefined();
  });

  it(`Should skip "{}"`, () => {
    expect(assert({})).toBeUndefined();
  });
});

describe('assertNonNullish', () => {
  it('Should skip strict value with single type, but not "undefined" or "null"', () => {
    const getNumber = (): number => 0;
    const getBoolean = (): boolean => false;
    const getObject = (): Record<string, unknown> => ({});
    const getArray = (): unknown[] => [];
    const getFunction = (): (() => void) => () => undefined;
    const getString = (): string => '';

    const result = [
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getNumber()),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getBoolean()),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getObject()),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getArray()),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getFunction()),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(Function.prototype),
      // @ts-expect-error: TS2345 because type never equal null or undefined - impossible assert
      assertNonNullish(getString())
    ];

    expect(result).toBeDefined();
  });

  it('Should throw error on "null"', () => {
    const getNull = (): null => null;
    const getUndefinedOrNull = (): null | undefined => null;

    let receivedError;
    try {
      // @ts-expect-error: TS2345 because type is null only - always assert
      assertNonNullish(getNull());
      // @ts-expect-error: TS2345 because type maybe null or undefined only - always assert
      assertNonNullish(getUndefinedOrNull());
    } catch (error) {
      receivedError = error;
    }

    expect(receivedError).toBeDefined();
  });

  it('Should throw error on "undefined"', () => {
    const getUndefined = (): undefined => undefined;

    let receivedError;
    try {
      // @ts-expect-error: TS2345 because type is undefined only - always assert
      assertNonNullish(getUndefined());
    } catch (error) {
      receivedError = error;
    }

    expect(receivedError).toBeDefined();
  });

  it('Should skip not "null" or "undefined" value', () => {
    function testAssertNonNullishWithGenericObject<TRecord extends Record<string, unknown>>(
      record: Partial<TRecord> | undefined
    ): void {
      assertNonNullish<object | undefined>(record);
    }
    testAssertNonNullishWithGenericObject({});

    // with null type
    const getNullOrNumber = (): number | null => 0;
    const getNullOrBoolean = (): boolean | null => false;
    const getNullOrObject = (): Record<string, unknown> | null => ({});
    const getNullOrArray = (): unknown[] | null => [];
    const getNullOrFunction = (): (() => void) | null => () => undefined;
    const getNullOrString = (): string | null => '';
    // with undefined type
    const getUndefinedOrNumber = (): number | undefined => 0;
    const getUndefinedOrBoolean = (): boolean | undefined => false;
    const getUndefinedOrObject = (): Record<string, unknown> | undefined => ({});
    const getUndefinedOrArray = (): unknown[] | undefined => [];
    const getUndefinedOrFunction = (): (() => void) | undefined => () => undefined;
    const getUndefinedOrString = (): string | undefined => '';
    // with null or undefined type
    const getNullOrUndefinedOrNumber = (): number | null | undefined => 1;
    const getNullOrUndefinedOrTrue = (): boolean | null | undefined => true;
    const getNullOrUndefinedOrFalse = (): boolean | null | undefined => false;
    const getNullOrUndefinedOrObject = (): Record<string, unknown> | null | undefined => ({});
    const getNullOrUndefinedOrArray = (): unknown[] | null | undefined => [];
    const getNullOrUndefinedOrFunc = (): (() => void) | null | undefined => () => undefined;
    const getNullOrUndefinedOrString = (): string | null | undefined => '';

    const result = [
      assertNonNullish(getNullOrNumber()),
      assertNonNullish(getNullOrBoolean()),
      assertNonNullish(getNullOrObject()),
      assertNonNullish(getNullOrArray()),
      assertNonNullish(getNullOrFunction()),
      assertNonNullish(getNullOrString()),
      assertNonNullish(getUndefinedOrNumber()),
      assertNonNullish(getUndefinedOrBoolean()),
      assertNonNullish(getUndefinedOrObject()),
      assertNonNullish(getUndefinedOrArray()),
      assertNonNullish(getUndefinedOrFunction()),
      assertNonNullish(getUndefinedOrString()),
      assertNonNullish(getNullOrUndefinedOrNumber()),
      assertNonNullish(getNullOrUndefinedOrTrue()),
      assertNonNullish(getNullOrUndefinedOrFalse()),
      assertNonNullish(getNullOrUndefinedOrObject()),
      assertNonNullish(getNullOrUndefinedOrArray()),
      assertNonNullish(getNullOrUndefinedOrFunc()),
      assertNonNullish(getNullOrUndefinedOrString())
    ];

    expect(result).toBeDefined();
  });
});
