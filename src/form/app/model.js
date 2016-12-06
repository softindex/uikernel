/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

let UIKernel = require('../../../main')
let Validation = require('./validation')

var model = (function ( ) {

  var _names = ["Pace", "Evangeline", "Roach", "Thornton", "Concepcion", "Francine", "Kelsey", "Deanna", "Bates", "Acosta", "Stacey", "Adams", "Rodriguez", "Nona", "Humphrey", "Mitchell", "Murray", "Sonya", "Addie", "Angelica"];
  var _surnames = ["White", "Terrell", "Potts", "English", "Sanders", "Poole", "Bates", "Snow", "Simon", "Kaufman", "Kelly", "Maxwell", "Weaver", "Frost", "Carter", "Dunn", "Schneider", "Steele", "Thornton", "Conway"];
  var _genders = [1, 2];

  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var data = [];

  for (var i = 0; i < 200; i++) {
    var phone = _getRandomNumber(0, 99);

    data.push([i + 1, {
      "id": i + 1,
      "name": _names[_getRandomNumber(0, _names.length)],
      "surname": _surnames[_getRandomNumber(0, _surnames.length)],
      "phone": "555-01" + (phone.toString().length > 1 ? phone : "0" + phone),
      "age": _getRandomNumber(16, 80),
      "gender": _genders[_getRandomNumber(0, _genders.length)]
    }]);
  }

  var model = new UIKernel.Models.Grid.Collection({
    data: data,
    filtersHandler: function (data, filters) {
      return data.filter(function (record) {
        var data = record[1];

        if (filters.search) {
          var found = (
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
    },
    validation: Validation,
    requiredFields: ["name", "surname", "phone", "age", "gender"]
  });

  model.delete = function (id) {
    this.data = _.reject(this.data, function (record) {
      return record[0] === id;
    });
    return id;
  };

  return model;
})();

module.exports = model;