/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _columns = require('./mixins/columns');

var _columns2 = _interopRequireDefault(_columns);

var _pagination = require('./mixins/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _statuses = require('./mixins/statuses');

var _statuses2 = _interopRequireDefault(_statuses);

var _sorting = require('./mixins/sorting');

var _sorting2 = _interopRequireDefault(_sorting);

var _data = require('./mixins/data');

var _data2 = _interopRequireDefault(_data);

var _editor = require('./mixins/editor');

var _editor2 = _interopRequireDefault(_editor);

var _ui = require('./mixins/ui');

var _ui2 = _interopRequireDefault(_ui);

var _select = require('./mixins/select');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * React table component
 */

var RESET_MODEL = 1 << 0;
var RESET_VIEW_COLUMNS = 1 << 1;
var RESET_SORT = 1 << 2;
var RESET_VIEW_COUNT = 1 << 3;

var GridComponent = _react2.default.createClass((0, _extends3.default)({
  displayName: 'GridComponent'
}, _columns2.default, _pagination2.default, _statuses2.default, _sorting2.default, _data2.default, _editor2.default, _ui2.default, _select2.default, {

  propTypes: function () {
    var sortElementProp = _react2.default.PropTypes.shape({
      column: _react2.default.PropTypes.string,
      direction: _react2.default.PropTypes.string
    });
    var sortProp = _react2.default.PropTypes.oneOfType([sortElementProp, _react2.default.PropTypes.arrayOf(sortElementProp)]);
    return {
      className: _react2.default.PropTypes.string,
      model: _react2.default.PropTypes.shape({
        read: _react2.default.PropTypes.func.isRequired,
        update: _react2.default.PropTypes.func,
        isValidRecord: _react2.default.PropTypes.func,
        getValidationDependency: _react2.default.PropTypes.func,
        on: _react2.default.PropTypes.func.isRequired,
        off: _react2.default.PropTypes.func.isRequired
      }),
      viewColumns: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.object]),
      // sort: React.PropTypes.object,
      page: _react2.default.PropTypes.number,
      defaultViewCount: _react2.default.PropTypes.number,
      viewCount: _react2.default.PropTypes.number,
      viewVariants: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
      onChangeViewCount: _react2.default.PropTypes.func,
      onError: _react2.default.PropTypes.func,
      onPageLoad: _react2.default.PropTypes.func,
      height: _react2.default.PropTypes.number,
      onSorting: _react2.default.PropTypes.func,
      defaultSort: function defaultSort(props, propName) {
        if (!props.defaultSort) {
          return;
        }
        var validProp = sortProp(props, propName);
        if (validProp) {
          return validProp;
        }
        if (props.hasOwnProperty('sort')) {
          return Error('You can not set "defaultSort" when specified "sort" prop');
        }
      },
      sort: function sort(props, propName) {
        if (!props.sort) {
          return;
        }
        var validProp = sortProp(props, propName);
        if (validProp) {
          return validProp;
        }
        if (!props.onSorting) {
          return Error('You need to define prop "onSorting" when set "sort"');
        }
      },
      saveFullRecord: _react2.default.PropTypes.bool,
      partialErrorChecking: _react2.default.PropTypes.bool,
      warningsValidator: _react2.default.PropTypes.shape({
        isValidRecord: _react2.default.PropTypes.func,
        getValidationDependency: _react2.default.PropTypes.func
      })
    };
  }(),
  getDefaultProps: function getDefaultProps() {
    return {
      page: 0,
      defaultViewCount: 0,
      partialErrorChecking: false
    };
  },
  getInitialState: function getInitialState() {
    this._loadData = _utils2.default.throttle(this._loadData);
    this._validateRow = _utils2.default.throttle(this._validateRow);
    this._checkWarnings = _utils2.default.throttle(this._checkWarnings);
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
  componentDidMount: function componentDidMount() {
    this._isMounted = true;
    if (this.props.model) {
      this.props.model.on('create', this._onRecordCreated);
      this.props.model.on('update', this._setData);
    }
    this.updateTable();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isMounted = false;
    if (this.props.model) {
      this.props.model.off('create', this._onRecordCreated);
      this.props.model.off('update', this._setData);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var oldProps = this.props;
    var reset = 0;

    if (!_utils2.default.isEqual(this.props.model, nextProps.model)) {
      reset |= RESET_MODEL;
    }
    if (!_utils2.default.isEqual(this.props.viewColumns, nextProps.viewColumns)) {
      reset |= RESET_VIEW_COLUMNS;
    }
    if (!_utils2.default.isEqual(this.props.sort, nextProps.sort)) {
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
  renderScrollableGrid: function renderScrollableGrid(gridClassNames) {
    var _this = this;

    var header = this._formHeader();
    return _react2.default.createElement(
      'div',
      { className: gridClassNames.join(' ') },
      _react2.default.createElement(
        'div',
        { className: 'wrapper-dgrid-header' },
        _react2.default.createElement(
          'table',
          { cellSpacing: '0', className: 'dgrid-header' },
          _react2.default.createElement(
            'colgroup',
            null,
            header.colGroup
          ),
          header.cols.map(function (row, colKey) {
            return _react2.default.createElement(
              'tr',
              { key: colKey },
              row.map(function (col, rowKey) {
                return _react2.default.createElement('th', {
                  key: rowKey,
                  className: col.className,
                  onClick: col.sort ? _this._sortCol.bind(_this, col.field) : _this._handleHeaderCellClick.bind(_this, col),
                  colSpan: col.cols,
                  rowSpan: col.rows,
                  dangerouslySetInnerHTML: {
                    __html: _this._getHeaderCellHTML(col.name || col.id)
                  }
                });
              })
            );
          })
        )
      ),
      _react2.default.createElement(
        'div',
        {
          style: { maxHeight: this.props.height },
          className: 'dgrid-body-wrapper dgrid-scrollable'
        },
        _react2.default.createElement(
          'div',
          { className: 'dgrid-body' },
          _react2.default.createElement('div', { className: 'dgrid-loader', ref: 'loader' }),
          _react2.default.createElement(
            'table',
            {
              cellSpacing: '0',
              ref: 'body',
              onClick: this._handleBodyClick
            },
            _react2.default.createElement(
              'colgroup',
              null,
              header.colGroup
            ),
            _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: 'tbody' })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'wrapper-totals' },
        this._renderTotals(this.props.height)
      ),
      this._renderPagination()
    );
  },
  renderGrid: function renderGrid(gridClassNames) {
    var _this2 = this;

    var header = this._formHeader();
    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
    return _react2.default.createElement(
      'div',
      { className: gridClassNames.join(' ') },
      _react2.default.createElement('div', { className: 'dgrid-loader', ref: 'loader' }),
      _react2.default.createElement(
        'table',
        {
          cellSpacing: '0',
          className: 'dgrid-body-table',
          ref: 'body',
          onClick: this._handleBodyClick
        },
        _react2.default.createElement(
          'colgroup',
          null,
          header.colGroup
        ),
        _react2.default.createElement(
          'thead',
          null,
          header.cols.map(function (row, colKey) {
            return _react2.default.createElement(
              'tr',
              { key: colKey },
              row.map(function (col, rowKey) {
                return _react2.default.createElement('th', {
                  key: rowKey,
                  className: col.className,
                  onClick: col.sort ? _this2._sortCol.bind(_this2, col.field) : _this2._handleHeaderCellClick.bind(_this2, col),
                  colSpan: col.cols,
                  rowSpan: col.rows,
                  dangerouslySetInnerHTML: {
                    __html: _this2._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id)
                  }
                });
              })
            );
          })
        ),
        _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: 'tbody' }),
        this._renderTotals(this.props.height)
      ),
      this._renderPagination()
    );
  },
  render: function render() {
    var gridClassNames = ['data-grid'];

    if (this.props.className) {
      gridClassNames.push(this.props.className);
    }

    if (!this.props.height) {
      return this.renderGrid(gridClassNames);
    }

    return this.renderScrollableGrid(gridClassNames);
  }
}));

exports.default = GridComponent;
module.exports = exports['default'];