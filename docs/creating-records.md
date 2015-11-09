---
title: Creating records
id: creating-records
prev: removing-records.html
next: editors.html
---

The finishing touch will be a create record form.

* [Live demo](/examples/creating-records/){:target="_blank"}
* [Code]({{site.github}}_site/examples/creating-records)

### Create form component

Let's create a create form component using UIKernel.Adapters.Grid.toFormCreate adapter and list the fields.

Note that the form uses validation rules we've specified before. You can also mark the fields as changed or invalid.

`CreateFormComponent.jsx`:
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
  save: function (e) { // save record handler
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

Include it to `index.html`:
{% highlight html %}
<!-- Create form component -->
<script src="js/components/CreateFormComponent.jsx" type="text/jsx"></script>
{% endhighlight %}

And modify main component by adding component initialization and create record handler.

`MainComponent.jsx`:
{% highlight javascript %}
addRecord: function (recordId) {
  this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
}

// ...

<CreateFormComponent
  onSubmit={this.addRecord}
/>
{% endhighlight %}

Finally we'll pass required fields to our model.

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
