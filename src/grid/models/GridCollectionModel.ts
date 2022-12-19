/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Validator from '../../common/validation/Validator';
import AbstractGridModel from './AbstractGridModel';
import {cloneDeep, isEqual, without, clone, forEach, find} from '../../common/utils';

class GridCollectionModel extends AbstractGridModel {
  /**
   * Specifies a grid model that will work with array data passed to it as a parameter.
   *
   * @param {Object}    [options]
   * @param {Object[]}  [options.data]              Data array
   * @param {Function}  [options.filtersHandler]
   * @param {Validator} [options.validator]
   * @param {string[]}  [options.requiredFields]
   * @param {bool}      [options.validateOnCreate]
   * @constructor
   */
  constructor(options = {}) {
    super();

    this._data = cloneDeep(options.data) || [];
    this._id = 1;
    this._filtersHandler = options.filtersHandler;
    this._validator = options.validator || new Validator();
    this._requiredFields = options.requiredFields || [];
  }

  /**
   * Set data array in model
   *
   * @param {Object[]} data
   */
  setData(data) {
    const currentData = this._data.reduce((result, [recordId, record]) => {
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

      if (!isEqual(record, currentData[id])) {
        updatedRecords.push(record);
      }
    }

    const deletedRecordsIds = without(Object.keys(currentData), recordIds).map(JSON.parse);

    this._data = cloneDeep(data);

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
    return this._data;
  }

  /**
   * Remove field by record id from data
   *
   * @param   {Number[]}  recordIds   record id for remove
   * @returns {Number}    recordId    return id of deleted record
   */
  async delete(recordIds) {
    this._data = this._data.filter(record => {
      return !recordIds.find(recordId => isEqual(recordId, record[0]));
    });
    this.trigger('delete', recordIds);
  }

  /**
   * Add a record to local collection
   *
   * @param {Object}      record  Record object
   */
  async create(record) {
    let id = this._getID();
    let clonedRecord = clone(record);
    // Create record with definite id
    if (Array.isArray(clonedRecord) && clonedRecord.length === 2) {
      id = clonedRecord[0];
      clonedRecord = clonedRecord[1];
    }

    for (const field of this._requiredFields) {
      if (!clonedRecord.hasOwnProperty(field)) {
        clonedRecord[field] = null;
      }
    }

    const validationErrors = await this.isValidRecord(clonedRecord);
    if (!validationErrors.isEmpty()) {
      throw validationErrors;
    }

    return this._create(clonedRecord, id);
  }

  /**
   * Get records list
   *
   * @param {Object}      settings                Request
   * @param {string[]}    settings.fields         Fields
   * @param {number}      [settings.limit]        Limit
   * @param {number}      [settings.offset=0]     Offset
   * @param {Object}      [settings.filters]      Filter values object
   * @param {Array}       [settings.sort]         Sort parameters
   * @param {Array}       [settings.ids]          Record IDs, we need to get for sure
   */
  read(settings) {
    let data = cloneDeep(this._data);
    const result = {};

    // Get extra records
    if (settings.extra && settings.extra.length > 0) {
      result.extraRecords = data.filter(record => {
        for (const recordId of settings.extra) {
          if (isEqual(recordId, record[0])) {
            return true;
          }
        }
      });
    }

    // Delete unnecessary fields
    if (settings.fields) {
      forEach(result.extraRecords, record => {
        forEach(record[1], (value, key) => {
          if (settings.fields.indexOf(key) === -1) {
            delete record[1][key];
          }
        });
      });
    }

    // Sorting
    if (settings.sort && settings.sort.length > 0) {
      const sortField = settings.sort[0][0];
      const sortMode = settings.sort[0][1];

      data = data.sort((prev, next) => {
        if (prev[1][sortField] < next[1][sortField]) {
          return sortMode === 'asc' ? -1 : 1;
        } else if (prev[1][sortField] > next[1][sortField]) {
          return sortMode === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    // Apply filters
    if (this._filtersHandler && settings.filters) {
      data = cloneDeep(this._filtersHandler(data, settings.filters));
    }

    result.count = data.length;

    // Offset and limit
    if (settings.offset || settings.limit) {
      const start = settings.offset || 0;
      const end = (settings.offset + settings.limit) || data.length;
      data = data.slice(start, end);
    }

    // Delete unnecessary fields
    if (settings.fields) {
      forEach(data, record => {
        forEach(record[1], (value, key) => {
          if (settings.fields.indexOf(key) === -1) {
            delete record[1][key];
          }
        });
      });
    }

    result.records = data;

    return Promise.resolve(result);
  }

  /**
   * Get the particular record
   *
   * @param {number|string}   id      Record ID
   * @param {Array}           fields  Required fields
   */
  getRecord(id, fields) {
    const record = cloneDeep(this._getRecordByID(id));
    if (!record) {
      return Promise.reject(new Error('Record not found.'));
    }

    const returnRecord = record[1];

    // Deleting unused fields
    if (fields) {
      forEach(returnRecord, (value, key) => {
        if (fields.indexOf(key) === -1) {
          delete returnRecord[key];
        }
      });
    }

    return Promise.resolve(returnRecord);
  }

  /**
   * Apply record changes
   *
   * @param {Array}       changes     Changes array
   * @abstract
   */
  async update(changes) {
    if (!changes.length) {
      return [];
    }

    const appliedChanges = [];

    const result = await Promise.all(
      changes.map(
        async ([recordId, changes]) => {
          const validErrors = await this.isValidRecord(changes);

          if (!validErrors.isEmpty()) {
            return [recordId, validErrors];
          }

          appliedChanges.push([recordId, changes]);
          return [recordId, changes];
        }
      )
    );

    if (appliedChanges.length) {
      // Apply changes
      for (const [recordId, changes] of appliedChanges) {
        this._data = this._data.map(([dataRecordId, dataRecord]) => {
          if (!isEqual(dataRecordId, recordId)) {
            return [dataRecordId, dataRecord];
          }

          return [dataRecordId, {
            ...dataRecord,
            ...changes
          }];
        });
      }

      this.trigger('update', appliedChanges);
    }

    return result;
  }

  /**
   * Validation check
   *
   * @param {Object}      record
   */
  isValidRecord(record) {
    return this._validator.isValidRecord(record);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields) {
    return this._validator.getValidationDependency(fields);
  }

  _getID() {
    while (this._getRecordByID(this._id)) {
      this._id++;
    }
    return this._id++;
  }

  _getRecordByID(id) {
    return find(this._data, record => isEqual(record[0], id));
  }

  _create(record, id) {
    this._data = [...this._data, [id, record]];
    this.trigger('create', [id]);
    return id;
  }
}

export default GridCollectionModel;
