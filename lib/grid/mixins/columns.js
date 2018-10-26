"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _utils = _interopRequireDefault(require("../../common/utils"));

var _reactDomFactories = _interopRequireDefault(require("react-dom-factories"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var GridColumnsMixin = {
  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn: function _isViewColumn(id) {
    if (!this.props.viewColumns) {
      return true;
    }

    if (Array.isArray(this.props.viewColumns)) {
      return this.props.viewColumns.indexOf(id) > -1;
    }

    return this.props.viewColumns[id];
  },

  /**
   * Collect data for table header display
   *
   * @returns {Object} Formed data
   * @private
   */
  _formHeader: function _formHeader() {
    var rows = [[
      /* top */
    ], [
      /* bottom */
    ]];
    var colGroup = [];
    var lastParent = {
      name: ''
    };

    for (var columnId in this.props.cols) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(_reactDomFactories.default.col({
        key: columnId,
        width: this.props.cols[columnId].width,
        className: this._getColumnClass(columnId)
      }));
      var classNames = [this._getColumnClass(columnId)];
      var addInfo = {
        id: columnId,
        name: this.props.cols[columnId].name,
        onClick: this.props.cols[columnId].onClick,
        onClickRefs: this.props.cols[columnId].onClickRefs,
        cols: 1,
        rows: 1
      };

      var sortParams = this._getSortParams(columnId);

      if (sortParams) {
        classNames.push("dgrid-".concat(sortParams.direction));
        addInfo.field = sortParams.column;
        addInfo.sort = sortParams.direction;
      }

      addInfo.className = classNames.join(' ');

      if (this.props.cols[columnId].parent) {
        if (this.props.cols[columnId].parent !== lastParent.name) {
          lastParent = rows[0][rows[0].push({
            name: this.props.cols[columnId].parent,
            cols: 1,
            rows: 1
          }) - 1];
        } else {
          lastParent.cols++;
        }

        rows[1].push(addInfo);
      } else {
        lastParent = {
          name: ''
        };
        addInfo.rows = 2;
        rows[0].push(addInfo);
      }
    }

    return {
      cols: rows,
      colGroup: colGroup
    };
  },

  /**
   * Get the names of the parameters that are required to display the grid
   *
   * @return {string[]}
   * @private
   */
  _getFieldsToRender: function _getFieldsToRender() {
    var i;
    var cols = this.props.cols;
    var columns = [];

    for (i in cols) {
      columns = _utils.default.union(columns, cols[i].render.slice(0, cols[i].render.length - 1));
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
  _isFieldAffectsRender: function _isFieldAffectsRender(field) {
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
   * Get a dependent columns
   *
   * @param   {string}    field
   * @return  {string[]}
   * @private
   */
  _getDependentColumns: function _getDependentColumns(field) {
    var dependentColumns = [];
    var dependencyFields = [field].concat((0, _toConsumableArray2.default)(this.props.model.getValidationDependency([field])));

    var _arr = Object.entries(this.props.cols);

    for (var _i = 0; _i < _arr.length; _i++) {
      var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
          columnName = _arr$_i[0],
          render = _arr$_i[1].render;

      if (render.some(function (renderField) {
        return dependencyFields.includes(renderField);
      })) {
        dependentColumns.push(columnName);
      }
    }

    return dependentColumns;
  },
  _getColumnClass: function _getColumnClass(id) {
    return this.props.cols[id].className;
  }
};
var _default = GridColumnsMixin;
exports.default = _default;
module.exports = exports.default;