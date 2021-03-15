"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toPromise = _interopRequireDefault(require("../../common/toPromise"));

var _utils = require("../../common/utils");

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _ThrottleError = _interopRequireDefault(require("../../common/ThrottleError"));

var _classnames = _interopRequireDefault(require("classnames"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  updateTable: function () {
    var _updateTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var viewCount, obj, page, data, extra, recordIds;
      return _regenerator["default"].wrap(function _callee$(_context) {
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
              return (0, _toPromise["default"])(this.setState.bind(this), true)({
                data: Object.assign({}, data.records, extra.records),
                mainIds: Object.keys(data.records),
                count: obj.count,
                totals: obj.totals,
                recordsInfo: Object.assign({}, extra.info, data.info),
                errors: (0, _utils.pick)(this.state.errors, recordIds),
                changes: (0, _utils.pick)(this.state.changes, recordIds),
                statuses: (0, _utils.pick)(this.state.statuses, recordIds)
              });

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
      }, _callee, this, [[4, 10]]);
    }));

    function updateTable() {
      return _updateTable.apply(this, arguments);
    }

    return updateTable;
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

    var _iterator = _createForOfIteratorHelper(this._getDependentColumns(param)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var column = _step.value;

        if (this._isViewColumn(column) && !this._isEditorVisible(row, column)) {
          this._renderCell(row, column, selected);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
      return /*#__PURE__*/_react["default"].createElement("table", {
        cellSpacing: "0",
        className: "dgrid-totals"
      }, /*#__PURE__*/_react["default"].createElement("colgroup", null, header.colGroup), /*#__PURE__*/_react["default"].createElement("tr", {
        dangerouslySetInnerHTML: {
          __html: totalsRowHTML
        }
      }));
    }

    return /*#__PURE__*/_react["default"].createElement("tfoot", {
      className: "dgrid-totals"
    }, /*#__PURE__*/_react["default"].createElement("tr", {
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
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var selected, viewColumns, _iterator2, _step2, viewColumn;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.state.data) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!_this.state.data[row]) {
                _context2.next = 9;
                break;
              }

              selected = _this.isSelected(_this.state.recordsInfo[row].id);
              viewColumns = Object.keys(_this.props.cols).filter(_this._isViewColumn);
              _iterator2 = _createForOfIteratorHelper(viewColumns);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  viewColumn = _step2.value;

                  if (!_this._isEditorVisible(row, viewColumn)) {
                    _this._renderCell(row, viewColumn, selected);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              _context2.next = 11;
              break;

            case 9:
              _context2.next = 11;
              return _this.updateTable();

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
var _default = GridUIMixin;
exports["default"] = _default;
module.exports = exports.default;