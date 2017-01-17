---
title: Form
id: form-example
prev: bulk-operations.html
next: data-binding.html
---

In this example, we use `UIKernel.Mixins.Form` to create a simple form for editing grid records.

* [Live demo](/examples/form/){:target="_blank"}
* [Code]({{ site.github }}/examples/form){:target="_blank"}

To initialize a form, we use `initForm` function and pass it a settings object with `fields` and `model` props as an argument.
A settings object can also have [other props](form-mixin.html).
To update field values, you can use either `updateField` or `validateField`.
`validateField` not only updates a field, but also validates it.
`getValidationError` returns validation errors for a specific field.
`getData` returns form data.
`submit` is used to submit a form.

`FormComponent.js`

{% highlight javascript %}
var FormComponent =  React.createClass({
  getInitialState: function() {
      this.form = new UIKernel.Services.Form();
      return null;
    },
    onFormChange(newFormState) {
      if (!_.isEqual(this.props.state.data, newFormState.data)) {
        this.form.submit()
          .catch(err =>{
            if (err && !(err instanceof UIKernel.Models.ValidationErrors)) { // If error is not a validation one
              alert('Error');
            }
          });
      }
      this.props.stateHandler(newFormState);
    },

    componentDidMount: function () {
      this.form.init({
        fields: ['name', 'age'], // Fields we need
        model: new UIKernel.Adapters.Grid.ToFormUpdate(model, 2), // We're going to change record with ID = 2
      });
      this.form.addChangeListener(this.onFormChange);
    },

    componentWillUnmount() {
      this.form.removeChangeListener(this.onFormChange);
    },

    render: function () {
      if (!this.props.state.isLoaded) {
        return <span>Loading...</span>;
      }

      return (
        <div className="form">
          <div className="header panel-heading">
            <h4 className="title">Edit record number 2</h4>
          </div>
          <div className="body">
            <form className="form-horizontal change-second-field-form">
              <div className={'form-group'+ (this.props.state.errors.name ? ' error' : '')}>
                <label className="col-sm-2 control-label">Name</label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'name')}
                    value={this.props.state.data.name}
                    />
                </div>
                <div className="col-sm-3">
                  <div className="validation-error">{this.props.state.errors.name}</div>
                </div>
              </div>
              <div className={'form-group'+ (this.props.state.errors.age ? ' error' : '')}>
                <label className="col-sm-2 control-label">Age</label>
                <div className="col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    onChange={this.form.updateField.bind(this.form, 'age')}
                    value={this.props.state.data.age}
                    />
                </div>
                <div className="col-sm-3">
                  <div className="validation-error">{this.props.state.errors.age}</div>
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

We use `UIKernel.createValidator` to create a validator instance and call `field` function to define validation rules for our form.

`validation.js`

{% highlight javascript %}
var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('age', UIKernel.Validators.number.notNull(15, 90, 'Age must be between 15 and 90'));
{% endhighlight %}

---

We pass validation to the grid model.

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

`columns.js`

{% highlight javascript %}
var columns = {
  id: {
    name : 'ID',
    width: '40',
    sortCycle: ['asc', 'desc'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['id', function (record) {
      return record.id;
    }]
  },
  name: {
    name: 'Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', function (record) { // method to render a cell
      return record.name;
    }]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['age', function (record) {
      return record.age;
    }]
  }
};
{% endhighlight %}

---

`MainComponent.js`

{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
      return {
        form: {}
      };
    },

    onFormStateHandler: function (newFormState) {
      this.setState({form: newFormState});
    },

    render: function () {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <h3 className="panel-title">Records</h3>
                </div>
                <div className="panel-body padding0">
                  <UIKernel.Grid
                    ref="grid"
                    model={model}
                    cols={columns}
                    autoSubmit={true}
                  />
                  <Form
                    state={this.state.form}
                    stateHandler={this.onFormStateHandler}
                  />
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

`main.js`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}