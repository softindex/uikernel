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

/**
 * Grid mixin, responsible for row statuses processing
 */
var GridStatusesMixin = {
  getInitialState: function () {
    return {
      statusMap: {
        new: 1 << 0
      },
      statuses: {}
    };
  },

  /**
   * Add record status
   *
   * @param {*}    recordId    Record ID
   * @param {string}           status      Record status
   */
  addRecordStatus: function (recordId, status) {
    var row = utils.hash(recordId);

    // If list does not contain the record, mark its status as empty
    if (!this.state.statuses.hasOwnProperty(row)) {
      this.state.statuses[row] = {
        id: recordId,
        sum: 0
      };
    }

    this.state.statuses[row].sum |= this._getStatusBit(status);

    this._updateRow(row);
  },

  /**
   * Add status to records group
   *
   * @param {Array}      group   Record IDs array
   * @param {string}     status  Status
   */
  addRecordStatusGroup: function (group, status) {
    var i;
    var bit = this._getStatusBit(status);
    var row;

    for (i in group) {
      row = utils.hash(group[i]);
      if (!this.state.statuses.hasOwnProperty(row)) {
        this.state.statuses[row] = {
          id: group[i],
          sum: 0
        };
      }
      this.state.statuses[row].sum |= bit;
    }

    // TODO You can do without a full page reload
    this.updateTable();
  },

  /**
   * Remove record status
   *
   * @param {*}       recordId    Record ID
   * @param {string}  status      Record status
   */
  removeRecordStatus: function (recordId, status) {
    var bit = this._getStatusBit(status);
    var row = utils.hash(recordId);

    // Cancel method execution if record has no statuses
    if (!this.state.statuses[row]) {
      return;
    }

    // Remove status if record has it
    if (this.state.statuses[row].sum & bit) {
      this.state.statuses[row].sum ^= bit;
      if (!this.state.statuses[row].sum) {
        // Remove table record if it's extra
        if (!this._isMainRow(row)) {
          this._removeRecord(row);
        }
        delete this.state.statuses[row];
      }
    }

    // Remove element's class
    $(this.refs.body.getDOMNode())
      .find('tr[key=' + row + ']')
      .removeClass(status);
  },

  /**
   * Check record status presence
   *
   * @param   {*}       recordId    Record ID
   * @param   {number}  status      Record status
   * @returns {boolean} Record has status flag
   */
  isStatus: function (recordId, status) {
    var row = utils.hash(recordId);
    if (this.state.statuses[row]) {
      return this.state.statuses[row].sum & this._getStatusBit(status) > 0;
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
    var i;
    var records = [];
    var bit = this._getStatusBit(status);

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
    var i;
    var bit = this._getStatusBit(status);

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
    $(this.refs.body.getDOMNode())
      .find('.dgrid-body tr.' + status)
      .removeClass(status);
  },

  /**
   * Get all status names that are applyed to the row
   *
   * @param   {string}    row    Row ID
   * @return  {Array}  Status names array
   * @private
   */
  _getRowStatusNames: function (row) {
    var i;
    var names = [];
    var statuses = this.state.statuses[row] && this.state.statuses[row].sum;

    if (!statuses) {
      return [];
    }

    for (i in this.state.statusMap) {
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
    var status;
    var offset;

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
    var ids = [];
    var i;

    for (i in this.state.statuses) {
      ids.push(this.state.statuses[i].id);
    }
    return ids;
  }
};

module.exports = GridStatusesMixin;
