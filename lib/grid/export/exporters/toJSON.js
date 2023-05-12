"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toJSON = async (data) => {
    return {
        mime: 'application/json',
        data: {
            records: data.records,
            totals: data.totals
        }
    };
};
exports.default = toJSON;
//# sourceMappingURL=toJSON.js.map