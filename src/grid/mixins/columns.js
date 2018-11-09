/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import utils from '../../common/utils';
import DOM from 'react-dom-factories';

const GridColumnsMixin = {
  /**
   * Column visibility flag
   *
   * @param   {string}    id  Column ID
   * @returns {boolean}   Column visibility
   * @private
   */
  _isViewColumn(id) {
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
  _formHeader() {
    const rows = [[/* top */], [/* bottom */]];
    const colGroup = [];
    let lastParent = {name: ''};

    for (const columnId in this.props.cols) {
      // Skip column if it's invisible
      if (!this._isViewColumn(columnId)) {
        continue;
      }

      colGroup.push(
        DOM.col({
          key: columnId,
          width: this.props.cols[columnId].width,
          className: this._getColumnClass(columnId)
        })
      );

      const classNames = [this._getColumnClass(columnId)];
      const addInfo = {
        id: columnId,
        name: this.props.cols[columnId].name,
        onClick: this.props.cols[columnId].onClick,
        onClickRefs: this.props.cols[columnId].onClickRefs,
        cols: 1,
        rows: 1
      };

      const sortParams = this._getSortParams(columnId);
      if (sortParams) {
        classNames.push(`dgrid-${sortParams.direction}`);
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
  _getFieldsToRender() {
    let i;
    const cols = this.props.cols;
    let columns = [];
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
  _isFieldAffectsRender(field) {
    let i;
    const cols = this.props.cols;
    for (i in cols) {
      if (cols[i].render.indexOf(field) >= 0) {
        return true;
      }
    }
    return false;
  },

  /**
   * Get dependent columns
   *
   * @param   {string}    field
   * @return  {string[]}
   * @private
   */
  _getDependentColumns(field) {
    const dependentColumns = [];
    const dependencyFields = [
      field,
      ...this.props.model.getValidationDependency([field])
    ];

    for (const [columnName, { render }] of Object.entries(this.props.cols)) {
      if (render.some(renderField => dependencyFields.includes(renderField))) {
        dependentColumns.push(columnName);
      }
    }

    return dependentColumns;
  },

  _getColumnClass(id) {
    return this.props.cols[id].className;
  }
};

export default GridColumnsMixin;
