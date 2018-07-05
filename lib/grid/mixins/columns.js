'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactDomFactories = require('react-dom-factories');

var _reactDomFactories2 = _interopRequireDefault(_reactDomFactories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var rows = [[/* top */], [/* bottom */]];
    var colGroup = [];
    var lastParent = { name: '' };

    for (var columnId in this.props.cols) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(_reactDomFactories2.default.col({
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
        classNames.push('dgrid-' + sortParams.direction);
        addInfo.field = sortParams.column;
        addInfo.sort = sortParams.direction;
      }

      addInfo.className = classNames.join(' ');

      if (this.props.cols[columnId].parent) {
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
        lastParent = { name: '' };
        addInfo.rows = 2;
        rows[0].push(addInfo);
      }
    }
    return { cols: rows, colGroup: colGroup };
  },


  /**
   * Get the names of the parameters that are required to display the grid
   *
   * @return {string[]}
   * @private
   */
  _getFieldsToRender: function _getFieldsToRender() {
    var i = void 0;
    var cols = this.props.cols;
    var columns = [];
    for (i in cols) {
      columns = _utils2.default.union(columns, cols[i].render.slice(0, cols[i].render.length - 1));
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
    var i = void 0;
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
    var dependencyFields = this.props.model.getValidationDependency([field]);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(this.props.cols)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            column = _step$value[0],
            columnData = _step$value[1];

        if (columnData.render.some(function (renderField) {
          return dependencyFields.includes(renderField);
        })) {
          dependentColumns.push(column);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return dependentColumns;
  },
  _getColumnClass: function _getColumnClass(id) {
    return this.props.cols[id].className;
  }
};

exports.default = GridColumnsMixin;
module.exports = exports['default'];