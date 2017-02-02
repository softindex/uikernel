/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import callbackify from '../../common/callbackify';
import toPromise from '../../common/toPromise';
import ValidationErrors from '../../common/validation/ValidationErrors';
import utils from '../../common/utils';

const GridDataMixin = {
  /**
   * Change table record
   * This method marks changed fields and validates them
   *
   * @param {*}         recordId    Record ID
   * @param {Object}    data        Changed data
   * @param {Function}  cb          CallBack function
   */
  set: function (recordId, data, cb) {//TODO cb does't used
    const row = this._getRowID(recordId);
    this._setRowChanges(row, utils.cloneDeep(data), cb);
  },

  /**
   * Get record data
   *
   * @param recordId
   * @return {Object}
   */
  getRecord: function (recordId) {
    const row = this._getRowID(recordId);
    return utils.cloneDeep(this._getRecord(row));
  },

  /**
   * Get record changes object
   *
   * @param   {*} recordId Record ID
   * @return  {Object}
   */
  getRecordChanges: function (recordId) {
    const row = this._getRowID(recordId);
    return this._getRecordChanges(row);
  },

  /**
   * Get record warnings object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordWarnings: function (recordId) {
    const row = this._getRowID(recordId);
    return this.state.warnings[row] || new ValidationErrors();
  },

  /**
   * Get validation warnings
   *
   * @return {Array|null}
   */
  getWarnings: function () {
    const result = [];
    for (const i in this.state.warnings) {
      result.push([
        this.state.recordsInfo[i].id,
        this.state.warnings[i]
      ]);
    }
    return result.length ? result : null;
  },

  /**
   * Get record errors object
   *
   * @param   {*} recordId  Record ID
   * @return  {ValidationErrors}
   * @private
   */
  getRecordErrors: function (recordId) {
    const row = this._getRowID(recordId);
    return this._getRecordErrors(row);
  },

  /**
   * Get validation errors
   *
   * @return {Array|null}
   */
  getErrors: function () {
    const result = [];
    for (const i in this.state.errors) {
      result.push([
        this.state.recordsInfo[i].id,
        this.state.errors[i]
      ]);
    }
    return result.length ? result : null;
  },

  /**
   * Get table model
   *
   * @returns {AbstractGridModel}
   */
  getModel: function () {
    return this.props.model;
  },

  /**
   * Save grid changes
   *
   * @param {Function} cb CallBack function
   */
  save: callbackify(async function () {
    const errors = this.getErrors();

    // Collect all valid changes
    const changes = utils.reduce(this.state.changes, (result, rowChanges, row) => {
      if (!errors || !errors[row]) {
        if (this.props.saveFullRecord) {
          result[row] = this._getRecord(row);
        } else {
          result[row] = {};
          Object.assign(result[row], rowChanges, utils.pick(
            this.state.data[row],
            this.props.model.getValidationDependency(Object.keys(result[row]))
          ));
        }
      }
      return result;
    }, {});

    // Cancel new record display
    this.removeRecordStatusAll('new');

    // Pass changes to table model processing
    const data = await toPromise(this.props.model.update.bind(this.props.model))(this._dataObjectToArray(changes));
    if (!this._isMounted) {
      return;
    }

    this.state.partialErrorChecking = false;

    data.forEach((record) => {
      const row = this._getRowID(record[0]);

      // Skip records that are user changed while data processing
      if (!utils.isEqual(this.state.changes[row], changes[row])) {
        return;
      }

      // Process validation errors
      if (record[1] instanceof ValidationErrors) {
        this.state.errors[row] = record[1];
        return;
      }

      // Cancel changed data status of the parameters, that are changed
      utils.forEach(changes[row], function (value, field) {
        if (utils.isEqual(value, this.state.changes[row][field])) {
          delete this.state.changes[row][field];
        }
      }, this);

      // Clear changed data row if it's empty
      if (utils.isEmpty(this.state.changes[row])) {
        delete this.state.changes[row];
        if (!this._isMainRow(row)) {
          this._removeRecord(row);
        }
      }
    });

    this._renderBody();

    return data;
  }),

  /**
   * Clear record changes
   *
   * @param {*} recordId Record ID
   */
  clearRecordChanges: function (recordId) {
    const row = this._getRowID(recordId);

    delete this.state.changes[row];
    delete this.state.warnings[row];
    delete this.state.errors[row];

    this._updateRow(row);
  },

  /**
   * Clear all table changes
   */
  clearAllChanges: function () {
    let i;
    for (i in this.state.data) {
      if (!this._isMainRow(i)) {
        delete this.state.data[i];
        delete this.state.recordsInfo[i];
      }
    }
    this.state.changes = {};
    this.state.statuses = {};
    this.state.warnings = {};
    this.state.errors = {};
    this.state.partialErrorChecking = this.props.partialErrorChecking;

    this._renderBody();
  },

  /**
   * Reset to initial table state
   */
  reset: function () {
    this._setPage(0);
    if (!this._isSortingPropsMode()) {
      this._resetSorting();
    }
    this.updateTable();
  },

  /**
   * Get record changes object
   *
   * @param   {string}        row     Row ID
   * @return  {Object}
   */
  _getRecordChanges: function (row) {
    if (this.state.changes.hasOwnProperty(row)) {
      return utils.cloneDeep(this.state.changes[row]);
    }
    return {};
  },

  /**
   * Set record data
   *
   * @param {*}       recordId  Record ID
   * @param {Object}  data      Data
   * @private
   */
  _setRecordData: function (recordId, data) {
    if (!this._isRecordLoaded(recordId)) {
      return;
    }

    // TODO done through _dataArrayToObject
    let field;
    const row = this._getRowID(recordId);

    // Apply and redraw all record changes
    for (field in data) {
      this.state.data[row][field] = utils.cloneDeep(data[field]);
      this._renderBinds(row, field);
    }
  },

  /**
   * Table row has warning flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasWarning: function (row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.warnings);
  },

  /**
   * Table row has error flag
   *
   * @param   {string}        row     Row ID
   * @param   {Array|string}  fields
   * @returns {boolean}
   * @private
   */
  _hasError: function (row, fields) {
    return this._checkFieldInValidation(row, fields, this.state.errors);
  },

  /**
   * Table row has error in "validation" object
   *
   * @param   {string}        row
   * @param   {Array|string}  fields
   * @param   {Validation}    validation
   * @returns {boolean}
   * @private
   */
  _checkFieldInValidation: function (row, fields, validation) {
    let i;

    if (!validation[row]) {
      return false;
    }

    if (this.state.partialErrorChecking && !this.state.changes.hasOwnProperty(row)) {
      return false;
    }

    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (i = 0; i < fields.length; i++) {
      if (validation[row].hasError(fields[i])) {
        return true;
      }
    }
    return false;
  },

  /**
   * Table row changed flag
   *
   * @param   {string}        row         Row ID
   * @param   {Array|string}  [fields]
   * @return  {boolean}
   * @private
   */
  _isChanged: function (row, fields) {
    let i;
    if (!this.state.changes[row]) {
      return false;
    }

    if (fields) {
      if (!Array.isArray(fields)) {
        fields = [fields];
      }
      for (i = 0; i < fields.length; i++) {
        if (this.state.changes[row].hasOwnProperty(fields[i])) {
          return true;
        }
      }
      return false;
    }

    return true;
  },

  /**
   * Get table row errors object
   *
   * @param   {string} row  Row ID
   * @return  {ValidationErrors}
   * @private
   */
  _getRecordErrors: function (row) {
    return this.state.errors[row] || new ValidationErrors();
  },

  /**
   * Pass changes to the table
   * This method marks changed fields
   *
   * @param {string}      row         Row ID
   * @param {Object}      data        Changed data
   * @private
   */
  _setRowChanges: function (row, data) {
    const changes = this.state.changes;

    if (!changes[row]) {
      changes[row] = {};
    }

    changes[row] = utils.getRecordChanges(this.props.model, this.state.data[row], changes[row], data);

    if (utils.isEmpty(changes[row])) {
      delete changes[row];
    } else {
      // Redraw the changes in the row
      utils.forEach(changes[row], function (value, field) {
        this._renderBinds(row, field);
      }, this);
    }
  },

  /**
   * Get table record
   *
   * @param {string} row Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecord: function (row) {
    if (this.state.data[row]) {
      return Object.assign({}, this.state.data[row], this.state.changes[row]);
    }
    return null;
  },

  /**
   * Set table data
   *
   * @param {Array}  changes  Changes
   * @private
   */
  _setData: function (changes) {
    let i;

    // Apply all changes
    for (i = 0; i < changes.length; i++) {
      this._setRecordData(changes[i][0], changes[i][1]);
    }
  },

  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam: function (id) {
    return this.props.cols[id].editorField || id;
  },

  /**
   * This method converts data array to the object with keys presented as record ID hash
   *
   * @param   {Array}    arr     Data array
   * @returns {Object}    Object result
   * @private
   */
  _dataArrayToObject: arr => {
    let i;
    const records = {};
    const info = {};
    let row;

    for (i = 0; i < arr.length; i++) {
      row = utils.toEncodedString(arr[i][0]);
      records[row] = arr[i][1];
      info[row] = {
        id: arr[i][0],
        index: i // Sort index
      };
    }

    return {
      records: records,
      info: info
    };
  },

  /**
   * This method converts data object to the array with keys presented as record ID hash
   *
   * @param   {Object}  obj     Data object
   * @returns {Array}   Array result
   * @private
   */
  _dataObjectToArray: function (obj) {
    let i;
    const arr = [];

    for (i in obj) {
      arr.push([
        this.state.recordsInfo[i].id,
        utils.clone(obj[i])
      ]);
    }

    return arr;
  },

  /**
   * Is main table row flag
   *
   * @param   {string}    row     Row ID
   * @return  {boolean}
   * @private
   */
  _isMainRow: function (row) {
    return this.state.mainIds.indexOf(row) >= 0;
  },

  _isRecordLoaded: function (recordId) {
    // TODO Can be optimized
    const row = utils.toEncodedString(recordId);
    return this.state.data.hasOwnProperty(row);
  },

  /**
   * Get table row ID having record ID
   *
   * @param   {*}       recordId    Record ID
   * @return  {string}  Row ID
   * @private
   */
  _getRowID: function (recordId) {
    const row = utils.toEncodedString(recordId);

    if (!this.state.data.hasOwnProperty(row)) {
      throw Error('Record with the ID is not contained in the table.');
    }

    return row;
  },

  /**
   * Load model data
   *
   * @param {Object}      settings    Request parameters
   * @private
   */
  _loadData: async function (settings) {
    let data;
    try {
      data = await this.props.model.read(settings);
    } catch (err) {
      if (err && this.props.onError) {
        this.props.onError(err);
      }
      throw err;
    }

    if (this.props.onPageLoad) {
      this.props.onPageLoad(data);
    }
    return data;
  },

  /**
   * Find record IDs that need to be displayed additionally
   *
   * @return {Array} Additional IDs array
   * @private
   */
  _getAdditionalIds: function () {
    const additionalIds = this._getRecordsWithStatus();
    let id;
    for (const row in this.state.changes) {
      id = this.state.recordsInfo[row].id;
      if (additionalIds.indexOf(id) < 0) {
        additionalIds.push(id);
      }
    }
    return additionalIds;
  },

  _removeRecord: function (rowId, cb) {
    this._removeTR(rowId);
    // this.unselectRecord(recordId, true); // TODO Make unselectRecord by rowId method
    delete this.state.data[rowId];
    delete this.state.recordsInfo[rowId];
    delete this.state.changes[rowId];
    delete this.state.warnings[rowId];
    delete this.state.errors[rowId];
    delete this.state.editor[rowId];
    this.setState(this.state, cb ? cb.bind(this) : null);
  },

  _checkWarnings: async function (row) {
    if (!this.props.warningsValidator) {
      return;
    }
    return this._checkValidatorErrors(row, this.props.warningsValidator, this.state.warnings);
  },

  _validateRow: function (row) {
    return this._checkValidatorErrors(row, this.props.model, this.state.errors);
  },

  /**
   * Check errors in "validator" object
   *
   * @param {string}        row         Row ID
   * @param {Validator}     validator   Validator object
   * @param {Validation[]}  result      Result object
   * @private
   */
  _checkValidatorErrors: async function (row, validator, result) {
    const record = this._getRecordChanges(row);

    const validErrors = await validator.isValidRecord(record);

    if (utils.isEqual(record, this._getRecordChanges(row))) {
      if (validErrors.isEmpty()) {
        delete result[row];
      } else {
        result[row] = validErrors;
      }

      Object.keys(record).forEach((field) => {
        this._renderBinds(row, field);
      });
    }
  },

  _onRecordCreated: function (recordId) {
    this.updateTable().then(() => {
      if (this._isRecordLoaded(recordId)) {
        this._checkWarnings(this._getRowID(recordId));
      }
    });
  }
};

export default GridDataMixin;
