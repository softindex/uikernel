import UIKernel from 'uikernel';
import validator from './validation';

const model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {id: 1, name: "Sonya", surname: "Weaver", phone: "555-0159", age: 59, gender: 2}],
    [2, {id: 2, name: "Bates", surname: "Weaver", phone: "555-0144", age: 54, gender: 2}],
    [3, {id: 3, name: "Rodriguez", surname: "Terrell", phone: "555-0146", age: 40, gender: 1}]
    // ...
  ],
  filtersHandler(data, filters) {
    return data.filter((record) => {
      const data = record[1];

      if (filters.search) {
        const found = (
          data.name.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
          data.surname.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0 ||
          data.phone.indexOf(filters.search) >= 0
        );

        if (!found) {
          return false
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
  validator,
  requiredFields: ["name", "surname", "phone", "age", "gender"]
});
model.delete = function (id) {
  this.data = this.data.filter((record) => record[0] !== id);
  return Promise.resolve(id);
};

export default model