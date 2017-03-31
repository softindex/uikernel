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

    this.state =  {
      model: model
    };
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  saveChanges() {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  }

  clearChanges() {
    this.refs.grid.clearAllChanges();
  }

  render() {
    return (
      <div>
        <UIKernel.Grid
          ref="grid"
          cols={columns}
          model={this.state.model}
          viewCount={10}
        />
        <a className="btn btn-success" onClick={this.saveChanges}>Save</a>
        {' '}
        <a className="btn btn-success" onClick={this.clearChanges}>Clear</a>
      </div>
    );
  }
}
