"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../../common/utils"));

var _reactDom = require("react-dom");

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Grid mixin, responsible for row statuses processing
 */
var GridStatusesMixin = {
  /**
   * Add record status
   *
   * @param {*}    recordId    Record ID
   * @param {string}           status      Record status
   */
  addRecordStatus: function addRecordStatus(recordId, status) {
    var row = _utils.default.toEncodedString(recordId); // If list does not contain the record, mark its status as empty


    if (!this.state.statuses.hasOwnProperty(row)) {
      this.state.statuses[row] = {
        id: recordId,
        sum: 0
      };
    }

    this.state.statuses[row].sum |= this._getStatusBit(status);
    var elem = (0, _reactDom.findDOMNode)(this.body).querySelector("tr[key=\"".concat(row, "\"]"));

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
  addRecordStatusGroup: function addRecordStatusGroup(recordIds, status) {
    var bit = this._getStatusBit(status);

    var needTableUpdate;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = recordIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;

        var row = _utils.default.toEncodedString(id);

        if (!this.state.statuses.hasOwnProperty(row)) {
          this.state.statuses[row] = {
            id: id,
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
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
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
  removeRecordStatus: function removeRecordStatus(recordId, status) {
    var bit = this._getStatusBit(status);

    var rowId = _utils.default.toEncodedString(recordId); // Cancel method execution if record has no statuses


    if (!this.state.statuses[rowId]) {
      return;
    } // Remove status if record has it


    if (this.state.statuses[rowId].sum & bit) {
      this.state.statuses[rowId].sum ^= bit;

      if (!this.state.statuses[rowId].sum) {
        // Remove table record if it's extra
        if (!this._isMainRow(rowId)) {
          this._removeRecord(rowId);
        }

        delete this.state.statuses[rowId];
      }
    } // Remove element's class


    var elem = (0, _reactDom.findDOMNode)(this.body).querySelector("tr[key=\"".concat(rowId, "\"]"));

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
  hasRecordStatus: function hasRecordStatus(recordId, status) {
    var row = _utils.default.toEncodedString(recordId);

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
  getAllWithStatus: function getAllWithStatus(status) {
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
  removeRecordStatusAll: function removeRecordStatusAll(status) {
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

    var elem = (0, _reactDom.findDOMNode)(this.body).querySelector(".dgrid-body tr.".concat(status));

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
  _getRowStatusNames: function _getRowStatusNames(row) {
    var names = [];
    var statuses = this.state.statuses[row] && this.state.statuses[row].sum;

    if (!statuses) {
      return [];
    }

    for (var i in this.state.statusMap) {
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
  _getStatusBit: function _getStatusBit(statusName) {
    var status;
    var offset;

    if (this.state.statusMap.hasOwnProperty(statusName)) {
      status = this.state.statusMap[statusName];
    } else {
      // TODO offset stored in the state, I remove the utils.size
      offset = _utils.default.size(this.state.statusMap);

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
  _getRecordsWithStatus: function _getRecordsWithStatus() {
    var ids = [];
    var i;

    for (i in this.state.statuses) {
      ids.push(this.state.statuses[i].id);
    }

    return ids;
  }
};
var _default = GridStatusesMixin;
exports.default = _default;
module.exports = exports.default;