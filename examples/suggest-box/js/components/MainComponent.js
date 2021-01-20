/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {model: gridModel};
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  saveChanges() {
   this.grid.save()
      .catch(() => {
        alert('Error');
      });
  }

  clearChanges() {
   this.grid.clearAllChanges();
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          ref={(grid) => this.grid = grid}
          cols={columns}
          model={this.state.model}
          viewCount={10}
        />
        <a href="#" className="btn btn-success" onClick={this.saveChanges}>Save</a>
        {' '}
        <a href="#" className="btn btn-default" onClick={this.clearChanges}>Clear</a>
      </div>
    );
  }
}
