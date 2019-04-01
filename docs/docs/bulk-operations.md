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

Let's implement a simple grid which will consist of
'name', 'surname', 'phone', 'age', 'gender' fields
and first column 'bulk' containing checkboxes for toggling selection of records.

In our example
 - **selecting of 1 record** will be performed in `columns.onClickRefs()` at `columns.js`
by calling `grid.toggleSelected(recordId)`.
- **Selecting of all records** will be performed in method `toggleSelectMode()`
by calling `this.grid.toggleSelectAll()` at `MainComponent.js`

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
      model: model,
      blackMode: false, // state for toggle button (Select all / Clear all)
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
      blackMode: !this.state.blackMode
    });
    this.grid.toggleSelectAll();
  }

  someAction() { // this function can do anything what you need
    const records = this.grid.getAllSelected();
    alert(`Mode: ${this.state.blackMode}. Records: ${records.length ? records.join(', ') : 'all'}`);
  }

  render() {
    const buttonText = this.state.blackMode ? 'Clear all' : 'Select all';
    let numText; // selected records

    if (this.state.blackMode) {
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

export default MainComponent
{% endhighlight %}

`columns.js`:
{% highlight javascript %}
import UIKernel from 'uikernel';
import React from 'react';

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

export default columns

{% endhighlight %}

`model.js`:
{% highlight javascript %}
import UIKernel from 'uikernel';
import validator from './validator';

const model = new UIKernel.Models.Grid.Collection({
  data: _getRandomRecords(20),
  /* ... some other methods which are not important in this example */
});
{% endhighlight %}
