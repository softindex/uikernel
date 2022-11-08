import React from "react";
import UIKernel from "uikernel";

const model = new UIKernel.Models.Grid.Collection({
  data: [
    [
      1,
      {
        name: "Pace",
        surname: "White",
        age: 20
      }
    ],
    [
      2,
      {
        name: "Evangeline",
        surname: "Terrell",
        age: 72
      }
    ],
    [
      3,
      {
        name: "Roach",
        surname: "Potts",
        age: 14
      }
    ]
  ]
});

const columns = {
  name: {
    name: "First Name",
    render: ["name", record => record.name]
  },
  surname: {
    name: "Last Name",
    render: ["surname", record => record.surname]
  },
  age: {
    name: "Age",
    render: ["age", record => record.age]
  }
};

export default () => <UIKernel.Grid columns={columns} model={model} />;
