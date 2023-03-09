/* eslint-disable react/no-find-dom-node */
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import escape from 'lodash/escape';
import isNil from 'lodash/isNil';
import last from 'lodash/last';
import React from 'react';
import ReactDOM from 'react-dom';
import {StrictExtract} from 'ts-essentials';
import assert, {assertNonNullish} from '../common/assert';
import EqualMap from '../common/EqualMap';
import {keys, parents, toEncodedString, isEqual} from '../common/utils';
import ValidationErrors from '../validation/ValidationErrors';
import {GridColumnName, GridColumns, GridGetCell} from './types/GridColumns';
import {GridEditor, IGridRef, SortElementProps} from './types/IGridRef';

const findDOMNode = ReactDOM.findDOMNode;
const EXTRA_RECORD_CLASS_NAME = 'dgrid-others';
const SELECTED_RECORD_CLASS_NAME = 'dgrid__row_selected';

type FormHeaderCol<TKey, TRecord extends Record<string, unknown>, TColumnId extends string> = {
  id: TColumnId | undefined;
  className: string;
  cols: number;
  name: GridColumnName<TKey, TRecord>;
  rows: number;
};

type FormHeader<TKey, TRecord extends Record<string, unknown>, TColumnId extends string> = {
  colGroup: JSX.Element[];
  row: {
    bottom: FormHeaderCol<TKey, TRecord, TColumnId>[];
    top: FormHeaderCol<TKey, TRecord, TColumnId>[];
  };
};

type Props<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters,
  TColumns extends Partial<GridColumns<TKey, TRecord>>,
  TMultipleSorting extends boolean
> = {
  changes: EqualMap<TKey, Partial<TRecord>>;
  classNames: string[];
  columns: TColumns;
  count: number;
  editor: GridEditor<TKey, string & keyof TColumns>;
  errors: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
  extraRecords: EqualMap<TKey, TRecord>;
  gridRef: IGridRef<TKey, TRecord, TFilters, TColumns, TMultipleSorting>;
  height: number | undefined;
  page: number;
  pageSizeLabel: string;
  records: EqualMap<TKey, TRecord> | null;
  showLoader: boolean;
  sort:
    | SortElementProps<string & keyof TColumns & keyof TRecord>
    | SortElementProps<string & keyof TColumns & keyof TRecord>[]
    | null
    | undefined;
  statuses: EqualMap<TKey, Set<string>>;
  totals: Partial<TRecord>;
  /**
   * TODO need change type to Set<string & keyof TColumns>
   */
  viewColumns: (string & keyof TColumns)[] | {[K in string & keyof TColumns]?: boolean} | undefined;
  viewCount: number;
  viewVariants: number[];
  warnings: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>;
  onCellClick: (
    event: React.MouseEvent<HTMLTableElement>,
    recordId: TKey,
    colId: string & keyof TColumns,
    ref: string | null
  ) => void;
  onChangeViewCount: (viewCount: number) => void;
  onClickFirstPage: () => void;
  onClickLastPage: () => void;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  onColumnClick: (column: string & keyof TColumns) => void;
  onRefreshTable: () => void;
};

const DEFAULT_PROPS = {
  viewCount: 10,
  viewVariants: [10, 20, 30, 40, 50, 100, 200, 300, 500]
} as const;

class PureGridComponent<
  TKey,
  TRecord extends Record<string, unknown>,
  TFilters,
  TColumns extends Partial<GridColumns<TKey, TRecord>>,
  TMultipleSorting extends boolean
> extends React.Component<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>> {
  static defaultProps = DEFAULT_PROPS;

  private recordMap: Map<string, TKey> | null = null;
  private tBodyElement: HTMLTableSectionElement | null = null;
  private columnsWithEscapeError = new Set<string & keyof TColumns>();

  componentDidUpdate(prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>): void {
    this.initRecordsMap(prevProps);

    if (
      this.shouldRenderBody(prevProps, 'records') ||
      this.shouldRenderBody(prevProps, 'extraRecords') ||
      this.props.viewColumns !== prevProps.viewColumns ||
      this.props.columns !== prevProps.columns
    ) {
      this.renderBody();
      return;
    }

    // When page is changed - there is always re rendering of whole body
    if (prevProps.page === this.props.page) {
      const rowsToRerenderId = this.getRowsToRerender(prevProps);
      for (const recordId of rowsToRerenderId) {
        this.renderRow(recordId, prevProps.editor);
      }
    }
  }

  render(): JSX.Element {
    const {row, colGroup} = this.formHeader();
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
                {[row.top, row.bottom].map((row, colKey) => {
                  return (
                    <tr key={colKey}>
                      {row.map((col, rowKey) => {
                        const header = this.getHeaderCellHTML(col.name);
                        const props = {
                          key: rowKey,
                          className: col.className,
                          onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
                          colSpan: col.cols,
                          rowSpan: col.rows
                        };
                        return typeof header === 'string' ? (
                          <th
                            {...props}
                            dangerouslySetInnerHTML={{
                              __html: header
                            }}
                          />
                        ) : (
                          <th {...props}>{header}</th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
          <div style={{maxHeight: height, height}} className="dgrid-body-wrapper dgrid-scrollable">
            <div className="dgrid-body">
              <div className={this.props.showLoader ? 'dgrid-loader' : ''} />
              <table cellSpacing="0" onClick={this.handleBodyClick}>
                <colgroup>{colGroup}</colgroup>
                <tbody
                  className="dgrid-body-table"
                  ref={(tbody) => {
                    this.tBodyElement = tbody;
                  }}
                />
              </table>
            </div>
          </div>
          <div className="wrapper-totals">{this.renderTotals(Boolean(height))}</div>
          {this.renderPagination()}
        </div>
      );
    }

    // If not scrollable grid
    return (
      <div className={classNames.join(' ')}>
        <div className={this.props.showLoader ? 'dgrid-loader' : ''} />
        <table cellSpacing="0" className="dgrid-body-table" onClick={this.handleBodyClick}>
          <colgroup>{colGroup}</colgroup>
          <thead>
            {[row.top, row.bottom].map((row, colKey) => {
              return (
                <tr key={colKey}>
                  {row.map((col, rowKey) => {
                    const header = this.getHeaderCellHTML(col.name);
                    const props = {
                      key: rowKey,
                      className: col.className,
                      onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
                      colSpan: col.cols,
                      rowSpan: col.rows
                    };
                    return typeof header === 'string' ? (
                      <th
                        {...props}
                        dangerouslySetInnerHTML={{
                          __html: header
                        }}
                      />
                    ) : (
                      <th {...props}>{header}</th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            className="dgrid-body-table"
            ref={(tbody) => {
              this.tBodyElement = tbody;
            }}
          />
          {this.renderTotals(Boolean(height))}
        </table>
        {this.renderPagination()}
      </div>
    );
  }

  /**
   * Create recordId map with encoded ids
   */
  private initRecordsMap(
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>
  ): void {
    if (this.props.records === prevProps.records && this.props.extraRecords === prevProps.extraRecords) {
      return;
    }

    if (this.props.records) {
      const ids = [...this.props.extraRecords.keys(), ...this.props.records.keys()];
      this.recordMap = ids.reduce((accum, recordId) => {
        accum.set(toEncodedString(recordId), recordId);
        return accum;
      }, new Map<string, TKey>());
    }
  }

  /**
   * Should component render body
   */
  private shouldRenderBody(
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>,
    propName: StrictExtract<
      keyof Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>,
      'extraRecords' | 'records'
    >
  ): boolean {
    const prevValue = prevProps[propName];
    const currentValue = this.props[propName];

    if ((!prevValue && currentValue) || (prevValue && !currentValue)) {
      return true;
    }

    // data was and exists now
    if (currentValue && prevValue) {
      // new and old records are the same
      if (currentValue === prevValue) {
        return false;
      }

      // new data has different length
      if (currentValue.size !== prevValue.size) {
        return true;
      }

      const prevKeys = [...prevValue.keys()];
      const nextKeys = [...currentValue.keys()];
      for (let i = 0; i < prevKeys.length; i++) {
        // prevKeys.length === nextKeys.length
        // if changed order
        if (!isEqual(prevKeys[i], nextKeys[i])) {
          return true;
        }
      }

      return false;
    }

    return false;
  }

  /**
   * Get rows that need to be re rendered
   */
  private getRowsToRerender(
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>
  ): Set<TKey> {
    const rowsToReRender = new Set<TKey>();

    this.checkEditorForRender(rowsToReRender, prevProps);
    this.checkRecordsForRender(rowsToReRender, prevProps, 'records');
    this.checkRecordsForRender(rowsToReRender, prevProps, 'extraRecords');
    this.checkPropForRerender(rowsToReRender, prevProps, 'statuses');
    this.checkPropForRerender(rowsToReRender, prevProps, 'errors');
    this.checkPropForRerender(rowsToReRender, prevProps, 'warnings');
    this.checkPropForRerender(rowsToReRender, prevProps, 'changes');

    return rowsToReRender;
  }

  /**
   * Check prop to rerender any records
   */
  private checkPropForRerender(
    rowsToReRender: Set<TKey>,
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>,
    propName: StrictExtract<
      keyof Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>,
      'changes' | 'errors' | 'statuses' | 'warnings'
    >
  ): void {
    const currentValue = this.props[propName];
    const prevValue = prevProps[propName];

    if (this.props.records) {
      if (currentValue === prevValue) {
        return;
      }

      // All unique record ids
      const allRecordIds = new Set([
        ...[...prevValue.keys()].map((key) => JSON.stringify(key)),
        ...[...currentValue.keys()].map((key) => JSON.stringify(key))
      ]);
      for (const jsonRecordId of allRecordIds) {
        const recordId = JSON.parse(jsonRecordId) as TKey;

        if ((!currentValue.has(recordId) || !prevValue.has(recordId)) && this.isRecordLoaded(recordId)) {
          rowsToReRender.add(recordId);
          continue;
        }

        if (currentValue.has(recordId) && prevValue.has(recordId) && this.isRecordLoaded(recordId)) {
          if (!isEqual(currentValue.get(recordId), prevValue.get(recordId))) {
            rowsToReRender.add(recordId);
          }
        }
      }
    }
  }

  private isRecordLoaded(recordId: TKey): boolean {
    return this.props.records?.has(recordId) ?? this.props.extraRecords.has(recordId);
  }

  /**
   * Check editor prop for record re rendering
   */
  private checkEditorForRender(
    rowsToReRender: Set<TKey>,
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>
  ): void {
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
   */
  private checkRecordsForRender(
    rowsToReRender: Set<TKey>,
    prevProps: Readonly<Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>>,
    propName: StrictExtract<
      keyof Props<TKey, TRecord, TFilters, TColumns, TMultipleSorting>,
      'extraRecords' | 'records'
    >
  ): void {
    const prevValue = prevProps[propName];
    const currentValue = this.props[propName];

    // if data to display is the same - do nothing
    if (currentValue === prevValue) {
      return;
    }

    // check for records differences only if data exists
    if (currentValue && prevValue) {
      // if previous records aren't the same as current
      if (currentValue !== prevValue) {
        for (const [recordId, rowValue] of currentValue) {
          // if record has different rowValue than it was before - row must be re rendered
          if (prevValue.get(recordId) !== rowValue) {
            rowsToReRender.add(recordId);
          }
        }
      }
    }
  }

  /**
   * Redraw table content totally
   */
  private renderBody = (): void => {
    if (!this.props.records) {
      return;
    }

    let htmlExtra = '';
    let htmlBody = '';

    for (const [recordId] of this.props.extraRecords) {
      if (this.props.records.has(recordId)) {
        continue;
      }

      htmlExtra += this.getRowHTML(recordId);
    }

    for (const [recordId] of this.props.records) {
      htmlBody += this.getRowHTML(recordId);
    }

    assertNonNullish(this.tBodyElement, '"tBodyElement" unknown');
    this.tBodyElement.innerHTML = htmlExtra + htmlBody;
  };

  /**
   * Redraw row
   */
  private renderRow(recordId: TKey, prevEditor: GridEditor<TKey, string & keyof TColumns>): void {
    assertNonNullish(this.tBodyElement, '"tBodyElement" unknown');

    const row = this.tBodyElement.querySelector(`tr[key="${toEncodedString(recordId)}"]`);
    assertNonNullish(row, '"row" not found');

    const selected = this.isSelected(recordId);
    row.className = this.getRowClassNames(recordId, selected);

    const columnIds = keys(this.props.columns).filter((key) => this.isViewColumn(key));
    for (let columnIndex = 0; columnIndex < columnIds.length; columnIndex++) {
      const cellElement = row.children[columnIndex];
      assert(cellElement, `cellElement not found by columnIndex "${columnIndex}"`);
      const columnId = columnIds[columnIndex];
      assert(columnId);
      this.renderCell(recordId, columnId, cellElement, prevEditor);
    }
  }

  /**
   * Redraw cell
   */
  private renderCell(
    recordId: TKey,
    columnId: string & keyof TColumns,
    cellElement: Element,
    prevEditor: GridEditor<TKey, string & keyof TColumns>
  ): void {
    // if editor is on the current cell - only render editor
    if (recordId === this.props.editor.recordId) {
      if (columnId === this.props.editor.column) {
        this.renderEditor(cellElement);
      }

      return;
    }

    // if editor was on the grid - check and re render only that cell which had editor
    if (prevEditor.recordId) {
      if (recordId === prevEditor.recordId && columnId === prevEditor.column) {
        this.unmountEditor(cellElement);
      } else {
        return;
      }
    }

    assertNonNullish(this.props.records, '"records" unknown');
    const initialRecord = this.props.records.get(recordId) ?? this.props.extraRecords.get(recordId);
    assertNonNullish<object | undefined>(initialRecord, '"initialRecord" unknown');

    const recordWithChanges = {...initialRecord, ...this.props.changes.get(recordId)};
    const selected = this.isSelected(recordId);

    const editorFieldName = this.getEditorFieldName(columnId);
    const gridCellClass = classNames(this.getColumnClass(columnId), {
      'dgrid-cell': true,
      'dgrid-changed': this.isChanged(recordId, editorFieldName),
      'dgrid-error': this.hasError(recordId, editorFieldName),
      'dgrid-warning': this.hasWarning(recordId, editorFieldName)
    });
    const html = `
      <td class="${gridCellClass}" key="${columnId}">
        ${this.getCellHTML(columnId, recordWithChanges, selected, initialRecord)}
      </td>
    `;

    try {
      cellElement.outerHTML = html;
    } catch (e) {
      // Sometimes it is possible a situation when rerendering of the cell is called in the middle of performing of an
      // event in that cell which may cause an error like "DOMException: The node to be removed is no longer a child
      // of this node", so just ignore it
    }
  }

  /**
   * Redraw cell
   */
  private unmountEditor(element: Element): void {
    ReactDOM.unmountComponentAtNode(element);
    element.classList.remove('dgrid-input-wrapper');
  }

  private renderEditor = (parentElement: Element): void => {
    assertNonNullish(this.props.editor.element, '"props.editor.element" unknown');

    let ref: HTMLElement | null = null;
    const elementWithRef = React.cloneElement(this.props.editor.element, {
      ref: (value: HTMLElement) => {
        ref = value;
      }
    });
    ReactDOM.render(elementWithRef, parentElement, () => {
      // Maybe component was unmounted and ref === undefined
      if (!ref) {
        return;
      }

      parentElement.classList.add('dgrid-input-wrapper');
      if (typeof ref.focus === 'function') {
        ref.focus();
      } else {
        (findDOMNode(ref) as HTMLElement).focus();
      }
    });
  };

  private getRowHTML(recordId: TKey): string {
    assertNonNullish(this.props.records, '"records" unknown');
    const initialRecord = this.props.records.get(recordId) ?? this.props.extraRecords.get(recordId);
    assertNonNullish<object | undefined>(initialRecord, '"initialRecord" unknown');

    const recordWithChanges = {...initialRecord, ...this.props.changes.get(recordId)};
    const selected = this.isSelected(recordId);
    const gridRowClass = this.getRowClassNames(recordId, selected);
    let html = `<tr key="${toEncodedString(recordId)}" class="${gridRowClass}">`;

    for (const columnId of keys(this.props.columns)) {
      const editorFieldName = this.getEditorFieldName(columnId);

      if (this.isViewColumn(columnId)) {
        const gridCellClass = classNames(this.getColumnClass(columnId), {
          'dgrid-cell': true,
          'dgrid-changed': this.isChanged(recordId, editorFieldName),
          'dgrid-error': this.hasError(recordId, editorFieldName),
          'dgrid-warning': this.hasWarning(recordId, editorFieldName)
        });
        html += `
          <td class="${gridCellClass}" key="${columnId}">
            ${this.getCellHTML(columnId, recordWithChanges, selected, initialRecord)}
          </td>`;
      }
    }

    return `${html}</tr>`;
  }

  private getRowClassNames(recordId: TKey, selected: boolean): string {
    return classNames([...this.getRowStatusNames(recordId)].join(' '), {
      [EXTRA_RECORD_CLASS_NAME]: this.props.extraRecords.has(recordId),
      [SELECTED_RECORD_CLASS_NAME]: selected
    });
  }

  /**
   * Get table cell HTML
   */
  private getCellHTML(
    columnId: string & keyof TColumns,
    recordWithChanges: TRecord,
    selected: boolean,
    initialRecord: Partial<TRecord>
  ): string {
    const column = this.props.columns[columnId];
    assertNonNullish<object | undefined>(column, `"${columnId}" column unavailable`);

    const render = last(column.render) as GridGetCell<TRecord>;
    const cellHtml = render(
      this.escapeRecord(columnId, recordWithChanges),
      selected,
      this.escapeRecord(columnId, initialRecord),
      this.props.gridRef
    );
    return `${!isNil(cellHtml) ? cellHtml : ''}`;
  }

  private escapeRecord = <TRawRecord extends Partial<TRecord>>(
    columnId: string & keyof TColumns,
    record: TRawRecord
  ): TRawRecord => {
    const column = this.props.columns[columnId];
    assertNonNullish<object | undefined>(column, `"${columnId}" column unavailable`);

    const fields = column.render.slice(0, column.render.length - 1) as (string & keyof TRecord)[];
    const needEscaping = !column.hasOwnProperty('escape') || column.escape;
    const escapedRecord: Partial<TRecord> = {};

    for (const field of fields) {
      const rawValue = record[field];

      if (needEscaping) {
        if (typeof rawValue === 'string') {
          escapedRecord[field] = escape(rawValue) as TRecord[string & keyof TRecord];
          continue;
        }

        if (typeof rawValue === 'object' && rawValue && !this.columnsWithEscapeError.has(columnId)) {
          this.columnsWithEscapeError.add(columnId);
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

    return escapedRecord as TRawRecord;
  };

  /**
   * Table row has warning flag
   */
  private hasWarning(row: TKey, fields: string & keyof TRecord): boolean {
    return this.checkFieldInValidation(row, fields, this.props.warnings);
  }

  /**
   * Table row has error flag
   *
   */
  private hasError(recordId: TKey, fields: string & keyof TRecord): boolean {
    return this.checkFieldInValidation(recordId, fields, this.props.errors);
  }

  /**
   * Table row has error in "validation" object
   */
  private checkFieldInValidation(
    recordId: TKey,
    field: string & keyof TRecord,
    validation: EqualMap<TKey, ValidationErrors<string & keyof TRecord>>
  ): boolean {
    const recordValidation = validation.get(recordId);

    if (!recordValidation) {
      return false;
    }

    return recordValidation.hasError(field);
  }

  /**
   * Table row changed flag
   */
  private isChanged(recordId: TKey, field: string & keyof TRecord): boolean {
    const recordChanges = this.props.changes.get(recordId);
    if (!recordChanges) {
      return false;
    }

    return recordChanges.hasOwnProperty(field);
  }

  /**
   * Get all status names that are applied to the row
   */
  private getRowStatusNames(recordId: TKey): Set<string> {
    return this.props.statuses.get(recordId) ?? new Set();
  }

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   */
  private isSelected(recordId: TKey): boolean {
    const rowStatuses = this.props.statuses.get(recordId);
    if (rowStatuses) {
      return rowStatuses.has('selected');
    }

    return false;
  }

  /**
   * Collect data for table header display
   */
  private formHeader(): FormHeader<TKey, TRecord, string & keyof TColumns> {
    const row: FormHeader<TKey, TRecord, string & keyof TColumns>['row'] = {
      bottom: [],
      top: []
    };
    const colGroup: JSX.Element[] = [];
    let lastParent: FormHeaderCol<TKey, TRecord, string & keyof TColumns> | null = null;

    for (const [columnId, column] of Object.entries(this.props.columns)) {
      // Skip column if it's invisible
      if (!this.isViewColumn(columnId)) {
        continue;
      }

      assertNonNullish<object | undefined>(column, `"${columnId}" column unavailable`);
      const colClassName = this.getColumnClass(columnId);
      colGroup.push(<col key={columnId} width={column.width} className={colClassName} />);

      const formHeaderColInfo: FormHeaderCol<TKey, TRecord, string & keyof TColumns> = {
        id: columnId,
        name: column.name || '',
        cols: 1,
        rows: 1,
        className: colClassName ? colClassName : ''
      };

      const sortParams = this.getSortParams(columnId);
      if (sortParams) {
        formHeaderColInfo.className += ` dgrid-${sortParams.direction}`;
      }

      if (!column.parent) {
        lastParent = null;
        formHeaderColInfo.rows = 2;
        row.top.push(formHeaderColInfo);
        continue;
      }

      row.bottom.push(formHeaderColInfo);

      if (lastParent && column.parent === lastParent.name) {
        lastParent.cols++;
        continue;
      }

      lastParent = {
        name: column.parent,
        cols: 1,
        rows: 1,
        id: undefined,
        className: ''
      };
      row.top.push(lastParent);
    }

    return {row, colGroup};
  }

  /**
   * Get current mode and column sort parameter
   */
  private getSortParams(
    columnId: string & keyof TColumns
  ): SortElementProps<string & keyof TColumns & keyof TRecord> | null {
    const {columns, sort} = this.props;
    const column = columns[columnId];
    assertNonNullish<object | undefined>(column, `"${columnId}" column unavailable`);

    if (!column.sortCycle) {
      return null;
    }

    const sortableColumn = columnId as string & keyof TColumns & keyof TRecord;
    const lastSort = last(Array.isArray(sort) ? sort : [sort]);
    if (lastSort?.column === sortableColumn) {
      return {column: sortableColumn, direction: lastSort.direction};
    }

    return {column: sortableColumn, direction: 'default'};
  }

  private getColumnClass(columnId: string & keyof TColumns): string | undefined {
    return this.props.columns[columnId]?.className;
  }

  /**
   * Column visibility flag
   */
  private isViewColumn(columnId: string & keyof TColumns): boolean {
    if (!this.props.columns[columnId]) {
      return false;
    }

    if (!this.props.viewColumns) {
      return true;
    }

    if (Array.isArray(this.props.viewColumns)) {
      return this.props.viewColumns.includes(columnId);
    }

    return Boolean(this.props.viewColumns[columnId]);
  }

  private getHeaderCellHTML(columnName: GridColumnName<TKey, TRecord>): React.ReactNode {
    const cellHtml: React.ReactNode =
      typeof columnName === 'function' ? columnName(this.props.gridRef) : columnName;
    if (cellHtml === undefined) {
      return '';
    }

    return cellHtml;
  }

  // called in render for scrollable
  /**
   * Table content click event handler
   */
  private handleBodyClick: React.MouseEventHandler<HTMLTableElement> = (event): void => {
    const target = event.target as HTMLTableElement;
    const refParent = parents(target, '[ref]')[0];

    let element: Element | undefined;

    if (target.classList.contains('dgrid-cell')) {
      element = target;
    } else {
      element = parents(target, 'td.dgrid-cell')[0];
    }

    if (element && !refParent?.hasAttribute('disabled')) {
      const parentNode = element.parentNode as Element;
      const parentNodeChildren = parentNode.children;
      const columnIndex = [...parentNodeChildren].indexOf(element);
      assert(columnIndex >= 0, `cellElement not found by columnIndex "${columnIndex}"`);
      const columnId = keys(this.props.columns).filter((colId) => this.isViewColumn(colId))[columnIndex];
      assert(columnId, `column not found by columnIndex "${columnIndex}"`);

      const key = parentNode.getAttribute('key');
      assertNonNullish(key, `unknown key attribute "${String(key)}"`);
      assertNonNullish(this.recordMap, '"recordMap" unknown');
      assert(this.recordMap.has(key), '"recordId" unknown');
      const recordId = this.recordMap.get(key) as TKey;

      const refValue = (refParent ?? target).getAttribute('ref');
      this.props.onCellClick(event, recordId, columnId, refValue);
    }
  };

  private renderPagination(): React.ReactNode {
    const {viewCount, viewVariants, pageSizeLabel, page, count} = this.props;

    if (!viewCount) {
      return null;
    }

    const {
      onChangeViewCount,
      onClickFirstPage,
      onClickPrevPage,
      onClickNextPage,
      onClickLastPage,
      onRefreshTable
    } = this.props;

    return (
      <div className="dgrid-footer">
        {Boolean(viewVariants.length) && (
          <>
            <div className="dgrid-pagination-page-size"> {pageSizeLabel}</div>
            <div className="dgrid-pagination-view-variants">
              <select
                className="dgrid-pagination-view-variants-select"
                value={viewCount}
                onChange={(e) => onChangeViewCount(Number(e.target.value))}
              >
                {viewVariants.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <button
          aria-label="first page"
          className="btn-first-page"
          onClick={withPreventDefault(onClickFirstPage)}
        >
          &nbsp;
        </button>
        <button
          aria-label="prev page"
          className="btn-prev-page"
          onClick={withPreventDefault(onClickPrevPage)}
        >
          &nbsp;
        </button>
        {Boolean(count) && (
          <div>
            {page * viewCount + 1}
            {' - '}
            {Math.min((page + 1) * viewCount, count)}
            {' of '}
            {count}
          </div>
        )}
        <button
          aria-label="next page"
          className="btn-next-page"
          onClick={withPreventDefault(onClickNextPage)}
        >
          &nbsp;
        </button>
        <button
          aria-label="last page"
          className="btn-last-page"
          onClick={withPreventDefault(onClickLastPage)}
        >
          &nbsp;
        </button>
        <button
          aria-label="refresh page"
          className="btn-refresh-page"
          onClick={withPreventDefault(onRefreshTable)}
        >
          &nbsp;
        </button>
      </div>
    );
  }

  private renderTotals(scrollable: boolean): React.ReactNode {
    let totalsDisplayed = false;
    let totalsRowHTML = '';
    const header = this.formHeader();

    // If data for result line display exists, form it
    for (const columnId of keys(this.props.columns)) {
      if (!this.isViewColumn(columnId)) {
        continue;
      }

      const column = this.props.columns[columnId];
      assertNonNullish<object | undefined>(column, `"${columnId}" column unavailable`);

      const className = column.className;
      if (className) {
        totalsRowHTML += `<td class="${className}" key="${columnId}">`;
      } else {
        totalsRowHTML += `<td key="${columnId}">`;
      }

      if (this.props.totals.hasOwnProperty(columnId)) {
        // TODO totals as TRecord is unsafe
        totalsRowHTML += this.getCellHTML(columnId, this.props.totals as TRecord, false, this.props.totals);
        totalsDisplayed = true;
      }

      totalsRowHTML += '</td>';
    }

    if (!totalsDisplayed) {
      return null;
    }

    if (scrollable) {
      return (
        <table cellSpacing="0" className="dgrid-totals">
          <colgroup>{header.colGroup}</colgroup>
          <tr dangerouslySetInnerHTML={{__html: totalsRowHTML}} />
        </table>
      );
    }

    return (
      <tfoot className="dgrid-totals">
        <tr dangerouslySetInnerHTML={{__html: totalsRowHTML}} />
      </tfoot>
    );
  }

  private getEditorFieldName(id: string & keyof TColumns): string & keyof TRecord {
    return this.props.columns[id]?.editorField ?? (id as string & keyof TRecord);
  }
}

function withPreventDefault<
  TEvent extends {
    // eslint-disable-next-line space-before-function-paren
    preventDefault: () => void;
  }
>(handler: (event: TEvent) => void): (event: TEvent) => void {
  return (event) => {
    event.preventDefault();
    handler(event);
  };
}

export default PureGridComponent;
