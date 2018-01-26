---
title: Bulk operations
id: bulk-operations
prev: dynamic-columns.html
next: form-example.html
---

* [Live demo](/examples/bulk-operations/){:target="_blank"}
* [Code]({{ site.github }}/examples/bulk-operations){:target="_blank"}

This example demonstrates how to select grid records and perform on them some action.

- To select/unselect only one record, we use `grid.toggleSelected` method.
- To select/unselect all records, we use `grid.toggleSelectAll` method.
- To get all selected records, we use `grid.getAllSelected` method.

Lets implement a simple grid which will consist of
'name', 'surname', 'phone', 'age', 'gender' fields
and first column 'bulk' containing checkboxes for toggling selection of records.

In our example
 - **selecting of 1 record** will be performed in `columns.onClickRefs()` at `columns.js`
by calling `grid.toggleSelected(recordId)`.
- **Selecting of all records** will be performed in method `toggleSelectMode()`
by calling `this.grid.toggleSelectAll()` at `MainComponent.js`

`MainComponent.js`:
{% highlight javascript %}
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: model,
      bulkMode: false, // state for toggle button (Select all / Clear all)
      selectedNum: 0
    };
    this.onSelectedChange = this.onSelectedChange.bind(this);
    this.toggleSelectMode = this.toggleSelectMode.bind(this);
    this.someAction = this.someAction.bind(this);
  }

  onSelectedChange(records) {
    this.setState({
      selectedNum: records.length
    });
  }

  toggleSelectMode() {
    this.setState({
      bulkMode: !this.state.bulkMode
    });
    this.grid.toggleSelectAll();
  }

  someAction() { // this function can do anything what you need
    const records = this.grid.getAllSelected();
    alert('BulkMode: ' + this.state.bulkMode + ' Records: ' + records.join(', '));
  }

  render() {
    const buttonText = this.state.bulkMode ? 'Clear all' : 'Select all';
    let numText; // selected records

    if (this.state.bulkMode) {
      numText = 'Selected all records.';
    } else {
      numText = `Selected ${this.state.selectedNum} ${this.state.selectedNum === 1 ? 'record' : 'records'}`;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-success" onClick={this.toggleSelectMode}>{buttonText}</a>
            {numText}
            <UIKernel.Grid
              ref={(grid) => this.grid = grid}
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
}
{% endhighlight %}

`columns.js`:
{% highlight javascript %}
const columns = {
  bulk: {
    width: '40px',
    className: 'text-center',
    render: [(record, selected) => {
      return '<input ref="checkbox" type="checkbox"' + (selected ? ' checked' : '') + '/>';
    }],
    onClickRefs: {
      checkbox: (function (event, recordId, record, grid) {
        grid.toggleSelected(recordId); // toggle our record id
      })
    }
  },
  name: {
    name: 'First Name', // columns title
    sortCycle: ['asc', 'desc', 'default'], // sort cycle
    render: ['name', record => _.escape(record.name)]
  },
  /* ...configuration of other fields... */
};
{% endhighlight %}

`model.js`:
{% highlight javascript %}
  const model = new UIKernel.Models.Grid.Collection({
    data: _getRandomRecords(20),
    /* ... some other methods which are not important in this example */
  });
{% endhighlight %}