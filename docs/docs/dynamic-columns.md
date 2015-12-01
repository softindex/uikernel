---
title: Dynamic columns
id: dynamic-columns
prev: reports-filters.html
next: bulk-operations.html
---

Let's make the columns more dynamic.

* [Live demo](/examples/dynamic-columns/){:target="_blank"}
* [Code]({{ site.github }}/examples/dynamic-columns){:target="_blank"}

First of all, create the following `index.html`:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Example</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css" type="text/css"/>
    <link href="css/uikernel/main.css" rel="stylesheet" type="text/css"/>
    <link href="css/main.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="container" id="example"></div>

<div class="modal fade" id="popup" tabIndex="-1" role="dialog" aria-hidden="true" style="display: none;">
  <div class="popup-inner-content"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
<script src="js/libs/uikernel.js"></script>


<!-- Popup -->
<script src="js/libs/popup.js" type="text/jsx"></script>

<!-- Our model -->
<script src="js/model/model.js"></script>

<!-- Our main component -->
<script src="js/components/MainComponent.jsx" type="text/jsx"></script>

<!-- Its columns -->
<script src="js/columns.jsx" type="text/jsx"></script>

<!-- Dynamic form component -->
<script src="js/components/Form.jsx" type="text/jsx"></script>

<!-- Main file to render -->
<script src="js/main.jsx" type="text/jsx"></script>
</body>
</html>
{% endhighlight %}
---

Next, create the `main.css` file:

{% highlight html %}
.container {
  padding-top: 10px;
}

.data-grid {
    margin: 10px 0;
}
{% endhighlight %}
---

Now let's create a modal with checkboxes using the Bootstrap Modal Plugin.

`Form.jsx`:
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

  onChangeCheckbox: function (key, value) { // Change out checkbox by key
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

We will activate our modal with JavaScript. Create `popup.js` with the following contents:

{% highlight javascript %}
var popup = {
  open: function (Component, props, className) {
    /*
     open modal with parameters:
     Component - React component that will be inside our modal
     props - initial properties
     className - the class name of a modal window when it is opened
     */
    var $el = $('#popup').addClass(className);// get modal dialog by id
    var innerContent = $el.find('.popup-inner-content').get(0); // find inner element by using class name
    $el.modal();

    React.render(React.createElement(Component, props), innerContent, function () { // create react element
      $(document).on('hide.bs.modal', function () {
        React.unmountComponentAtNode(innerContent);
        $el.removeClass(className); // remove class name
      });
    });

    return {
      close() {
        $el.modal('hide'); // close our modal
      }
    };
  }
};
{% endhighlight %}
---

Modify your `MainComponent.jsx` as below:

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
          <UIKernel.Component
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

Finally, let's render `MainComponent` in `main.jsx`:
{% highlight javascript %}
React.render(<MainComponent/>, document.getElementById("example"));
{% endhighlight %}