---
title: Bulk operations
id: bulk-operations
prev: dynamic-columns.html
next: form-example.html
---

This example demonstrates how to select grid records and perform on them some action.

To select/unselect only one record, we use `toggleSelected` function.
To select/unselect all records, we use `toggleSelectAll` function.
To get all selected records, we use `getAllSelected` function.

* [Live demo](/examples/bulk-operations/){:target="_blank"}
* [Code]({{ site.github }}/examples/bulk-operations){:target="_blank"}

`MainComponent.js`:

{% highlight javascript %}
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model,
      blackMode: false, // state of the toggle button (Select all / Clear all)
      selectedNum: 0
    };
  },

  onSelectedChange: function (records) {
    this.setState({
      selectedNum: records.length
    });
  },

  toggleSelectMode: function () {
    this.setState({
      blackMode: !this.state.blackMode
    });
    this.refs.grid.toggleSelectAll(); // select/unselect all records
  },

  someAction: function () { // this function can do anything what you need
    var records = this.refs.grid.getAllSelected(); // get all selected records
    alert('Mode: ' + this.state.blackMode + ' Records: ' + records.join(', '));
  },

  render: function () {
    var numText; // selected records
    var buttonText = this.state.blackMode ? 'Clear all' : 'Select all';

    if (this.state.blackMode) {
      numText = 'Selected all records.';
    } else {
      numText = 'Selected ' + this.state.selectedNum + ' records.';
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-success" onClick={this.toggleSelectMode}>{buttonText}</a>
            {numText}
            <UIKernel.Grid
              ref="grid"
              cols={columns}
              model={this.state.model}
              viewCount={10}
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
        grid.toggleSelected(recordId); // select/unselect a specific record
      })
    }
  },
...
{% endhighlight %}


