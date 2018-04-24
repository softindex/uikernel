'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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

var _ThrottleError = require('../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESET_MODEL = 1 << 0; /**
                           * Copyright (с) 2015-present, SoftIndex LLC.
                           * All rights reserved.
                           *
                           * This source code is licensed under the BSD-style license found in the
                           * LICENSE file in the root directory of this source tree.
                           */

/**
 * React table component
 */

var RESET_VIEW_COLUMNS = 1 << 1;
var RESET_SORT = 1 << 2;
var RESET_VIEW_COUNT = 1 << 3;
var RESET_SELECTED_COLUMNS = 1 << 4;
var RESET_BLACK_LIST_MODE = 1 << 5;

var propTypes = function () {
  var sortElementProp = _propTypes2.default.shape({
    column: _propTypes2.default.string,
    direction: _propTypes2.default.any
  });
  var sortProp = _propTypes2.default.oneOfType([sortElementProp, _propTypes2.default.arrayOf(sortElementProp)]);
  return {
    className: _propTypes2.default.string,
    model: _propTypes2.default.shape({
      read: _propTypes2.default.func.isRequired,
      update: _propTypes2.default.func,
      isValidRecord: _propTypes2.default.func,
      getValidationDependency: _propTypes2.default.func,
      on: _propTypes2.default.func,
      off: _propTypes2.default.func
    }),
    cols: _propTypes2.default.object,
    viewColumns: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.object]),
    selected: _propTypes2.default.array,
    // sort: PropTypes.object,
    page: _propTypes2.default.number,
    defaultViewCount: _propTypes2.default.number,
    viewCount: _propTypes2.default.number,
    viewVariants: _propTypes2.default.arrayOf(_propTypes2.default.number),
    onChangeViewCount: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onError: _propTypes2.default.func,
    onPageLoad: _propTypes2.default.func,
    onInit: _propTypes2.default.func,
    onDestroy: _propTypes2.default.func,
    autoSubmit: _propTypes2.default.bool,
    height: _propTypes2.default.number,
    onSelectedChange: _propTypes2.default.func,
    onSorting: _propTypes2.default.func,
    multipleSorting: _propTypes2.default.bool,
    selectAllStatus: _propTypes2.default.any,
    onToggleSelected: _propTypes2.default.func,
    onToggleSelectAll: _propTypes2.default.func,
    defaultSort: function defaultSort(props, propName) {
      for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      if (!props.defaultSort) {
        return;
      }
      var validProp = sortProp.apply(undefined, [props, propName].concat(rest));
      if (validProp) {
        return validProp;
      }
      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: function sort(props, propName) {
      for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      if (!props.sort) {
        return;
      }
      var validProp = sortProp.apply(undefined, [props, propName].concat(rest));
      if (validProp) {
        return validProp;
      }
      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: _propTypes2.default.bool,
    partialErrorChecking: _propTypes2.default.bool,
    warningsValidator: _propTypes2.default.shape({
      isValidRecord: _propTypes2.default.func,
      getValidationDependency: _propTypes2.default.func
    })
  };
}();

var GridComponent = (0, _createReactClass2.default)((0, _extends3.default)({
  displayName: 'GridComponent'
}, _columns2.default, _pagination2.default, _statuses2.default, _sorting2.default, _data2.default, _editor2.default, _ui2.default, _select2.default, {

  getDefaultProps: function getDefaultProps() {
    return {
      page: 0,
      defaultViewCount: 0,
      partialErrorChecking: false,
      selected: []
    };
  },
  getInitialState: function getInitialState() {
    this._throttledUpdateTable = _utils2.default.throttle(this.updateTable);
    this._validateRow = _utils2.default.throttle(this._validateRow);
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
      selected: this.props.selected,
      showLoader: false
    };
  },
  componentDidMount: function componentDidMount() {
    this._isMounted = true;
    if (this.props.model) {
      this.props.model.on('create', this._onRecordCreated);
      this.props.model.on('update', this._setData);
      this.props.model.on('delete', this.updateTable);
    }
    this.updateTable();
  },
  componentWillUnmount: function componentWillUnmount() {
    this._isMounted = false;
    if (this.props.model) {
      this.props.model.off('create', this._onRecordCreated);
      this.props.model.off('update', this._setData);
      this.props.model.off('delete', this.updateTable);
    }
    if (this.props.onDestroy) {
      this.props.onDestroy();
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
    if (!_utils2.default.isEqual(this.props.selected, nextProps.selected)) {
      reset |= RESET_SELECTED_COLUMNS;
    }
    if (!_utils2.default.isEqual(this.props.blackListMode, nextProps.blackListMode)) {
      reset |= RESET_BLACK_LIST_MODE;
    }

    if (!reset) {
      return;
    }

    if (nextProps.selected) {
      this.state.selected = nextProps.selected;
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
        this._throttledUpdateTable().catch(function (err) {
          if (!(err instanceof _ThrottleError2.default)) {
            console.error(err);
          }
        });
      } else if (reset & RESET_VIEW_COLUMNS || reset & RESET_SELECTED_COLUMNS || reset & RESET_BLACK_LIST_MODE) {
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
          _react2.default.createElement(
            'thead',
            null,
            header.cols.map(function (row, colKey) {
              return _react2.default.createElement(
                'tr',
                { key: colKey },
                row.map(function (col, rowKey) {
                  var header = _this._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);
                  var props = {
                    key: rowKey,
                    className: col.className,
                    onClick: col.sort ? _this._sortCol.bind(_this, col.field) : _this._handleHeaderCellClick.bind(_this, col),
                    colSpan: col.cols,
                    rowSpan: col.rows
                  };
                  return typeof header === 'string' ? _react2.default.createElement('th', (0, _extends3.default)({}, props, {
                    dangerouslySetInnerHTML: {
                      __html: header
                    } })) : _react2.default.createElement(
                    'th',
                    props,
                    header
                  );
                })
              );
            })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        {
          style: { maxHeight: this.props.height, height: this.props.height },
          className: 'dgrid-body-wrapper dgrid-scrollable'
        },
        _react2.default.createElement(
          'div',
          { className: 'dgrid-body' },
          _react2.default.createElement('div', { className: this.state.showLoader ? 'dgrid-loader' : '', ref: function ref(loader) {
              return _this.loader = loader;
            } }),
          _react2.default.createElement(
            'table',
            {
              cellSpacing: '0',
              ref: function ref(body) {
                return _this.body = body;
              },
              onClick: this._handleBodyClick
            },
            _react2.default.createElement(
              'colgroup',
              null,
              header.colGroup
            ),
            _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: function ref(tbody) {
                return _this.tBody = tbody;
              } })
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
      _react2.default.createElement('div', { className: this.state.showLoader ? 'dgrid-loader' : '', ref: function ref(loader) {
          return _this2.loader = loader;
        } }),
      _react2.default.createElement(
        'table',
        {
          cellSpacing: '0',
          className: 'dgrid-body-table',
          ref: function ref(body) {
            return _this2.body = body;
          },
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
                var header = _this2._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);
                var props = {
                  key: rowKey,
                  className: col.className,
                  onClick: col.sort ? _this2._sortCol.bind(_this2, col.field) : _this2._handleHeaderCellClick.bind(_this2, col),
                  colSpan: col.cols,
                  rowSpan: col.rows
                };
                return typeof header === 'string' ? _react2.default.createElement('th', (0, _extends3.default)({}, props, {
                  dangerouslySetInnerHTML: {
                    __html: header
                  } })) : _react2.default.createElement(
                  'th',
                  props,
                  header
                );
              })
            );
          })
        ),
        _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: function ref(tbody) {
            return _this2.tBody = tbody;
          } }),
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

GridComponent.propTypes = propTypes;

exports.default = GridComponent;
module.exports = exports['default'];