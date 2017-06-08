/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const model = (function () {
  const _names = ['Pace', 'Evangeline', 'Roach', 'Thornton', 'Concepcion', 'Francine', 'Kelsey', 'Deanna', 'Bates', 'Acosta', 'Stacey', 'Adams', 'Rodriguez', 'Nona', 'Humphrey', 'Mitchell', 'Murray', 'Sonya', 'Addie', 'Angelica'];
  const _surnames = ['White', 'Terrell', 'Potts', 'English', 'Sanders', 'Poole', 'Bates', 'Snow', 'Simon', 'Kaufman', 'Kelly', 'Maxwell', 'Weaver', 'Frost', 'Carter', 'Dunn', 'Schneider', 'Steele', 'Thornton', 'Conway'];
  const _genders = [1, 2];

  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const data = [];

  for (var i = 0; i < 20; i++) {
    let phone = _getRandomNumber(0, 99);

    data.push([i + 1, {
      id: i + 1,
      name: _names[_getRandomNumber(0, _names.length)],
      surname: _surnames[_getRandomNumber(0, _surnames.length)],
      phone: '555-01' + (phone.toString().length > 1 ? phone : '0' + phone),
      age: _getRandomNumber(16, 80),
      gender: _genders[_getRandomNumber(0, _genders.length)]
    }]);
  }

  return new UIKernel.Models.Grid.Collection({
    data
  });
})();