/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';

/**
 * Check if two arrays intersection exists
 */
export function isIntersection(values: string[], searchValues: string[]): boolean {
  if (values.length > searchValues.length) {
    return isIntersection(searchValues, values);
  }

  const searchValuesSet = new Set(searchValues);
  return values.some((value) => searchValuesSet.has(value));
}

/**
 * Element position (isEqual checking)
 */
export function indexOf(array: unknown[], item: unknown): number {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(array[i], item)) {
      return i;
    }
  }

  return -1;
}

export function parseValueFromEvent(value: unknown): unknown;

export function parseValueFromEvent<TElement extends {target: {tagName: 'INPUT'; type: 'checkbox'}}>(
  event: React.SyntheticEvent<TElement>
): boolean;

export function parseValueFromEvent<TElement extends {target: {tagName: 'INPUT'; type: 'file'}}>(
  event: React.SyntheticEvent<TElement>
): File | null | undefined;

export function parseValueFromEvent<TElement extends {target: {tagName: 'SELECT' | 'TEXTAREA'}}>(
  event: React.SyntheticEvent<TElement>
): string;

export function parseValueFromEvent(eventOrValue: unknown): unknown {
  const target =
    eventOrValue &&
    typeof eventOrValue === 'object' &&
    'target' in eventOrValue &&
    typeof eventOrValue.target === 'object'
      ? (eventOrValue.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
      : undefined;

  if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
    switch (target.type) {
      case 'checkbox':
        return (target as HTMLInputElement).checked;
      case 'file':
        return (target as HTMLInputElement).files?.[0];
    }

    return target.value;
  }

  return eventOrValue;
}

export function forEach<T extends Record<string, unknown>>(
  obj: T | null | undefined,
  func: <TProp extends string & keyof T>(value: T[TProp], prop: TProp) => void
): void {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      func(obj[prop], prop);
    }
  }
}

// lodash/isEqual is not compatible with test case described in utils-test
/**
 * Checking at equals params
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (
    a === null ||
    b === null ||
    a === undefined ||
    b === undefined ||
    typeof a === 'function' ||
    typeof b === 'function' ||
    a instanceof RegExp ||
    b instanceof RegExp
  ) {
    return String(a) === String(b);
  }

  // eslint-disable-next-line no-self-compare
  if (a === b || a.valueOf() === b.valueOf() || (a !== a && b !== b)) {
    return true;
  }

  if (
    (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length)) ||
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a.constructor !== b.constructor
  ) {
    return false;
  }

  if (typeof File === 'function' && (a instanceof File || b instanceof File)) {
    return a instanceof File && b instanceof File && a.size === b.size && a.name === b.name;
  }

  if (a instanceof Set || a instanceof Map || b instanceof Set || b instanceof Map) {
    if ((a instanceof Set && b instanceof Set) || (a instanceof Map && b instanceof Map)) {
      return isEqual([...a], [...b]);
    }

    return false;
  }

  const keys = Object.keys(a);
  return (
    Object.keys(b).every((key) => keys.includes(key)) &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keys.every((key) => isEqual((a as any)[key], (b as any)[key]))
  );
}

export function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  return false;
}

export function getRecordChanges<TRecord extends Record<string, unknown>>(
  getValidationDependency: (fields: (string & keyof TRecord)[]) => (string & keyof TRecord)[],
  data: Partial<TRecord>,
  changes: Partial<TRecord>,
  newChanges: Partial<TRecord>
): Partial<TRecord> {
  let result = {...changes, ...newChanges};
  result = omitBy<Partial<TRecord>>(result, (value: Partial<TRecord>[keyof TRecord], fieldName) =>
    isEqual(data[fieldName as keyof TRecord], value)
  );

  return {...result, ...pick(data, getValidationDependency(keys(result)))};
}

export function getStack(deep = 0): string {
  // We add here try..catch because in IE Error.stack is available only
  // for thrown errors: https://msdn.microsoft.com/ru-ru/library/windows/apps/hh699850.aspx

  let stack = '';
  const stackTraceLimitDefault = Error.stackTraceLimit;
  Error.stackTraceLimit = deep + 12;
  try {
    throw new Error();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.stack) {
      // Error.stack is unavailable in old browsers
      stack = error.stack
        .split('\n')
        .slice(2 + deep) // Here we delete rows 'Error' and 'at getStack(utils.js:427)'
        .join('\n');
    }
  }

  Error.stackTraceLimit = stackTraceLimitDefault;
  return stack;
}

export function warn(message: string): void {
  console.warn(message, '\n', getStack(1));
}

export function toEncodedString(value: unknown): string {
  return encodeURIComponent(typeof value === 'string' ? value : JSON.stringify(value));
}

export function parents(element: Element, selector: string): Element[] {
  let parentElement = element.parentElement;
  const result = [];
  while (parentElement) {
    if (parentElement.matches(selector)) {
      result.push(parentElement);
    }

    parentElement = parentElement.parentElement;
  }

  return result;
}

export function keys<T extends Record<string, unknown>>(obj: T): (string & keyof T)[] {
  return Object.keys(obj) as (string & keyof T)[];
}
