/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
    const records =this.grid.getAllSelected();
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
