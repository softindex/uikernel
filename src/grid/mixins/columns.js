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

var React = require('react');

var GridColumnsMixin = {
  getInitialState: function () {
    return {
      // Columns and parameters they depend on binding
      confBinds: this._getBindsConfig()
    };
  },

  /**
   * Update columns configuration
   *
   * @private
   */
  _updateColumnsConfiguration: function () {
    this.state.confBinds = this._getBindsConfig();
  },

  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn: function (id) {
    if (this.props.viewColumns) {
      return this.props.viewColumns[id];
    }
    return true;
  },

  /**
   * Collect data for table header display
   *
   * @returns {Object} Formed data
   * @private
   */
  _formHeader: function () {
    var columnId;
    var rows = [[/* top */], [/* bottom */]];
    var colGroup = [];
    var lastParent = {name: ''};
    var addInfo;
    var sortParams;

    for (columnId in this.props.cols) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(
        React.DOM.col({
          key: columnId,
          width: this.props.cols[columnId].width,
          className: this._getColumnClass(columnId)
        })
      );

      addInfo = {
        className: this._getColumnClass(columnId),
        name: this.props.cols[columnId].name,
        cols: 1,
        rows: 1
      };

      sortParams = this._getSortParams(columnId);
      if (sortParams) {
        addInfo.className += ' ' + sortParams.direction;
        addInfo.field = sortParams.column;
        addInfo.sort = sortParams.direction;
      }

      if (this.props.cols[columnId].hasOwnProperty('parent')) {
        if (this.props.cols[columnId].parent !== lastParent.name) {
          lastParent = rows[0][rows[0].push({
            name: this.props.cols[columnId].parent,
            cols: 1, rows: 1
          }) - 1];
        } else {
          lastParent.cols++;
        }
        rows[1].push(addInfo);
      } else {
        lastParent = {name: ''};
        addInfo.rows = 2;
        rows[0].push(addInfo);
      }
    }
    return {cols: rows, colGroup: colGroup};
  },

  _getBindsConfig: function () {
    var i;
    var j;
    var byParams = {};
    var byCols = {};
    var bind;
    var cols = this.props.cols;

    for (i in cols) {
      bind = cols[i].render.slice(0, cols[i].render.length - 1);
      for (j = 0; j < bind.length; j++) {
        if (!byParams[bind[j]]) {
          byParams[bind[j]] = [];
        }
        byParams[bind[j]].push(i);
      }
      byCols[i] = bind;
    }
    return {params: byParams, cols: byCols};
  },

  _getColumnClass: function (id) {
    return this.props.cols[id].className;
  }
};

module.exports = GridColumnsMixin;
