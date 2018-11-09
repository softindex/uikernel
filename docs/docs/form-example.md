---
title: Form
id: form-example
prev: bulk-operations.html
next: data-binding.html
---

In this example, we use `UIKernel.Form` to create a simple form for editing grid records.

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
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.form = new UIKernel.Form();
    this.onFormChange = this.onFormChange.bind(this);
  }

  componentDidMount() {
    this.form.init({
      fields: ['name', 'age'], // Fields we need
      model: new UIKernel.Adapters.Grid.ToFormUpdate(model, 2), // We're going to change record with ID = 2
    });
    this.form.addChangeListener(this.onFormChange);
  }

  componentWillUnmount() {
    this.form.removeChangeListener(this.onFormChange);
  }

  onFormChange(newFormState) {
    if (!_.isEqual(this.props.state.fields, newFormState.fields)) {
      this.form.submit()
        .catch((err) => {
          if (err && !(err instanceof UIKernel.ValidationErrors)) { // If error is not a validation one
            alert('Error');
          }
        });
    }

    this.props.onChange(newFormState);
  }

  render() {
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
            <div className={'form-group' + (this.props.state.fields.name.errors ? ' error' : '')}>
              <label className="col-sm-2 control-label">Name</label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form, 'name')}
                  value={this.props.state.fields.name.value}
                />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.props.state.fields.name.errors}</div>
              </div>
            </div>
            <div className={'form-group' + (this.props.state.fields.age.errors ? ' error' : '')}>
              <label className="col-sm-2 control-label">Age</label>
              <div className="col-sm-6">
                 {/* we use UIKernel.Editors.Number instead of <input type =" number "/>          */}
                 {/* because UIKernel.Editors.Number returns a numeric value instead of a string. */}
                <UIKernel.Editors.Number
                  className="form-control"
                  onChange={this.form.updateField.bind(this.form, 'age')}
                  value={this.props.state.fields.age.value}
                />
              </div>
              <div className="col-sm-3">
                <div className="validation-error">{this.props.state.fields.age.errors}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
{% endhighlight %}

---

We use `UIKernel.createValidator` to create a validator and call `field` function to define validation rules for our form.

`validation.js`

{% highlight javascript %}
const Validator = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('age', UIKernel.Validators.number.notNull(15, 90, 'Age must be between 15 and 90'));
{% endhighlight %}

---

We pass validation to the grid model.

`model.js`
{% highlight javascript %}
const model = new UIKernel.Models.Grid.Collection({
  data: [
    [1, {'id': 1, 'name': 'Stacey', 'age': 22}],
    [2, {'id': 2, 'name': 'Adam',   'age': 43}],
    [3, {'id': 3, 'name': 'Deanna', 'age': 21}]
  ],
  validator
});
{% endhighlight %}

---

`columns.js`

{% highlight javascript %}
const columns = {
  id: {
    name : 'ID',
    width: '40',
    sortCycle: ['asc', 'desc'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['id', record => record.id]
  },
  name: {
    name: 'Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['name', record => record.name]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['age', record => record.age]
  }
};
{% endhighlight %}

---

`MainComponent.js`

{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
    this.updateFormState =this.updateFormState.bind(this);
  }

  updateFormState(newFormState) {
    this.setState({form: newFormState});
  }

  render() {
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
                  ref={(grid) => this.grid = grid}
                  model={model}
                  cols={columns}
                  autoSubmit={true}
                />
                <Form
                  state={this.state.form}
                  onChange={this.updateFormState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
{% endhighlight %}
---

`main.js`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
