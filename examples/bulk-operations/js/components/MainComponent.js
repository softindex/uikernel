/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var MainComponent = React.createClass({
  getInitialState: function () {
    return {
      model: model,
      blackMode: false, // state for toggle button (Select all / Clear all)
      selectedNum : 0
    };
  },

  onSelectedChange: function (records) {
    this.setState({
      selectedNum : records.length
    });
  },

  toggleSelectMode: function () {
    this.setState({
      blackMode: !this.state.blackMode
    });
    this.refs.grid.toggleSelectAll();
  },

  someAction: function () { // this function can do anything what you need
    var records = this.refs.grid.getAllSelected();
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