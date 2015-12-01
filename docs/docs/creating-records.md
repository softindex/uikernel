---
title: Creating records
id: creating-records
prev: removing-records.html
next: editors.html
---

* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/creating-records){:target="_blank"}

First, let's create a form for adding new records to our grid. Open your `CreateFormComponent.jsx` file and paste there the following code:

{% highlight javascript %}
var CreateFormComponent = React.createClass({
  mixins: [UIKernel.Mixins.Form],
  componentDidMount() {
    this.initForm({
      fields: ['name', 'surname', 'phone', 'age', 'gender'],
      model: UIKernel.Adapters.Grid.toFormCreate(model, { // pass it default field values
        name: '',
        surname: '',
        phone: '',
        age: '',
        gender: 1
      }),
      submitAll: true,
      partialErrorChecking: true
    });
  },
  save: function (e) {
    e.preventDefault();
    this.submit(function (err, recordId) {
      if (!err) {
        this.props.onSubmit(recordId);
      }
    }.bind(this));
  },
  render: function () {
    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }

    var data = this.getData();
    var globalError = this.getGlobalError();

    return (
      <div>
        {globalError ? globalError.message : ''}
        <form className="form-horizontal edit-form" onSubmit={this.save}>
          <div className={"form-group" + (this.hasChanges('name') ? ' changed' : '') + (this.hasError('name') ? ' error' : '')}>
            <label className="col-sm-3 control-label">First Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Alyx"
                className="form-control"
                onChange={this.updateField.bind(null, 'name')}
                onFocus={this.clearError.bind(null, 'name')}
                onBlur={this.validateForm}
                value={data.name}
              />
            </div>
          </div>
          <div className={"form-group" + (this.hasChanges('surname') ? ' changed' : '') + (this.hasError('surname') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Last Name</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="Vance"
                className="form-control"
                onChange={this.updateField.bind(null, 'surname')}
                onFocus={this.clearError.bind(null, 'surname')}
                onBlur={this.validateForm}
                value={data.surname}
              />
            </div>
          </div>
          <div className={"form-group" + (this.hasChanges('phone') ? ' changed' : '') + (this.hasError('phone') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Phone</label>
            <div className="col-sm-9">
              <input
                type="text"
                placeholder="555-0100"
                className="form-control"
                onChange={this.updateField.bind(null, 'phone')}
                onFocus={this.clearError.bind(null, 'phone')}
                onBlur={this.validateForm}
                value={data.phone}
              />
            </div>
          </div>
          <div className={"form-group" + (this.hasChanges('age') ? ' changed' : '') + (this.hasError('age') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Age</label>
            <div className="col-sm-9">
              <input
                type="number"
                placeholder="18"
                className="form-control"
                onChange={this.updateField.bind(null, 'age')}
                onFocus={this.clearError.bind(null, 'age')}
                onBlur={this.validateForm}
                value={data.age}
              />
            </div>
          </div>
          <div className={"form-group" + (this.hasChanges('gender') ? ' changed' : '') + (this.hasError('gender') ? ' error' : '')}>
            <label className="col-sm-3 control-label">Gender</label>
            <div className="col-sm-9">
              <UIKernel.Editors.Select
                options={[
                  [1, 'Male'],
                  [2, 'Female']
                ]}
                className="form-control"
                onChange={this.updateField.bind(null, 'gender')}
                onFocus={this.clearError.bind(null, 'gender')}
                onBlur={this.validateForm}
                value={data.gender}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-9">
              <button type="button" className="btn btn-success" onClick={this.clearChanges}>
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
});
{% endhighlight %}
---

Here, we're using the `UIKernel.Mixins.Form` mixin.

We initialize our form by calling `initForm` in `componentDidMount`. The argument passed to `initForm` is an object with settings.
The `fields` property contains an array of form field names.
In the `model` property, we call `UIKernel.Adapters.Grid.toFormCreate` to create a model, which uses the grid model for creating new records.
We pass it our grid model and an object of default field values as arguments.
`submitAll: true` means that all form will be sent for validation, `partialErrorChecking: true` - that the form fields will be validated in response to user input.

Note that the form uses validation rules we've specified before. You can also mark the fields as changed or invalid.

In the `save` method, we call `submit`, which sends data to our model.
If `submit` is successful, the  callback from  `MainComponent` will be invoked.

In `render`, we call `isLoaded` to check if data loaded, `getData` to get the form data, and `getGlobalError` to get global errors if there are any.

All inputs have the `onChange`, `onFocus`, and `onBlur` props with callbacks set.

`updateField` updates the field value.

`clearError` clears the field error mark.

`validateForm` validates the form.

Using the ternary operator, we dynamically add classes to our elements.
The ternary operator allows us to specify two different classes, one if a function returns true and one for false.

`hasError` checks if a form field has validity errors.

`hasChanges` checks if a form field has been changed.

---

Now let's open our `main.css` and add there the following code:
{% highlight javascript %}
.edit-form .changed {
    background-color: #ffff38;
}
.edit-form .error {
    background-color: #ff8689;
}
{% endhighlight %}
---

Next up, let's modify `MainComponent` by adding it a new method named `addRecord`. It will be invoked as soon as the form is submitted.

`MainComponent.jsx`:
{% highlight javascript %}
addRecord: function (recordId) {
  this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
}

// ...
{% endhighlight %}
---

Additionally, we'll initialize our form and pass it the `onSubmit` property.
{% highlight javascript %}
// ...
<div className="col-sm-8">
  <div className="panel panel-primary">
    <div className="panel-heading">
      <h3 className="panel-title">Add record</h3>
    </div>
    <div className="panel-body">
      <CreateFormComponent
        onSubmit={this.addRecord}
      />
    </div>
  </div>
</div>
//...
{% endhighlight %}
---

Finally, let's add the `requiredFields` property to our model.

`model.js`:
{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  // ...
  requiredFields: ["name", "surname", "phone", "age", "gender"]
});

model.delete = function (id) {
  this.data = _.reject(this.data, function (record) {
    return record[0] === id;
  });
  return id;
};
{% endhighlight %}
---

## Conclusion
Using UIKernel, we’ve built an editable grid, which has sorting, filtering and pagination, without too much work.
The capabilities of UIKernel go beyond what we’ve seen here. Check out more examples [here](../examples){:target="_blank"}.

