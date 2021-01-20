/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Set}
 */
export function intersection(a, b) {
  const bSet = b instanceof Set ? b : new Set(b);
  return new Set([...a].filter(el => bSet.has(el)));
}

/**
 * @param {Iterable} a
 * @param {Set} b
 * @return {Set}
 */
export function difference(a, b) {
  return new Set([...a].filter(el => !b.has(el)));
}
