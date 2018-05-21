'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toPromise = require('../../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThrottleError = require('../../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridUIMixin = {
  /**
   * Table content click event handler
   *
   * @param {Event} event
   */
  _handleBodyClick: function _handleBodyClick(event) {
    var target = event.target;
    var refParent = _utils2.default.parents(target, '[ref]')[0];

    var element = void 0;

    if (target.classList.contains('dgrid-cell')) {
      element = event.target;
    } else {
      element = _utils2.default.parents(target, 'td.dgrid-cell')[0];
    }

    if (element && !(refParent && refParent.getAttribute('disabled'))) {
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
    var record = this._getRecord(row);

    // Trigger click handler on the table configuration
    if (ref) {
      columnConfig.onClickRefs[ref](event, recordId, record, this);
    } else if (columnConfig.onClick) {
      columnConfig.onClick(event, recordId, record, this);
    }

    // Open cell editor
    if (this.props.cols[colId].editor) {
      this._renderEditor(element, row, colId);
    }
  },

  // TODO Deprecated
  _handleHeaderCellClick: function _handleHeaderCellClick(col, event) {
    var target = event.target;
    var refParent = _utils2.default.parents(target, '[ref]')[0];
    var ref = (refParent || target).getAttribute('ref');
    var handler = void 0;

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
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var viewCount, obj, page, data, extra, recordIds;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.setState({ showLoader: true });

              if (this.props.model) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return');

            case 3:
              viewCount = this.getViewCount();
              obj = void 0;
              _context.prev = 5;
              _context.next = 8;
              return this._loadData({
                limit: viewCount,
                offset: this.state.page * viewCount,
                sort: this._sortingToArray(),
                fields: this._getFieldsToRender(),
                extra: this._getAdditionalIds()
              });

            case 8:
              obj = _context.sent;
              _context.next = 16;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](5);

              if (_context.t0 instanceof _ThrottleError2.default) {
                _context.next = 15;
                break;
              }

              throw _context.t0;

            case 15:
              return _context.abrupt('return');

            case 16:
              if (this._isMounted) {
                _context.next = 18;
                break;
              }

              return _context.abrupt('return');

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
              return _context.abrupt('return');

            case 25:
              data = this._dataArrayToObject(obj.records);
              extra = this._dataArrayToObject(obj.extraRecords || []);
              recordIds = (0, _keys2.default)(data.records).concat((0, _keys2.default)(extra.records));
              _context.next = 30;
              return (0, _toPromise2.default)(this.setState.bind(this), true)({
                data: (0, _assign2.default)({}, data.records, extra.records),
                mainIds: (0, _keys2.default)(data.records),
                count: obj.count,
                totals: obj.totals,
                recordsInfo: (0, _assign2.default)({}, extra.info, data.info),
                errors: _utils2.default.pick(this.state.errors, recordIds),
                changes: _utils2.default.pick(this.state.changes, recordIds),
                statuses: _utils2.default.pick(this.state.statuses, recordIds)
              });

            case 30:

              this._renderBody();
              this.setState({ showLoader: false });

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 11]]);
    }));

    function updateTable() {
      return _ref.apply(this, arguments);
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
    var field = void 0;
    var type = void 0;
    var i = void 0;
    var escapedRecord = {};
    var column = this.props.cols[columnId];
    var needEscaping = !column.hasOwnProperty('escape') || column.escape;
    var fields = column.render.slice(0, -1);

    for (i = 0; i < fields.length; i++) {
      field = fields[i];
      type = (0, _typeof3.default)(record[field]);

      if (needEscaping) {
        if (type === 'string') {
          escapedRecord[field] = _utils2.default.escape(record[field]);
          continue;
        }

        if (type === 'object' && record[field] && !this.state.colsWithEscapeErrors[columnId]) {
          this.state.colsWithEscapeErrors[columnId] = true;
          console.error('UIKernel.Grid warning: ' + ('You send record with fields of Object type in escaped column "' + columnId + '". ') + 'To use Objects, set column config "escape" to false, ' + ('and escape "' + columnId + '" field in render function by yourself'));
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
    var render = _utils2.default.last(this.props.cols[columnId].render);
    var cellHtml = render(this._escapeRecord(columnId, record), selected);
    return '' + (_utils2.default.isDefined(cellHtml) ? cellHtml : '');
  },

  /**
   * Get table row HTML
   *
   * @param       {number}    row         Row ID
   * @param       {string}    className   <TR> class attribute
   * @returns     {string}    Table row HTML
   * @private
   */
  _getRowHTML: function _getRowHTML(row, className) {
    var colId = void 0;
    var record = this._getRecord(row);
    var selected = this.isSelected(this.state.recordsInfo[row].id);
    var html = '<tr key="' + row + '" class="' + (className || '') + ' ' + this._getRowStatusNames(row).join(' ') + ' ' + (selected ? 'dgrid__row_selected' : '') + '">';
    for (colId in this.props.cols) {
      if (this._isViewColumn(colId)) {
        html += '<td key="' + colId + '" class="dgrid-cell' + (this._getColumnClass(colId) ? ' ' + this._getColumnClass(colId) : '') + (this._isChanged(row, this._getBindParam(colId)) ? ' dgrid-changed' : '') + (this._hasError(row, this._getBindParam(colId)) ? ' dgrid-error' : '') + (this._hasWarning(row, this._getBindParam(colId)) ? ' dgrid-warning' : '') + '">' + this._getCellHTML(colId, record, selected) + '</td>';
      }
    }
    return html + '</tr>';
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

    var i = void 0;
    var row = void 0;
    var htmlExtra = '';
    var htmlBody = '';
    var sorted = _utils2.default.pairs(this.state.recordsInfo).sort(function (a, b) {
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

    this._getDependentColumns(param).forEach(function (column) {
      if (this._isViewColumn(column) && !this._isEditorVisible(row, column)) {
        this._updateField(row, column);
      }
    }, this);
  },

  _removeTR: function _removeTR(rowId) {
    (0, _reactDom.findDOMNode)(this.body).removeRow(rowId);
  },

  _renderTotals: function _renderTotals(isScrollable) {
    var totalsDisplayed = false;
    var i = void 0;
    var className = void 0;
    var totalsRowHTML = '';
    var header = this._formHeader();

    // If data for result line display exists, form it
    if (this.state.totals) {
      for (i in this.props.cols) {
        if (!this._isViewColumn(i)) {
          continue;
        }

        className = this.props.cols[i].className;
        if (className) {
          totalsRowHTML += '<td class="' + className + '">';
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
      return _react2.default.createElement(
        'table',
        { cellSpacing: '0', className: 'dgrid-totals' },
        _react2.default.createElement(
          'colgroup',
          null,
          header.colGroup
        ),
        _react2.default.createElement('tr', { dangerouslySetInnerHTML: { __html: totalsRowHTML } })
      );
    }

    return _react2.default.createElement(
      'tfoot',
      { className: 'dgrid-totals' },
      _react2.default.createElement('tr', { dangerouslySetInnerHTML: { __html: totalsRowHTML } })
    );
  },

  _updateField: function _updateField(rowId, column) {
    var _cell$classList;

    var cell = (0, _reactDom.findDOMNode)(this.body).querySelector('tr[key="' + rowId + '"] td[key=' + column + ']');
    cell.innerHTML = this._getCellHTML(column, this._getRecord(rowId));
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

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.state.data) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return');

            case 2:
              if (!_this.state.data[row]) {
                _context2.next = 6;
                break;
              }

              _this._renderBody();
              _context2.next = 8;
              break;

            case 6:
              _context2.next = 8;
              return _this.updateTable();

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }))();
  }
}; /**
    * Copyright (с) 2015-present, SoftIndex LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree.
    */

exports.default = GridUIMixin;
module.exports = exports['default'];