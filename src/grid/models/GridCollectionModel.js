/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

import callbackify from '../../common/callbackify';
import toPromise from '../../common/toPromise';
import Validator from '../../common/validation/Validator/common';
import AbstractGridModel from './AbstractGridModel';
import utils from '../../common/utils';

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
const GridCollectionModel = function (options) {
  AbstractGridModel.call(this);

  options = options || {};

  this.data = options.data || [];
  this._id = 1;
  this._filtersHandler = options.filtersHandler;
  this._validation = options.validation || new Validator();
  this._requiredFields = options.requiredFields || [];
  this._validateOnCreate = options.hasOwnProperty('validateOnCreate') ? options.validateOnCreate : true;

  // TODO Deprecated. Will be deleted in v0.17.0
  if (!this._validateOnCreate) {
    console.warn('Deprecated option "validateOnCreate".');
  }
};
GridCollectionModel.prototype = new AbstractGridModel();
GridCollectionModel.prototype.constructor = GridCollectionModel;

/**
 * Set data array in model
 *
 * @param {Object[]} data
 */
GridCollectionModel.prototype.setData = function (data) {
  this.data = data;
};

/**
 * Add a record to local collection
 *
 * @param {Object}      record  Record object
 * @param {Function}    cb      CallBack function
 */
GridCollectionModel.prototype.create = callbackify(async function (record) {
  let i;
  let field;
  let validationErrors;
  const clonedRecord = utils.clone(record);

  for (i in this._requiredFields) {
    field = this._requiredFields[i];
    if (!clonedRecord.hasOwnProperty(field)) {
      clonedRecord[field] = record[field];
    }
  }

  if (this._validateOnCreate) {
    validationErrors = await this.isValidRecord(clonedRecord);
    if (!validationErrors.isEmpty()) {
      throw validationErrors;
    }

    return this._create(clonedRecord);
  } else {
    return this._create(clonedRecord);
  }
});

GridCollectionModel.prototype._create = callbackify(function (record) {
  const id = this._getID();
  this.data.push([id, record]);
  this.trigger('create', id);
  return id;
});

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
 * @param {Function}    cb                      CallBack function
 */
GridCollectionModel.prototype.read = callbackify(function (settings) {
  let data = utils.cloneDeep(this.data);
  const result = {};

  // Get extra records
  if (settings.extra && settings.extra.length > 0) {
    result.extraRecords = data.filter(record => settings.extra.indexOf(record[0]) >= 0);
  }

  // Delete unnecessary fields
  if (settings.fields) {
    utils.forEach(result.extraRecords, record =>{
      utils.forEach(record[1], (value, key) =>{
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

    data = data.sort((prev, next) =>{
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
    data = utils.cloneDeep(this._filtersHandler(data, settings.filters));
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
    utils.forEach(data, record =>{
      utils.forEach(record[1], (value, key) =>{
        if (settings.fields.indexOf(key) === -1) {
          delete record[1][key];
        }
      });
    });
  }

  result.records = data;

  return Promise.resolve(result);
});

/**
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridCollectionModel.prototype.getRecord = callbackify(function (id, fields) {
  let record = utils.cloneDeep(this._getRecordByID(id));
  if (!record) {
    return Promise.reject(Error('Record not found.'));
  }

  const returnRecord = record[1];

  // Deleting unused fields
  utils.forEach(returnRecord, (value, key) =>{
    if (fields.indexOf(key) === -1) {
      delete returnRecord[key];
    }
  });

  return Promise.resolve(returnRecord);
});

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridCollectionModel.prototype.update = callbackify(async function (changes) {
  let completed = 0;
  let result;
  const appliedChanges = [];
  let finish = false;

  if (!changes.length) {
    return [];
  }

  const promises = changes.map(async function (change) {
    if (finish) {
      return;
    }

    try {
      var validErrors = await this.isValidRecord(change[1]);
    } catch (err) {
      finish = true;
      throw err;
    }

    ++completed;

    if (validErrors.isEmpty()) {
      utils.assign(this._getRecordByID(change[0])[1], change[1]);
      appliedChanges.push(change);
      return change;
    } else {
      return [change[0], validErrors];
    }
  }.bind(this));

  result = await Promise.all(promises);

  if (completed === changes.length) {
    this.trigger('update', appliedChanges);
  }

  return result;
});

/**
 * Get all dependent fields, that are required for validation
 *
 * @param   {Array}  fields   Fields list
 * @returns {Array}  Dependencies
 */
GridCollectionModel.prototype.getValidationDependency = function (fields) {
  return this._validation.getValidationDependency(fields);
};

/**
 * Validation check
 *
 * @param {Object}      record
 * @param {Function}    cb      CallBack function
 */
GridCollectionModel.prototype.isValidRecord = callbackify(function (record) {
  return toPromise(this._validation.isValidRecord.bind(this._validation))(record);
});

GridCollectionModel.prototype._getID = function () {
  while (this._getRecordByID(this._id)) {
    this._id++;
  }
  return this._id++;
};

GridCollectionModel.prototype._getRecordByID = function (id) {
  return utils.find(this.data, record => record[0] === id);
};

module.exports = GridCollectionModel;
