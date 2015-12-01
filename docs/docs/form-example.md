---
title: Form
id: form-example
prev: bulk-operations.html
next: data-binding.html
---

In this example, we'll be building a simple form for editing the 2nd record in the grid.

* [Live demo](/examples/form/){:target="_blank"}
* [Code]({{ site.github }}/examples/form){:target="_blank"}

Let's create the columns for our grid first.

`columns.jsx`

{% highlight javascript %}
var columns = {
  id: {
    name : 'ID',
    width: '40',
    sortCycle: ['asc', 'desc'],
    render: ['id', function (record) {
      return record.id;
    }]
  },
  name: {
    name: 'Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    render: ['name', function (record) { // method to render a cell
      return record.name;
    }]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    render: ['age', function (record) {
      return record.age;
    }]
  }
};
{% endhighlight %}

---

Next, we'll define validation.

`validation.js`

{% highlight javascript %}
var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('age', UIKernel.Validators.number(15, 90, 'Age must be between 15 and 90'));
{% endhighlight %}

---


Now pass data and validation to the model.

`model.js`

{% highlight javascript %}
var model = new UIKernel.Models.Grid.Collection({
  data: [
          [1, {'id': 1, 'name': 'Stacey', 'age': 22}],
          [2, {'id': 2, 'name': 'Adam',   'age': 43}],
          [3, {'id': 3, 'name': 'Deanna', 'age': 21}]
        ],
  validation: Validation
});
{% endhighlight %}

---

Create a form.

`FormComponent.jsx`

{% highlight javascript %}
var FormComponent =  React.createClass({
  mixins: [UIKernel.Mixins.Form],
  componentDidMount: function () {
    this.initForm({
      fields: ['name', 'surname', 'phone', 'age'], // fields we need
      model: UIKernel.Adapters.Grid.toFormUpdate(model, 2) // we're going to edit record with ID = 2
    });
  },

  save: function (e) { // save our changes
    e.preventDefault();
    this.submit(function (err) {
    }.bind(this));
  },

  render: function () {

    if (!this.isLoaded()) {
      return <span>Loading...</span>;
    }
    var data = this.getData();

    return (
      <div className="form">
        <div className="header panel-heading">
          <h4 className="title">Edit record number 2</h4>
        </div>
        <div className="body">
          <form className="form-horizontal change-second-field-form">
            <div className={'form-group'+ (this.hasError('name') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Name</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.validateField.bind(null, 'name')}
                  value={data.name}
                  />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.getValidationError('name')}</div>
              </div>
            </div>
            <div className={'form-group'+ (this.hasError('age') ? ' error' : '')}>
              <label className="col-sm-2 control-label">Age</label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  onChange={this.validateField.bind(null, 'age')}
                  value={data.age}
                  />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.getValidationError('age')}</div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
{% endhighlight %}

---

Add `FormComponent` within `MainComponent`.

`MainComponent.jsx`

{% highlight javascript %}
var MainComponent = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Records</h3>
              </div>
              <div className="panel-body padding0">
                <UIKernel.Component
                  ref="grid"
                  model={model}
                  cols={columns}
                />
                <FormComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
{% endhighlight %}
---

Finally, let's render `MainComponent`.

`main.jsx`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
