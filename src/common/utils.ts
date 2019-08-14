/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ThrottleError from './ThrottleError';
import ArgumentsError from './ArgumentsError';
// eslint-disable-next-line no-unused-vars
import express from 'express';
// eslint-disable-next-line no-unused-vars
import FormModel from '../form/FormModel';

function baseClone(obj: any, isDeep:boolean): object {
  let cloned: any;
  const es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];
    for (const el of obj) {
      cloned.push(isDeep ? baseClone(el, true) : el);
    }
  } else if (es6types.includes(obj.toString())) {
    cloned = new obj.constructor(obj);
  } else {
    cloned = {};
    for (const [field, value] of Object.entries(obj)) {
      cloned[field] = isDeep ? baseClone(value, true) : value;
    }
  }
  return cloned;
}

/**
 * Check if two arrays intersection exists
 */
export function isIntersection(a: any[], b: any[]) {
  let c;
  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }
  for (const el of a) {
    if (indexOf(b, el) > -1) {
      return true;
    }
  }
  return false;
}

/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */
export function size(obj: object) {
  return Object.keys(obj).length;
}

/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */
export function indexOf(arr: any[], item: any) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], item)) {
      return i;
    }
  }
  return -1;
}

//@ts-ignore
export function throttle(func) {
  let worked = false;
  //@ts-ignore
  let nextArguments;
  //@ts-ignore
  let nextResolve;
  //@ts-ignore
  let nextReject;

  //@ts-ignore
  return function (...args) {
    if (typeof arguments[arguments.length - 1] === 'function') {
    //@ts-ignore
      return throttleCallback(func).apply(this, args);
    } else {
    //@ts-ignore
      return throttlePromise(func).apply(this, args);
    }
  };

  // it is still used in FormMixin._validateForm so we can't remove it yet
  //@ts-ignore
  function throttleCallback(func) {
    return function run() {
      //@ts-ignore
      const ctx = this; // Function context
      const cb = arguments[arguments.length - 1];
      const argumentsArray = [].slice.call(arguments);

      if (worked) {
        // Set as the next call
        nextArguments = arguments;
        return;
      }

      worked = true;

      const cbWrapper = function () {
        if (!nextWorker() && typeof cb === 'function') {
          cb.apply(null, arguments);
        }
      };

      if (typeof cb === 'function') {
        //@ts-ignore
        argumentsArray[argumentsArray.length - 1] = cbWrapper;
        //@ts-ignore
        func.apply(this, argumentsArray.concat(nextWorker));
      } else {
        //@ts-ignore
        func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
      }

      function nextWorker() {
        worked = false;
        //@ts-ignore
        if (nextArguments) {
          //@ts-ignore
          const args = nextArguments;
          nextArguments = null;
          run.apply(ctx, args);
          return true;
        }
        return false;
      }
    };
  }

  function throttlePromise(func: any) {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run(...args: any[]) {
      const parentStack = getStack(2);

      return new Promise((resolve, reject) => {
        if (worked) {
          //@ts-ignore
          if (nextArguments) {
            //@ts-ignore
            nextReject(ThrottleError.createWithParentStack(parentStack));
          }
          nextArguments = args;
          nextResolve = resolve;
          nextReject = reject;
          return;
        }

        worked = true;

        //@ts-ignore
        func.apply(this, args)
        //@ts-ignore
          .then(result => {
            worked = false;
            //@ts-ignore
            if (nextArguments) {
              //@ts-ignore
              nextResolve(run.apply(this, nextArguments));
              nextArguments = null;

              reject(ThrottleError.createWithParentStack(parentStack));
              return;
            }
            resolve(result);
          })
          .catch((err: any) => {
            worked = false;
            reject(err);
          });
      });
    };
  }
}

export function parseValueFromEvent(event: any) {
  if (
    event && typeof event === 'object' &&
    event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf((<HTMLInputElement>event.target).tagName) >= 0
  ) {
    switch ((<HTMLInputElement>event.target).type) {
    case 'checkbox':
      return (<HTMLInputElement>event.target).checked;
    }
    return (<HTMLInputElement>event.target).value;
  }
  return event;
}

export class Decorator {}

export function decorate(obj: any, decor: any) {
  class Decorated2 extends Decorator {
    constructor(obj: {[index: string]: any}, decor: any) {
      super();
      Object.assign(this, decor);

      for (const i in obj) {
        if (typeof obj[i] === 'function' && !decor[i]) {
          // @ts-ignore
          this[i] = obj[i].bind(obj);
        }
      }
    }
  }

  Decorated2.prototype = obj;
  return new Decorated2(obj, decor);
}

/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export function isEqual(a: any, b: any): boolean {
  if (
    a === null
    || b === null
    || a === undefined
    || b === undefined
    || typeof a === 'function'
    || typeof b === 'function'
    || a instanceof RegExp
    || b instanceof RegExp
  ) {
    return a === b;
  }

  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }

  if (
    (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length))
    || typeof a !== 'object'
    || typeof b !== 'object'
  ) {
    return false;
  }

  if (typeof File === 'function' && a instanceof File && b instanceof File) {
    return a.size === b.size && a.name === b.name;
  }

  const keys = Object.keys(a);
  return (
    Object.keys(b).every(key => keys.includes(key))
    && keys.every(key => isEqual(a[key], b[key]))
  );
}

/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */
export function clone(obj: any) {
  return baseClone(obj, false);
}

export function cloneDeep(obj: any) {
  return baseClone(obj, true);
}

export function isEmpty(value: any) {
  if (!value) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function isDefined(value: any) {
  return value !== null && value !== undefined;
}

export function forEach(obj: any, func: (value: any, index: string) => void, ctx: any) {
  for (const i in obj) {
    func.call(ctx, obj[i], i);
  }
}

export function pluck(arr: any[], field: string | number) {
  return arr.map(item => item[field]);
}

export function find(arr: any[], func: (element: any, index: string | number) => boolean) {
  for (const i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
}

export function findIndex(obj: {[index: string]: any}, func: (element: any, index: string) => boolean) {
  for (const i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }
  return -1;
}

export function omit(obj: object, predicate: any) {
  const result: {[index: string]:any} = {};
  for (const [field, value] of Object.entries(obj)) {
    if (
      (typeof predicate === 'string' && predicate !== field) ||
      (Array.isArray(predicate) && !predicate.includes(field)) ||
      (typeof predicate === 'function' && !predicate(value, field))
    ) {
      result[field] = value;
    }
  }
  return result;
}

export function escape(string: string) {
  const reUnescaped = /[&<>"'`]/g;
  const escapes: {[index: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;'
  };
  string = `${string === null ? '' : string.toString()}`;
  if (string && reUnescaped.test(string)) {
    return string.replace(reUnescaped, chr => escapes[chr]);
  }
  return string;
}

export function zipObject(keys: string[], values: any) {
  const result: {[index: string]:any} = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

export function pick(obj: {[index: string]: any}, keys: string[], defaultValue?: any) {
  return keys.reduce((result:{[index: string]: any}, key: string) => {
    if (hasOwnProperty(obj, key)) {
      result[key] = obj[key];
    } else if (defaultValue !== undefined) {
      result[key] = defaultValue;
    }
    return result;
  }, {});
}

export function mapKeys(object: object, iteratee: (value: any, key: string) => any) {
  const result: {[index: string]: any} = {};

  for (const [key, value] of Object.entries(object)) {
    result[iteratee(value, key)] = value;
  }

  return result;
}

export function reduce(obj: {[index: string]: any}, func: (val: any, currentValue: any, index: string) => any, value: any) {
  for (const i in obj) {
    value = func(value, obj[i], i);
  }
  return value;
}

export function union(...args: any) {
  const elements: {[index: string]: any} = {};
  for (const arg of args) {
    for (const el of arg) {
      elements[el] = el;
    }
  }
  return Object.values(elements);
}

export function at(obj: {[index: string]: any}, keys: any) {
  const result = [];
  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }
  for (const key of keys) {
    result.push(obj[key]);
  }
  return result;
}

export function pairs(obj: {[index: string]: any}) {
  const result = [];
  for (const i in obj) {
    result.push([i, obj[i]]);
  }
  return result;
}

export function toDate(value: any) {
  let date;

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value === 'string') {
    date = new Date(value);
    date.setTime(date.getTime() + (date.getTimezoneOffset() * 60 * 1000)); // Convert UTC to local time
    return date;
  }

  return new Date(value);
}

export function without(arr: any[], el: any) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(el) ? indexOf(el, arr[i]) > -1 : isEqual(arr[i], el)) {
      continue;
    }
    result.push(arr[i]);
  }
  return result;
}

export function last(arr: any[]) {
  return arr[arr.length - 1];
}

export function getRecordChanges(model: FormModel,
  data: {[index: string]: any},
  changes: {[index: string]: any},
  newChanges: {[index: string]: any}) {
  const result = Object.assign<{[index: string]: any}, {[index: string]: any}, {[index: string]: any}>({},
    changes, newChanges);

  for (const i in result) {
    if (isEqual(data[i], result[i])) {
      delete result[i];
    }
  }

  Object.assign(result, pick(
    data,
    model.getValidationDependency(Object.keys(result))
  ));

  return result;
}

export function getStack(deep = 0) {
  // We add here try..catch because in IE Error.stack is available only
  // for thrown errors: https://msdn.microsoft.com/ru-ru/library/windows/apps/hh699850.aspx

  let stack = '';
  const stackTraceLimitDefault = Error.stackTraceLimit;
  Error.stackTraceLimit = deep + 12;
  try {
    throw new Error();
  } catch (e) {
    if (e.stack) { // Error.stack is unavailable in old browsers
      stack = e.stack
        .split('\n')
        .slice(2 + deep) // Here we delete rows 'Error' and 'at getStack(utils.js:427)'
        .join('\n');
    }
  }

  Error.stackTraceLimit = stackTraceLimitDefault;
  return stack;
}

export function warn(message: string) {
  console.warn(message, '\n', getStack(1));
}

export function toEncodedString(value: any) {
  return encodeURIComponent((typeof value === 'string' ? value : JSON.stringify(value)));
}
//:
// (req1: express.Request, res1: express.Response, next1: express.NextFunction) => any)
// (req1: express.Request, res1: express.Response, next1: express.NextFunction) => any)

export function asyncHandler(router: express.RequestHandler) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const promise = router(req, res, next);
    if (promise && promise.then) {
      return promise.catch(next);
    }
    next(new Error('asyncHandler expected to take async function.'));
  };
}

export function parents(element: any, selector: any) {
  const result = [];
  while ((element = element.parentElement)) {
    if (element.matches(selector)) {
      result.push(element);
    }
  }
  return result;
}

export function parseJson(json: string, errorMessage = 'Incorrect JSON') {
  let result;

  try {
    result = JSON.parse(json);
  } catch (err) {
    throw new ArgumentsError(errorMessage);
  }

  return result;
}

export function unwrap<T>(value: T | null | undefined, error?: string): T {
  if (value === undefined || value === null) {
    if (error) {
      throw new Error(error);
    }
    throw new Error(`Value can't be ${String(value)}`);
  }
  return value;
}

export function hasOwnProperty(object: object, property: string) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
