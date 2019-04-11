/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * React table component
 */

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {throttle, isEqual} from '../common/utils';

import GridColumnsMixin from './mixins/columns';
import gridMixinPagination from './mixins/pagination';
import gridMixinStatuses from './mixins/statuses';
import gridMixinSorting from './mixins/sorting';
import gridMixinData from './mixins/data';
import gridMixinEditor from './mixins/editor';
import gridMixinUI from './mixins/ui';
import gridMixinSelect from './mixins/select';
import ThrottleError from '../common/ThrottleError';

const RESET_MODEL = 1 << 0;
const RESET_VIEW_COLUMNS = 1 << 1;
const RESET_SORT = 1 << 2;
const RESET_VIEW_COUNT = 1 << 3;
const RESET_SELECTED_COLUMNS = 1 << 4;
const RESET_BLACK_LIST_MODE = 1 << 5;

const propTypes = (() => {
  const sortElementProp = PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.any
  });
  const sortProp = PropTypes.oneOfType([
    sortElementProp,
    PropTypes.arrayOf(sortElementProp)
  ]);
  return {
    className: PropTypes.string,
    model: PropTypes.shape({
      read: PropTypes.func.isRequired,
      update: PropTypes.func,
      isValidRecord: PropTypes.func,
      getValidationDependency: PropTypes.func,
      on: PropTypes.func,
      off: PropTypes.func
    }),
    cols: PropTypes.object,
    viewColumns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.object
    ]),
    selected: PropTypes.array,
    // sort: PropTypes.object,
    page: PropTypes.number,
    defaultViewCount: PropTypes.number,
    viewCount: PropTypes.number,
    viewVariants: PropTypes.arrayOf(PropTypes.number),
    onChangeViewCount: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onPageLoad: PropTypes.func,
    onInit: PropTypes.func,
    onDestroy: PropTypes.func,
    autoSubmit: PropTypes.bool,
    height: PropTypes.number,
    onSelectedChange: PropTypes.func,
    onSorting: PropTypes.func,
    multipleSorting: PropTypes.bool,
    selectAllStatus: PropTypes.any,
    onToggleSelected: PropTypes.func,
    onToggleSelectAll: PropTypes.func,
    defaultSort: (props, propName, ...rest) => {
      if (!props.defaultSort) {
        return;
      }
      const validProp = sortProp(props, propName, ...rest);
      if (validProp) {
        return validProp;
      }
      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: (props, propName, ...rest) => {
      if (!props.sort) {
        return;
      }
      const validProp = sortProp(props, propName, ...rest);
      if (validProp) {
        return validProp;
      }
      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: PropTypes.bool,
    partialErrorChecking: PropTypes.bool,
    warningsValidator: PropTypes.shape({
      isValidRecord: PropTypes.func,
      getValidationDependency: PropTypes.func
    })
  };
})();

const GridComponent = createReactClass({
  ...GridColumnsMixin,
  ...gridMixinPagination,
  ...gridMixinStatuses,
  ...gridMixinSorting,
  ...gridMixinData,
  ...gridMixinEditor,
  ...gridMixinUI,
  ...gridMixinSelect,

  getDefaultProps: () => ({
    page: 0,
    defaultViewCount: 0,
    partialErrorChecking: false,
    selected: []
  }),
  getInitialState: function () {
    this._throttledUpdateTable = throttle(this.updateTable);
    this._validateRow = throttle(this._validateRow);
    if (this.props.onInit) {
      this.props.onInit();
    }
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
      selected: [...this.props.selected],
      showLoader: false
    };
  },
  componentDidMount: function () {
    this._isMounted = true;
    if (this.props.model) {
      this.props.model.on('create', this._onRecordsCreated);
      this.props.model.on('update', this._setData);
      this.props.model.on('delete', this.updateTable);
    }
    this.updateTable();
  },
  componentWillUnmount: function () {
    this._isMounted = false;
    if (this.props.model) {
      this.props.model.off('create', this._onRecordsCreated);
      this.props.model.off('update', this._setData);
      this.props.model.off('delete', this.updateTable);
    }
    if (this.props.onDestroy) {
      this.props.onDestroy();
    }
  },
  componentWillReceiveProps: function (nextProps) {
    const oldProps = this.props;
    let reset = 0;

    if (!isEqual(this.props.model, nextProps.model)) {
      reset |= RESET_MODEL;
    }
    if (!isEqual(this.props.viewColumns, nextProps.viewColumns)) {
      reset |= RESET_VIEW_COLUMNS;
    }
    if (!isEqual(this.props.sort, nextProps.sort)) {
      reset |= RESET_SORT;
    }
    if (this.props.viewCount !== nextProps.viewCount) {
      reset |= RESET_VIEW_COUNT;
    }
    if (
      !isEqual(this.props.selected, nextProps.selected)
      || this.props.selectBlackListMode !== nextProps.selectBlackListMode
    ) {
      reset |= RESET_SELECTED_COLUMNS;
    }
    if (!isEqual(this.props.blackListMode, nextProps.blackListMode)) {
      reset |= RESET_BLACK_LIST_MODE;
    }

    if (!reset) {
      return;
    }

    if (nextProps.selected) {
      this.state.selected = [...nextProps.selected];
    }
    this.setState({}, function () {
      if (reset & RESET_SORT || reset & RESET_MODEL || reset & RESET_VIEW_COUNT) {
        if (reset & RESET_MODEL) {
          this.state.data = null;
          if (oldProps.model) {
            oldProps.model.off('create', this._onRecordsCreated);
            oldProps.model.off('update', this._setData);
          }
          if (this.props.model) {
            this.props.model.on('create', this._onRecordsCreated);
            this.props.model.on('update', this._setData);
          }
          this._setPage(0);
        }
        this._throttledUpdateTable().catch(err => {
          if (!(err instanceof ThrottleError)) {
            console.error(err);
          }
        });
      } else if ((reset & RESET_VIEW_COLUMNS) || (reset & RESET_SELECTED_COLUMNS) || (reset & RESET_BLACK_LIST_MODE)) {
        this._renderBody();
      }
    });
  },
  renderScrollableGrid(gridClassNames) {
    const header = this._formHeader();
    return (
      <div className={gridClassNames.join(' ')}>
        <div className="wrapper-dgrid-header">
          <table cellSpacing="0" className="dgrid-header">
            <colgroup>{header.colGroup}</colgroup>
            <thead>
              {header.cols.map((row, colKey) => {
                return (
                  <tr key={colKey}>
                    {row.map((col, rowKey) => {
                      const header = this._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);
                      const props = {
                        key: rowKey,
                        className: col.className,
                        onClick: col.sort ? this._sortCol.bind(this, col.field) :
                          this._handleHeaderCellClick.bind(this, col),
                        colSpan: col.cols,
                        rowSpan: col.rows
                      };
                      return (
                        typeof header === 'string' ?
                          <th
                            {...props}
                            dangerouslySetInnerHTML={{
                              __html: header
                            }}/>
                          : <th {...props}>{header}</th>);
                    })}
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
        <div
          style={{maxHeight: this.props.height, height: this.props.height}}
          className='dgrid-body-wrapper dgrid-scrollable'
        >
          <div className="dgrid-body">
            <div className={this.state.showLoader ? 'dgrid-loader' : ''} ref={(loader) => this.loader = loader }/>
            <table
              cellSpacing="0"
              ref={(body) => this.body = body }
              onClick={this._handleBodyClick}
            >
              <colgroup>{header.colGroup}</colgroup>
              <tbody className="dgrid-body-table" ref={(tbody) => this.tBody = tbody }/>
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
  renderGrid(gridClassNames) {
    const header = this._formHeader();
    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
    return (
      <div className={gridClassNames.join(' ')}>
        <div className={this.state.showLoader ? 'dgrid-loader' : ''} ref={(loader) => this.loader = loader }/>
        <table
          cellSpacing="0"
          className="dgrid-body-table"
          ref={(body) => this.body = body }
          onClick={this._handleBodyClick}
        >
          <colgroup>{header.colGroup}</colgroup>
          <thead>
            {header.cols.map((row, colKey) => {
              return (
                <tr key={colKey}>
                  {row.map((col, rowKey) => {
                    const header = this._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);
                    const props = {
                      key: rowKey,
                      className: col.className,
                      onClick: col.sort ? this._sortCol.bind(this, col.field) :
                        this._handleHeaderCellClick.bind(this, col),
                      colSpan: col.cols,
                      rowSpan: col.rows
                    };
                    return (
                      typeof header === 'string' ?
                        <th
                          {...props}
                          dangerouslySetInnerHTML={{
                            __html: header
                          }}/>
                        : <th {...props}>{header}</th>);
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="dgrid-body-table" ref={(tbody) => this.tBody = tbody }/>
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

GridComponent.propTypes = propTypes;

export default GridComponent;
