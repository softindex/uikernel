"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toPromise = _interopRequireDefault(require("../../common/toPromise"));

var _utils = require("../../common/utils");

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _ThrottleError = _interopRequireDefault(require("../../common/ThrottleError"));

var _classnames = _interopRequireDefault(require("classnames"));

/*
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
    var refParent = (0, _utils.parents)(target, '[ref]')[0];
    var element;

    if (target.classList.contains('dgrid-cell')) {
      element = event.target;
    } else {
      element = (0, _utils.parents)(target, 'td.dgrid-cell')[0];
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

    var record = this._getRecordWithChanges(row); // Trigger click handler on the table configuration


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
    var refParent = (0, _utils.parents)(target, '[ref]')[0];
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
  updateTable: function updateTable() {
    var viewCount, obj, page, data, extra, recordIds;
    return _regenerator["default"].async(function updateTable$(_context) {
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
            return _regenerator["default"].awrap(this._loadData({
              limit: viewCount,
              offset: this.state.page * viewCount,
              sort: this._sortingToArray(),
              fields: this._getFieldsToRender(),
              extra: this._getAdditionalIds()
            }));

          case 7:
            obj = _context.sent;
            _context.next = 16;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);

            if (this._isMounted) {
              this.setState({
                showLoader: false
              });
            }

            if (_context.t0 instanceof _ThrottleError["default"]) {
              _context.next = 15;
              break;
            }

            throw _context.t0;

          case 15:
            return _context.abrupt("return");

          case 16:
            if (this._isMounted) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return");

          case 18:
            if (!(this.getViewCount() && !obj.hasOwnProperty('count'))) {
              _context.next = 20;
              break;
            }

            throw new Error('Incorrect response from GridModel. "response.count" not defined');

          case 20:
            // If required page is not included in the range of existing pages,
            // request existing in a moment page
            page = this._checkPage(this.state.page, this.getViewCount(), obj.count);

            if (!(page !== this.state.page)) {
              _context.next = 25;
              break;
            }

            this.state.page = page;
            this.updateTable();
            return _context.abrupt("return");

          case 25:
            data = this._dataArrayToObject(obj.records);
            extra = this._dataArrayToObject(obj.extraRecords || []);
            recordIds = Object.keys(data.records).concat(Object.keys(extra.records));
            _context.next = 30;
            return _regenerator["default"].awrap((0, _toPromise["default"])(this.setState.bind(this), true)({
              data: Object.assign({}, data.records, extra.records),
              mainIds: Object.keys(data.records),
              count: obj.count,
              totals: obj.totals,
              recordsInfo: Object.assign({}, extra.info, data.info),
              errors: (0, _utils.pick)(this.state.errors, recordIds),
              changes: (0, _utils.pick)(this.state.changes, recordIds),
              statuses: (0, _utils.pick)(this.state.statuses, recordIds)
            }));

          case 30:
            this._renderBody();

            this.setState({
              showLoader: false
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, [[4, 10]]);
  },
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
      type = (0, _typeof2["default"])(record[field]);

      if (needEscaping) {
        if (type === 'string') {
          escapedRecord[field] = (0, _utils.escape)(record[field]);
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
   * @param   {number}   columnId       Column ID
   * @param   {Object}   record         Table record (initial record + changes)
   * @param   {boolean}  selected       "Selected" row status
   * @param   {Object}   initialRecord  Initial record
   * @returns {string}   Table cell HTML
   * @private
   */
  _getCellHTML: function _getCellHTML(columnId, record, selected, initialRecord) {
    var render = (0, _utils.last)(this.props.cols[columnId].render);
    var cellHtml = render(this._escapeRecord(columnId, record), selected, this._escapeRecord(columnId, initialRecord), this);
    return "".concat((0, _utils.isDefined)(cellHtml) ? cellHtml : '');
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

    var record = this._getRecordWithChanges(rowId);

    var initialRecord = this.state.data[rowId] || null;
    var selected = this.isSelected(this.state.recordsInfo[rowId].id);
    var gridRowClass = (0, _classnames["default"])(className, this._getRowStatusNames(rowId).join(' '), {
      'dgrid__row_selected': selected
    });
    var html = "<tr key=\"".concat(rowId, "\" class=\"").concat(gridRowClass, "\">");

    for (var _i = 0, _Object$keys = Object.keys(this.props.cols); _i < _Object$keys.length; _i++) {
      colId = _Object$keys[_i];

      if (this._isViewColumn(colId)) {
        var gridCellClass = (0, _classnames["default"])(this._getColumnClass(colId), {
          'dgrid-cell': true,
          'dgrid-changed': this._isChanged(rowId, this._getBindParam(colId)),
          'dgrid-error': this._hasError(rowId, this._getBindParam(colId)),
          'dgrid-warning': this._hasWarning(rowId, this._getBindParam(colId))
        });
        html += "\n          <td key=\"".concat(colId, "\" class=\"").concat(gridCellClass, "\">\n            ").concat(this._getCellHTML(colId, record, selected, initialRecord), "\n          </td>");
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
    var sorted = (0, _utils.pairs)(this.state.recordsInfo).sort(function (a, b) {
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
    // If parameter does not affect on the redraw, do nothing
    if (!this._isFieldAffectsRender(param)) {
      return;
    }

    var selected = this.isSelected(this.state.recordsInfo[row].id); // Update column dependencies

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this._getDependentColumns(param)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var column = _step.value;

        if (this._isViewColumn(column) && !this._isEditorVisible(row, column)) {
          this._renderCell(row, column, selected);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  _removeTR: function _removeTR(rowId) {
    var tbody = (0, _reactDom.findDOMNode)(this.body).children[2];
    var index = (0, _toConsumableArray2["default"])(tbody.children).findIndex(function (tr) {
      return tr.getAttribute('key') === rowId;
    });

    if (index >= 0) {
      tbody.deleteRow(index);
    }
  },
  _renderTotals: function _renderTotals(isScrollable) {
    var totalsDisplayed = false;
    var i;
    var className;
    var totalsRowHTML = '';

    var header = this._formHeader(); // If data for result line display exists, form it


    if (this.state.totals) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(this.props.cols); _i2 < _Object$keys2.length; _i2++) {
        i = _Object$keys2[_i2];

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
          totalsRowHTML += this._getCellHTML(i, this.state.totals, false, this.state.totals);
          totalsDisplayed = true;
        }

        totalsRowHTML += '</td>';
      }
    }

    if (!totalsDisplayed) {
      return null;
    }

    if (isScrollable) {
      return _react["default"].createElement("table", {
        cellSpacing: "0",
        className: "dgrid-totals"
      }, _react["default"].createElement("colgroup", null, header.colGroup), _react["default"].createElement("tr", {
        dangerouslySetInnerHTML: {
          __html: totalsRowHTML
        }
      }));
    }

    return _react["default"].createElement("tfoot", {
      className: "dgrid-totals"
    }, _react["default"].createElement("tr", {
      dangerouslySetInnerHTML: {
        __html: totalsRowHTML
      }
    }));
  },
  _renderCell: function _renderCell(rowId, column, isSelected) {
    var _cell$classList;

    var cell = (0, _reactDom.findDOMNode)(this.body).querySelector("tr[key=\"".concat(rowId, "\"] td[key=").concat(column, "]"));
    var initialRecord = this.state.data[rowId] || null;

    var cellHTML = this._getCellHTML(column, this._getRecordWithChanges(rowId), isSelected, initialRecord);

    try {
      cell.innerHTML = cellHTML;
    } catch (e) {// Sometimes it is possible a situation when rerendering of the cell is called in the middle of performing of an
      // event in that cell which may cause an error like "DOMException: The node to be removed is no longer a child
      // of this node", so just ignore it
    }

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
  _updateRow: function _updateRow(row) {
    var selected, viewColumns, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, viewColumn;

    return _regenerator["default"].async(function _updateRow$(_context2) {
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
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 8;

            for (_iterator2 = viewColumns[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              viewColumn = _step2.value;

              if (!this._isEditorVisible(row, viewColumn)) {
                this._renderCell(row, viewColumn, selected);
              }
            }

            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 16:
            _context2.prev = 16;
            _context2.prev = 17;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 19:
            _context2.prev = 19;

            if (!_didIteratorError2) {
              _context2.next = 22;
              break;
            }

            throw _iteratorError2;

          case 22:
            return _context2.finish(19);

          case 23:
            return _context2.finish(16);

          case 24:
            _context2.next = 28;
            break;

          case 26:
            _context2.next = 28;
            return _regenerator["default"].awrap(this.updateTable());

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this, [[8, 12, 16, 24], [17,, 19, 23]]);
  }
};
var _default = GridUIMixin;
exports["default"] = _default;
module.exports = exports.default;