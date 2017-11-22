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
      model // let's store model in the state
    };

    this.highlightNewRecord = this.highlightNewRecord.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.clearChanges = this.clearChanges.bind(this);
  }

  highlightNewRecord(recordId) {
    this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
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
        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Add record</h3>
              </div>
              <div className="panel-body">
                <CreateForm onSubmit={this.highlightNewRecord}/>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Filters</h3>
              </div>
              <div className="panel-body">
                <FiltersForm onSubmit={this.applyFilters}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Records</h3>
              </div>
              <UIKernel.Grid
                ref="grid"
                model={this.state.model} // Grid model
                cols={columns} // columns configuration
                viewCount={10} // display 10 records per page
                defaultSort={{column: 'name', direction: 'asc'}} // default sorting
              />
              <div className="panel-footer">
                <a className="btn btn-success" onClick={this.clearChanges}>Clear</a>
                {' '}
                <a className="btn btn-primary" onClick={this.saveChanges}>Save</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
