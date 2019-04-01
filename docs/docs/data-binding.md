---
title: Data Binding
id: data-binding
prev: form-example.html
next: select.html
---

The grids in this example share one model.
When we modify records in one of the grids, the other grid updates, too.

* [Live demo](/examples/data-binding/){:target="_blank"}
* [Code]({{ site.github }}/examples/data-binding){:target="_blank"}

### Columns configuration

`columns.js`
{% highlight javascript %}
import UIKernel from 'uikernel';
import React from 'react';

const columns = {
  name: {
    name: 'First Name', // column title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    editor: function () {
      return <input type="text" {...this.props}/>; // text editor
    },
    render: ['name', record => (record.name)] // method for rendering of table cells
  },
  surname: {
    name: 'Last Name',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['surname', record => (record.surname)]
  },
  phone: {
    name: 'Phone',
    sortCycle: ['asc', 'desc', 'default'],
    editor: function () {
      return <input type="text" {...this.props}/>;
    },
    render: ['phone', record => (record.phone)]
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
export default columns

{% endhighlight %}

### Validation configuration

`validator.js`:
{% highlight javascript %}
import UIKernel from 'uikernel'

const validator = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid first name.'))
  .field('surname', UIKernel.Validators.regExp.notNull(/^\w{2,30}$/, 'Invalid last name.'))
  .field('phone', UIKernel.Validators.regExp.notNull(/^(\d{3}-)?\d{2,10}$/, 'Invalid phone number.'))
  .field('age', UIKernel.Validators.number.notNull(0, 120, 'Invalid age.'))
  .field('gender', UIKernel.Validators.enum.notNull([1, 2], 'Invalid gender.'));

export default validator
{% endhighlight %}

### Grid Model

`model.js`:
{% highlight javascript %}
import UIKernel from 'uikernel';
import validator from './validator';

const model = (function () {
  // Generate some data for our model
  // ...

  return new UIKernel.Models.Grid.Collection({
    data: data,
    validator
  });
)}();

export default model
{% endhighlight %}

### Main component

We pass the `realtime` prop to one of grids so that its changes could be saved automatically.

`MainComponent.js`:
{% highlight javascript %}
import React from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';

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
              autoSubmit={true}
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
            <a className="btn btn-default" onClick={this.clearChanges}>Clear</a>
            {' '}
            <a className="btn btn-primary" onClick={this.saveChanges}>Save</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent
{% endhighlight %}

`index.js`:
{% highlight javascript %}
import React from 'react';
import ReactDOM from 'react-dom';
import 'uikernel/dist/themes/base/uikernel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainComponent from './Components/MainComponent.js';

ReactDOM.render(<MainComponent/>, document.getElementById(('root')));
{% endhighlight %}
