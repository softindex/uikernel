/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ThrottleError from './ThrottleError';
import ArgumentsError from './ArgumentsError';

function baseClone(obj, isDeep) {
  let cloned;
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
export function isIntersection(a, b) {
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
export function size(obj) {
  return Object.keys(obj).length;
}

/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */
export function indexOf(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], item)) {
      return i;
    }
  }
  return -1;
}

export function throttle(func) {
  let worked = false;
  let nextArguments;
  let nextResolve;
  let nextReject;

  return function () {
    if (typeof arguments[arguments.length - 1] === 'function') {
      return throttleCallback(func).apply(this, arguments);
    } else {
      return throttlePromise(func).apply(this, arguments);
    }
  };

  // it is still used in FormMixin._validateForm so we can't remove it yet
  function throttleCallback(func) {
    return function run() {
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
        argumentsArray[argumentsArray.length - 1] = cbWrapper;
        func.apply(this, argumentsArray.concat(nextWorker));
      } else {
        func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
      }

      function nextWorker() {
        worked = false;
        if (nextArguments) {
          const args = nextArguments;
          nextArguments = null;
          run.apply(ctx, args);
          return true;
        }
        return false;
      }
    };
  }

  function throttlePromise(func) {
    /**
     * @throws {ThrottleError} Too many function call
     */
    return function run(...args) {
      const parentStack = getStack(2);

      return new Promise((resolve, reject) => {
        if (worked) {
          if (nextArguments) {
            nextReject(ThrottleError.createWithParentStack(parentStack));
          }
          nextArguments = args;
          nextResolve = resolve;
          nextReject = reject;
          return;
        }

        worked = true;

        func.apply(this, args)
          .then(result => {
            worked = false;
            if (nextArguments) {
              nextResolve(run.apply(this, nextArguments));
              nextArguments = null;

              reject(ThrottleError.createWithParentStack(parentStack));
              return;
            }
            resolve(result);
          })
          .catch(err => {
            worked = false;
            reject(err);
          });
      });
    };
  }
}

export function parseValueFromEvent(event) {
  if (
    event && typeof event === 'object' &&
    event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) >= 0
  ) {
    switch (event.target.type) {
    case 'checkbox':
      return event.target.checked;
    }
    return event.target.value;
  }
  return event;
}

export function Decorator(obj, decor) {
  Object.assign(this, decor);

  for (const i in obj) {
    if (typeof obj[i] === 'function' && !decor[i]) {
      this[i] = obj[i].bind(obj);
    }
  }
}

export function decorate(obj, decor) {
  Decorator.prototype = obj;
  return new Decorator(obj, decor);
}

/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export function isEqual(a, b) {
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
export function clone(obj) {
  return baseClone(obj, false);
}

export function cloneDeep(obj) {
  return baseClone(obj, true);
}

export function isEmpty(value) {
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

export function isDefined(value) {
  return value !== null && value !== undefined;
}

export function forEach(obj, func, ctx) {
  for (const i in obj) {
    func.call(ctx, obj[i], i);
  }
}

export function pluck(arr, field) {
  return arr.map(item => item[field]);
}

export function find(arr, func) {
  for (const i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
}

export function findIndex(obj, func) {
  for (const i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }
  return -1;
}

export function omit(obj, predicate) {
  const result = {};
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

export function escape(string) {
  const reUnescaped = /[&<>"'`]/g;
  const escapes = {
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

export function zipObject(keys, values) {
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

export function pick(obj, keys, defaultValue) {
  return keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    } else if (defaultValue !== undefined) {
      result[key] = defaultValue;
    }
    return result;
  }, {});
}

export function mapKeys(object, iteratee) {
  const result = {};

  for (const [key, value] of Object.entries(object)) {
    result[iteratee(value, key)] = value;
  }

  return result;
}

export function reduce(obj, func, value) {
  for (const i in obj) {
    value = func(value, obj[i], i);
  }
  return value;
}

export function union(...args) {
  const elements = {};
  for (const arg of args) {
    for (const el of arg) {
      elements[el] = el;
    }
  }
  return Object.values(elements);
}

export function at(obj, keys) {
  const result = [];
  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }
  for (const key of keys) {
    result.push(obj[key]);
  }
  return result;
}

export function pairs(obj) {
  const result = [];
  for (const i in obj) {
    result.push([i, obj[i]]);
  }
  return result;
}

export function toDate(value) {
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

export function without(arr, el) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(el) ? indexOf(el, arr[i]) > -1 : isEqual(arr[i], el)) {
      continue;
    }
    result.push(arr[i]);
  }
  return result;
}

export function last(arr) {
  return arr[arr.length - 1];
}

export function getRecordChanges(model, data, changes, newChanges) {
  const result = Object.assign({}, changes, newChanges);

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

export function warn(message) {
  console.warn(message, '\n', getStack(1));
}

export function toEncodedString(value) {
  return encodeURIComponent((typeof value === 'string' ? value : JSON.stringify(value)));
}

export function asyncHandler(router) {
  return (req, res, next) => {
    const promise = router(req, res, next);
    if (promise && promise.then) {
      return promise.catch(next);
    }
    next(new Error('asyncHandler expected to take async function.'));
  };
}

export function parents(element, selector) {
  const result = [];
  while ((element = element.parentElement)) {
    if (element.matches(selector)) {
      result.push(element);
    }
  }
  return result;
}

export function parseJson(json, errorMessage = 'Incorrect JSON') {
  let result;

  try {
    result = JSON.parse(json);
  } catch (err) {
    throw new ArgumentsError(errorMessage);
  }

  return result;
}
