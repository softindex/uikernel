---
title: Overview
id: overview
prev: getting-started.html
next: tutorial.html
---

### Intention
The main aim of the library is to facilitate creating data driven UI in React.js
with both front-end and back-end data sources.

### Use cases:
1. Easily implement data driven spreadsheets(grids) with capabilities of:
  - [Sorting and pagination](/docs/sorting-and-pagination.html)
  - [Table cells inplace-editing](/docs/editing-grid-data.html)
  - [Records selection and bulk operations](/docs/bulk-operations.html)
  - [Automatic synchronization of multiple forms and grids with a shared data model](/docs/data-binding.html)
  - [Synchronization of grid data between client and server](/docs/server-side.html)
  - [Exporting of table records into JSON and CSV](/docs/grid-export.html)
  - and more
2. Implement form validation: [Form Service](/docs/docs/form-service.html) + [Validator](/docs/validator.html)
  - synchronous client side validation in React
  - async server side validation
  - [typical validation Rules out of the box](/docs/validator.html#built-in-validation-rules)
  - complex validation rules for dependent fields(e.g. combination of fields 'name' + 'surname' must be unique)

### Library Elements

{% highlight html tabsize=2 %}
<UIKernel.Grid
  model={model}
  cols={columns}
  ref={(grid) => this.grid = grid}
  {/*some other props*/}
/>

//somewhere else
this.grid.someGridMethod();
{% endhighlight %}
1. GRID - means for creating data driven spreadsheets.
   It consists of independent front-end end back-end parts:
- At front-end there is
 [React `Grid` component](/docs/grid-component.html) which
 accepts as properties `model` with [Grid data model](/docs/grid-interface.html)
 (either client-side [Collection model](/docs/grid-model-collection.html) or
 [XHR Model](/docs/grid-model-xhr.html) which syncs data with a server) and `columns` with
 [table columns configuration object](/docs/grid-columns.html).
 Also React `Grid` component accepts some other
 [table configuration properties](/docs/grid-component.html#properties)
 and has [some useful methods](/docs/grid-component.html#methods). 
- There are also special [adapters](/docs/grid-adapters.html) to adapt Grid model to From model.
- At back-end there is useful [express.js API](/docs/grid-express-api.html) which helps to
make communication with front-end easier. But it isn't mandatory to use express.js - you can
implement similar REST API with any other framework and back-end platform.
Here is [an example how to use server-side API](/docs/server-side.html)

2. Forms - means for managing your your React forms behaviour
   - At front-end there is
     - [Form service](/docs/form-service.html) helps to manage your React forms behaviour(especially add validation there)
     - [Form model](/docs/form-interface.html) helps to manage your forms data model
        - [Client model](/docs/form-model.html) - works locally
        - [Form XHR Model](/docs/form-xhr-model.html) -  interacts with a server API
   - At backend there is useful [express.js API](/docs/form-express-api.html)
     which helps to implement REST API for synchronization of form data model between
     front-end and back-end parts of your app.
     But it isn't mandatory to use express.js for this purposes as well.

3. [Validator](/docs/validator.html) - provides a handy way to validate
   your form fields(wherever at front-end or back-end)

4. [Editors](/docs/editors.html) - several frequently used React
   widgets(DatePicker, SuggestBox, etc.)

5. Lists [data model](/docs/list-model.html) and corresponding
   [express.js API](/docs/list-express-api.html) which helps to implement provision
   of data for lists widgets like Select and SuggestBox.


### Module structure
UIKernel library has the following structure:

{% highlight javascript %}
UIKernel = {
  gridExpressApi,
  listExpressApi,
  formExpressApi,
  createValidator,
  toCSV,
  applyGridFilters,
  Grid,
  Form,
  createValidator.create,
  exportGridData,
  toJSON,
  Models: {
    Grid: {
      Xhr,
      Collection
    },
    Events,
    Form,
    FormXhr,
    ValidationErrors,
    List: {
      Xhr
    }
  },
  AbstractModels: {
    Form,
    Grid,
    List
  },
  Adapters: {
    Grid: {
      ToFormUpdate,
      ToFormCreate
    }
  },
  Editors: {
    Select,
    SuggestBox,
    DatePicker,
    Checkbox,
    Number
  },
  ArgumentsError,
  ThrottleError,
  Validators: {
    boolean,
    date,
    enum,
    set,
    float,
    regExp,
    notNull,
    number,
    notEmpty
  }
}
{% endhighlight %}
