/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class FiltersForm extends React.Component{
  constructor(props) {
    super(props);
    this.defaultFilters = {
      search: '',
      age: null,
      gender: 1,
    };
    this.state = {
      filters: {...this.defaultFilters}
    };
    this.onClear = this.onClear.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  getInitialState() {
    return {
      filters: _.clone(this.defaultFilters)
    }
  }

  onClear() {
    this.setState({filters: {...this.defaultFilters}});
    this.props.onSubmit(this.defaultFilters);
  }

  updateValue(filter, value) {
    const filters = {...this.state.filters};
    filters[filter] = ((typeof value === 'object' && !Object.is(value, null) && 'target' in value)) ? value.target.value : value;

    this.setState({filters}, () => this.props.onSubmit(filters));
  }

  render() {
    return (
      <form className="filters-form row">
        <div className="col-sm-7">
          <label className="control-label">Search</label>
          <input
            type="text" // text editor
            className="form-control"
            onChange={this.updateValue.bind(null, 'search')}
            value={this.state.filters.search}
          />
        </div>
        <div className="col-sm-2">
          <label className="control-label">Age</label>
          <UIKernel.Editors.Number // number editor
            className="form-control"
            onChange={this.updateValue.bind(null, 'age')}
            value={this.state.filters.age}
          />
        </div>
        <div className="col-sm-2">
          <label className="control-label">Gender</label>
          <UIKernel.Editors.Select // select editor
            className="form-control"
            onChange={this.updateValue.bind(null, 'gender')}
            options={[
              [0, ''],
              [1, 'Male'],
              [2, 'Female']
            ]}
            value={this.state.filters.gender}
          />
        </div>
        <div className="col-sm-1">
          <label className="control-label">&nbsp;</label>
          <a className="btn btn-success show" onClick={this.onClear}>
            Clear
          </a>
        </div>
      </form>
    );
  }
};
