/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../common/utils';
import {findDOMNode} from 'react-dom';

/**
 * Grid mixin, responsible for row statuses processing
 */
const GridStatusesMixin = {

  /**
   * Add record status
   *
   * @param {*}    recordId    Record ID
   * @param {string}           status      Record status
   */
  addRecordStatus: function (recordId, status) {
    const row = utils.toEncodedString(recordId);

    // If list does not contain the record, mark its status as empty
    if (!this.state.statuses.hasOwnProperty(row)) {
      this.state.statuses[row] = {
        id: recordId,
        sum: 0
      };
    }

    this.state.statuses[row].sum |= this._getStatusBit(status);

    const elem = findDOMNode(this.body).querySelector(`tr[key="${row}"]`);
    if (elem) {
      elem.classList.add(status);
    } else {
      this.updateTable();
    }
  },

  /**
   * Add status to records group
   *
   * @param {Array}      recordIds   Record IDs array
   * @param {string}     status      Status
   */
  addRecordStatusGroup: function (recordIds, status) {
    const bit = this._getStatusBit(status);
    let needTableUpdate;

    for (const id of recordIds) {
      const row = utils.toEncodedString(id);

      if (!this.state.statuses.hasOwnProperty(row)) {
        this.state.statuses[row] = {
          id,
          sum: 0
        };
      }

      this.state.statuses[row].sum |= bit;

      if (this.state.data[row]) {
        this._updateRow(row);
        continue;
      }

      needTableUpdate = true;
    }

    if (needTableUpdate) {
      this.updateTable();
    }
  },

  /**
   * Remove record status
   *
   * @param {*}       recordId    Record ID
   * @param {string}  status      Record status
   */
  removeRecordStatus: function (recordId, status) {
    const bit = this._getStatusBit(status);
    const rowId = utils.toEncodedString(recordId);

    // Cancel method execution if record has no statuses
    if (!this.state.statuses[rowId]) {
      return;
    }

    // Remove status if record has it
    if (this.state.statuses[rowId].sum & bit) {
      this.state.statuses[rowId].sum ^= bit;
      if (!this.state.statuses[rowId].sum) {
        // Remove table record if it's extra
        if (!this._isMainRow(rowId)) {
          this._removeRecord(rowId);
        }
        delete this.state.statuses[rowId];
      }
    }

    // Remove element's class
    const elem = findDOMNode(this.body).querySelector(`tr[key="${rowId}"]`);
    if (elem) {
      elem.classList.remove(status);
    }
  },

  /**
   * Check record status presence
   *
   * @param   {*}       recordId    Record ID
   * @param   {number}  status      Record status
   * @returns {boolean} Record has status flag
   */
  hasRecordStatus: function (recordId, status) {
    const row = utils.toEncodedString(recordId);
    if (this.state.statuses[row]) {
      return (this.state.statuses[row].sum & this._getStatusBit(status)) > 0;
    }
    return false;
  },

  /**
   * Get all record IDs that have the status
   *
   * @param {number}  status  Status
   * @returns {Array} Record IDs array
   */
  getAllWithStatus: function (status) {
    let i;
    const records = [];
    const bit = this._getStatusBit(status);

    for (i in this.state.statuses) {
      if (this.state.statuses[i].sum & bit) {
        records.push(this.state.statuses[i].id);
      }
    }
    return records;
  },

  /**
   * Remove records status
   *
   * @param {string}      status  Status
   */
  removeRecordStatusAll: function (status) {
    let i;
    const bit = this._getStatusBit(status);

    for (i in this.state.statuses) {
      if (this.state.statuses[i].sum & bit) {
        this.state.statuses[i].sum ^= bit;
      }
      if (!this.state.statuses[i].sum) {
        if (!this._isMainRow(i) && !this._isChanged(i)) {
          this._removeRecord(i);
        }
        delete this.state.statuses[i];
      }
    }
    const elem = findDOMNode(this.body).querySelector(`.dgrid-body tr.${status}`);
    if (elem) {
      elem.classList.remove(status);
    }
  },

  /**
   * Get all status names that are applied to the row
   *
   * @param   {string}    row    Row ID
   * @return  {Array}  Status names array
   * @private
   */
  _getRowStatusNames: function (row) {
    const names = [];
    const statuses = this.state.statuses[row] && this.state.statuses[row].sum;

    if (!statuses) {
      return [];
    }

    for (const i in this.state.statusMap) {
      if (statuses & this.state.statusMap[i]) {
        names.push(i);
      }
    }

    return names;
  },

  /**
   * Get status as a bit using its text name
   *
   * @param       {string}    statusName  Status name
   * @return      {number}    Bit
   * @private
   */
  _getStatusBit: function (statusName) {
    let status;
    let offset;

    if (this.state.statusMap.hasOwnProperty(statusName)) {
      status = this.state.statusMap[statusName];
    } else {
      // TODO offset stored in the state, I remove the utils.size
      offset = utils.size(this.state.statusMap);
      if (offset > 30) {
        throw Error('Status quantity exceeds 30');
      }
      status = this.state.statusMap[statusName] = 1 << offset;
    }

    return status;
  },

  /**
   * Get record IDs that have a status
   *
   * @return {Array}
   * @private
   */
  _getRecordsWithStatus: function () {
    const ids = [];
    let i;

    for (i in this.state.statuses) {
      ids.push(this.state.statuses[i].id);
    }
    return ids;
  }
};

export default GridStatusesMixin;
