/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Random GridModel for Grid

var model = (function () {
  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function _getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function _getRandomRecords(size) {
    var _login = ['White', 'Terrell', 'Potts', 'English', 'Sanders', 'Poole', 'Bates', 'Snow', 'Simon', 'Kaufman', 'Kelly', 'Maxwell', 'Weaver', 'Frost', 'Carter', 'Dunn', 'Schneider', 'Steele', 'Thornton', 'Conway'];
    var _names = ['Pace', 'Evangeline', 'Roach', 'Thornton', 'Concepcion', 'Francine', 'Kelsey', 'Deanna', 'Bates', 'Acosta', 'Stacey', 'Adams', 'Rodriguez', 'Nona', 'Humphrey', 'Mitchell', 'Murray', 'Sonya', 'Addie', 'Angelica'];
    var _phoneSuffixes = [20, 72, 14, 62, 25, 64, 34, 57, 15, 62, 51, 21, 37, 57, 61, 41, 76, 32, 68, 14];
    var records = [['AF', 'Afghanistan'], ['AX', 'Aland Islands Åland Islands'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AS', 'American Samoa'], ['AD', 'Andorra'], ['AO', 'Angola'], ['AI', 'Anguilla'], ['AQ', 'Antarctica'], ['AG', 'Antigua and Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AW', 'Aruba'], ['AU', 'Australia'], ['AT', 'Austria'], ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'], ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BY', 'Belarus'], ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'], ['BT', 'Bhutan'], ['BO', 'Bolivia Bolivia, Plurinational state of'], ['BA', 'Bosnia and Herzegovina'], ['BW', 'Botswana'], ['BV', 'Bouvet Island'], ['BR', 'Brazil'], ['IO', 'British Indian Ocean Territory'], ['BN', 'Brunei Darussalam'], ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'], ['BI', 'Burundi'], ['KH', 'Cambodia'], ['CM', 'Cameroon'], ['CA', 'Canada'], ['CV', 'Cape Verde'], ['KY', 'Cayman Islands'], ['CF', 'Central Afri'], ['IT', 'Italy']];

    var data = [];

    for (var i = 0; i < size; i++) {
      var randomCountryIndex = _getRandomNumber(1, records.length);
      data.push([i, {
        'login': _login[_getRandomNumber(0, _login.length)],
        'birthday': _getRandomDate(new Date('1970-01-01'), new Date('2000-01-01')),
        'email': _login[_getRandomNumber(0, _login.length)].concat('@mail.com'),
        'name': _names[_getRandomNumber(0, _names.length)],
        'phone': '555-01' + _phoneSuffixes[_getRandomNumber(0, _phoneSuffixes.length)],
        'country': records[randomCountryIndex][0],
        'countryName': records[randomCountryIndex][1],
        'countries': [records[randomCountryIndex][0], records[1][0]],
        'countriesText': records[randomCountryIndex][1] + ',' + (records[1][1])
      }
      ]);
    }

    return data;
  }

  return new UIKernel.Models.Grid.Collection({
    data: _getRandomRecords(150),
    validation: validation
  });
})();


