---
title: Creating records
id: creating-records
prev: removing-records.html
next: server-side.html
---

* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/creating-records/){:target="_blank"}

First, let's create a form for adding new records to our grid.

`CreateForm.js`:
{% highlight javascript %}
import React from 'react';
import UIKernel from 'uikernel';
import model from '../model';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = new UIKernel.Form();
    this.state = this.form.getAll();                     //get all data from the Form Service
    this.onFormChange = this.onFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ..
}
{% endhighlight %}

Inside the constructor we've defined the `form` prop and bound the `onFormChange` and `handleSubmit` methods.
The value of `form` is an instance of `UIKernel.Form`.

---

{% highlight javascript %}
// ...
componentDidMount() {
  this.form.init({
    fields: ['name', 'surname', 'phone', 'age', 'gender'],
    model: new UIKernel.Adapters.Grid.ToFormCreate(model, { // default field values
      name: '',
      surname: '',
      phone: '',
      age: 18,
      gender: 1
    }),
    submitAll: true,
    partialErrorChecking: true
  });
  this.form.addChangeListener(this.onFormChange);
}
// ...
{% endhighlight %}

Here, we've called `this.form.init` and `this.form.addChangeListener`.

`addChangeListener` adds a listener for `update` event.

`init` initializes a form. It takes in one argument - an object with settings.

The `fields` property defines form fields.

The `model` property defines the form model. To create the form model, we've called `UIKernel.Adapters.Grid.ToFormCreate`
with grid model and an object of default field values as arguments.

`submitAll: true` means that all form fields will be validated.

`partialErrorChecking: true` means that the form fields will be validated in response to user input.

Note that the form uses the validation rules we've specified before.

---

{% highlight javascript %}
// ...
componentWillUnmount() {
  this.form.removeChangeListener(this.onFormChange);
}

onFormChange(newFormState) {
  this.setState(newFormState);
}

// ...
{% endhighlight %}

Inside `componentWillUnmount` we've removed an event listener by calling `this.form.removeChangeListener`.

The `onFormChange` method is called when form data changes.

---

{% highlight javascript %}
// ...
handleSubmit(e) {
  e.preventDefault();
  this.form.submit() // create a new record
    .then((recordId) => {
      this.props.onSubmit(recordId)
    })
    .catch((err) => {
      console.log(err);
    });
}

// ...
{% endhighlight %}

`handleSubmit` calls the `this.form.submit` method which sends data to our model.
On successful submission, the  callback from  `MainComponent` is invoked.

---

{% highlight javascript %}
// ...
render() {
  if (!this.state.isLoaded) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <form className="form-horizontal edit-form" onSubmit={this.handleSubmit}>
        <div className={"form-group" + (this.state.fields.name.isChanged ? ' changed' : '') +
        (this.state.fields.name.errors.length ? ' error' : '')}>
          <label className="col-sm-3 control-label">First Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              placeholder="Alyx"
              className="form-control"
              onChange={this.form.updateField.bind(this.form, 'name')}
              onFocus={this.form.clearValidation.bind(this.form, 'name')}
              onBlur={this.form.validateForm}
              value={this.state.fields.name.value}
            />
            {Boolean(this.state.fields.name.errors.length) &&
            <small className="control-label">{this.state.fields.name.errors[0]?.message}</small>}
          </div>
        </div>
        <div
          className={"form-group" + (this.state.fields.surname.isChanged ? ' changed' : '') +
          (this.state.fields.surname.errors.length ? ' error' : '')}>
          <label className="col-sm-3 control-label">Last Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              placeholder="Vance"
              className="form-control"
              onChange={this.form.updateField.bind(this.form, 'surname')}
              onFocus={this.form.clearValidation.bind(this.form, 'surname')}
              onBlur={this.form.validateForm}
              value={this.state.fields.surname.value}
            />
            {Boolean(this.state.fields.surname.errors.length) &&
            <small className="control-label">{this.state.fields.surname.errors[0]?.message}</small>}
          </div>
        </div>
        <div
          className={"form-group" + (this.state.fields.phone.isChanged ? ' changed' : '') +
          (this.state.fields.phone.errors.length ? ' error' : '')}>
          <label className="col-sm-3 control-label">Phone</label>
          <div className="col-sm-9">
            <input
              type="text"
              placeholder="555-0100"
              className="form-control"
              onChange={this.form.updateField.bind(this.form, 'phone')}
              onFocus={this.form.clearValidation.bind(this.form, 'phone')}
              onBlur={this.form.validateForm}
              value={this.state.fields.phone.value}
            />
            {Boolean(this.state.fields.phone.errors.length) &&
            <small className="control-label">{this.state.fields.phone.errors[0]?.message}</small>}
          </div>
        </div>
        <div
          className={"form-group" + (this.state.fields.age.isChanged ? ' changed' : '') +
          (this.state.fields.age.errors.length ? ' error' : '')}>
          <label className="col-sm-3 control-label">Age</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Number
              placeholder="18"
              className="form-control"
              onChange={this.form.updateField.bind(this.form, 'age')}
              onFocus={this.form.clearValidation.bind(this.form, 'age')}
              onBlur={this.form.validateForm}
              value={this.state.fields.age.value}
            />
            {Boolean(this.state.fields.age.errors.length) &&
            <small className="control-label">{this.state.fields.age.errors[0]?.message}</small>}
          </div>
        </div>
        <div
          className={"form-group" + (this.state.fields.gender.isChanged ? ' changed' : '')}>
          <label className="col-sm-3 control-label">Gender</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Select
              options={[
                [1, 'Male'],
                [2, 'Female']
              ]}
              className="form-control"
              onChange={this.form.updateField.bind(this.form, 'gender')}
              onFocus={this.form.clearValidation.bind(this.form, 'gender')}
              onBlur={this.form.validateForm}
              value={this.state.fields.gender.value}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="button" className="btn btn-success" onClick={this.form.clearChanges}>
              Clear
            </button>
            {' '}
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateForm
{% endhighlight %}

All inputs have the `onChange`, `onFocus`, and `onBlur` props with callbacks set.

`this.form.updateField` updates the field value.

`this.form.clearValidation` clears the field error mark.

`this.form.validateForm` validates the form.

Using the ternary operator, we dynamically add classes to our elements.
The ternary operator allows us to specify two different classes, one if a function returns true and one for false.

`this.state.fields['<field-name>'].errors` holds an array of validation errors for the form field '\<field-name\>'.

`this.state.fields['<field-name>'].errors === null` if there is no errors in the form field '\<field-name\>'.

`this.state.fields['<field-name>'].isChanged` indicates if the form field '\<field-name\>' has been changed.

---

Now let’s open the main.css file and add there the following code:

{% highlight javascript %}
.form-group.changed input{
    background-color: #ffff38;
}
.form-group.error input{
    background-color: #ff8689;
}
{% endhighlight %}

---

Next up, let's modify `MainComponent`.

`MainComponent.js`:
{% highlight javascript %}

// ...

import CreateForm from './CreateForm';

highlightNewRecord(recordId) {
  this.grid.addRecordStatus(recordId, 'new'); // mark the record as new
}

// ...

render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Add record</h3>
              </div>
              <div className="panel-body">
                <CreateForm
                  onSubmit={(recordId) => this.highlightNewRecord(recordId)}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Filters</h3>
              </div>
              <div className="panel-body">
                <FiltersForm filters={this.state.filters}
                  onChange={(filters) => this.onFiltersChange(filters)}
                  onClear={() => this.onFiltersChange(DEFAULT_FILTERS)}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Records</h3>
              </div>
              <UIKernel.Grid
                ref={(grid) => this.grid = grid}
                model={this.state.model}
                columns={columns}
                viewCount={10}
                defaultSort={
                  {
                    column: "name",
                    direction: "asc"
                  }
                }
              />
              <div className="panel-footer">
                <a href="#" className="btn btn-success" onClick={() => this.clearChanges()}>Clear</a>
                {' '}
                <a href="#" className="btn btn-primary" onClick={() => this.saveChanges()}>Save</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
{% endhighlight %}

Here, we've defined the `highlightNewRecord` and `updateCreateFormState` methods and changed the `render` method.

`highlightNewRecord` is called after successful submitting of `CreateForm`. It highlights new records.

`updateCreateFormState` is called when `CreateForm` data changes. It updates `this.state.createFormState`.

---

Finally, let's modify the `model.js` file:

{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  // ...
  requiredFields: ["name", "surname", "phone", "age", "gender"]
});
{% endhighlight %}
---

## Conclusion
Using UIKernel, we’ve built an editable grid which has sorting, filtering and pagination without too much work.
The capabilities of UIKernel go beyond what we’ve seen here. Check out more examples [here](../examples){:target="_blank"}.

