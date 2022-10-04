const columns = {
  name: {
    name: 'First Name', // column title
    render: ['name', record => record.name] // method for rendering of table cells
  },
  surname: {
    name: 'Last Name',
    render: ['surname', record => record.surname]
  },
  phone: {
    name: 'Phone',
    render: ['phone', record => record.phone]
  },
  age: {
    name: 'Age',
    render: ['age', record => record.age]
  },
  gender: {
    name: 'Gender',
    render: ['gender', (record) => {
      switch (record.gender) {
        case 1:
          return 'Male';
        case 2:
          return 'Female';
        default:
          return 'Undefined';
      }
    }]
  }
};
export default columns