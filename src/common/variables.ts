/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {DefaultXhr} from './defaultXhr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collection: Record<string, unknown> = {};

export interface VariableGetter {
  (key: 'xhr'): DefaultXhr;
  (key: string): unknown;
}

export interface VariableSetter {
  (key: 'xhr', value: DefaultXhr): void;
  (key: string, value: unknown): void;
}

const variables: Readonly<{
  get: VariableGetter;
  set: VariableSetter;
}> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (key: string): any => collection[key],
  set: (key: string, value: unknown): void => {
    collection[key] = value;
  }
};

export default variables;
