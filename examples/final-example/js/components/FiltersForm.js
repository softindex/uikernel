/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

class FiltersForm extends React.Component {
  updateFilter(filter, value) {
    this.props.onChange({
      ...this.props.filters,
      [filter]: value
    });
  }

  render() {
    return (
      <form className="filters-form row">
        <div className="col-sm-7">
          <label className="control-label">Search</label>
          <input
            type="text" // text editor
            className="form-control"
            onChange={ event => this.updateFilter('search', event.target.value)}
            value={this.props.filters.search}
          />
        </div>
        <div className="col-sm-2">
          <label className="control-label">Age</label>
          <UIKernel.Editors.Number // number editor
            className="form-control"
            onChange={value => this.updateFilter('age', value)}
            value={this.props.filters.age}
          />
        </div>
        <div className="col-sm-2">
          <label className="control-label">Gender</label>
          <UIKernel.Editors.Select // select editor
            className="form-control"
            onChange={value => this.updateFilter('gender', value)}
            options={[
              [0, ''],
              [1, 'Male'],
              [2, 'Female']
            ]}
            value={this.props.filters.gender}
          />
        </div>
        <div className="col-sm-1">
          <label className="control-label">&nbsp;</label>
          <br/>
          <a className="btn btn-default" onClick={() => this.props.onClear()}>
            Clear
          </a>
        </div>
      </form>
    );
  }
}
