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
const columns = {
  name: {
    name: 'First Name', // column title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    render: ['name', record => _.escape(record.name)] // method for rendering of table cells
  },
  surname: {
    name: 'Last Name',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', record => _.escape(record.surname)]
  },
  phone: {
    name: 'Phone',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['phone', record => _.escape(record.phone)]
  },
  age: {
    name: 'Age',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <UIKernel.Editors.Number {...this.props}/>; // number editor
    },
    render: ['age', record => record.age]
  },
  gender: {
    name: 'Gender',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <UIKernel.Editors.Select // select editor
        {...this.props}
        options={[
          [1, 'Male'],
          [2, 'Female']
        ]}
      />;
    },
    render: ['gender', (record) => {
      switch (record.gender) {
        case 1:
          return 'Male';
        case 2:
          return 'Female';
        default:
          return 'Undefined';
      }
    }]
  }
};
{% endhighlight %}

### Validation configuration

`validation.js`:
{% highlight javascript %}
const Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.number.notNull(0, 120, 'Invalid age.'))
  .field('gender', UIKernel.Validators.regExp.notNull(/^[12]$/, 'Invalid gender.'));
{% endhighlight %}

### Grid Model

`model.js`:
{% highlight javascript %}
const model = (function () {
  // Generate some data for our model
  // ...

  return new UIKernel.Models.Grid.Collection({
    data: data,
    validator
  });
)}();
{% endhighlight %}

### Main component

We pass the `realtime` prop to one of grids so that its changes could be saved automatically.

`MainComponent.js`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model // let's store model in the state
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  saveChanges() {
    this.grid.save()
      .catch(function () {
        alert('Error');
      });
  }

  clearChanges() {
    this.grid.clearAllChanges();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Grid with autosave</h3>
            <UIKernel.Grid
              model={this.state.model} // Grid model
              cols={columns} // columns configuration
              viewCount={10}
              realtime={true}
            />
          </div>
          <div className="col-sm-6">
            <h3>Grid without autosave</h3>
            <UIKernel.Grid
              ref={(grid) => this.grid = grid}
              model={this.state.model}
              cols={columns}
              viewCount={10}
            />
            <a className="btn btn-success" onClick={this.clearChanges}>Clear</a>
            {' '}
            <a className="btn btn-primary" onClick={this.saveChanges}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}
{% endhighlight %}

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.body);
{% endhighlight %}
