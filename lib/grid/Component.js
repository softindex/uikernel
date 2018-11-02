"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _utils = _interopRequireDefault(require("../common/utils"));

var _columns = _interopRequireDefault(require("./mixins/columns"));

var _pagination = _interopRequireDefault(require("./mixins/pagination"));

var _statuses = _interopRequireDefault(require("./mixins/statuses"));

var _sorting = _interopRequireDefault(require("./mixins/sorting"));

var _data = _interopRequireDefault(require("./mixins/data"));

var _editor = _interopRequireDefault(require("./mixins/editor"));

var _ui = _interopRequireDefault(require("./mixins/ui"));

var _select = _interopRequireDefault(require("./mixins/select"));

var _ThrottleError = _interopRequireDefault(require("../common/ThrottleError"));

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
var RESET_SELECTED_COLUMNS = 1 << 4;
var RESET_BLACK_LIST_MODE = 1 << 5;

var propTypes = function () {
  var sortElementProp = _propTypes.default.shape({
    column: _propTypes.default.string,
    direction: _propTypes.default.any
  });

  var sortProp = _propTypes.default.oneOfType([sortElementProp, _propTypes.default.arrayOf(sortElementProp)]);

  return {
    className: _propTypes.default.string,
    model: _propTypes.default.shape({
      read: _propTypes.default.func.isRequired,
      update: _propTypes.default.func,
      isValidRecord: _propTypes.default.func,
      getValidationDependency: _propTypes.default.func,
      on: _propTypes.default.func,
      off: _propTypes.default.func
    }),
    cols: _propTypes.default.object,
    viewColumns: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.object]),
    selected: _propTypes.default.array,
    // sort: PropTypes.object,
    page: _propTypes.default.number,
    defaultViewCount: _propTypes.default.number,
    viewCount: _propTypes.default.number,
    viewVariants: _propTypes.default.arrayOf(_propTypes.default.number),
    onChangeViewCount: _propTypes.default.func,
    onChange: _propTypes.default.func,
    onError: _propTypes.default.func,
    onPageLoad: _propTypes.default.func,
    onInit: _propTypes.default.func,
    onDestroy: _propTypes.default.func,
    autoSubmit: _propTypes.default.bool,
    height: _propTypes.default.number,
    onSelectedChange: _propTypes.default.func,
    onSorting: _propTypes.default.func,
    multipleSorting: _propTypes.default.bool,
    selectAllStatus: _propTypes.default.any,
    onToggleSelected: _propTypes.default.func,
    onToggleSelectAll: _propTypes.default.func,
    defaultSort: function defaultSort(props, propName) {
      if (!props.defaultSort) {
        return;
      }

      for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: function sort(props, propName) {
      if (!props.sort) {
        return;
      }

      for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: _propTypes.default.bool,
    partialErrorChecking: _propTypes.default.bool,
    warningsValidator: _propTypes.default.shape({
      isValidRecord: _propTypes.default.func,
      getValidationDependency: _propTypes.default.func
    })
  };
}();

var GridComponent = (0, _createReactClass.default)((0, _objectSpread2.default)({
  displayName: "GridComponent"
}, _columns.default, _pagination.default, _statuses.default, _sorting.default, _data.default, _editor.default, _ui.default, _select.default, {
  getDefaultProps: function getDefaultProps() {
    return {
      page: 0,
      defaultViewCount: 0,
      partialErrorChecking: false,
      selected: []
    };
  },
  getInitialState: function getInitialState() {
    this._throttledUpdateTable = _utils.default.throttle(this.updateTable);
    this._validateRow = _utils.default.throttle(this._validateRow);

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
      selected: (0, _toConsumableArray2.default)(this.props.selected),
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

    if (!_utils.default.isEqual(this.props.model, nextProps.model)) {
      reset |= RESET_MODEL;
    }

    if (!_utils.default.isEqual(this.props.viewColumns, nextProps.viewColumns)) {
      reset |= RESET_VIEW_COLUMNS;
    }

    if (!_utils.default.isEqual(this.props.sort, nextProps.sort)) {
      reset |= RESET_SORT;
    }

    if (this.props.viewCount !== nextProps.viewCount) {
      reset |= RESET_VIEW_COUNT;
    }

    if (!_utils.default.isEqual(this.props.selected, nextProps.selected) || this.props.selectBlackListMode !== nextProps.selectBlackListMode) {
      reset |= RESET_SELECTED_COLUMNS;
    }

    if (!_utils.default.isEqual(this.props.blackListMode, nextProps.blackListMode)) {
      reset |= RESET_BLACK_LIST_MODE;
    }

    if (!reset) {
      return;
    }

    if (nextProps.selected) {
      this.state.selected = (0, _toConsumableArray2.default)(nextProps.selected);
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
          if (!(err instanceof _ThrottleError.default)) {
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

    return _react.default.createElement("div", {
      className: gridClassNames.join(' ')
    }, _react.default.createElement("div", {
      className: "wrapper-dgrid-header"
    }, _react.default.createElement("table", {
      cellSpacing: "0",
      className: "dgrid-header"
    }, _react.default.createElement("colgroup", null, header.colGroup), _react.default.createElement("thead", null, header.cols.map(function (row, colKey) {
      return _react.default.createElement("tr", {
        key: colKey
      }, row.map(function (col, rowKey) {
        var header = _this._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);

        var props = {
          key: rowKey,
          className: col.className,
          onClick: col.sort ? _this._sortCol.bind(_this, col.field) : _this._handleHeaderCellClick.bind(_this, col),
          colSpan: col.cols,
          rowSpan: col.rows
        };
        return typeof header === 'string' ? _react.default.createElement("th", (0, _extends2.default)({}, props, {
          dangerouslySetInnerHTML: {
            __html: header
          }
        })) : _react.default.createElement("th", props, header);
      }));
    })))), _react.default.createElement("div", {
      style: {
        maxHeight: this.props.height,
        height: this.props.height
      },
      className: "dgrid-body-wrapper dgrid-scrollable"
    }, _react.default.createElement("div", {
      className: "dgrid-body"
    }, _react.default.createElement("div", {
      className: this.state.showLoader ? 'dgrid-loader' : '',
      ref: function ref(loader) {
        return _this.loader = loader;
      }
    }), _react.default.createElement("table", {
      cellSpacing: "0",
      ref: function ref(body) {
        return _this.body = body;
      },
      onClick: this._handleBodyClick
    }, _react.default.createElement("colgroup", null, header.colGroup), _react.default.createElement("tbody", {
      className: "dgrid-body-table",
      ref: function ref(tbody) {
        return _this.tBody = tbody;
      }
    })))), _react.default.createElement("div", {
      className: "wrapper-totals"
    }, this._renderTotals(this.props.height)), this._renderPagination());
  },
  renderGrid: function renderGrid(gridClassNames) {
    var _this2 = this;

    var header = this._formHeader();

    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
    return _react.default.createElement("div", {
      className: gridClassNames.join(' ')
    }, _react.default.createElement("div", {
      className: this.state.showLoader ? 'dgrid-loader' : '',
      ref: function ref(loader) {
        return _this2.loader = loader;
      }
    }), _react.default.createElement("table", {
      cellSpacing: "0",
      className: "dgrid-body-table",
      ref: function ref(body) {
        return _this2.body = body;
      },
      onClick: this._handleBodyClick
    }, _react.default.createElement("colgroup", null, header.colGroup), _react.default.createElement("thead", null, header.cols.map(function (row, colKey) {
      return _react.default.createElement("tr", {
        key: colKey
      }, row.map(function (col, rowKey) {
        var header = _this2._getHeaderCellHTML(col.hasOwnProperty('name') ? col.name : col.id);

        var props = {
          key: rowKey,
          className: col.className,
          onClick: col.sort ? _this2._sortCol.bind(_this2, col.field) : _this2._handleHeaderCellClick.bind(_this2, col),
          colSpan: col.cols,
          rowSpan: col.rows
        };
        return typeof header === 'string' ? _react.default.createElement("th", (0, _extends2.default)({}, props, {
          dangerouslySetInnerHTML: {
            __html: header
          }
        })) : _react.default.createElement("th", props, header);
      }));
    })), _react.default.createElement("tbody", {
      className: "dgrid-body-table",
      ref: function ref(tbody) {
        return _this2.tBody = tbody;
      }
    }), this._renderTotals(this.props.height)), this._renderPagination());
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
var _default = GridComponent;
exports.default = _default;
module.exports = exports.default;