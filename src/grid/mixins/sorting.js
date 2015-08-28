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

var GridSortingMixin = {
  getInitialState: function () {
    return {
      confSort: this._getSortConfig(),
      sort: this._getDefaultSort()
    };
  },

  /**
   * Reset to default sort parameters
   */
  resetSorting: function () {
    this._resetSorting();
    this.forceUpdate();
  },
  _resetSorting: function () {
    this.state.confSort = this._getSortConfig();
    this.state.sort = this._getDefaultSort();
  },

  /**
   * Use parameter name for table sort
   *
   * @param {string} param  Sort parameter name
   * @private
   */
  _sortRow: function (param) {
    var i;
    var newOrder;
    var cycle = this.state.confSort[param];
    var sorts = this.state.sort;
    var inQueue = false;

    if (this.props.multipleSorting) {
      for (i = 0; i < sorts.length; i++) {
        if (sorts[i][0] === param) {
          inQueue = true;
          newOrder = i === sorts.length - 1 ?
            cycle[(cycle.indexOf(sorts[i][1]) + 1) % cycle.length] :
            cycle[0];
          if (newOrder === 'default') {
            sorts.splice(i, 1);
          } else if (i === sorts.length - 1) {
            sorts[i][1] = newOrder;
          } else {
            sorts.splice(i, 1);
            sorts.push([param, newOrder]);
          }
          break;
        }
      }
      if (!inQueue) {
        sorts.push([param, cycle[0]]);
      }
    } else {
      sorts = [[
        param,
        sorts[0] && sorts[0][0] === param ?
          cycle[(cycle.indexOf(sorts[0][1]) + 1) % cycle.length] :
          cycle[0]
      ]];
    }

    this.state.sort = sorts;

    this.updateTable();
  },

  /**
   * Get current column sort parameter name
   *
   * @param {number} id           Column ID
   * @returns {string|undefined}  Param name
   * @private
   */
  _getSortParam: function (id) {
    return this.props.cols[id].hasOwnProperty('sortCycle') && (this.props.cols[id].sortField || id);
  },

  /**
   * Get sort configuration object
   *
   * @returns {object} Sort configuration
   * @private
   */
  _getSortConfig: function () {
    var sortConfig = {};
    var sortParam;
    var i;
    for (i in this.props.cols) {
      sortParam = this._getSortParam(i);
      if (sortParam) {
        sortConfig[sortParam] = this.props.cols[i].sortCycle;
      }
    }
    return sortConfig;
  },

  /**
   * Get initial sort state
   *
   * @returns {Array} Initial sort state
   * @private
   */
  _getDefaultSort: function () {
    var sort = [];
    var i;
    for (i in this.props.cols) {
      if (this.props.cols[i].sortDefault) {
        sort.push([this._getSortParam(i), this.props.cols[i].sortDefault]);
        if (!this.props.multipleSorting) {
          break;
        }
      }
    }
    return sort;
  },

  /**
   * Get current mode and column sort parameter
   *
   * @param columnId  Column ID
   * @returns {{field: {string}, sort: {string}}|{}} Sort parameter and mode
   * @private
   */
  _getSortParams: function (columnId) {
    var i;
    var lastSorting;
    var params = {};
    if (this.props.cols[columnId].sortCycle) {
      params.field = this._getSortParam(columnId);
      if (this.props.multipleSorting) {
        for (i = 0; i < this.state.sort.length; i++) {
          if (this.state.sort[i][0] === params.field) {
            break;
          }
        }
        params.sort = i === this.state.sort.length ?
          'default' : this.state.sort[i][1];
      } else {
        // When sort is not multiple, display just the last one
        if (this.state.sort.length) {
          lastSorting = this.state.sort[this.state.sort.length - 1];
          params.sort = lastSorting[0] === params.field ? lastSorting[1] : 'default';
        } else {
          params.sort = 'default';
        }
      }
    }
    return params;
  },

  _getNotDefaultSorts: function () {
    return this.state.sort.reduce(function (result, item) {
      if (item[1] !== 'default') {
        result.push(item);
      }
      return result;
    }, []);
  }
};

module.exports = GridSortingMixin;
