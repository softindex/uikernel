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

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: _.clone(this.props.columns) // Copy all columns
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  applyChanges() {
    this.props.onChange(_.clone(this.state.columns));
  }

  onChangeCheckbox(key, value) {
    this.state.columns[key] = value; // Change checkbox value
    this.forceUpdate(); // and update it
  }

  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-content animated fadeIn">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title">Columns</h4>
          </div>
          <div className="modal-body">
            <form className="form-horizontal">
              {
                Object.keys(columns).map((key)=>{
                  return(
                    <FormCheckbox
                      id={key}
                      key={key}
                      value={this.state.columns[key]}
                      label={columns[key].name}
                      onChange={this.onChangeCheckbox.bind(null, key)}
                    />
                  )
                })
              }
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-white" data-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={this.applyChanges}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form
{% endhighlight %}
---

`MainComponent.js`:
{% highlight javascript %}
import React from 'react';
import columns from '../columns';
import model from '../model';
import UIKernel from 'uikernel';
import Form from './Form';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      columns: {
        // display name, surname, phone by default
        name: true,
        surname: true,
        phone: true,
        // hide age, gender
        age: false,
        gender: false
      }
    };
    this.openColumnsForm = this.openColumnsForm.bind(this);
  }

  openColumnsForm() {
    //open modal with our information (you can use your own modal)
    const columnsWindow = popup.open(Form, {
      columns: this.state.columns,
      onChange: (columns) => {
        columnsWindow.close();
        this.setState({columns});
      }
    }, "opened");
  }

  render() {
    return (
      <div>
        <a href="#" className="btn btn-success" onClick={this.openColumnsForm}>
          <i className="fa fa-th-list"></i>{' '}Columns
        </a>
        <UIKernel.Grid
          columns={columns}
          model={this.state.model}
          viewColumns={this.state.columns}
          viewCount={20}
        />
      </div>
    );
  }
}

export default MainComponent
{% endhighlight %}
---

`index.js`:
{% highlight javascript %}
import React from 'react';
import ReactDOM from 'react-dom';
import 'uikernel/dist/themes/base/uikernel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import MainComponent from './Components/MainComponent.js';

ReactDOM.render(<MainComponent/>, document.getElementById(('root')));
{% endhighlight %}
