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
      filters: DEFAULT_FILTERS,
      model,
    };
  }

  onFiltersChange(filters) {
    this.setState({
      filters,
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
            filters={this.state.filters}
            onChange={(filters) => this.onFiltersChange(filters)}
            onClear={() => this.onFiltersChange(DEFAULT_FILTERS)}
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
          <a className="btn btn-success" onClick={() => this.onClear()}>Clear</a>
          {' '}
          <a className="btn btn-primary" onClick={() => this.onSave()}>Save</a>
        </div>
      </div>
    );
  }
}
