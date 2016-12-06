/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

import objectHash from 'object-hash';
import ThrottleError from './ThrottleError';

function baseClone(obj, isDeep) {
  let i;
  let cloned;
  const es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
    return obj;
  }

  if (Array.isArray(obj)) {
    cloned = [];
    for (i = 0; i < obj.length; i++) {
      cloned.push(isDeep ? baseClone(obj[i], true) : obj[i]);
    }
  } else if (es6types.indexOf(obj.toString()) >= 0) {
    cloned = new obj.constructor(obj);
  } else {
    cloned = {};
    for (i in obj) {
      cloned[i] = isDeep ? baseClone(obj[i], true) : obj[i];
    }
  }
  return cloned;
}

/**
 * Check if two arrays intersection exists
 */
exports.isIntersection = (a, b) =>{
  let i;
  let c;
  if (a.length > b.length) {
    c = a;
    a = b;
    b = c;
  }
  for (i = 0; i < a.length; i++) {
    if (b.indexOf(a[i]) >= 0) {
      return true;
    }
  }
  return false;
};

/**
 * Define object size
 *
 * @param   {Object}    obj     Object
 * @return  {number}    Object size
 */
exports.size = obj => Object.keys(obj).length;

/**
 * Hash function using djb2 algorithm
 *
 * @param   {string} str Initial string
 * @return  {string} hash
 */
exports.hash = objectHash;

/**
 * Element position (isEqual checking)
 *
 * @param   {Array}   arr   Array
 * @param   {*}       item  Element item
 * @return  {number}
 */
exports.indexOf = (arr, item) =>{
  let i;
  for (i = 0; i < arr.length; i++) {
    if (exports.isEqual(arr[i], item)) {
      return i;
    }
  }
  return -1;
};

exports.throttle = function (func) {

  let worked = false;
  let nextArguments;
  let nextResolve;

  return function run(...args) {
    return new Promise((resolve, reject) => {
      if (worked) {
        nextArguments = args;
        if (nextResolve) {
          nextResolve(Promise.reject(new ThrottleError('function call is deprecated')))
        }
        nextResolve = resolve;
        return;
      }

      worked = true;

      let result = func.apply(this, args);
      result
        .then(result => {
          worked = false;
          if (nextArguments) {
            nextResolve(run(...nextArguments));
            nextArguments = null;
            reject(new ThrottleError('function call is deprecated'));
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
};

exports.parseValueFromEvent = event =>{
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
};

exports.decorate = function (obj, decor) {
  function Decorator() {
    exports.assign(this, decor);

    for (let i in obj) {
      if (typeof obj[i] === 'function' && !decor[i]) {
        this[i] = obj[i].bind(obj);
      }
    }
  }
  Decorator.prototype = obj;
  Decorator.prototype.constructor = Decorator;
  return new Decorator();
};

/**
 * Checking at equals params
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
exports.isEqual = (a, b) =>{
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
    return a === b;
  }
  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
    return true;
  }
  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || !(typeof a === 'object')) {
    return false;
  }

  const p = Object.keys(a);
  return Object.keys(b).every(i => p.indexOf(i) >= 0) && p.every(i => exports.isEqual(a[i], b[i]));
};

exports.assign = function(result){
  for (let i = 1; i < arguments.length; i++) {
    for (let j in arguments[i]) {
      result[j] = arguments[i][j];
    }
  }
  return result;
};

/**
 * Clone object
 *
 * @param obj
 * @returns {*}
 */
exports.clone = obj => baseClone(obj, false);

exports.cloneDeep = obj => baseClone(obj, true);

exports.isEmpty = obj =>{
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

exports.isDefined = value => value !== null && value !== undefined && value !== '';

exports.forEach = (obj, func, ctx) =>{
  for (let i in obj) {
    func.call(ctx, obj[i], i);
  }
};

exports.pluck = (arr, field) => arr.map(item => item[field]);

exports.find = (arr, func) =>{
  for (let i in arr) {
    if (func(arr[i], i)) {
      return arr[i];
    }
  }
  return null;
};

exports.findIndex = (obj, func) =>{
  for (let i in obj) {
    if (func(obj[i], i)) {
      return i;
    }
  }
  return -1;
};

exports.omit = (obj, predicate) =>{
  const result = {};
  for (let i in obj) {
    if (
      (typeof predicate === 'string' && predicate !== i) ||
      (Array.isArray(predicate) && predicate.indexOf(i) < 0) ||
      (typeof predicate === 'function' && !predicate(obj[i], i))
    ) {
      result[i] = obj[i];
    }
  }
  return result;
};

exports.escape = string =>{
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
};

exports.zipObject = (keys, values) =>{
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
};

exports.pick = (obj, keys, defaultValue) => keys.reduce((result, key) => {
  if (obj.hasOwnProperty(key)) {
    result[key] = obj[key];
  } else if (defaultValue !== undefined) {
    result[key] = defaultValue;
  }
  return result;
}, {});

exports.reduce = (obj, func, value) =>{
  for (let i in obj) {
    value = func(value, obj[i], i);
  }
  return value;
};

exports.union = function() {
  const elements = {};
  const result = [];
  let i;

  for (i = 0; i < arguments.length; i++) {
    for (let j = 0; j < arguments[i].length; j++) {
      elements[arguments[i][j]] = arguments[i][j];
    }
  }
  for (i in elements) {
    result.push(elements[i]);
  }
  return result;
};

exports.at = (obj, keys) =>{
  const result = [];
  if (!Array.isArray(keys)) {
    return [obj[keys]];
  }
  for (let i = 0; i < keys.length; i++) {
    result.push(obj[keys[i]]);
  }
  return result;
};

exports.pairs = obj =>{
  const result = [];
  for (let i in obj) {
    result.push([i, obj[i]]);
  }
  return result;
};

exports.toDate = value =>{
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
};

exports.without = (arr, el) =>{
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== el) {
      result.push(arr[i]);
    }
  }
  return result;
};

exports.last = arr => arr[arr.length - 1];

exports.getRecordChanges = (model, data, changes, newChanges) =>{
  const result = exports.assign({}, changes, newChanges);

  for (let i in result) {
    if (exports.isEqual(data[i], result[i])) {
      delete result[i];
    }
  }

  exports.assign(result, exports.pick(
    data,
    model.getValidationDependency(Object.keys(result))
  ));

  return result;
};
