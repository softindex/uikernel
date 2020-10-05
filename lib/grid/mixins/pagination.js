"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridPaginationMixin = {
  /**
   * Change event handler of displayed rows count in a table
   *
   * @param {Event} event
   */
  handleChangeViewCount: function handleChangeViewCount(event) {
    var count = this.props.viewVariants[event.target.value];

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
  handleFirstPage: function handleFirstPage(event) {
    event.preventDefault();
    this.setPage(0);
  },

  /**
   * Move to last page event handler
   *
   * @param {Event} event
   */
  handleLastPage: function handleLastPage(event) {
    event.preventDefault();
    this.setPage(this.getPagesCount() - 1);
  },

  /**
   * Move to previous page event handler
   *
   * @param {Event} event
   */
  handlePrevPage: function handlePrevPage(event) {
    event.preventDefault();
    this.setPage(this.state.page - 1);
  },

  /**
   * Move to next page event handler
   *
   * @param {Event} event
   */
  handleNextPage: function handleNextPage(event) {
    event.preventDefault();
    this.setPage(this.state.page + 1);
  },

  /**
   * Refresh table handler
   *
   */
  handleRefreshTable: function handleRefreshTable(event) {
    event.preventDefault();
    this.updateTable();
  },

  /**
   * Get current page index number
   *
   * @return {number}
   */
  getCurrentPage: function getCurrentPage() {
    return this.state.page;
  },
  getCountRecords: function getCountRecords() {
    return this.state.count;
  },

  /**
   * Move to other page
   *
   * @param {number}  page     Page index number
   */
  setPage: function setPage(page) {
    this._setPage(page);

    this.updateTable();
  },

  /**
   * Set displayed elements count
   *
   * @param {number} viewCount
   */
  setViewCount: function setViewCount(viewCount) {
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
  getPagesCount: function getPagesCount() {
    var viewCount = this.getViewCount();
    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
  },
  getViewCount: function getViewCount() {
    if (this._isViewCountPropsMode()) {
      return this.props.viewCount;
    }

    return this.state.viewCount;
  },
  _setPage: function _setPage(page) {
    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
  },
  _checkPage: function _checkPage(page, view, count) {
    if (page * view >= count) {
      page = view ? Math.ceil(count / view) - 1 : 0;
    }

    return Math.max(0, page);
  },
  _isViewCountPropsMode: function _isViewCountPropsMode() {
    return this.props.hasOwnProperty('viewCount');
  },
  _renderPagination: function _renderPagination() {
    var viewCount = this.getViewCount();
    return Boolean(viewCount) && _react["default"].createElement("div", {
      className: "dgrid-footer"
    }, Boolean(this.props.viewVariants) && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
      key: "0",
      className: "dgrid-pagination-page-size"
    }, " Page Size "), _react["default"].createElement("div", {
      key: "1",
      className: "dgrid-pagination-view-variants"
    }, _react["default"].createElement("select", {
      className: "dgrid-pagination-view-variants-select",
      value: this.props.viewVariants.indexOf(viewCount),
      onChange: this.handleChangeViewCount
    }, this.props.viewVariants.map(function (option, key) {
      return _react["default"].createElement("option", {
        key: key,
        value: key
      }, option);
    }, this)))), _react["default"].createElement("button", {
      "aria-label": "first page",
      className: "btn-first-page",
      onClick: this.handleFirstPage
    }), _react["default"].createElement("button", {
      "aria-label": "prev page",
      className: "btn-prev-page",
      onClick: this.handlePrevPage
    }), Boolean(this.state.count) && _react["default"].createElement("div", null, this.state.page * viewCount + 1, ' - ', Math.min((this.state.page + 1) * viewCount, this.state.count), ' of ', this.state.count), _react["default"].createElement("button", {
      "aria-label": "next page",
      className: "btn-next-page",
      onClick: this.handleNextPage
    }), _react["default"].createElement("button", {
      "aria-label": "last page",
      className: "btn-last-page",
      onClick: this.handleLastPage
    }), _react["default"].createElement("button", {
      "aria-label": "refresh page",
      className: "btn-refresh-page",
      onClick: this.handleRefreshTable
    }));
  }
};
var _default = GridPaginationMixin;
exports["default"] = _default;
module.exports = exports.default;