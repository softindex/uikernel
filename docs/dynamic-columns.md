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
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: _.clone(this.props.cols) // Copy all columns
    };
    this.applyChanges = this.applyChanges.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  applyChanges() {
    this.props.onChange(_.clone(this.state.cols));
  }

  onChangeCheckbox(key, value) { 
    this.state.cols[key] = value; // Change checkbox value
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
              { _.map(columns, function (value, key) {
                return (
                  <FormCheckbox
                    id={key}
                    key={key}
                    value={this.state.cols[key]}
                    label={value.name}
                    onChange={this.onChangeCheckbox.bind(null, key)}
                  />);
              }.bind(this))}
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
{% endhighlight %}
---

`MainComponent.js`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      cols: {
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
      cols: this.state.cols,
      onChange: (cols) => {
        columnsWindow.close();
        this.setState({cols});
      }
    }, "opened");
  }

  render() {
    return (
      <div>
        <a className="btn btn-success" onClick={this.openColumnsForm}>
          <i className="fa fa-th-list"></i>{' '}Columns
        </a>
        <UIKernel.Grid
          cols={columns}
          model={this.state.model}
          viewColumns={this.state.cols}
          viewCount={20}
        />
      </div>
    );
  }
}
{% endhighlight %}
---

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
