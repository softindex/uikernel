/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import UIKernel from 'uikernel';

class FiltersForm extends React.Component {
  updateFilter(filter, value) {
    this.props.onChange({
      ...this.props.filters,
      [filter]: value
    });
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
              onChange={event => this.updateFilter('search', event.target.value)}
              value={this.props.filters.search}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Age</label>
          <div className="col-sm-9">
            <UIKernel.Editors.Number // number editor
              className="form-control"
              onChange={value => this.updateFilter('age', value)}
              value={this.props.filters.age}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Gender</label>
          <div className="col-sm-9">
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
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <a className="btn btn-default" onClick={() => this.props.onClear()}>
              Clear
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default FiltersForm;
