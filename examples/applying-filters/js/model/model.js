/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const model = new UIKernel.Models.Grid.Collection({
  data,
  filtersHandler: function (data, filters) {
    return data.filter((record) => {
      const data = record[1];

      if (filters.search) {
        const found = (
          data.name.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
          data.surname.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
          data.phone.indexOf(filters.search) >= 0
        );

        if (!found) {
          return false;
        }
      }

      if (filters.gender && data.gender !== filters.gender) {
        return false;
      }

      if (filters.age && data.age !== Number(filters.age)) {
        return false;
      }

      return true;
    });
  }
});
