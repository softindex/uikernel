/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import React from 'react';
import utils from '../../common/utils';

const GridSortingMixin = {
  /**
   * Sort by column
   *
   * @param {string} column
   * @param {string} direction
   */
  sort: function (column, direction) {
    if (this._isSortingPropsMode()) {
      throw Error('You can not use function "sort" when set prop "sort"');
    }

    const sort = {
      column: column,
      direction: direction
    };

    if (this.props.multipleSorting) {
      this.state.sort.push(sort);
    } else {
      this.state.sort = sort;
    }

    this.setPage(0);

    if (this.props.onSorting) {
      this.props.onSorting(this.state.sort, column, direction);
    }
  },

  /**
   * Get sort direction
   *
   * @return {object|object[]}
   */
  getSortDirection: function () {
    if (this._isSortingPropsMode()) {
      return this.props.sort;
    }
    return this.state.sort;
  },

  /**
   * Reset to default sort parameters
   */
  resetSorting: function () {
    if (this._isSortingPropsMode()) {
      throw Error('You can not use function "resetSorting" when set prop "sort"');
    }

    this._resetSorting();
    this.forceUpdate();
  },

  /**
   * Reset to default sort parameters
   * @private
   */
  _resetSorting: function () {
    const sort = this._getDefaultSort();

    if (this._isSortingPropsMode()) {
      this.onSorting(sort);
      return;
    }

    this.state.sort = sort;
  },

  /**
   * Use column name for table sort
   *
   * @param {string} column  Column name
   * @private
   */
  _sortCol: function (column) {
    let newOrder;
    const cycle = this.props.cols[column].sortCycle;
    let newSorts = utils.clone(this.getSortDirection());
    const sortElement = {column: column};
    let currentSortIndex;
    let currentSort;

    if (this.props.multipleSorting) {
      // Find an element among the other sorts
      currentSortIndex = utils.findIndex(newSorts, sort => sort.column === column);

      if (currentSortIndex >= 0) {
        currentSort = newSorts[currentSortIndex];

        // Determine the direction of sorting
        if (currentSortIndex < newSorts.length - 1) {
          newOrder = cycle[0];
        } else {
          // If the item is the last one, select the next direction of sorting
          newOrder = cycle[(cycle.indexOf(currentSort.direction) + 1) % cycle.length];
        }

        if (newOrder === 'default') {
          // Remove item from the sorts
          newSorts.splice(currentSortIndex, 1);
        } else if (currentSortIndex === newSorts.length - 1) {
          // Set new direction, if the last element
          currentSort.direction = newOrder;
        } else {
          // Move the item to the end, if it is already in sorts
          newSorts.splice(currentSortIndex, 1);
          sortElement.direction = newOrder;
          newSorts.push(sortElement);
        }
      } else {
        // Add new element
        sortElement.direction = newOrder = cycle[0];
        newSorts.push(sortElement);
      }
    } else {
      if (newSorts && newSorts.column === column) {
        // Select the next direction of sorting
        newOrder = cycle[(cycle.indexOf(newSorts.direction) + 1) % cycle.length];
      } else {
        newOrder = cycle[0];
      }
      if (newOrder === 'default') {
        newSorts = null;
      } else {
        sortElement.direction = newOrder;
        newSorts = sortElement;
      }
    }

    if (this.props.onSorting) {
      this.props.onSorting(newSorts, column, newOrder);
    }

    if (!this._isSortingPropsMode()) {
      this.state.sort = newSorts;
      this.setPage(0);
    }
  },

  /**
   * Get initial sort state
   *
   * @returns {Array} Initial sort state
   * @private
   */
  _getDefaultSort: function () {
    if (this.props.defaultSort) {
      return utils.cloneDeep(this.props.defaultSort);
    }
    return null;
  },

  /**
   * Get current mode and column sort parameter
   *
   * @param   column                                  Column ID
   * @returns {{field: {string}, sort: {string}}|{}}  Sort parameter and mode
   * @private
   */
  _getSortParams: function (column) {
    const params = {column: column};
    const sorts = this.getSortDirection();
    let sortIndex;

    if (!this.props.cols[column].sortCycle) {
      return null;
    }

    if (!sorts) {
      params.direction = 'default';
      return params;
    }

    if (this.props.multipleSorting) {
      sortIndex = utils.findIndex(sorts, sort => sort.column === params.column);

      if (sortIndex < 0 || sortIndex < sorts.length - 1) {
        params.direction = 'default';
      } else {
        params.direction = sorts[sortIndex].direction;
      }
      return params;
    }

    if (sorts.column === column) {
      params.direction = sorts.direction;
    } else {
      params.direction = 'default';
    }

    return params;
  },

  /**
   * Does sorting using props
   *
   * @return {boolean}
   * @private
   */
  _isSortingPropsMode: function () {
    return this.props.hasOwnProperty('sort');
  },

  /**
   * Convert sorting to array
   *
   * @return {Object[]|Object} sorts
   * @private
   */
  _sortingToArray: function () {
    function toArray(sort) {
      return [sort.column, sort.direction];
    }

    const direction = this.getSortDirection();
    if (!direction) {
      return null;
    }

    if (this.props.multipleSorting) {
      if (!direction.length) {
        return null;
      }
      return direction.map(toArray);
    }

    return [toArray(direction)];
  }
};

export default GridSortingMixin;
