/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DEFAULT_FILTERS = {
  search: '',
  age: null,
  gender: 0,
};

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model, // let's store model in the state
      filters: DEFAULT_FILTERS,
    };
  }

  highlightNewRecord(recordId) {
    this.refs.grid.addRecordStatus(recordId, 'new'); // mark the record as new
  }

  saveChanges() {
    this.refs.grid.save()
      .catch(() => {
        alert('Error');
      });
  }
  onFiltersChange(filters) {
    this.setState({
      filters,
      model: UIKernel.applyGridFilters(model, filters)
    });
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
                <CreateForm onSubmit={(recordId) => this.highlightNewRecord(recordId)}/>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Filters</h3>
              </div>
              <div className="panel-body">
                <FiltersForm
                  filters={this.state.filters}
                  onChange={(filters) => this.onFiltersChange(filters)}
                  onClear={() => this.onFiltersChange(DEFAULT_FILTERS)}
                />
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
                <a className="btn btn-success" onClick={() => this.clearChanges()}>Clear</a>
                {' '}
                <a className="btn btn-primary" onClick={() => this.saveChanges()}>Save</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
