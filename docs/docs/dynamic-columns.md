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

For this example you need additionaly to instal `react-bootstrap`:

{% highlight bash %}

  npm i react-bootstrap

{% endhighlight%}

`Form.js`:
{% highlight javascript %}
import columns from '../columns';
import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class FormCheckbox extends React.Component {
  onChangeHandler() {
    this.props.onChange(!this.props.value); // Change state of our value
  }

  render() {
    const id = `col-${this.props.id}`;

    return (
      <div className="row">
        <div className="col-lg-3">
          <input
            id={id}
            type="checkbox"
            checked={this.props.value}
            onChange={this.onChangeHandler.bind(this)}
          />
        </div>
        <div className="col-lg-9">
          <label htmlFor={id}>{this.props.label}</label>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols:{...this.props.cols}, // Copy all columns
      showModal: false

    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

  }
  toggleModal(isShow){
    this.setState({showModal: isShow})
  }
  applyChanges() {
    this.props.onChange({...this.state.cols});
    this.toggleModal(false)
  }

  onChangeCheckbox(key, value) {
    // Change checkbox value
    this.setState({
      cols: {
        ...this.state.cols,
        [key]: value
      }
    });
  }

  render() {
    const {showModal} = this.state;
    return (
      <>
      <Button variant="outline-secondary" onClick={(e)=>this.toggleModal(true)}>
        Columns
      </Button>
      <Modal show={showModal} onHide={(e)=>this.toggleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Columns</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            {
                Object.keys(columns).map((key)=>{
                  return(
                      <FormCheckbox
                          id={key}
                          key={key}
                          value={this.state.cols[key]}
                          label={columns[key].name}
                          onChange={this.onChangeCheckbox.bind(null, key)}
                      />
                  )
                })
              }
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary"  onClick={(e)=>this.toggleModal(false)}>
            Close
          </Button>
          <Button variant="primary"  onClick={this.applyChanges}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      </>

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
