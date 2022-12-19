/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {decorate} from '../../common/utils';

/**
 * Defines filter values while reading Grid model data
 *
 * @param {AbstractGridModel} model       Grid model
 * @param {Object}            filters     Filter values
 */
function applyGridFilters(model, filters) {
  return decorate(model, {
    async read(options) {
      options.filters = {
        ...filters,
        ...options.filters
      };
      return await model.read(options);
    }
  });
}

export default applyGridFilters;
