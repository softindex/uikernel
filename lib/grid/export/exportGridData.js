"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("../../common/assert"));
const ArgumentsError_1 = __importDefault(require("../../common/error/ArgumentsError"));
const utils_1 = require("../../common/utils");
function formatColumns(columns, viewColumns) {
    const formattedColumns = {};
    for (const columnId of viewColumns) {
        const column = columns[columnId];
        if (!column) {
            continue;
        }
        const { name, parent } = column;
        (0, assert_1.default)(typeof name === 'string' && (!parent || typeof parent === 'string'), `column "${columnId}" unavailable for export from server`);
        formattedColumns[columnId] = `${parent ? `${parent} ` : ''}${name}`;
    }
    return formattedColumns;
}
function formatRecord(record, columns, viewColumns) {
    const formattedRecord = {};
    for (const viewColumn of viewColumns) {
        const column = columns[viewColumn];
        if (!column) {
            continue;
        }
        formattedRecord[viewColumn] = column.render[column.render.length - 1](record, false, record, undefined);
    }
    return formattedRecord;
}
function formatData(records, totals, columns, viewColumns) {
    const formatted = {
        columns: formatColumns(columns, viewColumns),
        records: records.map((record) => formatRecord(record[1], columns, viewColumns))
    };
    if (totals) {
        formatted.totals = formatRecord(totals, columns, viewColumns);
    }
    return formatted;
}
function getFields(columns, viewColumns) {
    const fields = {};
    for (const columnId of viewColumns) {
        const column = columns[columnId];
        if (!column) {
            continue;
        }
        const columnFields = column.render.slice(0, column.render.length - 1);
        for (const columnField of columnFields) {
            fields[columnField] = true;
        }
    }
    return (0, utils_1.keys)(fields);
}
function assertValidViewColumns(columns, viewColumns) {
    if (!(viewColumns === null || viewColumns === void 0 ? void 0 : viewColumns.length)) {
        throw new ArgumentsError_1.default('"viewColumns" can`t be empty');
    }
    const notExistColumns = [];
    for (const columnId of viewColumns) {
        if (!columns[columnId]) {
            notExistColumns.push(columnId);
        }
    }
    if (notExistColumns.length) {
        throw new ArgumentsError_1.default(`You trying to get not exist columns: ${notExistColumns.join(', ')}`);
    }
}
async function exportGridData(gridModel, columns, viewColumns, exportRunner, settings) {
    assertValidViewColumns(columns, viewColumns);
    const result = await gridModel.read({
        fields: getFields(columns, viewColumns),
        sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : undefined,
        limit: settings.limit,
        offset: settings.offset
    });
    const totals = result.totals;
    const data = formatData(result.records, totals, columns, viewColumns);
    return (await exportRunner(data));
}
exports.default = exportGridData;
//# sourceMappingURL=exportGridData.js.map