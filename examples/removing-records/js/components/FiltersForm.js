/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class FiltersForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultFilters = {
      search: '',
      age: null,
      gender: 0
    };
    this.state = {
      filters: {...this.defaultFilters}
    };
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  clearFilters() {
    this.setState({filters: {...this.defaultFilters}});
    this.props.onSubmit(this.defaultFilters);
  }

  updateFilter(filter, value) {
    const filters = {...this.state.filters};
    filters[filter] = value.target ? value.target.value : value;

    this.setState({filters}, () => this.props.onSubmit(filters));
  }

  render() {
    return (
      <form className="filters-form form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">Search</label>
          <div className="col-sm-9">
            <input
              type="text" // text editor
              className="form-control"
              onChange={this.updateFilter.bind(null, 'search')}
              value={this.state.filters.search}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Age</label>
          <div className="col-sm-9">
            <input
              type="number" // number editor
              className="form-control"
              onChange={this.updateFilter.bind(null, 'age')}
              value={this.state.filters.age}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Gender</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Select // select editor
              className="form-control"
              onChange={this.updateFilter.bind(null, 'gender')}
              options={[
                [0, ''],
                [1, 'Male'],
                [2, 'Female']
              ]}
              value={this.state.filters.gender}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <a className="btn btn-success" onClick={this.clearFilters}>
              Clear
            </a>
          </div>
        </div>
      </form>
    );
  }
}
