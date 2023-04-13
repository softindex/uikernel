"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const csv_stringify_1 = __importDefault(require("csv-stringify"));
const toCSV = async (data) => {
    const csvData = await (0, util_1.promisify)(csv_stringify_1.default.bind(null, data.totals ? data.records.concat([data.totals]) : data.records, {
        header: true,
        columns: data.columns
    }))();
    return {
        mime: 'text/csv',
        data: csvData
    };
};
exports.default = toCSV;
//# sourceMappingURL=toCSV.js.map