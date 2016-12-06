---
title: Creating records
id: creating-records
prev: removing-records.html
next: server-side.html
---

* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{ site.github }}/examples/creating-records){:target="_blank"}

First, let's create a form for adding new records to our grid. Open your `CreateFormComponent.js` file and paste there the following code:

{% highlight javascript %}
var CreateFormComponent = React.createClass({
  getInitialState: function () {
      this.form = new UIKernel.Form();
      return null;
    },

    componentDidMount() {
      this.form.init({
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
      this.form.addChangeListener(this.onFormChange);
    },

    componentWillUnmount() {
      this.form.removeChangeListener(this.onFormChange);
    },

    onFormChange(newFormState) {
      this.props.stateHandler(newFormState);
    },

    save: function (e) { // save record handler
      e.preventDefault();
      this.form.submit()
        .then((recordId) => {
          this.props.onSubmit(recordId)
        });
    },

    render: function () {
      if (!this.props.state.isLoaded) {
        return <span>Loading...</span>;
      }

      return (
        <div>
          {this.props.state.globalError ? this.props.state.globalError.message : ''}
          <form className="form-horizontal edit-form" onSubmit={this.save}>
            <div
              className={"form-group" + (this.props.state.changes.name ? ' changed' : '') + (this.props.state.errors.name ? ' error' : '')}>
              <label className="col-sm-3 control-label">First Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  placeholder="Alyx"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form,'name')}
                  onFocus={this.form.clearError.bind(this.form, 'name')}
                  onBlur={this.form.validateForm}
                  value={this.props.state.data.name}
                />
              </div>
            </div>
            <div
              className={"form-group" + (this.props.state.changes.surname ? ' changed' : '') + (this.props.state.errors.surname ? ' error' : '')}>
              <label className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  placeholder="Vance"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form,'surname')}
                  onFocus={this.form.clearError.bind(this.form, 'surname')}
                  onBlur={this.form.validateForm}
                  value={this.props.state.data.surname}
                />
              </div>
            </div>
            <div
              className={"form-group" + (this.props.state.changes.phone ? ' changed' : '') + (this.props.state.errors.phone ? ' error' : '')}>
              <label className="col-sm-3 control-label">Phone</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  placeholder="555-0100"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form,'phone')}
                  onFocus={this.form.clearError.bind(this.form, 'phone')}
                  onBlur={this.form.validateForm}
                  value={this.props.state.data.phone}
                />
              </div>
            </div>
            <div
              className={"form-group" + (this.props.state.changes.age ? ' changed' : '') + (this.props.state.errors.age ? ' error' : '')}>
              <label className="col-sm-3 control-label">Age</label>
              <div className="col-sm-9">
                <input
                  type="number"
                  placeholder="18"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form,'age')}
                  onFocus={this.form.clearError.bind(this.form, 'age')}
                  onBlur={this.form.validateForm}
                  value={this.props.state.data.age}
                />
              </div>
            </div>
            <div
              className={"form-group" + (this.props.state.changes.gender ? ' changed' : '') + (this.props.state.errors.gender ? ' error' : '')}>
              <label className="col-sm-3 control-label">Gender</label>
              <div className="col-sm-9">
                <UIKernel.Editors.Select
                  options={[
                    [1, 'Male'],
                    [2, 'Female']
                  ]}
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form,'gender')}
                  onFocus={this.form.clearError.bind(this.form, 'gender')}
                  onBlur={this.form.validateForm}
                  value={this.props.state.data.gender}
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
});
{% endhighlight %}
---

Here, we're using the `UIKernel.Services.Form` service.

We create instance of form service and initialize our form by calling `initForm` in `componentDidMount`. The argument passed to `init` is an object with settings.
The `fields` property contains an array of form field names.
In the `model` property, we call `UIKernel.Adapters.Grid.toFormCreate` to create a model, which uses the grid model for creating new records.
We pass it our grid model and an object of default field values as arguments.
`partialErrorChecking: true` means that the form fields will be validated in response to user input.

Note that the form uses validation rules we've specified before.

In the `save` method, we call `submit`, which sends data to our model.
If `submit` is successful, the  callback from  `MainComponent` will be invoked.

In `render`, we use `isLoaded` to check if data loaded, `getData` to get the form data, and `getGlobalError` to get global errors if there are any.

All inputs have the `onChange`, `onFocus`, and `onBlur` props with callbacks set.

`updateField` updates the field value.

`clearError` clears the field error mark.

`validateForm` validates the form.

Using the ternary operator, we dynamically add classes to our elements.
The ternary operator allows us to specify two different classes, one if a function returns true and one for false.

`hasError` checks if a form field has validity errors.

`hasChanges` checks if a form field has been changed.

---

Now let's open the `main.css` file and add there the following code:
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

`MainComponent.js`:
{% highlight javascript %}
getInitialState: function () {
    return {
      model: model,
      createForm: {}
    };
},

addRecord: function (recordId) {
  this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
}

onCreateFormStateHandler: function (newFormState) {
    this.setState({createForm: newFormState});
},

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
        stateHandler={this.onCreateFormStateHandler}
        state={this.state.createForm}
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

