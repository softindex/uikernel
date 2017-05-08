/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../../common/callbackify';
import toPromise from '../../common/toPromise';
import utils from '../../common/utils';
import {findDOMNode} from 'react-dom';
import React from 'react';

const GridUIMixin = {
  /**
   * Table content click event handler
   *
   * @param {Event} event
   */
  _handleBodyClick: function (event) {
    const $target = $(event.target);
    const $refParent = $target.parents('[ref]');
    let element;

    if ($target.hasClass('dgrid-cell')) {
      element = event.target;
    } else {
      element = $target.parents('td.dgrid-cell').get(0);
    }

    if (element && !$refParent.attr('disabled')) {
      this._handleCellClick(event, element, $refParent.attr('ref') || event.target.getAttribute('ref'));
    }
  },

  /**
   * Cell click handler
   *
   * @param {Event}           event       Event object
   * @param {HTMLElement}     element     Cell DOM element
   * @param {string}          ref         Click handler name in the table configuration
   */
  _handleCellClick: function (event, element, ref) {
    const colId = $(element).attr('key');
    const row = $(element).parent().attr('key');
    const columnConfig = this.props.cols[colId];
    const recordId = this.state.recordsInfo[row].id;
    const record = this._getRecord(row);

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

  _handleHeaderCellClick: function (col, event) {
    const $target = $(event.target);
    const $refParent = $target.parents('[ref]');
    const ref = $refParent.attr('ref') || event.target.getAttribute('ref');
    let handler;

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
  updateTable: callbackify(async function () {
    this._showLoader(true);

    if (!this.props.model) {
      return;
    }

    const viewCount = this.getViewCount();

    const obj = await this._loadData({
      limit: viewCount,
      offset: this.state.page * viewCount,
      sort: this._sortingToArray(),
      fields: this._getFieldsToRender(),
      extra: this._getAdditionalIds()
    });

    if (!this._isMounted) {
      return;
    }

    if (this.getViewCount() && !obj.hasOwnProperty('count')) {
      throw new Error('Incorrect response from GridModel. "response.count" not defined');
    }

    // If required page is not included in the range of existing pages,
    // request existing in a moment page
    const page = this._checkPage(this.state.page, this.getViewCount(), obj.count);
    if (page !== this.state.page) {
      this.state.page = page;
      this.updateTable();
      return;
    }

    const data = this._dataArrayToObject(obj.records);
    const extra = this._dataArrayToObject(obj.extraRecords || []);
    const recordIds = Object.keys(data.records).concat(Object.keys(extra.records));

    await toPromise(this.setState.bind(this), true)({
      data: Object.assign({}, data.records, extra.records),
      mainIds: Object.keys(data.records),
      count: obj.count,
      totals: obj.totals,
      recordsInfo: Object.assign({}, extra.info, data.info),
      errors: utils.pick(this.state.errors, recordIds),
      changes: utils.pick(this.state.changes, recordIds),
      statuses: utils.pick(this.state.statuses, recordIds)
    });

    this._renderBody();
    this._showLoader(false);
  }),

  /**
   * Show/hide loading icon
   *
   * @param {boolean} show True - Show, False - Hide
   * @private
   */
  _showLoader: function (show) {
    if (show) {
      $(findDOMNode(this.refs.loader)).addClass('dgrid-loader');
    } else {
      $(findDOMNode(this.refs.loader)).removeClass('dgrid-loader');
    }
  },

  _getHeaderCellHTML: function (columnName) {
    const cellHtml = typeof columnName === 'function' ? columnName(this) : columnName;
    if (cellHtml === undefined) {
      return '';
    }
    return cellHtml;
  },

  _escapeRecord: function (columnId, record) {
    let field;
    let type;
    let i;
    const escapedRecord = {};
    const column = this.props.cols[columnId];
    const needEscaping = !column.hasOwnProperty('escape') || column.escape;
    const fields = column.render.slice(0, -1);

    for (i = 0; i < fields.length; i++) {
      field = fields[i];
      type = typeof record[field];

      if (needEscaping) {
        if (type === 'string') {
          escapedRecord[field] = utils.escape(record[field]);
          continue;
        }

        if (type === 'object' && record[field] && !this.state.colsWithEscapeErrors[columnId]) {
          this.state.colsWithEscapeErrors[columnId] = true;
          console.error(
            `UIKernel.Grid warning: 
You send record with fields of Object type in escaped column "${columnId}". 
To use Objects, set column config "escape" to false, 
and escape "${columnId}" field in render function by yourself`
          );
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
  _getCellHTML: function (columnId, record, selected) {
    const render = utils.last(this.props.cols[columnId].render);
    const cellHtml = render(this._escapeRecord(columnId, record), selected);
    return `${utils.isDefined(cellHtml) ? cellHtml : ''}`;
  },

  /**
   * Get table row HTML
   *
   * @param       {number}    row         Row ID
   * @param       {string}    className   <TR> class attribute
   * @returns     {string}    Table row HTML
   * @private
   */
  _getRowHTML: function (row, className) {
    let colId;
    const record = this._getRecord(row);
    const selected = this.isSelected(this.state.recordsInfo[row].id);
    let html = `<tr key="${row}" class="` +
      (className || '') +
      ' ' + this._getRowStatusNames(row).join(' ') +
      ' ' + (selected ? 'dgrid__row_selected' : '') +
      '">';
    for (colId in this.props.cols) {
      if (this._isViewColumn(colId)) {
        html += `<td key="${colId}" class="dgrid-cell${this._getColumnClass(colId) ? ' ' + this._getColumnClass(colId) : ''}${this._isChanged(row, this._getBindParam(colId)) ? ' dgrid-changed' : ''}${this._hasError(row, this._getBindParam(colId)) ? ' dgrid-error' : ''}${this._hasWarning(row, this._getBindParam(colId)) ? ' dgrid-warning' : ''}">${this._getCellHTML(colId, record, selected)}</td>`;
      }
    }
    return `${html}</tr>`;
  },

  /**
   * Redraw table content totally
   *
   * @private
   */
  _renderBody: function () {
    if (!this.state.data) {
      return;
    }

    let i;
    let row;
    let htmlExtra = '';
    let htmlBody = '';
    const sorted = utils.pairs(this.state.recordsInfo).sort((a, b) => a[1].index - b[1].index);

    for (i = 0; i < sorted.length; i++) {
      row = sorted[i][0];
      if (this._isMainRow(row)) {
        htmlBody += this._getRowHTML(row);
      } else if (this._isChanged(row) || this._getRowStatusNames(row).length) {
        htmlExtra += this._getRowHTML(row, 'others');
      }
    }

    findDOMNode(this.refs.tbody).innerHTML = htmlExtra + htmlBody;
  },

  /**
   * Display model changes
   *
   * @param {string} row      Row ID
   * @param {string} param    Model parameter
   * @private
   */
  _renderBinds: function (row, param) {
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

  _removeTR: function (rowId) {
    $(findDOMNode(this.refs.body))
      .find(`tr[key="${rowId}"]`)
      .remove();
  },

  _renderTotals: function _renderTotals(isScrollable) {
    let totalsDisplayed = false;
    let i;
    let className;
    let totalsRowHTML = '';
    const header = this._formHeader();

    // If data for result line display exists, form it
    if (this.state.totals) {
      for (i in this.props.cols) {
        if (!this._isViewColumn(i)) {
          continue;
        }

        className = this.props.cols[i].className;
        if (className) {
          totalsRowHTML += `<td class="${className}">`;
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
      return (
        <table cellSpacing="0" className="dgrid-totals">
          <colgroup>{header.colGroup}</colgroup>
          <tr dangerouslySetInnerHTML={{__html: totalsRowHTML}}/>
        </table>
      );
    }

    return (
      <tfoot className="dgrid-totals">
      <tr dangerouslySetInnerHTML={{__html: totalsRowHTML}}/>
      </tfoot>
    );
  },

  _updateField: function (rowId, column) {
    $(findDOMNode(this.refs.body))
      .find(`tr[key="${rowId}"]`)
      .find(`td[key=${column}]`)
      .html(this._getCellHTML(column, this._getRecord(rowId)))
      .removeClass('dgrid-changed dgrid-error dgrid-warning')
      .addClass(`${this._isChanged(
        rowId,
        this._getBindParam(column)) ? 'dgrid-changed' : ''}`)
      .addClass(`${this._hasError(
        rowId,
        this._getBindParam(column)) ? 'dgrid-error' : ''}`)
      .addClass(`${this._hasWarning(
        rowId,
        this._getBindParam(column)) ? 'dgrid-warning' : ''}`);
  },

  async _updateRow(row) {
    if (!this.state.data) {
      return;
    }

    if (this.state.data[row]) {
      this._renderBody();
    } else {
      await this.updateTable(); // TODO Check is it need
    }
  }
};

export default GridUIMixin;
