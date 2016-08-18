---
title: Data Binding
id: data-binding
prev: form-example.html
next: select.html
---

The grids in this example share one model.
When we modify records in one of the grids, another grid updates too.

* [Live demo](/examples/data-binding/){:target="_blank"}
* [Code]({{ site.github }}/examples/data-binding){:target="_blank"}

### Columns configuration

{% highlight javascript %}
`columns.js`
var columns = {
  name: {
    name: 'First Name', // columns title
    editor: function () {
      return <input type="text" {...this.props} />; // text editor
    },
    render: ['name', function (record) { // method to render a cell
      return _.escape(record.name);
    }]
  },
  surname: {
    name: 'Last Name',
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', function (record) {
      return _.escape(record.surname);
    }]
  },
  phone: {
    name: 'Phone',
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['phone', function (record) {
      return _.escape(record.phone);
    }]
  },
  age: {
    name: 'Age',
    editor: function () {
      return <input type="number" {...this.props}/>; // number editor
    },
    render: ['age', function (record) {
      return record.age;
    }]
  },
  gender: {
    name: 'Gender',
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [0, 'Female']
        ]}
        />;
    },
    render: ['gender', function (record) {
      switch (record.gender) {
        case 1: return 'Male';
        case 2: return 'Female';
        default: return 'Undefined';
      }
    }]
  }
};
{% endhighlight %}

### Validation configuration

`validation.js`:
{% highlight javascript %}
var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.regExp.notNull(/^[^0]\d{0,2}$/, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp.notNull(/^[12]$/, 'Invalid gender.'));
{% endhighlight %}

### Grid Model

`model.js`:
{% highlight javascript %}
var model = (function () {
  // Generate some data for our model
  // ...

  return new UIKernel.Models.Grid.Collection({
    data: data,
    validation: validation
  });
)}();
{% endhighlight %}

### Main component

We pass the `realtime` prop to one of grids so that its changes could be saved automatically.

`MainComponent.js`:
{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model // let's store model in the state
    };
  },
  onSave: function () {
    this.refs.grid.save(function (err) {
      if (err) {
        alert('Error');
      }
    });
  },
  onClear: function () {
    this.refs.grid.clearAllChanges();
  },
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Grid with auto-saving</h3>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10}
              realtime={true}// add auto-saving
              />
          </div>
          <div className="col-sm-6">
            <h3>Grid without autosaving</h3>
            <UIKernel.Grid
              ref="grid"
              model={this.state.model}
              cols={columns}
              viewCount={10}
              />
            <a className="btn btn-success" onClick={this.onClear}>Clear</a>
            {' '}
            <a className="btn btn-primary" onClick={this.onSave}>Save</a>
          </div>
        </div>
      </div>
    );
  }
});
{% endhighlight %}

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.body);
{% endhighlight %}
