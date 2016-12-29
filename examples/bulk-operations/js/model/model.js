/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var model = (function () {
  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function _getRandomRecords(size) {
    var _names = ['Pace', 'Evangeline', 'Roach', 'Thornton', 'Concepcion', 'Francine', 'Kelsey', 'Deanna', 'Bates', 'Acosta', 'Stacey', 'Adams', 'Rodriguez', 'Nona', 'Humphrey', 'Mitchell', 'Murray', 'Sonya', 'Addie', 'Angelica'];
    var _phoneSuffixes = [20, 72, 14, 62, 25, 64, 34, 57, 15, 62, 51, 21, 37, 57, 61, 41, 76, 32, 68, 14];
    var _ages = [62, 47, 80, 79, 53, 74, 80, 39, 60, 55, 76, 42, 67, 70, 38, 64, 40, 43, 49, 62];
    var _genders = [1, 2];

    var data = [];

    for (var i = 0; i < size; i++) {
      data.push([i, {
        'name': _names[_getRandomNumber(0, _names.length)],
        'surname': _names[_getRandomNumber(0, _names.length)],
        'age': _ages[_getRandomNumber(0, _ages.length)],
        'gender': _genders[_getRandomNumber(0, _genders.length)],
        'phone': '555-01' + _phoneSuffixes[_getRandomNumber(0, _phoneSuffixes.length)],
      }
      ]);
    }

    return data;
  }

  return new UIKernel.Models.Grid.Collection({
    data: _getRandomRecords(20),
    filtersHandler: function (data, filters) {
      if (!filters) {
        return data;
      }
      if (filters.country) {
        data = data.filter(function (record) {
          return record[1].country === filters.country;
        });
      }
      if (filters.dateMax && filters.dateMin) data = data.filter(function (record) {
        return record[1].birthday >= new Date(filters.dateMin) && record[1].birthday <= new Date(filters.dateMax);
      });
      if (filters.dateMax) data = data.filter(function (record) {
        return record[1].birthday <= new Date(filters.dateMax);
      });
      if (filters.dateMin) data = data.filter(function (record) {
        return record[1].birthday >= new Date(filters.dateMin);
      });

      return data;
    },
    validation: null
  });
})();
