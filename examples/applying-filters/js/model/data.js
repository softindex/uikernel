/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function _getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomRecords(size) {
  var _names = ['Pace', 'Evangeline', 'Roach', 'Thornton', 'Concepcion', 'Francine', 'Kelsey', 'Deanna', 'Bates', 'Acosta', 'Stacey', 'Adams', 'Rodriguez', 'Nona', 'Humphrey', 'Mitchell', 'Murray', 'Sonya', 'Addie', 'Angelica'];
  var _phoneSuffixes = [20, 72, 14, 62, 25, 64, 34, 57, 15, 62, 51, 21, 37, 57, 61, 41, 76, 32, 68, 14];
  var _ages = [62, 47, 80, 79, 53, 74, 80, 39, 60, 55, 76, 42, 67, 70, 38, 64, 40, 43, 49, 62];
  var _genders = [1, 2];
  var records = [['AF', 'Afghanistan'], ['AX', 'Aland Islands Åland Islands'], ['AL', 'Albania'], ['DZ', 'Algeria'], ['AS', 'American Samoa'], ['AD', 'Andorra'], ['AO', 'Angola'], ['AI', 'Anguilla'], ['AQ', 'Antarctica'], ['AG', 'Antigua and Barbuda'], ['AR', 'Argentina'], ['AM', 'Armenia'], ['AW', 'Aruba'], ['AU', 'Australia'], ['AT', 'Austria'], ['AZ', 'Azerbaijan'], ['BS', 'Bahamas'], ['BH', 'Bahrain'], ['BD', 'Bangladesh'], ['BB', 'Barbados'], ['BY', 'Belarus'], ['BE', 'Belgium'], ['BZ', 'Belize'], ['BJ', 'Benin'], ['BM', 'Bermuda'], ['BT', 'Bhutan'], ['BO', 'Bolivia Bolivia, Plurinational state of'], ['BA', 'Bosnia and Herzegovina'], ['BW', 'Botswana'], ['BV', 'Bouvet Island'], ['BR', 'Brazil'], ['IO', 'British Indian Ocean Territory'], ['BN', 'Brunei Darussalam'], ['BG', 'Bulgaria'], ['BF', 'Burkina Faso'], ['BI', 'Burundi'], ['KH', 'Cambodia'], ['CM', 'Cameroon'], ['CA', 'Canada'], ['CV', 'Cape Verde'], ['KY', 'Cayman Islands'], ['CF', 'Central Afri'], ['IT', 'Italy']];

  var data = [];

  for (var i = 0; i < size; i++) {
    var randomCountryIndex = _getRandomNumber(1, records.length);
    data.push([i, {
      'name': _names[_getRandomNumber(0, _names.length)],
      'surname': _names[_getRandomNumber(0, _names.length)],
      'age': _ages[_getRandomNumber(0, _ages.length)],
      'gender': _genders[_getRandomNumber(0, _genders.length)],
      'phone': '555-01' + _phoneSuffixes[_getRandomNumber(0, _phoneSuffixes.length)]
    }
    ]);
  }

  return data;
}

var data = getRandomRecords(100);