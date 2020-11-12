"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../../common/utils");

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Grid mixin, responsible for rows Select
 */
var GridSelectMixin = {
  /**
   * Select only these records
   *
   * @param {Array}   selectedIds       Record IDs
   * @param {boolean} [blackListMode]   Is black list mode
   */
  setSelectedRecords: function setSelectedRecords(selectedIds, blackListMode) {
    this.state.selected = (0, _utils.clone)(selectedIds);

    if (typeof blackListMode === 'boolean') {
      this.state.selectBlackListMode = blackListMode;
    }

    this.forceUpdate();

    this._renderBody();

    this._emitChangeSelectedNum();
  },

  /**
   * Select a record
   *
   * @param {*}    recordId       Record ID
   * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
   */
  selectRecord: function selectRecord(recordId, ignoreBlackList) {
    var _this = this;

    var row = (0, _utils.toEncodedString)(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.unselectRecord(recordId, true);
    }

    if ((0, _utils.indexOf)(this.state.selected, recordId) < 0) {
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

    this._updateRow(row).then(function () {
      _this._emitChangeSelectedNum();
    });
  },

  /**
   * Unselect record
   *
   * @param {number|string}   recordId                    Record ID
   * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
   */
  unselectRecord: function unselectRecord(recordId, ignoreBlackList) {
    var _this2 = this;

    var row = (0, _utils.toEncodedString)(recordId);

    if (this.state.selectBlackListMode && !ignoreBlackList) {
      return this.selectRecord(recordId, true);
    }

    var pos = (0, _utils.indexOf)(this.state.selected, recordId);

    if (pos >= 0) {
      this.state.selected.splice(pos, 1);
    }

    this._updateRow(row).then(function () {
      _this2._emitChangeSelectedNum();
    });
  },

  /**
   * Is selected row flag in accordance with
   * current select mode (whitelist/blacklist).
   *
   * @param   {number|string}     recordId    Record ID
   * @returns {boolean}           Is selected row flag
   */
  isSelected: function isSelected(recordId) {
    var selected = (0, _utils.indexOf)(this.state.selected, recordId) >= 0;

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
  toggleSelected: function toggleSelected(recordId) {
    if (this.props.onToggleSelected) {
      return this.props.onToggleSelected(recordId);
    }

    if (this.isSelected(recordId)) {
      this.unselectRecord(recordId);
    } else {
      this.selectRecord(recordId);
    }
  },

  /**
   * Switch records selection mode
   */
  toggleSelectAll: function toggleSelectAll() {
    if (this.props.onToggleSelectAll) {
      return this.props.onToggleSelectAll();
    }

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
  selectAll: function selectAll() {
    this.state.selectBlackListMode = true;
    this.state.selected = [];

    this._renderBody();

    this._emitChangeSelectedNum();
  },

  /**
   * Unselect all records status
   * Switches records selection mode to "whitelist"
   */
  unselectAll: function unselectAll() {
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
  isSelectBlackMode: function isSelectBlackMode() {
    return this.state.selectBlackListMode;
  },

  /**
   * Get all selected records
   *
   * @returns {Array}   Record IDs array
   */
  getAllSelected: function getAllSelected() {
    return (0, _utils.clone)(this.state.selected);
  },
  getSelectAllStatus: function getSelectAllStatus() {
    return this.props.selectAllStatus;
  },

  /**
   * Trigger selected records count change handler
   *
   * @private
   */
  _emitChangeSelectedNum: function _emitChangeSelectedNum() {
    if (this.props.onSelectedChange) {
      var selectedCount = this.state.selected.length;

      if (this.state.selectBlackListMode) {
        selectedCount = this.getCountRecords() - selectedCount;
      }

      this.props.onSelectedChange(this.getAllSelected(), selectedCount);
    }
  }
};
var _default = GridSelectMixin;
exports["default"] = _default;
module.exports = exports.default;