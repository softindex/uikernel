/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

/**
 * React table component
 */

import React from 'react';
import utils from '../common/utils';

import GridColumnsMixin from './mixins/columns';
import gridMixinPagination from './mixins/pagination';
import gridMixinStatuses from './mixins/statuses';
import gridMixinSorting from './mixins/sorting';
import gridMixinData from './mixins/data';
import gridMixinEditor from './mixins/editor';
import gridMixinUI from './mixins/ui';
import gridMixinSelect from './mixins/select';

const RESET_MODEL = 1 << 0;
const RESET_VIEW_COLUMNS = 1 << 1;
const RESET_SORT = 1 << 2;
const RESET_VIEW_COUNT = 1 << 3;

export const GridComponent = React.createClass({

  ...GridColumnsMixin,
  ...gridMixinPagination,
  ...gridMixinStatuses,
  ...gridMixinSorting,
  ...gridMixinData,
  ...gridMixinEditor,
  ...gridMixinUI,
  ...gridMixinSelect,

  propTypes: (() => {
    const sortElementProp = React.PropTypes.shape({
      column: React.PropTypes.string,
      direction: React.PropTypes.string
    });

    const sortProp = React.PropTypes.oneOfType([
      sortElementProp,
      React.PropTypes.arrayOf(sortElementProp)
    ]);
    return {
      className: React.PropTypes.string,
      model: React.PropTypes.shape({
        read: React.PropTypes.func.isRequired,
        update: React.PropTypes.func,
        isValidRecord: React.PropTypes.func,
        getValidationDependency: React.PropTypes.func,
        on: React.PropTypes.func.isRequired,
        off: React.PropTypes.func.isRequired
      }),
      viewColumns: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.object
      ]),
      // sort: React.PropTypes.object,
      page: React.PropTypes.number,
      defaultViewCount: React.PropTypes.number,
      viewCount: React.PropTypes.number,
      viewVariants: React.PropTypes.arrayOf(React.PropTypes.number),
      onChangeViewCount: React.PropTypes.func,
      onError: React.PropTypes.func,
      onPageLoad: React.PropTypes.func,
      height: React.PropTypes.number,
      onSorting: React.PropTypes.func,
      defaultSort: (props, propName) => {
        if (!props.defaultSort) {
          return;
        }
        const validProp = sortProp(props, propName);
        if (validProp) {
          return validProp;
        }
        if (props.hasOwnProperty('sort')) {
          return Error('You can not set "defaultSort" when specified "sort" prop');
        }
      },
      sort: (props, propName) => {
        if (!props.sort) {
          return;
        }
        const validProp = sortProp(props, propName);
        if (validProp) {
          return validProp;
        }
        if (!props.onSorting) {
          return Error('You need to define prop "onSorting" when set "sort"');
        }
      },
      saveFullRecord: React.PropTypes.bool,
      partialErrorChecking: React.PropTypes.bool,
      warningsValidator: React.PropTypes.shape({
        isValidRecord: React.PropTypes.func,
        getValidationDependency: React.PropTypes.func
      })
    }
  })(),
  getDefaultProps: () => ({
    page: 0,
    defaultViewCount: 0,
    partialErrorChecking: false
  }),
  getInitialState: function () {
    this._loadData = utils.throttle(this._loadData);
    this._validateRow = utils.throttle(this._validateRow);
    this._checkWarnings = utils.throttle(this._checkWarnings);
    return {
      page: this.props.page,
      viewCount: this.props.defaultViewCount,
      count: 0,
      statusMap: {
        new: 1 << 0
      },
      statuses: {},
      sort: this._getDefaultSort(),
      data: null,
      changes: {},
      warnings: {},
      errors: {},
      totals: {},
      recordsInfo: {},
      mainIds: [],
      partialErrorChecking: this.props.partialErrorChecking,
      editor: {},
      colsWithEscapeErrors: {},
      selectBlackListMode: false,
      selected: []
    };
  },
  componentDidMount: function () {
    this._isMounted = true;
    if (this.props.model) {
      this.props.model.on('create', this._onRecordCreated);
      this.props.model.on('update', this._setData);
    }
    this.updateTable();
  },
  componentWillUnmount: function () {
    this._isMounted = false;
    if (this.props.model) {
      this.props.model.off('create', this._onRecordCreated);
      this.props.model.off('update', this._setData);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    const oldProps = this.props;
    let reset = 0;

    if (!utils.isEqual(this.props.model, nextProps.model)) {
      reset |= RESET_MODEL;
    }
    if (!utils.isEqual(this.props.viewColumns, nextProps.viewColumns)) {
      reset |= RESET_VIEW_COLUMNS;
    }
    if (!utils.isEqual(this.props.sort, nextProps.sort)) {
      reset |= RESET_SORT;
    }
    if (this.props.viewCount !== nextProps.viewCount) {
      reset |= RESET_VIEW_COUNT;
    }

    if (!reset) {
      return;
    }

    this.setState({}, function () {
      if (reset & RESET_SORT || reset & RESET_MODEL || reset & RESET_VIEW_COUNT) {
        if (reset & RESET_MODEL) {
          this.state.data = null;
          if (oldProps.model) {
            oldProps.model.off('create', this._onRecordCreated);
            oldProps.model.off('update', this._setData);
          }
          if (this.props.model) {
            this.props.model.on('create', this._onRecordCreated);
            this.props.model.on('update', this._setData);
          }
          this._setPage(0);
        }
        this.updateTable();
      } else if (reset & RESET_VIEW_COLUMNS) {
        this._renderBody();
      }
    });
  },
  renderScrollableGrid: function (gridClassNames) {
    const header = this._formHeader();
    return (
      <div className={gridClassNames.join(' ')}>
        <div className="wrapper-dgrid-header">
          <table cellSpacing="0" className="dgrid-header">
            <colgroup>{header.colGroup}</colgroup>
            {header.cols.map((row, colKey) => {
              return (
                <tr key={colKey}>
                  {row.map((col, rowKey) => {
                    return (
                      <th
                        key={rowKey}
                        className={col.className}
                        onClick={
                          col.sort ?
                            this._sortCol.bind(this, col.field) :
                            this._handleHeaderCellClick.bind(this, col)
                        }
                        colSpan={col.cols}
                        rowSpan={col.rows}
                        dangerouslySetInnerHTML={{
                          __html: this._getHeaderCellHTML(col.name)
                        }}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </div>
        <div
          style={{maxHeight: this.props.height}}
          className='dgrid-body-wrapper dgrid-scrollable'
        >
          <div className="dgrid-body">
            <div className="dgrid-loader" ref="loader"></div>
            <table
              cellSpacing="0"
              ref="body"
              onClick={this._handleBodyClick}
            >
              <colgroup>{header.colGroup}</colgroup>
              <tbody className="dgrid-body-table" ref="tbody"/>
            </table>
          </div>
        </div>
        <div className="wrapper-totals">
          {this._renderTotals(this.props.height)}
        </div>
        {this._renderPagination()}
      </div>
    );
  },
  renderGrid: function (gridClassNames) {
    const header = this._formHeader();
    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
    return (
      <div className={gridClassNames.join(' ')}>
        <div className="dgrid-loader" ref="loader"></div>
        <table
          cellSpacing="0"
          className="dgrid-body-table"
          ref="body"
          onClick={this._handleBodyClick}
        >
          <colgroup>{header.colGroup}</colgroup>
          <thead>
          {header.cols.map((row, colKey) => {
            return (
              <tr key={colKey}>
                {row.map((col, rowKey) => {
                  return (
                    <th
                      key={rowKey}
                      className={col.className}
                      onClick={
                        col.sort ?
                          this._sortCol.bind(this, col.field) :
                          this._handleHeaderCellClick.bind(this, col)
                      }
                      colSpan={col.cols}
                      rowSpan={col.rows}
                      dangerouslySetInnerHTML={{
                        __html: this._getHeaderCellHTML(col.name)
                      }}
                    />
                  );
                })}
              </tr>
            );
          })}
          </thead>
          <tbody className="dgrid-body-table" ref="tbody"/>
          {this._renderTotals(this.props.height)}
        </table>
        {this._renderPagination()}
      </div>
    );
  },
  render: function () {
    const gridClassNames = ['data-grid'];

    if (this.props.className) {
      gridClassNames.push(this.props.className);
    }

    if (!this.props.height) {
      return this.renderGrid(gridClassNames);
    }

    return this.renderScrollableGrid(gridClassNames);
  }
});

module.exports = GridComponent;
