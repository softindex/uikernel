/**
 * Copyright 2015, SoftIndex LLC.
 */
var model = (function () {

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
      return filters ? data.filter(function (item) {
        item = item[1];

        var search = (filters.search || '').toLowerCase();
        var isSuitable = true;

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
      }) : data;
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