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
var FormCheckbox = React.createClass({
  onChangeHandler: function () {
    this.props.onChange(!this.props.value); // Change state of our value
  },

  render: function () {
    var id = 'col-' + this.props.id;
    return (
      <div className="row">
        <div className="col-lg-3">
          <input
            id={id}
            type="checkbox"
            checked={this.props.value}
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="col-lg-9">
          <label htmlFor={id}>{this.props.label}</label>
        </div>
      </div>
    );
  }
});

var Form = React.createClass({
  getInitialState: function () {
    return {
      model: this.model,
      cols: _.clone(this.props.cols) // Take a copy of all columns
    };
  },

  applyChanges: function () {
    this.props.onChange(_.clone(this.state.cols));
  },

  onChangeCheckbox: function (key, value) { // Check out checkbox by key
    this.state.cols[key] = value;
    this.forceUpdate(); // and update it
  },

  render: function () {
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
});
{% endhighlight %}
---

`MainComponent.js`:
{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () { // add cols - state to our initial states
    return {
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
  },
  openColumnsForm: function openColumnsForm() {
    //open modal (you can use your own modal)
    var columnsWindow = popup.open(Form, {
      cols: this.state.cols,
      onChange: function onChange(cols) {
        columnsWindow.close();
        this.setState({cols: cols});
      }.bind(this)
    }, "opened");
  },

  render() {
    return (
      <div>
        <div>
          <a className="btn btn-success" onClick={this.openColumnsForm}>
            <i className="fa fa-th-list"></i>
            Columns
          </a>
          <UIKernel.Grid
            cols={columns}
            model={this.state.model}
            viewColumns={this.state.cols}
            viewCount={20}
          />
        </div>
      </div>
    );
  }
});
{% endhighlight %}
---

`main.js`:
{% highlight javascript %}
ReactDOM.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}
