"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const escape_1 = __importDefault(require("lodash/escape"));
const isNil_1 = __importDefault(require("lodash/isNil"));
const last_1 = __importDefault(require("lodash/last"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const assert_1 = __importStar(require("../common/assert"));
const utils_1 = require("../common/utils");
const findDOMNode = react_dom_1.default.findDOMNode;
const EXTRA_RECORD_CLASS_NAME = 'dgrid-others';
const SELECTED_RECORD_CLASS_NAME = 'dgrid__row_selected';
const DEFAULT_PROPS = {
    viewCount: 10,
    viewVariants: [10, 20, 30, 40, 50, 100, 200, 300, 500]
};
class PureGridComponent extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.recordMap = null;
        this.tBodyElement = null;
        this.columnsWithEscapeError = new Set();
        this.renderBody = () => {
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
            (0, assert_1.assertNonNullish)(this.tBodyElement, '"tBodyElement" unknown');
            this.tBodyElement.innerHTML = htmlExtra + htmlBody;
        };
        this.renderEditor = (parentElement) => {
            (0, assert_1.assertNonNullish)(this.props.editor.element, '"props.editor.element" unknown');
            let ref = null;
            const elementWithRef = react_1.default.cloneElement(this.props.editor.element, {
                ref: (value) => {
                    ref = value;
                }
            });
            react_dom_1.default.render(elementWithRef, parentElement, () => {
                if (!ref) {
                    return;
                }
                parentElement.classList.add('dgrid-input-wrapper');
                if (typeof ref.focus === 'function') {
                    ref.focus();
                }
                else {
                    findDOMNode(ref).focus();
                }
            });
        };
        this.escapeRecord = (columnId, record) => {
            const column = this.props.columns[columnId];
            (0, assert_1.assertNonNullish)(column, `"${columnId}" column unavailable`);
            const fields = column.render.slice(0, column.render.length - 1);
            const needEscaping = !column.hasOwnProperty('escape') || column.escape;
            const escapedRecord = {};
            for (const field of fields) {
                const rawValue = record[field];
                if (needEscaping) {
                    if (typeof rawValue === 'string') {
                        escapedRecord[field] = (0, escape_1.default)(rawValue);
                        continue;
                    }
                    if (typeof rawValue === 'object' && rawValue && !this.columnsWithEscapeError.has(columnId)) {
                        this.columnsWithEscapeError.add(columnId);
                        console.error(`UIKernel.Grid warning: ` +
                            `You send record with fields of Object type in escaped column "${columnId}". ` +
                            `To use Objects, set column config "escape" to false, ` +
                            `and escape "${columnId}" field in render function by yourself`);
                    }
                }
                escapedRecord[field] = record[field];
            }
            return escapedRecord;
        };
        this.handleBodyClick = (event) => {
            const target = event.target;
            const refParent = (0, utils_1.parents)(target, '[ref]')[0];
            let element;
            if (target.classList.contains('dgrid-cell')) {
                element = target;
            }
            else {
                element = (0, utils_1.parents)(target, 'td.dgrid-cell')[0];
            }
            if (element && !(refParent === null || refParent === void 0 ? void 0 : refParent.hasAttribute('disabled'))) {
                const parentNode = element.parentNode;
                const parentNodeChildren = parentNode.children;
                const columnIndex = [...parentNodeChildren].indexOf(element);
                (0, assert_1.default)(columnIndex >= 0, `cellElement not found by columnIndex "${columnIndex}"`);
                const columnId = (0, utils_1.keys)(this.props.columns).filter((colId) => this.isViewColumn(colId))[columnIndex];
                (0, assert_1.default)(columnId, `column not found by columnIndex "${columnIndex}"`);
                const key = parentNode.getAttribute('key');
                (0, assert_1.assertNonNullish)(key, `unknown key attribute "${String(key)}"`);
                (0, assert_1.assertNonNullish)(this.recordMap, '"recordMap" unknown');
                (0, assert_1.default)(this.recordMap.has(key), '"recordId" unknown');
                const recordId = this.recordMap.get(key);
                const refValue = (refParent !== null && refParent !== void 0 ? refParent : target).getAttribute('ref');
                this.props.onCellClick(event, recordId, columnId, refValue);
            }
        };
    }
    componentDidUpdate(prevProps) {
        this.initRecordsMap(prevProps);
        if (this.shouldRenderBody(prevProps, 'records') ||
            this.shouldRenderBody(prevProps, 'extraRecords') ||
            this.props.viewColumns !== prevProps.viewColumns ||
            this.props.columns !== prevProps.columns) {
            this.renderBody();
            return;
        }
        if (prevProps.page === this.props.page) {
            const rowsToRerenderId = this.getRowsToRerender(prevProps);
            for (const recordId of rowsToRerenderId) {
                this.renderRow(recordId, prevProps.editor);
            }
        }
    }
    render() {
        const { row, colGroup } = this.formHeader();
        let { classNames } = this.props;
        const { height, onColumnClick } = this.props;
        classNames = classNames.concat('dgrid-not-scrollable');
        if (height) {
            return (react_1.default.createElement("div", { className: classNames.join(' ') },
                react_1.default.createElement("div", { className: "wrapper-dgrid-header" },
                    react_1.default.createElement("table", { cellSpacing: "0", className: "dgrid-header" },
                        react_1.default.createElement("colgroup", null, colGroup),
                        react_1.default.createElement("thead", null, [row.top, row.bottom].map((row, colKey) => {
                            return (react_1.default.createElement("tr", { key: colKey }, row.map((col, rowKey) => {
                                const header = this.getHeaderCellHTML(col.name);
                                const props = {
                                    key: rowKey,
                                    className: col.className,
                                    onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
                                    colSpan: col.cols,
                                    rowSpan: col.rows
                                };
                                return typeof header === 'string' ? (react_1.default.createElement("th", { ...props, dangerouslySetInnerHTML: {
                                        __html: header
                                    } })) : (react_1.default.createElement("th", { ...props }, header));
                            })));
                        })))),
                react_1.default.createElement("div", { style: { maxHeight: height, height }, className: "dgrid-body-wrapper dgrid-scrollable" },
                    react_1.default.createElement("div", { className: "dgrid-body" },
                        react_1.default.createElement("div", { className: this.props.showLoader ? 'dgrid-loader' : '' }),
                        react_1.default.createElement("table", { cellSpacing: "0", onClick: this.handleBodyClick },
                            react_1.default.createElement("colgroup", null, colGroup),
                            react_1.default.createElement("tbody", { className: "dgrid-body-table", ref: (tbody) => {
                                    this.tBodyElement = tbody;
                                } })))),
                react_1.default.createElement("div", { className: "wrapper-totals" }, this.renderTotals(Boolean(height))),
                this.renderPagination()));
        }
        return (react_1.default.createElement("div", { className: classNames.join(' ') },
            react_1.default.createElement("div", { className: this.props.showLoader ? 'dgrid-loader' : '' }),
            react_1.default.createElement("table", { cellSpacing: "0", className: "dgrid-body-table", onClick: this.handleBodyClick },
                react_1.default.createElement("colgroup", null, colGroup),
                react_1.default.createElement("thead", null, [row.top, row.bottom].map((row, colKey) => {
                    return (react_1.default.createElement("tr", { key: colKey }, row.map((col, rowKey) => {
                        const header = this.getHeaderCellHTML(col.name);
                        const props = {
                            key: rowKey,
                            className: col.className,
                            onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
                            colSpan: col.cols,
                            rowSpan: col.rows
                        };
                        return typeof header === 'string' ? (react_1.default.createElement("th", { ...props, dangerouslySetInnerHTML: {
                                __html: header
                            } })) : (react_1.default.createElement("th", { ...props }, header));
                    })));
                })),
                react_1.default.createElement("tbody", { className: "dgrid-body-table", ref: (tbody) => {
                        this.tBodyElement = tbody;
                    } }),
                this.renderTotals(Boolean(height))),
            this.renderPagination()));
    }
    initRecordsMap(prevProps) {
        if (this.props.records === prevProps.records && this.props.extraRecords === prevProps.extraRecords) {
            return;
        }
        if (this.props.records) {
            const ids = [...this.props.extraRecords.keys(), ...this.props.records.keys()];
            this.recordMap = ids.reduce((accum, recordId) => {
                accum.set((0, utils_1.toEncodedString)(recordId), recordId);
                return accum;
            }, new Map());
        }
    }
    shouldRenderBody(prevProps, propName) {
        const prevValue = prevProps[propName];
        const currentValue = this.props[propName];
        if ((!prevValue && currentValue) || (prevValue && !currentValue)) {
            return true;
        }
        if (currentValue && prevValue) {
            if (currentValue === prevValue) {
                return false;
            }
            if (currentValue.size !== prevValue.size) {
                return true;
            }
            const prevKeys = [...prevValue.keys()];
            const nextKeys = [...currentValue.keys()];
            for (let i = 0; i < prevKeys.length; i++) {
                if (!(0, utils_1.isEqual)(prevKeys[i], nextKeys[i])) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
    getRowsToRerender(prevProps) {
        const rowsToReRender = new Set();
        this.checkEditorForRender(rowsToReRender, prevProps);
        this.checkRecordsForRender(rowsToReRender, prevProps, 'records');
        this.checkRecordsForRender(rowsToReRender, prevProps, 'extraRecords');
        this.checkPropForRerender(rowsToReRender, prevProps, 'statuses');
        this.checkPropForRerender(rowsToReRender, prevProps, 'errors');
        this.checkPropForRerender(rowsToReRender, prevProps, 'warnings');
        this.checkPropForRerender(rowsToReRender, prevProps, 'changes');
        return rowsToReRender;
    }
    checkPropForRerender(rowsToReRender, prevProps, propName) {
        const currentValue = this.props[propName];
        const prevValue = prevProps[propName];
        if (this.props.records) {
            if (currentValue === prevValue) {
                return;
            }
            const allRecordIds = new Set([
                ...[...prevValue.keys()].map((key) => JSON.stringify(key)),
                ...[...currentValue.keys()].map((key) => JSON.stringify(key))
            ]);
            for (const jsonRecordId of allRecordIds) {
                const recordId = JSON.parse(jsonRecordId);
                if ((!currentValue.has(recordId) || !prevValue.has(recordId)) && this.isRecordLoaded(recordId)) {
                    rowsToReRender.add(recordId);
                    continue;
                }
                if (currentValue.has(recordId) && prevValue.has(recordId) && this.isRecordLoaded(recordId)) {
                    if (!(0, utils_1.isEqual)(currentValue.get(recordId), prevValue.get(recordId))) {
                        rowsToReRender.add(recordId);
                    }
                }
            }
        }
    }
    isRecordLoaded(recordId) {
        var _a, _b;
        return (_b = (_a = this.props.records) === null || _a === void 0 ? void 0 : _a.has(recordId)) !== null && _b !== void 0 ? _b : this.props.extraRecords.has(recordId);
    }
    checkEditorForRender(rowsToReRender, prevProps) {
        const { editor } = this.props;
        const prevEditor = prevProps.editor;
        if (!editor.recordId && !prevEditor.recordId) {
            return;
        }
        if (this.props.records) {
            if (editor.recordId && prevEditor.recordId) {
                if (editor === prevEditor) {
                    return;
                }
                rowsToReRender.add(prevEditor.recordId);
                rowsToReRender.add(editor.recordId);
                return;
            }
            if (!prevEditor.recordId && editor.recordId) {
                rowsToReRender.add(editor.recordId);
                return;
            }
            if (!editor.recordId && prevEditor.recordId) {
                rowsToReRender.add(prevEditor.recordId);
            }
        }
    }
    checkRecordsForRender(rowsToReRender, prevProps, propName) {
        const prevValue = prevProps[propName];
        const currentValue = this.props[propName];
        if (currentValue === prevValue) {
            return;
        }
        if (currentValue && prevValue) {
            if (currentValue !== prevValue) {
                for (const [recordId, rowValue] of currentValue) {
                    if (prevValue.get(recordId) !== rowValue) {
                        rowsToReRender.add(recordId);
                    }
                }
            }
        }
    }
    renderRow(recordId, prevEditor) {
        (0, assert_1.assertNonNullish)(this.tBodyElement, '"tBodyElement" unknown');
        const row = this.tBodyElement.querySelector(`tr[key="${(0, utils_1.toEncodedString)(recordId)}"]`);
        (0, assert_1.assertNonNullish)(row, '"row" not found');
        const selected = this.isSelected(recordId);
        row.className = this.getRowClassNames(recordId, selected);
        const columnIds = (0, utils_1.keys)(this.props.columns).filter((key) => this.isViewColumn(key));
        for (let columnIndex = 0; columnIndex < columnIds.length; columnIndex++) {
            const cellElement = row.children[columnIndex];
            (0, assert_1.default)(cellElement, `cellElement not found by columnIndex "${columnIndex}"`);
            const columnId = columnIds[columnIndex];
            (0, assert_1.default)(columnId);
            this.renderCell(recordId, columnId, cellElement, prevEditor);
        }
    }
    renderCell(recordId, columnId, cellElement, prevEditor) {
        var _a;
        if (recordId === this.props.editor.recordId) {
            if (columnId === this.props.editor.column) {
                this.renderEditor(cellElement);
            }
            return;
        }
        if (prevEditor.recordId) {
            if (recordId === prevEditor.recordId && columnId === prevEditor.column) {
                this.unmountEditor(cellElement);
            }
            else {
                return;
            }
        }
        (0, assert_1.assertNonNullish)(this.props.records, '"records" unknown');
        const initialRecord = (_a = this.props.records.get(recordId)) !== null && _a !== void 0 ? _a : this.props.extraRecords.get(recordId);
        (0, assert_1.assertNonNullish)(initialRecord, '"initialRecord" unknown');
        const recordWithChanges = { ...initialRecord, ...this.props.changes.get(recordId) };
        const selected = this.isSelected(recordId);
        const editorFieldName = this.getEditorFieldName(columnId);
        const gridCellClass = (0, classnames_1.default)(this.getColumnClass(columnId), {
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
        }
        catch (e) {
        }
    }
    unmountEditor(element) {
        react_dom_1.default.unmountComponentAtNode(element);
        element.classList.remove('dgrid-input-wrapper');
    }
    getRowHTML(recordId) {
        var _a;
        (0, assert_1.assertNonNullish)(this.props.records, '"records" unknown');
        const initialRecord = (_a = this.props.records.get(recordId)) !== null && _a !== void 0 ? _a : this.props.extraRecords.get(recordId);
        (0, assert_1.assertNonNullish)(initialRecord, '"initialRecord" unknown');
        const recordWithChanges = { ...initialRecord, ...this.props.changes.get(recordId) };
        const selected = this.isSelected(recordId);
        const gridRowClass = this.getRowClassNames(recordId, selected);
        let html = `<tr key="${(0, utils_1.toEncodedString)(recordId)}" class="${gridRowClass}">`;
        for (const columnId of (0, utils_1.keys)(this.props.columns)) {
            const editorFieldName = this.getEditorFieldName(columnId);
            if (this.isViewColumn(columnId)) {
                const gridCellClass = (0, classnames_1.default)(this.getColumnClass(columnId), {
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
    getRowClassNames(recordId, selected) {
        return (0, classnames_1.default)([...this.getRowStatusNames(recordId)].join(' '), {
            [EXTRA_RECORD_CLASS_NAME]: this.props.extraRecords.has(recordId),
            [SELECTED_RECORD_CLASS_NAME]: selected
        });
    }
    getCellHTML(columnId, recordWithChanges, selected, initialRecord) {
        const column = this.props.columns[columnId];
        (0, assert_1.assertNonNullish)(column, `"${columnId}" column unavailable`);
        const render = (0, last_1.default)(column.render);
        const cellHtml = render(this.escapeRecord(columnId, recordWithChanges), selected, this.escapeRecord(columnId, initialRecord), this.props.gridRef);
        return `${!(0, isNil_1.default)(cellHtml) ? cellHtml : ''}`;
    }
    hasWarning(row, field) {
        return this.checkFieldInValidation(row, field, this.props.warnings);
    }
    hasError(recordId, field) {
        return this.checkFieldInValidation(recordId, field, this.props.errors);
    }
    checkFieldInValidation(recordId, field, validation) {
        const recordValidation = validation.get(recordId);
        if (!recordValidation) {
            return false;
        }
        return recordValidation.hasError(field);
    }
    isChanged(recordId, field) {
        const recordChanges = this.props.changes.get(recordId);
        if (!recordChanges) {
            return false;
        }
        return recordChanges.hasOwnProperty(field);
    }
    getRowStatusNames(recordId) {
        var _a;
        return (_a = this.props.statuses.get(recordId)) !== null && _a !== void 0 ? _a : new Set();
    }
    isSelected(recordId) {
        const rowStatuses = this.props.statuses.get(recordId);
        if (rowStatuses) {
            return rowStatuses.has('selected');
        }
        return false;
    }
    formHeader() {
        const row = {
            bottom: [],
            top: []
        };
        const colGroup = [];
        let lastParent = null;
        for (const [columnId, column] of Object.entries(this.props.columns)) {
            if (!this.isViewColumn(columnId)) {
                continue;
            }
            (0, assert_1.assertNonNullish)(column, `"${columnId}" column unavailable`);
            const colClassName = this.getColumnClass(columnId);
            colGroup.push(react_1.default.createElement("col", { key: columnId, width: column.width, className: colClassName }));
            const formHeaderColInfo = {
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
        return { row, colGroup };
    }
    getSortParams(columnId) {
        const { columns, sort } = this.props;
        const column = columns[columnId];
        (0, assert_1.assertNonNullish)(column, `"${columnId}" column unavailable`);
        if (!column.sortCycle) {
            return null;
        }
        const sortableColumn = columnId;
        const lastSort = (0, last_1.default)(Array.isArray(sort) ? sort : [sort]);
        if ((lastSort === null || lastSort === void 0 ? void 0 : lastSort.column) === sortableColumn) {
            return { column: sortableColumn, direction: lastSort.direction };
        }
        return { column: sortableColumn, direction: 'default' };
    }
    getColumnClass(columnId) {
        var _a;
        return (_a = this.props.columns[columnId]) === null || _a === void 0 ? void 0 : _a.className;
    }
    isViewColumn(columnId) {
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
    getHeaderCellHTML(columnName) {
        const cellHtml = typeof columnName === 'function' ? columnName(this.props.gridRef) : columnName;
        if (cellHtml === undefined) {
            return '';
        }
        return cellHtml;
    }
    renderPagination() {
        const { viewCount, viewVariants, pageSizeLabel, page, count } = this.props;
        if (!viewCount) {
            return null;
        }
        const { onChangeViewCount, onClickFirstPage, onClickPrevPage, onClickNextPage, onClickLastPage, onRefreshTable } = this.props;
        return (react_1.default.createElement("div", { className: "dgrid-footer" },
            Boolean(viewVariants.length) && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: "dgrid-pagination-page-size" },
                    " ",
                    pageSizeLabel),
                react_1.default.createElement("div", { className: "dgrid-pagination-view-variants" },
                    react_1.default.createElement("select", { className: "dgrid-pagination-view-variants-select", value: viewCount, onChange: (e) => onChangeViewCount(Number(e.target.value)) }, viewVariants.map((option, key) => (react_1.default.createElement("option", { key: key, value: option }, option))))))),
            react_1.default.createElement("button", { "aria-label": "first page", className: "btn-first-page", onClick: withPreventDefault(onClickFirstPage) }, "\u00A0"),
            react_1.default.createElement("button", { "aria-label": "prev page", className: "btn-prev-page", onClick: withPreventDefault(onClickPrevPage) }, "\u00A0"),
            Boolean(count) && (react_1.default.createElement("div", null,
                page * viewCount + 1,
                ' - ',
                Math.min((page + 1) * viewCount, count),
                ' of ',
                count)),
            react_1.default.createElement("button", { "aria-label": "next page", className: "btn-next-page", onClick: withPreventDefault(onClickNextPage) }, "\u00A0"),
            react_1.default.createElement("button", { "aria-label": "last page", className: "btn-last-page", onClick: withPreventDefault(onClickLastPage) }, "\u00A0"),
            react_1.default.createElement("button", { "aria-label": "refresh page", className: "btn-refresh-page", onClick: withPreventDefault(onRefreshTable) }, "\u00A0")));
    }
    renderTotals(scrollable) {
        let totalsDisplayed = false;
        let totalsRowHTML = '';
        const header = this.formHeader();
        for (const columnId of (0, utils_1.keys)(this.props.columns)) {
            if (!this.isViewColumn(columnId)) {
                continue;
            }
            const column = this.props.columns[columnId];
            (0, assert_1.assertNonNullish)(column, `"${columnId}" column unavailable`);
            const className = column.className;
            if (className) {
                totalsRowHTML += `<td class="${className}" key="${columnId}">`;
            }
            else {
                totalsRowHTML += `<td key="${columnId}">`;
            }
            if (this.props.totals.hasOwnProperty(columnId)) {
                totalsRowHTML += this.getCellHTML(columnId, this.props.totals, false, this.props.totals);
                totalsDisplayed = true;
            }
            totalsRowHTML += '</td>';
        }
        if (!totalsDisplayed) {
            return null;
        }
        if (scrollable) {
            return (react_1.default.createElement("table", { cellSpacing: "0", className: "dgrid-totals" },
                react_1.default.createElement("colgroup", null, header.colGroup),
                react_1.default.createElement("tr", { dangerouslySetInnerHTML: { __html: totalsRowHTML } })));
        }
        return (react_1.default.createElement("tfoot", { className: "dgrid-totals" },
            react_1.default.createElement("tr", { dangerouslySetInnerHTML: { __html: totalsRowHTML } })));
    }
    getEditorFieldName(id) {
        var _a, _b;
        return (_b = (_a = this.props.columns[id]) === null || _a === void 0 ? void 0 : _a.editorField) !== null && _b !== void 0 ? _b : id;
    }
}
PureGridComponent.defaultProps = DEFAULT_PROPS;
function withPreventDefault(handler) {
    return (event) => {
        event.preventDefault();
        handler(event);
    };
}
exports.default = PureGridComponent;
//# sourceMappingURL=PureGridComponent.js.map