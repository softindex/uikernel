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

var GridPaginationMixin = {
  getInitialState: function () {
    return {
      page: this.props.page || 0,
      viewCount: this.props.viewCount || 0,
      count: 0
    };
  },

  /**
   * Change event handler of displayed rows count in a table
   *
   * @param {Event} event
   */
  handleChangeViewCount: function (event) {
    this.setViewCount(event.target.value);
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
    return Math.ceil(this.state.count / this.state.viewCount);
  },

  _setPage: function (page) {
    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
  },

  _checkPage: function (page, view, count) {
    page = page * view >= count ? Math.ceil(count / view) - 1 : page;
    return page < 0 || !page ? 0 : page;
  },

  _renderPagination: function () {
    return this.props.viewCount ? (
      <div className="dgrid-footer">
        {this.props.viewVariants ? [
          <div key="0">Page Size</div>,
          <div key="1">
            <select value={this.state.viewCount}
              onChange={this.handleChangeViewCount}>
                {this.props.viewVariants.map(function (option, key) {
                  return <option key={key} value={option}>{option}</option>;
                }, this)}
            </select>
          </div>
        ] : null}
        <a href="#" className="btn-first-page" onClick={this.handleFirstPage}></a>
        <a href="#" className="btn-prev-page" onClick={this.handlePrevPage}></a>
        {this.state.count ? (function () {
          return (
            <div>
              {(this.state.page * this.state.viewCount) + 1}
              {' - '}
              {Math.min(
                (this.state.page + 1) * this.state.viewCount,
                this.state.count
              )}
              {' of '}
              {this.state.count}
            </div>
          );
        }).call(this) : null}
        <a href="#" className="btn-next-page" onClick={this.handleNextPage}></a>
        <a href="#" className="btn-last-page" onClick={this.handleLastPage}></a>
      </div>
    ) : null;
  }
};

module.exports = GridPaginationMixin;
