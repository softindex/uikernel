"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toPromise = _interopRequireDefault(require("../../common/toPromise"));

var _utils = _interopRequireDefault(require("../../common/utils"));

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _ThrottleError = _interopRequireDefault(require("../../common/ThrottleError"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridUIMixin = {
  /**
   * Table content click event handler
   *
   * @param {Event} event
   */
  _handleBodyClick: function _handleBodyClick(event) {
    var target = event.target;

    var refParent = _utils.default.parents(target, '[ref]')[0];

    var element;

    if (target.classList.contains('dgrid-cell')) {
      element = event.target;
    } else {
      element = _utils.default.parents(target, 'td.dgrid-cell')[0];
    }

    if (element && !(refParent && refParent.hasAttribute('disabled'))) {
      this._handleCellClick(event, element, (refParent || event.target).getAttribute('ref'));
    }
  },

  /**
   * Cell click handler
   *
   * @param {Event}           event       Event object
   * @param {HTMLElement}     element     Cell DOM element
   * @param {string}          ref         Click handler name in the table configuration
   */
  _handleCellClick: function _handleCellClick(event, element, ref) {
    var colId = element.getAttribute('key');
    var row = element.parentNode.getAttribute('key');
    var columnConfig = this.props.cols[colId];
    var recordId = this.state.recordsInfo[row].id;

    var record = this._getRecord(row); // Trigger click handler on the table configuration


    if (ref) {
      columnConfig.onClickRefs[ref](event, recordId, record, this);
    } else if (columnConfig.onClick) {
      columnConfig.onClick(event, recordId, record, this);
    } // Open cell editor


    if (this.props.cols[colId].editor) {
      this._renderEditor(element, row, colId);
    }
  },
  // TODO Deprecated
  _handleHeaderCellClick: function _handleHeaderCellClick(col, event) {
    var target = event.target;

    var refParent = _utils.default.parents(target, '[ref]')[0];

    var ref = (refParent || target).getAttribute('ref');
    var handler;

    if (ref && col.onClickRefs) {
      handler = col.onClickRefs[ref];

      if (handler) {
        return handler(event, this);
      }
    }

    if (col.onClick) {
      col.onClick(event, this);
    }
  },

  /**
   * Fetch server data
   */
  updateTable: function () {
    var _updateTable = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var viewCount, obj, page, data, extra, recordIds;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.setState({
                showLoader: true
              });

              if (this.props.model) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              viewCount = this.getViewCount();
              _context.prev = 4;
              _context.next = 7;
              return this._loadData({
                limit: viewCount,
                offset: this.state.page * viewCount,
                sort: this._sortingToArray(),
                fields: this._getFieldsToRender(),
                extra: this._getAdditionalIds()
              });

            case 7:
              obj = _context.sent;
              _context.next = 15;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);

              if (_context.t0 instanceof _ThrottleError.default) {
                _context.next = 14;
                break;
              }

              throw _context.t0;

            case 14:
              return _context.abrupt("return");

            case 15:
              if (this._isMounted) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return");

            case 17:
              if (!(this.getViewCount() && !obj.hasOwnProperty('count'))) {
                _context.next = 19;
                break;
              }

              throw new Error('Incorrect response from GridModel. "response.count" not defined');

            case 19:
              // If required page is not included in the range of existing pages,
              // request existing in a moment page
              page = this._checkPage(this.state.page, this.getViewCount(), obj.count);

              if (!(page !== this.state.page)) {
                _context.next = 24;
                break;
              }

              this.state.page = page;
              this.updateTable();
              return _context.abrupt("return");

            case 24:
              data = this._dataArrayToObject(obj.records);
              extra = this._dataArrayToObject(obj.extraRecords || []);
              recordIds = Object.keys(data.records).concat(Object.keys(extra.records));
              _context.next = 29;
              return (0, _toPromise.default)(this.setState.bind(this), true)({
                data: Object.assign({}, data.records, extra.records),
                mainIds: Object.keys(data.records),
                count: obj.count,
                totals: obj.totals,
                recordsInfo: Object.assign({}, extra.info, data.info),
                errors: _utils.default.pick(this.state.errors, recordIds),
                changes: _utils.default.pick(this.state.changes, recordIds),
                statuses: _utils.default.pick(this.state.statuses, recordIds)
              });

            case 29:
              this._renderBody();

              this.setState({
                showLoader: false
              });

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 10]]);
    }));

    return function updateTable() {
      return _updateTable.apply(this, arguments);
    };
  }(),
  _getHeaderCellHTML: function _getHeaderCellHTML(columnName) {
    var cellHtml = typeof columnName === 'function' ? columnName(this) : columnName;

    if (cellHtml === undefined) {
      return '';
    }

    return cellHtml;
  },
  _escapeRecord: function _escapeRecord(columnId, record) {
    var field;
    var type;
    var i;
    var escapedRecord = {};
    var column = this.props.cols[columnId];
    var needEscaping = !column.hasOwnProperty('escape') || column.escape;
    var fields = column.render.slice(0, -1);

    for (i = 0; i < fields.length; i++) {
      field = fields[i];
      type = (0, _typeof2.default)(record[field]);

      if (needEscaping) {
        if (type === 'string') {
          escapedRecord[field] = _utils.default.escape(record[field]);
          continue;
        }

        if (type === 'object' && record[field] && !this.state.colsWithEscapeErrors[columnId]) {
          this.state.colsWithEscapeErrors[columnId] = true;
          console.error("UIKernel.Grid warning: " + "You send record with fields of Object type in escaped column \"".concat(columnId, "\". ") + "To use Objects, set column config \"escape\" to false, " + "and escape \"".concat(columnId, "\" field in render function by yourself"));
        }
      }

      escapedRecord[field] = record[field];
    }

    return escapedRecord;
  },

  /**
   * Get table cell HTML
   *
   * @param   {number}    columnId  Column ID
   * @param   {Object}    record    Table record
   * @param   {bool}      selected  "Selected" row status
   * @returns {string}    Table cell HTML
   * @private
   */
  _getCellHTML: function _getCellHTML(columnId, record, selected) {
    var render = _utils.default.last(this.props.cols[columnId].render);

    var cellHtml = render(this._escapeRecord(columnId, record), selected);
    return "".concat(_utils.default.isDefined(cellHtml) ? cellHtml : '');
  },

  /**
   * Get table row HTML
   *
   * @param       {number}    rowId         Row ID
   * @param       {string}    className   <TR> class attribute
   * @returns     {string}    Table row HTML
   * @private
   */
  _getRowHTML: function _getRowHTML(rowId, className) {
    var colId;

    var record = this._getRecord(rowId);

    var selected = this.isSelected(this.state.recordsInfo[rowId].id);
    var html = "<tr key=\"".concat(rowId, "\" class=\"") + (className || '') + ' ' + this._getRowStatusNames(rowId).join(' ') + ' ' + (selected ? 'dgrid__row_selected' : '') + '">';

    for (colId in this.props.cols) {
      if (this._isViewColumn(colId)) {
        html += "<td key=\"".concat(colId, "\" class=\"dgrid-cell").concat(this._getColumnClass(colId) ? ' ' + this._getColumnClass(colId) : '').concat(this._isChanged(rowId, this._getBindParam(colId)) ? ' dgrid-changed' : '').concat(this._hasError(rowId, this._getBindParam(colId)) ? ' dgrid-error' : '').concat(this._hasWarning(rowId, this._getBindParam(colId)) ? ' dgrid-warning' : '', "\">").concat(this._getCellHTML(colId, record, selected), "</td>");
      }
    }

    return "".concat(html, "</tr>");
  },

  /**
   * Redraw table content totally
   *
   * @private
   */
  _renderBody: function _renderBody() {
    if (!this.state.data) {
      return;
    }

    var i;
    var row;
    var htmlExtra = '';
    var htmlBody = '';

    var sorted = _utils.default.pairs(this.state.recordsInfo).sort(function (a, b) {
      return a[1].index - b[1].index;
    });

    for (i = 0; i < sorted.length; i++) {
      row = sorted[i][0];

      if (this._isMainRow(row)) {
        htmlBody += this._getRowHTML(row);
      } else if (this._isChanged(row) || this._getRowStatusNames(row).length) {
        htmlExtra += this._getRowHTML(row, 'others');
      }
    }

    this.tBody.innerHTML = htmlExtra + htmlBody;
  },

  /**
   * Display model changes
   *
   * @param {string} row      Row ID
   * @param {string} param    Model parameter
   * @private
   */
  _renderBinds: function _renderBinds(row, param) {
    var _this = this;

    // If parameter does not affect on the redraw, do nothing
    if (!this._isFieldAffectsRender(param)) {
      return;
    }

    var selected = this.isSelected(this.state.recordsInfo[row].id); // Update column dependencies

    this._getDependentColumns(param).forEach(function (column) {
      if (_this._isViewColumn(column) && !_this._isEditorVisible(row, column)) {
        _this._renderCell(row, column, selected);
      }
    }, this);
  },
  _removeTR: function _removeTR(rowId) {
    (0, _reactDom.findDOMNode)(this.body).removeRow(rowId);
  },
  _renderTotals: function _renderTotals(isScrollable) {
    var totalsDisplayed = false;
    var i;
    var className;
    var totalsRowHTML = '';

    var header = this._formHeader(); // If data for result line display exists, form it


    if (this.state.totals) {
      for (i in this.props.cols) {
        if (!this._isViewColumn(i)) {
          continue;
        }

        className = this.props.cols[i].className;

        if (className) {
          totalsRowHTML += "<td class=\"".concat(className, "\">");
        } else {
          totalsRowHTML += '<td>';
        }

        if (this.state.totals.hasOwnProperty(i)) {
          totalsRowHTML += this._getCellHTML(i, this.state.totals, false);
          totalsDisplayed = true;
        }

        totalsRowHTML += '</td>';
      }
    }

    if (!totalsDisplayed) {
      return null;
    }

    if (isScrollable) {
      return _react.default.createElement("table", {
        cellSpacing: "0",
        className: "dgrid-totals"
      }, _react.default.createElement("colgroup", null, header.colGroup), _react.default.createElement("tr", {
        dangerouslySetInnerHTML: {
          __html: totalsRowHTML
        }
      }));
    }

    return _react.default.createElement("tfoot", {
      className: "dgrid-totals"
    }, _react.default.createElement("tr", {
      dangerouslySetInnerHTML: {
        __html: totalsRowHTML
      }
    }));
  },
  _renderCell: function _renderCell(rowId, column, isSelected) {
    var _cell$classList;

    var cell = (0, _reactDom.findDOMNode)(this.body).querySelector("tr[key=\"".concat(rowId, "\"] td[key=").concat(column, "]"));
    cell.innerHTML = this._getCellHTML(column, this._getRecord(rowId), isSelected);
    cell.classList.remove('dgrid-changed', 'dgrid-error', 'dgrid-warning');
    var cellClassList = [];

    if (this._isChanged(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-changed');
    }

    if (this._hasError(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-error');
    }

    if (this._hasWarning(rowId, this._getBindParam(column))) {
      cellClassList.push('dgrid-warning');
    }

    (_cell$classList = cell.classList).add.apply(_cell$classList, cellClassList);
  },
  _updateRow: function () {
    var _updateRow2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(row) {
      var selected, viewColumns, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, viewColumn;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.state.data) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!this.state.data[row]) {
                _context2.next = 26;
                break;
              }

              selected = this.isSelected(this.state.recordsInfo[row].id);
              viewColumns = Object.keys(this.props.cols).filter(this._isViewColumn);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 8;

              for (_iterator = viewColumns[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                viewColumn = _step.value;

                this._renderCell(row, viewColumn, selected);
              }

              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 16:
              _context2.prev = 16;
              _context2.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 19:
              _context2.prev = 19;

              if (!_didIteratorError) {
                _context2.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context2.finish(19);

            case 23:
              return _context2.finish(16);

            case 24:
              _context2.next = 28;
              break;

            case 26:
              _context2.next = 28;
              return this.updateTable();

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[8, 12, 16, 24], [17,, 19, 23]]);
    }));

    return function _updateRow(_x) {
      return _updateRow2.apply(this, arguments);
    };
  }()
};
var _default = GridUIMixin;
exports.default = _default;
module.exports = exports.default;