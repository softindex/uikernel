# UIKernel

UIKernel is a lib, built in React, with a CRUD wrapper for building complex admin dashboards.

UIKernel tries to avoid unnecessary abstractions, giving you the opportunity to define a model as you want. Nevertheless, it includes basic implementation examples that work with client data and models linking server and client interface using API.

## Features

* **Data Grid**

  * **Interact with data.** You can set up grid not only to display data but to add new records, update or delete them.

  * **Filtering.** UIKernel grid supports filtering by different fields.

  * **Sorting & pagination.** Sort data by default order or by user choice and paginate the data.

  * **Data export.** Export grid data in JSON or CSV formats for further interaction.

  * **Bulk operations.**

* **Forms**

  * **Form management.** `FormService` and `@connectForm` decorator simplify development of forms.

  * **Grid to Form model adapters**. You can use Grid models in forms.

* **Validation.** Use UIKernel validators to check fields on client, or both on client and the server. Also supports custom validation rules.

* **Data source.** Pass data from a static array, a REST service or any other source to the UIKernel model.

* **Convenient inputs.** Each form input or grid cell can be edited, including: a date picker, suggest box, number, select, checkbox.

* **Synchronize multiple components.** Automatic synchronization of multiple forms and grids with a shared data model.

## Documentation

You can find the full documentation on the [website](http://uikernel.io).

* [Overview](http://uikernel.io/docs/overview.html)
* [Quick Start](http://uikernel.io/docs/getting-started.html)
* [Tutorial](http://uikernel.io/docs/tutorial.html)
* [Server Tutorial](http://uikernel.io/docs/server-side.html)
* [Editors](http://uikernel.io/docs/editors.html)
* [Grid](http://uikernel.io/docs/grid-component.html)
* [Form](http://uikernel.io/docs/form-service.html)
* [Validation](http://uikernel.io/docs/validator.html)

## Examples

We have examples on the [website](http://uikernel.io/examples/index.html).

## Getting Started

To get started:

1. Setup Create React App in terminal

```bash
# Setup React boilerplate
npm install -g create-react-app
create-react-app react-app
cd react-app

# Install UIKernel
npm i uikernel
```

2. Open up `src/index.js` and replace all with:

```jsx
 import React from 'react';
 import ReactDOM from 'react-dom';
 import UIKernel from 'uikernel';
 import 'uikernel/themes/base/main.css';

 // You can implement own data source with GridModel interface
 const model = new UIKernel.Models.Grid.Collection({
   data: [
     [1, {
       name: 'Pace',
       surname: 'White',
       age: 20
     }],
     [2, {
       name: 'Evangeline',
       surname: 'Terrell',
       age: 72
     }],
     [3, {
       name: 'Roach',
       surname: 'Potts',
       age: 14
     }]
   ]
 });

 const columns = {
   name: {
     name: 'First Name',
     render: ['name', record => record.name]
   },
   surname: {
     name: 'Last Name',
     render: ['surname', record => record.surname]
   },
   age: {
     name: 'Age',
     render: ['age', record => record.age]
   }
 };

 ReactDOM.render(
   <UIKernel.Grid columns={columns} model={model}/>,
   document.getElementById('root')
 );
```

3. Try it out using `npm start`

As you can see, we've passed `UIKernel.Grid` two props: `columns` and `model`. We've defined these props in the `columns` and `model` script parts as you can see in comments.

Then, to create a grid model, we've used [UIKernel.Models.Grid.Collection](http://uikernel.io/docs/grid-model-collection.html).

And that's all. Here's the [live demo](http://uikernel.io/examples/getting-started/) and [code](https://github.com/softindex/uikernel/tree/master/examples/getting-started).
