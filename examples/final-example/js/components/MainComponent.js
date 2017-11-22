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
    this.state = { model };
    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.addRecord = this.addRecord.bind(this);
  }

  addRecord(recordId) {
    this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
  }

  applyFilters(filters) {
    this.setState({
      model: UIKernel.applyGridFilters(model, filters)
    });
  }

  onSave() {
    this.refs.grid.save()
    .catch(() => {
      alert('Error');
    });
  }

  onClear() {
    this.refs.grid.clearAllChanges();
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <FiltersForm
            onSubmit={this.applyFilters}
          />
        </div>
        <div className="panel-body padding0">
          <UIKernel.Grid
            ref="grid"
            model={this.state.model} // Grid model
            cols={columns} // columns configuration
            viewCount={10} // 10 records limit to display by default
          />
        </div>
        <div className="panel-footer">
          <a className="btn btn-success" onClick={this.onClear}>Clear</a>
          {' '}
          <a className="btn btn-primary" onClick={this.onSave}>Save</a>
        </div>
      </div>
    );
  }
}

