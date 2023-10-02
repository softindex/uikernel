"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const pick_1 = __importDefault(require("lodash/pick"));
const without_1 = __importDefault(require("lodash/without"));
const utils_1 = require("../../common/utils");
const ValidatorBuilder_1 = __importDefault(require("../../validation/ValidatorBuilder"));
const AbstractGridModel_1 = __importDefault(require("./AbstractGridModel"));
class GridCollectionModel extends AbstractGridModel_1.default {
    static getNumberIdGeneration() {
        let initalId = 1;
        return (existsIds) => {
            const existsIdsSet = new Set(existsIds);
            while (existsIdsSet.has(initalId)) {
                initalId++;
            }
            return initalId;
        };
    }
    static createWithNumberId({ data, filtersHandler, requiredFields, validator }) {
        (0, utils_1.warn)('static method GridCollectionModel.createWithNumberId is deprecated.');
        return GridCollectionModel.create({
            generateId: GridCollectionModel.getNumberIdGeneration(),
            data,
            filtersHandler,
            requiredFields,
            validator
        });
    }
    static create({ generateId, data, filtersHandler, requiredFields, validator }) {
        var _a;
        return new GridCollectionModel((_a = (0, cloneDeep_1.default)(data)) !== null && _a !== void 0 ? _a : [], requiredFields !== null && requiredFields !== void 0 ? requiredFields : [], validator !== null && validator !== void 0 ? validator : ValidatorBuilder_1.default.createEmptyValidator(), filtersHandler, generateId);
    }
    constructor(data, requiredFields, validator, filtersHandler, generateId) {
        super();
        this.data = data;
        this.requiredFields = requiredFields;
        this.validator = validator;
        this.filtersHandler = filtersHandler;
        this.generateId = generateId;
    }
    setData(data) {
        const currentData = this.data.reduce((result, [recordId, record]) => {
            result[JSON.stringify(recordId)] = record;
            return result;
        }, {});
        const createdRecordsIds = [];
        const updatedRecords = [];
        const recordIds = [];
        for (const [recordId, record] of data) {
            const id = JSON.stringify(recordId);
            recordIds.push(id);
            if (!currentData[id]) {
                createdRecordsIds.push(recordId);
                continue;
            }
            if (!(0, utils_1.isEqual)(record, currentData[id])) {
                updatedRecords.push([recordId, record]);
            }
        }
        const deletedRecordsIds = (0, without_1.default)((0, utils_1.keys)(currentData), ...recordIds).map((value) => JSON.parse(value));
        this.data = (0, cloneDeep_1.default)(data);
        if (createdRecordsIds.length) {
            this.trigger('create', createdRecordsIds);
        }
        if (deletedRecordsIds.length) {
            this.trigger('delete', deletedRecordsIds);
        }
        if (updatedRecords.length) {
            this.trigger('update', updatedRecords);
        }
    }
    getData() {
        return this.data;
    }
    async delete(recordIds) {
        this.data = this.data.filter((record) => {
            return !recordIds.find((recordId) => (0, utils_1.isEqual)(recordId, record[0]));
        });
        this.trigger('delete', recordIds);
    }
    async create(record) {
        let recordId;
        let clonedRecord;
        if (Array.isArray(record)) {
            if (record.length !== 2) {
                throw new TypeError('expected record type [TKey, TRecord], but received unknown array');
            }
            recordId = record[0];
            clonedRecord = { ...record[1] };
        }
        else {
            recordId = this.createId();
            clonedRecord = { ...record };
        }
        for (const field of this.requiredFields) {
            if (!clonedRecord.hasOwnProperty(field)) {
                clonedRecord[field] = undefined;
            }
        }
        const validationErrors = await this.isValidRecord(clonedRecord);
        if (!validationErrors.isEmpty()) {
            throw validationErrors;
        }
        return this.createRecordAndEmit(clonedRecord, recordId);
    }
    read({ fields, extra, filters, limit, offset, sort }) {
        let data = (0, cloneDeep_1.default)(this.data);
        const result = {
            records: []
        };
        if (extra && extra.length > 0) {
            result.extraRecords = data.reduce((acc, [recordId, record]) => {
                for (const extraRecordId of extra) {
                    if ((0, utils_1.isEqual)(extraRecordId, recordId)) {
                        acc.push([recordId, (0, pick_1.default)(record, fields)]);
                        return acc;
                    }
                }
                return acc;
            }, []);
        }
        if (sort === null || sort === void 0 ? void 0 : sort[0]) {
            const [sortField, sortMode] = sort[0];
            data.sort((prev, next) => {
                if (prev[1][sortField] < next[1][sortField]) {
                    return sortMode === 'asc' ? -1 : 1;
                }
                if (prev[1][sortField] > next[1][sortField]) {
                    return sortMode === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        if (this.filtersHandler && filters) {
            data = (0, cloneDeep_1.default)(this.filtersHandler(data, filters));
        }
        result.count = data.length;
        if (offset || limit) {
            const start = offset !== null && offset !== void 0 ? offset : 0;
            const end = Number(offset) + Number(limit) || data.length;
            data = data.slice(start, end);
        }
        result.records = data.map(([key, record]) => [key, (0, pick_1.default)(record, fields)]);
        return Promise.resolve(result);
    }
    async getRecord(id, fields) {
        const record = (0, cloneDeep_1.default)(this.getRecordByID(id));
        if (!record) {
            throw new Error('Record not found.');
        }
        const returnRecord = (0, pick_1.default)(record[1], fields);
        return returnRecord;
    }
    async update(changes) {
        if (!changes.length) {
            return [];
        }
        const appliedChanges = [];
        const result = await Promise.all(changes.map(async ([recordId, changes]) => {
            const validErrors = await this.isValidRecord(changes);
            if (!validErrors.isEmpty()) {
                return [recordId, validErrors];
            }
            appliedChanges.push([recordId, changes]);
            return [recordId, changes];
        }));
        for (const [recordId, changes] of appliedChanges) {
            this.data = this.data.map(([dataRecordId, dataRecord]) => {
                if (!(0, utils_1.isEqual)(dataRecordId, recordId)) {
                    return [dataRecordId, dataRecord];
                }
                return [
                    dataRecordId,
                    {
                        ...dataRecord,
                        ...changes
                    }
                ];
            });
        }
        if (appliedChanges.length) {
            this.trigger('update', appliedChanges);
        }
        return result;
    }
    isValidRecord(record) {
        return this.validator.isValidRecord(record);
    }
    getValidationDependency(fields) {
        return this.validator.getValidationDependency(fields);
    }
    createId() {
        return this.generateId(this.data.map(([id]) => id));
    }
    getRecordByID(id) {
        return this.data.find((record) => (0, utils_1.isEqual)(record[0], id));
    }
    createRecordAndEmit(record, id) {
        this.data = [...this.data, [id, record]];
        this.trigger('create', [id]);
        return id;
    }
}
exports.default = GridCollectionModel;
//# sourceMappingURL=GridCollectionModel.js.map