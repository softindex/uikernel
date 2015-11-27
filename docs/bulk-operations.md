---
title: Bulk operations
id: bulk-operations
prev: dynamic-columns.html
next: form-example.html
---

Let's add the possibility to select records and perform some action on them.

* [Live demo](/examples/bulk-operations/){:target="_blank"}
* [Code]({{ site.github }}/examples/bulk-operations){:target="_blank"}

Create the following `MainComponent.jsx` file:

{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model,
      blackMode: false, // state of the toggle button (Select all / Clear all)
      selectedNum: 0 // selected items state
    };
  },

  onSelectedChange: function (records) {
    this.setState({
      selectedNum: records.length
    });
  },

  toggleSelectMode: function() {
    this.setState({
      blackMode: !this.state.blackMode
    });
    this.refs.grid.toggleSelectAll();
  },

  someAction: function() { //this function can do anything what you need
    var records = this.refs.grid.getAllSelected();
    // For example it shows alert with selected Mode and Records
    alert('Mode: ' + this.state.blackMode + ' Records: ' + records.join(', '));
  },

  render: function () {
    var numText; // selected records
    var buttonText = this.state.blackMode ? 'Clear all' : 'Select all';

    if (this.state.blackMode) {
      numText = 'Selected all but ' + this.state.selectedNum + ' records.';
    } else {
      numText = 'Selected ' + this.state.selectedNum + ' records.';
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h1>Bulk operations</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-success" onClick={this.toggleSelectMode}>{buttonText}</a>
            {numText}
            <UIKernel.Component
              ref="grid"
              cols={columns}
              model={this.state.model}
              viewCount={20}
              onSelectedChange={this.onSelectedChange}
              />
            <a className="btn btn-success" onClick={this.someAction}>Some action</a>
          </div>
        </div>
      </div>
    );
  }
});
{% endhighlight %}

Add a new column with checkboxes that have click event handlers.

`columns.js`:
{% highlight javascript %}
var columns = {
  bulk: {
    width: '40px',
    render: [function (record, selected) {
      return '<input ref="checkbox" type="checkbox"' + (selected ? ' checked' : '') + '/>';
    }],
    onClickRefs: {
      checkbox: (function (event, recordId, record, grid) {
        grid.toggleSelected(recordId); // toggle our record id
      })
    }
  },
...
{% endhighlight %}


