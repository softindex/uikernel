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

var React = require('react');
var utils = require('../common/utils');
var gridMixinColumns = require('./mixins/columns');
var gridMixinPagination = require('./mixins/pagination');
var gridMixinStatuses = require('./mixins/statuses');
var gridMixinSorting = require('./mixins/sorting');
var gridMixinData = require('./mixins/data');
var gridMixinEditor = require('./mixins/editor');
var gridMixinUI = require('./mixins/ui');
var gridMixinSelect = require('./mixins/select');

var RESET_MODEL = 1 << 0;
var RESET_VIEW_COLUMNS = 1 << 1;
var RESET_SORT = 1 << 2;
var RESET_VIEW_COUNT = 1 << 3;

var GridComponent = React.createClass({
  propTypes: {
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
    sort: React.PropTypes.object,
    page: React.PropTypes.number,
    defaultViewCount: React.PropTypes.number,
    viewCount: React.PropTypes.number,
    viewVariants: React.PropTypes.arrayOf(React.PropTypes.number),
    onChangeViewCount: React.PropTypes.func,
    onError: React.PropTypes.func,
    onPageLoad: React.PropTypes.func,
    height: React.PropTypes.number
  },
  mixins: [
    gridMixinColumns,       // Columns control function
    gridMixinPagination,    // Pagination control function
    gridMixinStatuses,      // Record statuses control function
    gridMixinSorting,       // Sort control function
    gridMixinData,          // Data control function
    gridMixinEditor,        // Cell editors control function
    gridMixinUI,            // User interfaces control function
    gridMixinSelect         // Rows selection control function (Select)
  ],
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
    var oldProps = this.props;
    var reset = 0;

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
    var header = this._formHeader();
    return (
      <div className={gridClassNames.join(' ')}>
        <div className="wrapper-dgrid-header">
          <table cellSpacing="0" className="dgrid-header">
            <colgroup>{header.colGroup}</colgroup>
            {header.cols.map(function (row, colKey) {
              return (
                <tr key={colKey}>
                  {row.map(function (col, rowKey) {
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
                            __html: this._getHeaderCellHTML(col.name || col.field)
                          }}
                      />
                    );
                  }.bind(this))}
                </tr>
              );
            }.bind(this))}
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
    var header = this._formHeader();
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
            {header.cols.map(function (row, colKey) {
              return (
                <tr key={colKey}>
                  {row.map(function (col, rowKey) {
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
                            __html: this._getHeaderCellHTML(col.name || col.field)
                          }}
                      />
                    );
                  }.bind(this))}
                </tr>
              );
            }.bind(this))}
          </thead>
          <tbody className="dgrid-body-table" ref="tbody"/>
          {this._renderTotals(this.props.height)}
        </table>
        {this._renderPagination()}
      </div>
    );
  },
  render: function () {
    var gridClassNames = ['data-grid'];

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
