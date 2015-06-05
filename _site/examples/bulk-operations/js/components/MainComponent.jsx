/**
 * Copyright 2015, SoftIndex LLC.
 */
var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model,
      blackMode: false, // state for toggle button (Select all / Clear all)
      records : {}
    };
  },

  onSelectedChange: function (records) {
    this.setState({
      records : records
    });
  },

  toggleSelectMode: function () {
    this.setState({
      blackMode: !this.state.blackMode
    });
    this.refs.grid.toggleSelectAll();
  },

  someAction: function () { // this function can do anything what you need
    var num = this.refs.grid.getAllSelected().length;
    if (this.state.blackMode) {
      if (num) {
        alert('You select all but ' + num + ' records');
      } else {
        alert('You select all records');
      }
    } else {
      if (num) {
        alert('You select ' + num + ' records');
      } else {
        alert('You have not selected any records');
      }
    }
  },

  render: function () {
    var buttonText = this.state.blackMode ? 'Clear all' : 'Select all';

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-success" onClick={this.toggleSelectMode}>{buttonText}</a>
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