/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const NAMES = ["Pace", "Evangeline", "Roach", "Thornton", "Concepcion", "Francine", "Kelsey", "Deanna", "Bates", "Acosta", "Stacey", "Adams", "Rodriguez", "Nona", "Humphrey", "Mitchell", "Murray", "Sonya", "Addie", "Angelica"];
const SURNAMES = ["White", "Terrell", "Potts", "English", "Sanders", "Poole", "Bates", "Snow", "Simon", "Kaufman", "Kelly", "Maxwell", "Weaver", "Frost", "Carter", "Dunn", "Schneider", "Steele", "Thornton", "Conway"];
const GENDERS = [1, 2];
function generateInitialData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const phone = getRandomNumber(0, 99);
    data.push([i + 1, {
      "id": i + 1,
      "name": NAMES[getRandomNumber(0, NAMES.length)],
      "surname": SURNAMES[getRandomNumber(0, SURNAMES.length)],
      "phone": "555-01" + (phone.toString().length > 1 ? phone : "0" + phone),
      "age": getRandomNumber(16, 80),
      "gender": GENDERS[getRandomNumber(0, GENDERS.length)]
    }]);
  }

  return data;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default generateInitialData;
