/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import applyGridFilters from '../applyGridFilters';

describe('applyGridFilters test', () => {
  let model, newModel, filters;
  beforeEach(() => {
    model = {
      read: jest.fn(async (arg) => arg)
    };
    filters = {search: '77'};
  });

  it('Should apply filters', async () => {
    newModel = applyGridFilters(model, filters);
    expect(await newModel.read({filters: {test: 1}})).toEqual({filters: {...filters, test: 1}});
  });

  it('Should apply all filters from previous calls', async () => {
    newModel = applyGridFilters(model, filters);
    newModel = applyGridFilters(newModel, {a: 1, b: 2});
    newModel = applyGridFilters(newModel, {a: null, b: 4}, );
    newModel = applyGridFilters(newModel, {c: 3}, );
    newModel = applyGridFilters(newModel, {c: 5}, );

    expect(await newModel.read({})).toEqual({filters: {a: null, b: 4, c: 5, search: '77'}});
  });
});
