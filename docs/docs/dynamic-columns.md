---
title: Dynamic columns
id: dynamic-columns
prev: reports-filters.html
next: bulk-operations.html
---

You can dynamically show and hide grid columns by changing the `viewColumns` property.

* [Live demo](/examples/dynamic-columns/){:target="_blank"}
* [Code]({{ site.github }}/examples/dynamic-columns){:target="_blank"}

In this example, we've created a form with checkboxes and column names as options.
When checkboxes are clicked, the value of viewColumns changes and the grid updates appropriately.

`Form.js`:
{% highlight javascript %}
import columns from '../columns';
import React from 'react';

class FormCheckbox extends React.Component {
  onChangeHandler() {
    this.props.onChange(!this.props.value); // Change state of our value
  }

  render() {
    const id = `col-${this.props.id}`;
    return (
      <div className="form-check">
        <input
          id={id}
          type="checkbox"
          checked={this.props.value}
          onChange={this.onChangeHandler.bind(this)}
        />
        {' '}
        <label htmlFor={id}>{this.props.label}</label>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  onChangeCheckbox(key, value) {
    // Change checkbox value
    this.props.onChange({
      ...this.props.cols,
      [key]: value
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        {Object.keys(columns).map((key) => {
          return (
            <FormCheckbox
              id={key}
              key={key}
              value={this.props.cols[key]}
              label={columns[key].name}
              onChange={value => this.onChangeCheckbox(key, value)}
            />
          );
        })}
      </form>
    );
  }
}

export default Form;
{% endhighlight %}
---

`MainComponent.js`:
{% highlight javascript %}
import React, {useState} from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';
import Form from './Form';

function MainComponent() {
  const [cols, setCols] = useState({
    name: true,
    surname: true,
    phone: true,
    age: false,
    gender: false
  });

  return (
    <div>
      <Form
        cols={cols}
        onChange={cols => setCols(cols)}
      />
      <UIKernel.Grid
        columns={columns}
        model={model}
        viewColumns={cols}
        viewCount={20}
      />
    </div>
  );
}

export default MainComponent;
{% endhighlight %}
---

`index.js`:
{% highlight javascript %}
import React from 'react';
import ReactDOM from 'react-dom';
import 'uikernel/dist/themes/base/uikernel.css';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import MainComponent from './Components/MainComponent.js';

ReactDOM.render(<MainComponent/>, document.getElementById(('root')));
{% endhighlight %}
