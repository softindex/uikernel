/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

var utils = require('../../common/utils');
var AbstractGridModel = require('./AbstractGridModel');
var Validator = require('../../common/validation/Validator/common');

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
var GridCollectionModel = function (options) {
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
GridCollectionModel.prototype.create = function (record, cb) {
  var i;
  var field;
  var clonedRecord = utils.clone(record);

  for (i in this._requiredFields) {
    field = this._requiredFields[i];
    if (!clonedRecord.hasOwnProperty(field)) {
      clonedRecord[field] = record[field];
    }
  }

  if (this._validateOnCreate) {
    this.isValidRecord(clonedRecord, function (err, validationErrors) {
      if (err) {
        return cb(err);
      }

      if (!validationErrors.isEmpty()) {
        return cb(validationErrors);
      }

      this._create(clonedRecord, cb);
    }.bind(this));
  } else {
    this._create(clonedRecord, cb);
  }
};

GridCollectionModel.prototype._create = function (record, cb) {
  var id = this._getID();
  this.data.push([id, record]);
  this.trigger('create', id);
  cb(null, id);
};

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
GridCollectionModel.prototype.read = function (settings, cb) {
  var data = utils.cloneDeep(this.data);
  var result = {};

  // Get extra records
  if (settings.extra && settings.extra.length > 0) {
    result.extraRecords = data.filter(function (record) {
      return settings.extra.indexOf(record[0]) >= 0;
    });
  }

  // Delete unnecessary fields
  if (settings.fields) {
    utils.forEach(result.extraRecords, function (record) {
      utils.forEach(record[1], function (value, key) {
        if (settings.fields.indexOf(key) === -1) {
          delete record[1][key];
        }
      });
    });
  }

  // Sorting
  if (settings.sort && settings.sort.length > 0) {
    var sortField = settings.sort[0][0];
    var sortMode = settings.sort[0][1];

    data = data.sort(function (prev, next) {
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
    var start = settings.offset || 0;
    var end = (settings.offset + settings.limit) || data.length;
    data = data.slice(start, end);
  }

  // Delete unnecessary fields
  if (settings.fields) {
    utils.forEach(data, function (record) {
      utils.forEach(record[1], function (value, key) {
        if (settings.fields.indexOf(key) === -1) {
          delete record[1][key];
        }
      });
    });
  }

  result.records = data;

  cb(null, result);
};

/**
 * Get the particular record
 *
 * @param {number|string}   id      Record ID
 * @param {Array}           fields  Required fields
 * @param {Function}        cb      CallBack function
 */
GridCollectionModel.prototype.getRecord = function (id, fields, cb) {
  var cb = arguments[arguments.length - 1];
  var record = utils.cloneDeep(this._getRecordByID(id));
  if (!record) {
    return cb(Error('Record not found.'));
  }

  var returnRecord = record[1];

  if (fields && typeof fields !== "function"){
    // Deleting unused fields
    utils.forEach(returnRecord, function (value, key) {
      if (fields.indexOf(key) === -1) {
        delete returnRecord[key];
      }
    });
  }

  cb(null, returnRecord);
};

/**
 * Apply record changes
 *
 * @param {Array}       changes     Changes array
 * @param {Function}    cb          CallBack function
 * @abstract
 */
GridCollectionModel.prototype.update = function (changes, cb) {
  var completed = 0;
  var result = [];
  var appliedChanges = [];
  var finish = false;

  if (!changes.length) {
    return cb(null, []);
  }

  utils.forEach(changes, function (change) {
    this.isValidRecord(change[1], function (err, validErrors) {
      if (finish) {
        return;
      }

      if (err) {
        finish = true;
        return cb(err);
      }

      if (validErrors.isEmpty()) {
        utils.assign(this._getRecordByID(change[0])[1], change[1]);
        result.push(change);
        appliedChanges.push(change);
      } else {
        result.push([change[0], validErrors]);
      }

      if (++completed === changes.length) {
        this.trigger('update', appliedChanges);
        return cb(null, result);
      }
    }.bind(this));
  }.bind(this));
};

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
GridCollectionModel.prototype.isValidRecord = function (record, cb) {
  this._validation.isValidRecord(record, cb);
};

GridCollectionModel.prototype._getID = function () {
  while (this._getRecordByID(this._id)) {
    this._id++;
  }
  return this._id++;
};

GridCollectionModel.prototype._getRecordByID = function (id) {
  return utils.find(this.data, function (record) {
    return record[0] === id;
  });
};

module.exports = GridCollectionModel;
