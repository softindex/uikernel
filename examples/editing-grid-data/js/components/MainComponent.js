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
    this.state = {model};
    this.applyFilters = this.applyFilters.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  applyFilters(filters) {
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
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
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Filters</h3>
          </div>
          <div className="panel-body">
            <FiltersForm onSubmit={this.applyFilters}/>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Records</h3>
          </div>
          <UIKernel.Grid
            ref="grid"
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewCount={10} // display 10 records per page
          />
          <div className="panel-footer">
            <a className="btn btn-success" onClick={this.clearChanges}>
              Clear
            </a>
            {' '}
            <a className="btn btn-primary" onClick={this.saveChanges}>
              Save
            </a>
          </div>
        </div>
      </div>
    );
  }
}
