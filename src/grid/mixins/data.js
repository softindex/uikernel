/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ValidationErrors from '../../common/validation/ValidationErrors';
import {cloneDeep, reduce, pick, isEqual, isEmpty, forEach, getRecordChanges, toEncodedString, clone, warn} from '../../common/utils';
import ThrottleError from '../../common/ThrottleError';

const GridDataMixin = {
  /**
   * Change table record
   * This method marks changed fields and validates them
   *
   * @param {*}         recordId    Record ID
   * @param {Object}    data        Changed data
   * @param {Function}  cb          CallBack function
   */
  set(recordId, data, cb) {//TODO cb does't used
    const row = this._getRowID(recordId);
    this._setRowChanges(row, cloneDeep(data), cb);

    if (this.props.autoSubmit || this.props.realtime) {
      if (this.props.realtime) {
        console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
      }
      this.save(this.props.onRealtimeSubmit);
    } else if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Get record data
   *
   * @param recordId
   * @return {Object}
   */
  getRecord(recordId) {
    const row = this._getRowID(recordId);
    return cloneDeep(this._getRecordWithChanges(row));
  },

  /**
   * Get record changes object
   *
   * @param   {*} recordId Record ID
   * @return  {Object}
   */
  getRecordChanges(recordId) {
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
  getRecordWarnings(recordId) {
    const row = this._getRowID(recordId);
    return this.state.warnings[row] || new ValidationErrors();
  },

  /**
   * Get validation warnings
   *
   * @return {Array|null}
   */
  getWarnings() {
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
  getRecordErrors(recordId) {
    const row = this._getRowID(recordId);
    return this._getRecordErrors(row);
  },

  /**
   * Get validation errors
   *
   * @return {Array|null}
   */
  getErrors() {
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
  getModel() {
    return this.props.model;
  },

  /**
   * Save grid changes
   */
  async save() {
    const errors = this.getErrors();

    // Collect all valid changes
    const changes = reduce(this.state.changes, (result, rowChanges, row) => {
      if (!errors || !errors[row]) {
        if (this.props.saveFullRecord) {
          result[row] = this._getRecordWithChanges(row);
        } else {
          result[row] = {};
          Object.assign(result[row], rowChanges, pick(
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
    const data = await this.props.model.update(this._dataObjectToArray(changes));
    if (!this._isMounted) {
      return;
    }

    this.state.partialErrorChecking = false;

    const unhandledErrors = [];
    for (const record of data) {
      const row = this._getRowID(record[0]);

      // Skip records that are user changed while data processing
      if (!isEqual(this.state.changes[row], changes[row])) {
        continue;
      }

      if (record[1] instanceof Error) {
        unhandledErrors.push(record[1]);
        continue;
      }

      // Process validation errors
      if (record[1] instanceof ValidationErrors) {
        this.state.errors[row] = record[1];
        continue;
      }

      // Cancel changed data status of the parameters, that are changed
      forEach(changes[row], function (value, field) {
        if (isEqual(value, this.state.changes[row][field])) {
          delete this.state.changes[row][field];
        }
      }, this);

      // Clear changed data row if it's empty
      if (isEmpty(this.state.changes[row])) {
        delete this.state.changes[row];
        if (!this._isMainRow(row)) {
          this._removeRecord(row);
        }
      }
    }
    this._renderBody();

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }

    const errorHandler = this.props.onError || console.error.bind(console);
    unhandledErrors.forEach(error => errorHandler(error));

    return data;
  },

  /**
   * Clear record changes
   *
   * @param {*} recordId Record ID
   */
  clearRecordChanges(recordId) {
    const row = this._getRowID(recordId);

    delete this.state.changes[row];
    delete this.state.warnings[row];
    delete this.state.errors[row];

    this._updateRow(row);

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Clear all table changes
   */
  clearAllChanges() {
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

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Reset to initial table state
   */
  reset() {
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
  _getRecordChanges(row) {
    if (this.state.changes.hasOwnProperty(row)) {
      return cloneDeep(this.state.changes[row]);
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
  _setRecordData(recordId, data) {
    if (!this._isRecordLoaded(recordId)) {
      return;
    }

    // TODO done through _dataArrayToObject
    const row = this._getRowID(recordId);

    // Apply and redraw all record changes
    for (const field in data) {
      this.state.data[row][field] = cloneDeep(data[field]);
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
  _hasWarning(row, fields) {
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
  _hasError(row, fields) {
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
  _checkFieldInValidation(row, fields, validation) {
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
  _isChanged(row, fields) {
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
  _getRecordErrors(row) {
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
  _setRowChanges(row, data) {
    const changes = this.state.changes;

    if (!changes[row]) {
      changes[row] = {};
    }

    changes[row] = getRecordChanges(this.props.model, this.state.data[row], changes[row], data);

    if (isEmpty(changes[row])) {
      delete changes[row];
    }

    for (const column of Object.keys(data)) {
      this._renderBinds(row, column);
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  /**
   * Get table record with changes
   *
   * @param {string} row Row ID
   * @returns {Object} Required table data record
   * @private
   */
  _getRecordWithChanges(row) {
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
  async _setData(changes) {
    // Apply all changes
    for (const [id, data] of changes) {
      // Firstly we update the state
      this._setRecordData(id, data);
      // Then we validate the updated data in state
      try {
        await this._checkWarnings(id);
      } catch (e) {
        if (!(e instanceof ThrottleError)) {
          throw e;
        }
      }
    }
  },

  /**
   * Get record field title that changes column Editor
   *
   * @param       {string}        id  Column ID
   * @returns     {Array|string}     Fields that change Editor
   * @private
   */
  _getBindParam(id) {
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
      row = toEncodedString(arr[i][0]);
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
  _dataObjectToArray(obj) {
    let i;
    const arr = [];

    for (i in obj) {
      arr.push([
        this.state.recordsInfo[i].id,
        clone(obj[i])
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
  _isMainRow(row) {
    return this.state.mainIds.indexOf(row) >= 0;
  },

  _isRecordLoaded(recordId) {
    // TODO Can be optimized
    const row = toEncodedString(recordId);
    return this.state.data.hasOwnProperty(row);
  },

  /**
   * Get table row ID having record ID
   *
   * @param   {*}       recordId    Record ID
   * @return  {string}  Row ID
   * @private
   */
  _getRowID(recordId) {
    const row = toEncodedString(recordId);

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
  async _loadData(settings) {
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
  _getAdditionalIds() {
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

  _removeRecord(rowId, cb) {
    const touchedChanges = this.state.changes[rowId];
    this._removeTR(rowId);
    // this.unselectRecord(recordId, true); // TODO Make unselectRecord by rowId method
    delete this.state.data[rowId];
    delete this.state.recordsInfo[rowId];
    delete this.state.changes[rowId];
    delete this.state.warnings[rowId];
    delete this.state.errors[rowId];
    delete this.state.editor[rowId];
    this.setState(this.state, cb ? cb.bind(this) : null);

    if (touchedChanges && this.props.onChange) {
      this.props.onChange(this.state.changes, this.state.data);
    }
  },

  async _checkWarnings(row) {
    if (!this.props.warningsValidator) {
      return;
    }
    return this._checkValidatorErrors(
      row,
      this.props.warningsValidator,
      this._getRecordWithChanges,
      this.state.warnings
    );
  },

  async _validateRow(row) {
    return await this._checkValidatorErrors(row, this.props.model, this._getRecordChanges, this.state.errors);
  },

  /**
   * Check errors in "validator" object
   *
   * @param {string}        row         Row ID
   * @param {Validator}     validator   Validator object
   * @param {Function}      getData     Data provider function
   * @param {{}}            result      Validation result object
   * @private
   */
  async _checkValidatorErrors(row, validator, getData, result) {
    const recordId = this.state.recordsInfo[row].id;
    const record = getData(row);

    const validErrors = await validator.isValidRecord(record, recordId);

    if (isEqual(record, getData(row))) {
      if (validErrors.isEmpty()) {
        delete result[row];
      } else {
        result[row] = validErrors;
      }

      await this._updateRow(row);
    }
  },

  /**
   * Handler for "create" event of GridModel
   *
   * @param {*[]|*} recordIds
   * @return {void}
   * @private
   */
  _onRecordsCreated(recordIds) {
    if (!Array.isArray(recordIds)) {
      warn('Not array recordsIds in "create" event is deprecated');
      recordIds = [recordIds];
    }

    this.updateTable().then(
      Promise.all(
        recordIds.map(async recordId => {
          if (!this._isRecordLoaded(recordId)) {
            return;
          }

          const rowId = this._getRowID(recordId);
          try {
            await this._checkWarnings(rowId);
          } catch (e) {
            if (!(e instanceof ThrottleError)) {
              throw e;
            }
          }
        })
      )
    );
  }
};

export default GridDataMixin;
