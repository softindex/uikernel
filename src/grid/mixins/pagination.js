/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const GridPaginationMixin = {
  /**
   * Change event handler of displayed rows count in a table
   *
   * @param {Event} event
   */
  handleChangeViewCount: function (event) {
    const count = this.props.viewVariants[event.target.value];
    if (this._isViewCountPropsMode()) {
      this.props.onChangeViewCount(count);
      return;
    }
    this.setViewCount(count);
  },

  /**
   * Move to first page event handler
   *
   * @param {Event} event
   */
  handleFirstPage: function (event) {
    event.preventDefault();
    this.setPage(0);
  },

  /**
   * Move to last page event handler
   *
   * @param {Event} event
   */
  handleLastPage: function (event) {
    event.preventDefault();
    this.setPage(this.getPagesCount() - 1);
  },

  /**
   * Move to previous page event handler
   *
   * @param {Event} event
   */
  handlePrevPage: function (event) {
    event.preventDefault();
    this.setPage(this.state.page - 1);
  },

  /**
   * Move to next page event handler
   *
   * @param {Event} event
   */
  handleNextPage: function (event) {
    event.preventDefault();
    this.setPage(this.state.page + 1);
  },

  /**
   * Refresh table handler
   *
   */
  handleRefreshTable: function (event) {
    event.preventDefault();
    this.updateTable();
  },

  /**
   * Get current page index number
   *
   * @return {number}
   */
  getCurrentPage: function () {
    return this.state.page;
  },

  getCountRecords: function () {
    return this.state.count;
  },

  /**
   * Move to other page
   *
   * @param {number}  page     Page index number
   */
  setPage: function (page) {
    this._setPage(page);
    this.updateTable();
  },

  /**
   * Set displayed elements count
   *
   * @param {number} viewCount
   */
  setViewCount: function (viewCount) {
    if (this._isViewCountPropsMode()) {
      throw Error('You can not use function "setViewCount" when set prop "viewCount"');
    }

    this.state.viewCount = viewCount;
    this.state.page = this._checkPage(this.state.page, viewCount, this.state.count);
    this.updateTable();
  },

  /**
   * Get pages count
   *
   * @return {number}
   */
  getPagesCount: function () {
    const viewCount = this.getViewCount();
    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
  },

  getViewCount: function () {
    if (this._isViewCountPropsMode()) {
      return this.props.viewCount;
    }
    return this.state.viewCount;
  },

  _setPage: function (page) {
    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
  },

  _checkPage: (page, view, count) => {
    if (page * view >= count) {
      page = view ? Math.ceil(count / view) - 1 : 0;
    }
    return Math.max(0, page);
  },

  _isViewCountPropsMode: function () {
    return this.props.hasOwnProperty('viewCount');
  },

  _renderPagination: function _renderPagination() {
    const viewCount = this.getViewCount();
    return viewCount ? (
      <div className="dgrid-footer">
        {this.props.viewVariants ? [
          <div key="0">Page Size</div>,
          <div key="1">
            <select
              value={this.props.viewVariants.indexOf(viewCount)}
              onChange={this.handleChangeViewCount}
            >
              {this.props.viewVariants.map((option, key) => <option key={key} value={key}>{option}</option>, this)}
            </select>
          </div>
        ] : null}
        <a href="#" className="btn-first-page" onClick={this.handleFirstPage}/>
        <a href="#" className="btn-prev-page" onClick={this.handlePrevPage}/>
        {this.state.count ? (
          <div>
            {(this.state.page * viewCount) + 1}
            {' - '}
            {Math.min(
              (this.state.page + 1) * viewCount,
              this.state.count
            )}
            {' of '}
            {this.state.count}
          </div>
        ) : null}
        <a href="#" className="btn-next-page" onClick={this.handleNextPage}/>
        <a href="#" className="btn-last-page" onClick={this.handleLastPage}/>
        <a href="#" className="btn-refresh-page" onClick={this.handleRefreshTable}/>
      </div>
    ) : null;
  }
};

export default GridPaginationMixin;
