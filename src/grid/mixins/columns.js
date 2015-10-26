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
var utils = require('../../common/utils');

var GridColumnsMixin = {
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

  /**
   * Get the names of the parameters that are required to display the grid
   *
   * @return {string[]}
   * @private
   */
  _getFieldsToRender: function () {
    var i;
    var cols = this.props.cols;
    var columns = [];
    for (i in cols) {
      columns = utils.union(columns, cols[i].render.slice(0, cols[i].render.length - 1));
    }
    return columns;
  },

  /**
   * Does the parameters to display grid
   *
   * @param   {string}  field
   * @return  {boolean}
   * @private
   */
  _isFieldAffectsRender: function (field) {
    var i;
    var cols = this.props.cols;
    for (i in cols) {
      if (cols[i].render.indexOf(field) >= 0) {
        return true;
      }
    }
    return false;
  },

  /**
   * Get a dependent column
   *
   * @param   {string}    field
   * @return  {string[]}
   * @private
   */
  _getDependentColumns: function (field) {
    var i;
    var cols = this.props.cols;
    var columns = [];

    for (i in cols) {
      if (cols[i].render.indexOf(field) < 0) {
        continue;
      }
      columns.push(i);
    }
    return columns;
  },

  _getColumnClass: function (id) {
    return this.props.cols[id].className;
  }
};

module.exports = GridColumnsMixin;
