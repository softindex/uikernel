/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UIKernel from 'uikernel';
import validator from './validator';
import generateInitialData from './utils/generateInitialData';

function _getNumberIdGeneration() {
  let initalId = 1;
  return (existsIds) => {
    const existsIdsSet = new Set(existsIds);
    while (existsIdsSet.has(initalId)) {
      initalId++;
    }

    return initalId;
  };
}

const gridModel = new UIKernel.Models.Grid.Collection.create({
  data: generateInitialData(200),
  filtersHandler: function (data, filters) {
    if (!filters) {
      return data;
    }

    return data.filter((item) => {
      item = item[1];

      const search = (filters.search || '').toLowerCase();
      let isSuitable = true;

      if (filters.search) { // ignore case search filter
        isSuitable &= (
          item.name.toLowerCase().indexOf(search) >= 0 ||
          item.surname.toLowerCase().indexOf(search) >= 0 ||
          item.phone.indexOf(search) >= 0
        );
      }

      if (filters.gender) { // gender filter
        isSuitable &= item.gender === filters.gender;
      }

      if (filters.age) { // age filter
        isSuitable &= Number(item.age) === Number(filters.age);
      }

      return isSuitable;
    });
  },
  validator: validator,
  requiredFields: ["name", "surname", "phone", "age", "gender"],
  generateId: _getNumberIdGeneration()
});

export default gridModel;
