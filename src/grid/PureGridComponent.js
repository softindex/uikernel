/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {toEncodedString, isEqual, last, isDefined, escape, parents, findIndex} from '../common/utils';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

const findDOMNode = ReactDOM.findDOMNode;
const EXTRA_RECORD_CLASS_NAME = 'dgrid-others';
const SELECTED_RECORD_CLASS_NAME = 'dgrid__row_selected';

class PureGridComponent extends React.Component {
  constructor(props) {
    super();
    this._colsWithEscapeErrors = props.colsWithEscapeErrors;
    this._recordMap = null;
  }

  componentDidUpdate(prevProps) {
    this._initRecordsMap(prevProps);

    if (
      this._shouldRenderBody(prevProps, 'records')
      || this._shouldRenderBody(prevProps, 'extraRecords')
      || !isEqual(this.props.viewColumns, prevProps.viewColumns)
    ) {
      this._renderBody();
      return;
    }

    // When page is changed - there is always re rendering of whole body
    if (prevProps.page === this.props.page) {
      const rowsToRerenderId = this._getRowsToRerender(prevProps);
      if (rowsToRerenderId.size) {
        for (const recordId of rowsToRerenderId) {
          this._renderRow(recordId, prevProps.editor);
        }
      }
    }
  }

  /**
   * Create recordId map with encoded ids
   *
   * @param   {Object}  prevProps
   * @private
   */
  _initRecordsMap(prevProps) {
    if (this.props.records === prevProps.records && this.props.extraRecords === prevProps.extraRecords) {
      return;
    }
    if (this.props.records && this.props.extraRecords) {
      const records = [...this.props.extraRecords.keys(), ...this.props.records.keys()];
      this._recordMap = records.reduce((accum, recordId) => {
        accum.set(toEncodedString(recordId), recordId);
        return accum;
      }, new Map());
    }
  }

  /**
   * Should component render body
   *
   * @param   {Object}  prevProps
   * @returns {Boolean}
   * @private
   */
  _shouldRenderBody(prevProps, records) {
    if ((!prevProps[records] && this.props[records]) || (prevProps[records] && !this.props[records])) {
      return true;
    }
    // data was and exists now
    if (this.props[records] && prevProps[records]) {
      // new and old records are the same
      if (this.props[records] === prevProps[records]) {
        return false;
      }
      // new data has different length
      if (this.props[records].size !== prevProps[records].size) {
        return true;
      }
      for (const [recordId] of this.props[records]) {
        // if new data has at least one new record  - rerender whole table
        if (!prevProps[records].has(recordId)) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  /**
   * Get rows that need to be re rendered
   *
   * @param   {Object}  prevProps
   * @returns {Map}
   * @private
   */
  _getRowsToRerender(prevProps) {
    const rowsToReRender = new Set([]);

    this._checkEditorForRender(rowsToReRender, prevProps);
    this._checkRecordsForRender(rowsToReRender, prevProps, 'records');
    this._checkRecordsForRender(rowsToReRender, prevProps, 'extraRecords');
    this._checkPropForRerender(rowsToReRender, prevProps, 'statuses');
    this._checkPropForRerender(rowsToReRender, prevProps, 'errors');
    this._checkPropForRerender(rowsToReRender, prevProps, 'warnings');
    this._checkPropForRerender(rowsToReRender, prevProps, 'changes');

    return rowsToReRender;
  }

  /**
   * Check prop to rerender any records
   *
   * @param   {Map}     rowsToReRender
   * @param   {Object}  prevProps
   * @private
   */
  _checkPropForRerender(rowsToReRender, prevProps, propType) {
    const prop = this.props[propType];
    const prevProp = prevProps[propType];

    if (this.props.records) {
      if (prop === prevProp) {
        return;
      }

      // All unique record ids
      const allRecordIds = new Set([
        ...prevProp.keys().map(JSON.stringify),
        ...prop.keys().map(JSON.stringify)
      ]);
      for (const jsonRecordId of allRecordIds) {
        const recordId = JSON.parse(jsonRecordId);

        if ((!prop.has(recordId) || !prevProp.has(recordId)) && this._isRecordLoaded(recordId)) {
          rowsToReRender.add(recordId);
          continue;
        }

        if ((prop.has(recordId) && prevProp.has(recordId)) && this._isRecordLoaded(recordId)) {
          if (!isEqual(prop.get(recordId), prevProp.get(recordId))) {
            rowsToReRender.add(recordId);
          }
        }
      }
    }
  }

  _isRecordLoaded(recordId) {
    return this.props.records.has(recordId) || this.props.extraRecords.has(recordId);
  }

  /**
   * Check editor prop for record re rendering
   *
   * @param   {Map}     rowsToReRender
   * @param   {Object}  prevProps
   * @private
   */
  _checkEditorForRender(rowsToReRender, prevProps) {
    const {editor} = this.props;
    const prevEditor = prevProps.editor;
    // there are no editors
    if (!editor.recordId && !prevEditor.recordId) {
      return;
    }
    // check for editor changes only if records to display exist
    if (this.props.records) {
      // if editor was and exists now
      if (editor.recordId && prevEditor.recordId) {
        // do nothing if old editor is the same as new one
        if (editor === prevEditor) {
          return;
        }
        rowsToReRender.add(prevEditor.recordId);
        rowsToReRender.add(editor.recordId);
        return;
      }
      // there wasn't editor before
      if (!prevEditor.recordId && editor.recordId) {
        rowsToReRender.add(editor.recordId);
        return;
      }
      // there is no editor now
      if (!editor.recordId && prevEditor.recordId) {
        rowsToReRender.add(prevEditor.recordId);
      }
    }
  }

  /**
   * Check records to be re rendered
   *
   * @param   {Map}     rowsToReRender
   * @param   {Object}  prevProps
   * @private
   */
  _checkRecordsForRender(rowsToReRender, prevProps, recordsType) {
    const props = this.props;
    // if data to display is the same - do nothing
    if (this.props[recordsType] === prevProps[recordsType]) {
      return;
    }
    // check for records differences only if data exists
    if (props[recordsType] && prevProps[recordsType]) {
      // if previous records aren't the same as current
      if (props[recordsType] !== prevProps[recordsType]) {
        for (const [recordId, rowValue] of props[recordsType]) {
          // if record has different rowValue than it was before - row must be re rendered
          if (prevProps[recordsType].get(recordId) !== rowValue) {
            rowsToReRender.add(recordId);
          }
        }
      }
    }
  }

  /**
   * Redraw table content totally
   *
   * @private
   */
  _renderBody = () => {
    if (!this.props.records) {
      return;
    }
    let htmlExtra = '';
    let htmlBody = '';

    for (const [recordId] of this.props.extraRecords) {
      if (this.props.records.has(recordId)) {
        continue;
      }
      htmlExtra += this._getRowHTML(recordId);
    }

    for (const [recordId] of this.props.records) {
      htmlBody += this._getRowHTML(recordId);
    }

    this.tBody.innerHTML = htmlExtra + htmlBody;
  };

  /**
   * Redraw row
   *
   * @param   {*}       recordId
   * @param   {Object}  prevEditor
   * @private
   */
  _renderRow(recordId, prevEditor) {
    const row = findDOMNode(this.tBody).querySelector(`tr[key="${toEncodedString(recordId)}"]`);
    const selected = this.isSelected(recordId);
    row.className = this._getRowClassNames(recordId, selected);

    for (const colId of Object.keys(this.props.cols)) {
      if (this._isViewColumn(colId)) {
        this._renderCell(recordId, colId, row, prevEditor);
      }
    }
  }

  /**
   * Get amount of extra records
   *
   * @returns {Number}
   * @private
   */
  _extraRecordsOfThePage() {
    let count = 0;
    for (const [recordId] of this.props.extraRecords) {
      if (this.props.records.has(recordId)) {
        count++;
      }
    }
    return count;
  }

  /**
   * Redraw cell
   *
   * @param {*}           recordId   Record ID
   * @param {String}      colId      Column ID
   * @param {HTMLElement} row        Row element
   * @param {Object}      prevEditor Previous editor
   * @private
   */
  _renderCell(recordId, colId, row, prevEditor) {
    // if editor is on the current cell - only render editor
    if (recordId === this.props.editor.recordId) {
      if (colId === this.props.editor.column) {
        const indexOfColumn = Object.keys(this.props.cols).indexOf(this.props.editor.column);
        this._renderEditor(row.children[indexOfColumn]);
        return;
      }
      return;
    }

    // if editor was on the grid - check and re render only that cell which had editor
    if (prevEditor.recordId) {
      if (recordId === prevEditor.recordId && colId === prevEditor.column) {
        const indexOfColumn = Object.keys(this.props.cols).indexOf(prevEditor.column);
        this._unmountEditor(row.children[indexOfColumn]);
      } else {
        return;
      }
    }

    const cellIndex = Object.keys(this.props.cols).indexOf(colId);
    const cell = row.children[cellIndex];
    const record = this._getRecordWithChanges(recordId);
    const selected = this.isSelected(recordId);
    const initialRecord = this.props.records.get(recordId) || this.props.extraRecords.get(recordId) || null;
    const gridCellClass = classNames(this._getColumnClass(colId), {
      'dgrid-cell': true,
      'dgrid-changed': this._isChanged(recordId, this._getBindParam(colId)),
      'dgrid-error': this._hasError(recordId, this._getBindParam(colId)),
      'dgrid-warning': this._hasWarning(recordId, this._getBindParam(colId))
    });
    const html = `
      <td class="${gridCellClass}">
        ${this._getCellHTML(colId, record, selected, initialRecord)}
      </td>
    `;

    try {
      cell.outerHTML = html;
    } catch (e) {
      // Sometimes it is possible a situation when rerendering of the cell is called in the middle of performing of an
      // event in that cell which may cause an error like "DOMException: The node to be removed is no longer a child
      // of this node", so just ignore it
    }
  }

  /**
   * Redraw cell
   *
   * @param {HTMLElement} element HTML Element
   * @private
   */
  _unmountEditor(element) {
    ReactDOM.unmountComponentAtNode(element);
    element.classList.remove('dgrid-input-wrapper');
  }

  _renderEditor = (parentElement) => {
    let ref;
    const elementWithRef = React.cloneElement(this.props.editor.element, {
      ref: value => ref = value
    });
    ReactDOM.render(elementWithRef, parentElement, () => {
      parentElement.classList.add('dgrid-input-wrapper');

      if (typeof ref.focus === 'function') {
        ref.focus();
      } else {
        findDOMNode(ref).focus();
      }
    });
  };

  _getRowHTML(recordId) {
    let colId;
    const record = this._getRecordWithChanges(recordId);
    const initialRecord = this.props.records.get(recordId) || this.props.extraRecords.get(recordId);
    const selected = this.isSelected(recordId);
    const gridRowClass = this._getRowClassNames(recordId, selected);
    let html = `<tr key=${toEncodedString(recordId)} class="${gridRowClass}">`;
    for (colId of Object.keys(this.props.cols)) {
      if (this._isViewColumn(colId)) {
        const gridCellClass = classNames(this._getColumnClass(colId), {
          'dgrid-cell': true,
          'dgrid-changed': this._isChanged(recordId, this._getBindParam(colId)),
          'dgrid-error': this._hasError(recordId, this._getBindParam(colId)),
          'dgrid-warning': this._hasWarning(recordId, this._getBindParam(colId))
        });
        html += `
          <td class="${gridCellClass}">
            ${this._getCellHTML(colId, record, selected, initialRecord)}
          </td>`;
      }
    }
    return `${html}</tr>`;
  }

  _getRowClassNames(recordId, selected) {
    return classNames(
      [...this._getRowStatusNames(recordId)].join(' '),
      {
        [EXTRA_RECORD_CLASS_NAME]: this.props.extraRecords.has(recordId),
        [SELECTED_RECORD_CLASS_NAME]: selected
      }
    );
  }

  // called in _getRowHTML
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
  _getCellHTML(columnId, record, selected, initialRecord) {
    const render = last(this.props.cols[columnId].render);
    const cellHtml = render(
      this._escapeRecord(columnId, record),
      selected,
      this._escapeRecord(columnId, initialRecord),
      this.props.grid
    );
    return `${isDefined(cellHtml) ? cellHtml : ''}`;
  }

  // called in _getCellHTML
  _escapeRecord = (columnId, record) => {
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
          escapedRecord[field] = escape(record[field]);
          continue;
        }

        if (type === 'object' && record[field] && !this._colsWithEscapeErrors[columnId]) {
          this._colsWithEscapeErrors[columnId] = true;
          console.error(
            `UIKernel.Grid warning: ` +
            `You send record with fields of Object type in escaped column "${columnId}". ` +
            `To use Objects, set column config "escape" to false, ` +
            `and escape "${columnId}" field in render function by yourself`
          );
        }
      }

      escapedRecord[field] = record[field];
    }

    return escapedRecord;
  };

  // called in _getRowHTML
  /**
   * Table row has warning flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasWarning(row, fields) {
    return this._checkFieldInValidation(row, fields, this.props.warnings);
  }

  // called in _getRowHTML
  /**
   * Table row has error flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasError(recordId, fields) {
    return this._checkFieldInValidation(recordId, fields, this.props.errors);
  }

  // called in _hasError
  /**
   * Table row has error in "validation" object
   *
   * @param   {any}        recordId
   * @param   {Array|string}  fields
   * @param   {Validation}    validation
   * @returns {boolean}
   * @private
   */
  _checkFieldInValidation(recordId, fields, validation) {
    let i;

    if (!validation.has(recordId)) {
      return false;
    }

    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (i = 0; i < fields.length; i++) {
      if (validation.get(recordId).hasError(fields[i])) {
        return true;
      }
    }
    return false;
  }

  // called in _getRowHTML
  /**
   * Table row changed flag
   *
   * @param   {string}        recordId         Row ID
   * @param   {Array|string}  [fields]
   * @return  {boolean}
   * @private
   */
  _isChanged(recordId, fields) {
    let i;
    if (!this.props.changes.has(recordId)) {
      return false;
    }

    if (fields) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      for (i = 0; i < fields.length; i++) {
        if (this.props.changes.get(recordId).hasOwnProperty(fields[i])) {
          return true;
        }
      }
      return false;
    }

    return true;
  }

  // called in _getRowHTML
  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam(id) {
    return this.props.cols[id].editorField || id;
  }

  // called in _getRowHTML
  /**
   * Get all status names that are applied to the row
   *
   * @param   {string}    row    Row ID
   * @return  {Array}  Status names array
   * @private
   */
  _getRowStatusNames(recordId) {
    return this.props.statuses.get(recordId) || [];
  }

  // called in _getRowHTML
  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   *
   * @param   {number|string}     recordId    Record ID
   * @returns {boolean}           Is selected row flag
   */
  isSelected(recordId) {
    const rowStatuses = this.props.statuses.get(recordId);
    if (rowStatuses) {
      return rowStatuses.has('selected');
    }
    return false;
  }

  // called in _getRowHTML
  /**
   * Get table record with changes
   *
   * @param {string} recordId Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecordWithChanges(recordId) {
    if (this.props.records.has(recordId)) {
      return {...this.props.records.get(recordId), ...this.props.changes.get(recordId)};
    }
    if (this.props.extraRecords.has(recordId)) {
      return {...this.props.extraRecords.get(recordId), ...this.props.changes.get(recordId)};
    }
    return null;
  }

  /**
   * Collect data for table header display
   *
   * @returns {Object} Formed data
   * @private
   */
  _formHeader() {
    const rows = [[/* top */], [/* bottom */]];
    const colGroup = [];
    let lastParent = {name: ''};

    for (const [columnId, column] of Object.entries(this.props.cols)) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(
        <col
          key={columnId}
          width={column.width}
          className={this._getColumnClass(columnId)}
        />
      );

      const classNames = [this._getColumnClass(columnId)];
      const addInfo = {
        id: columnId,
        name: column.name || '',
        onClick: column.onClick,
        onClickRefs: column.onClickRefs,
        cols: 1,
        rows: 1
      };

      const sortParams = this._getSortParams(columnId);
      if (sortParams) {
        classNames.push(`dgrid-${sortParams.direction}`);
        addInfo.field = sortParams.column;
        addInfo.sort = sortParams.direction;
      }

      addInfo.className = classNames.join(' ');

      if (column.parent) {
        if (column.parent !== lastParent.name) {
          lastParent = rows[0][rows[0].push({
            name: this.props.cols[columnId].parent,
            cols: 1, rows: 1
          }) - 1];
        } else {
          lastParent.cols++;
        }
        rows[1].push(addInfo);
      } else {
        lastParent = {name: ''};
        addInfo.rows = 2;
        rows[0].push(addInfo);
      }
    }

    return {cols: rows, colGroup: colGroup};
  }

  // called in _formHeader
  /**
   * Get current mode and column sort parameter
   *
   * @param   column                                  Column ID
   * @returns {{field: {string}, sort: {string}}|{}}  Sort parameter and mode
   * @private
   */
  _getSortParams(column) {
    const params = {column: column};
    const sorts = this.props.sort;
    let sortIndex;

    if (!this.props.cols[column].sortCycle) {
      return null;
    }

    if (!sorts) {
      params.direction = 'default';
      return params;
    }

    if (this.props.multipleSorting) {
      sortIndex = findIndex(sorts, sort => sort.column === params.column);

      if (sortIndex < 0 || sortIndex < sorts.length - 1) {
        params.direction = 'default';
      } else {
        params.direction = sorts[sortIndex].direction;
      }
      return params;
    }

    if (sorts.column === column) {
      params.direction = sorts.direction;
    } else {
      params.direction = 'default';
    }

    return params;
  }

  // called in _formHeader
  _getColumnClass(id) {
    return this.props.cols[id].className;
  }

  // called in _formHeader
  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn(id) {
    if (!this.props.viewColumns) {
      return true;
    }

    if (Array.isArray(this.props.viewColumns)) {
      return this.props.viewColumns.indexOf(id) > -1;
    }

    return this.props.viewColumns[id];
  }

  // called in render method
  _getHeaderCellHTML(columnName) {
    const cellHtml = typeof columnName === 'function' ? columnName(this.props.grid) : columnName;
    if (cellHtml === undefined) {
      return '';
    }
    return cellHtml;
  }

  // called in render for scrollable
  /**
   * Table content click event handler
   *
   * @param {Event} event
   */
  _handleBodyClick = (event) => {
    const target = event.target;
    const refParent = parents(target, '[ref]')[0];

    let element;

    if (target.classList.contains('dgrid-cell')) {
      element = event.target;
    } else {
      element = parents(target, 'td.dgrid-cell')[0];
    }

    if (
      element
      && !(refParent && refParent.hasAttribute('disabled'))
    ) {
      const columnIndex = [...element.parentNode.children].indexOf(element);
      const colId = Object.keys(this.props.cols)[columnIndex];
      const key = element.parentNode.getAttribute('key');
      const recordId = this._recordMap.get(key);
      this.props.onCellClick(event, recordId, colId, (refParent || event.target).getAttribute('ref'));
    }
  };

  _renderPagination() {
    const viewCount = this.props.viewCount;
    const {onChangeViewCount, onClickFirstPage, onClickPrevPage, onClickNextPage, onClickLastPage, onRefreshTable} = this.props;
    return Boolean(viewCount) && (
      <div className="dgrid-footer">
        {Boolean(this.props.viewVariants) && (
          <>
            <div className="dgrid-pagination-page-size"> Page Size</div>
            <div className="dgrid-pagination-view-variants">
              <select
                className="dgrid-pagination-view-variants-select"
                value={this.props.viewVariants.indexOf(viewCount)}
                onChange={onChangeViewCount}
              >
                {this.props.viewVariants.map((option, key) => <option key={key} value={key}>{option}</option>, this)}
              </select>
            </div>
          </>
        )}
        <button aria-label="first page" className="btn-first-page" onClick={onClickFirstPage}>&nbsp;</button>
        <button aria-label="prev page" className="btn-prev-page" onClick={onClickPrevPage}>&nbsp;</button>
        {Boolean(this.props.count) && (
          <div>
            {(this.props.page * viewCount) + 1}
            {' - '}
            {Math.min(
              (this.props.page + 1) * viewCount,
              this.props.count
            )}
            {' of '}
            {this.props.count}
          </div>
        )}
        <button aria-label="next page" className="btn-next-page" onClick={onClickNextPage}>&nbsp;</button>
        <button aria-label="last page" className="btn-last-page" onClick={onClickLastPage}>&nbsp;</button>
        <button aria-label="refresh page" className="btn-refresh-page" onClick={onRefreshTable}>&nbsp;</button>
      </div>
    );
  }

  _renderTotals(isScrollable) {
    let totalsDisplayed = false;
    let i;
    let className;
    let totalsRowHTML = '';
    const header = this._formHeader();

    // If data for result line display exists, form it
    if (this.props.totals) {
      for (i of Object.keys(this.props.cols)) {
        if (!this._isViewColumn(i)) {
          continue;
        }

        className = this.props.cols[i].className;
        if (className) {
          totalsRowHTML += `<td class="${className}">`;
        } else {
          totalsRowHTML += '<td>';
        }

        if (this.props.totals.hasOwnProperty(i)) {
          totalsRowHTML += this._getCellHTML(i, this.props.totals, false, this.props.totals);
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
  }

  render() {
    const {cols, colGroup} = this._formHeader();
    let {classNames} = this.props;
    const {height, onColumnClick} = this.props;
    classNames = classNames.concat('dgrid-not-scrollable');
    if (height) {
      return (
        <div className={classNames.join(' ')}>
          <div className="wrapper-dgrid-header">
            <table cellSpacing="0" className="dgrid-header">
              <colgroup>{colGroup}</colgroup>
              <thead>
                {cols.map((row, colKey) => {
                  return (
                    <tr key={colKey}>
                      {row.map((col, rowKey) => {
                        const header = this._getHeaderCellHTML(col.name);
                        const props = {
                          key: rowKey,
                          className: col.className,
                          onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
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
              <div className={this.props.showLoader ? 'dgrid-loader' : ''} ref={(loader) => this.loader = loader}/>
              <table
                cellSpacing="0"
                ref={(body) => this.body = body}
                onClick={this._handleBodyClick}
              >
                <colgroup>{colGroup}</colgroup>
                <tbody className="dgrid-body-table" ref={(tbody) => this.tBody = tbody}/>
              </table>
            </div>
          </div>
          <div className="wrapper-totals">
            {this._renderTotals(this.props.height)}
          </div>
          {this._renderPagination()}
        </div>
      );
    }

    // If not scrollable grid
    return (
      <div className={classNames.join(' ')}>
        <div className={this.props.showLoader ? 'dgrid-loader' : ''} ref={(loader) => this.loader = loader}/>
        <table
          cellSpacing="0"
          className={'dgrid-body-table'}
          onClick={this._handleBodyClick}
        >
          <colgroup>{colGroup}</colgroup>
          <thead>
            {cols.map((row, colKey) => {
              return (
                <tr key={colKey}>
                  {row.map((col, rowKey) => {
                    const header = this._getHeaderCellHTML(col.name);
                    const props = {
                      key: rowKey,
                      className: col.className,
                      onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
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
          <tbody className="dgrid-body-table" ref={(tbody) => this.tBody = tbody}/>
          {this._renderTotals(height)}
        </table>
        {this._renderPagination()}
      </div>
    );
  }
}

export default PureGridComponent;
