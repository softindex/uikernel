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

import utils from '../../common/utils';

/**
 * Grid mixin, responsible for rows Select
 */
const GridSelectMixin = {
  /**
   * Select only these records
   *
   * @param {Array}   selectedIds       Record IDs
   * @param {boolean} [blackListMode]   Is black list mode
   */
  setSelectedRecords: function (selectedIds, blackListMode) {
    this.state.selected = utils.clone(selectedIds);
    if (typeof blackListMode === 'boolean') {
      this.state.selectBlackListMode = blackListMode;
    }

    this.forceUpdate();
  },

  /**
   * Select a record
   *
   * @param {*}    recordId       Record ID
   * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
   */
  selectRecord: function (recordId, ignoreBlackList) {
    const row = utils.hash(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.unselectRecord(recordId, true);
    }

    if (utils.indexOf(this.state.selected, recordId) < 0) {
      this.state.selected.push(recordId);

      if (this.state.selected.length === this.state.count) {
        if (this.state.selectBlackListMode) {
          this.unselectAll();
        } else {
          this.selectAll();
        }
        return;
      }
    }

    this._updateRow(row, (err) => {
      if (err) {
        throw err;
      }
      this._emitChangeSelectedNum();
    });
  },

  /**
   * Unselect record
   *
   * @param {number|string}   recordId                    Record ID
   * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
   */
  unselectRecord: function (recordId, ignoreBlackList) {
    const row = utils.hash(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.selectRecord(recordId, true);
    }

    const pos = utils.indexOf(this.state.selected, recordId);
    if (pos >= 0) {
      this.state.selected.splice(pos, 1);
    }

    this._updateRow(row, (err) => {
      if (err) {
        throw err;
      }
      this._emitChangeSelectedNum();
    });
  },

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   *
   * @param   {number|string}     recordId    Record ID
   * @returns {boolean}           Is selected row flag
   */
  isSelected: function (recordId) {
    let selected = utils.indexOf(this.state.selected, recordId) >= 0;
    if (this.state.selectBlackListMode) {
      return !selected;
    }
    return selected;
  },

  /**
   * Switch "select"
   *
   * @param {*}   recordId  Record ID
   */
  toggleSelected: function (recordId) {
    if (this.isSelected(recordId)) {
      this.unselectRecord(recordId);
    } else {
      this.selectRecord(recordId);
    }
  },

  /**
   * Switch records selection mode
   */
  toggleSelectAll: function () {
    if (this.state.selectBlackListMode) {
      this.unselectAll();
    } else {
      this.selectAll();
    }
  },

  /**
   * Select all records
   * Switches records selection mode to "blacklist"
   */
  selectAll: function () {
    this.state.selectBlackListMode = true;
    this.state.selected = [];
    this._renderBody();
    this._emitChangeSelectedNum();
  },

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll: function () {
    this.state.selectBlackListMode = false;
    this.state.selected = [];
    this._renderBody();
    this._emitChangeSelectedNum();
  },

  /**
   * Get current records selection mode
   *
   * @returns {boolean} Records selection mode. true - Blacklist; false - Whitelist
   */
  isSelectBlackMode: function () {
    return this.state.selectBlackListMode;
  },

  /**
   * Get all selected records
   *
   * @returns {Array}   Record IDs array
   */
  getAllSelected: function () {
    return utils.clone(this.state.selected);
  },

  _getAllSelected: function () {
    return this.state.selected;
  },

  /**
   * Trigger selected records count change handler
   *
   * @private
   */
  _emitChangeSelectedNum: function () {
    if (this.props.onSelectedChange) {
      let selectedCount = this.state.selected.length;
      if (this.state.selectBlackListMode) {
        selectedCount = this.getCountRecords() - selectedCount;
      }
      this.props.onSelectedChange(this.getAllSelected(), selectedCount);
    }
  }
};

export default GridSelectMixin;
