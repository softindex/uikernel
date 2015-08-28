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

var GridEditorMixin = {
  getInitialState: function () {
    return {
      editor: {}
    };
  },

  /**
   * Display Editor in a table cell
   *
   * @param {HTMLElement} element     Cell DOM element
   * @param {string}      row         Row ID
   * @param {string}      column      Column ID
   * @private
   */
  _renderEditor: function (element, row, column) {
    var binds = this._getBindParam(column);
    var record = this._getRecord(row);
    var $element = $(element);
    var value = utils.at(record, binds);

    if (!Array.isArray(binds)) {
      value = value[0];
    }

    // Prevent recreate of the opened Editor
    if (this._isEditorVisible(row, column)) {
      return;
    }

    var props = {
      onChange: function (values) {
        this._onChangeEditor(row, column, values);
      }.bind(this),
      onFocus: function () {
        this._onFocusEditor(row, column);
      }.bind(this),
      onBlur: function () {
        // Remove Editor
        React.unmountComponentAtNode(element);
        delete this.state.editor[row + '_' + column];
        $element.removeClass('dgrid-input-wrapper');

        this._onBlurEditor(row, column);
      }.bind(this),
      value: value
    };

    var editorContext = {
      props: props,
      updateField: function (field, nextValue, cb) {
        var data = {};
        data[field] = nextValue;
        this._setRowChanges(row, data, cb);
      }.bind(this)
    };

    // Display Editor
    var Component = this.props.cols[column].editor.call(editorContext, record);

    if (!Component) {
      return;
    }

    $element.addClass('dgrid-input-wrapper');

    var EditorComponent = this.state.editor[row + '_' + column] = React.render(Component, element);
    if (typeof EditorComponent.focus === 'function') {
      EditorComponent.focus();
    } else {
      EditorComponent.getDOMNode().focus();
    }
  },

  _onChangeEditor: function (row, column, values) {
    var binds = this._getBindParam(column);

    values = utils.cloneDeep(utils.parseValueFromEvent(values));

    this.state.editor[row + '_' + column].setProps({value: values});

    if (!Array.isArray(binds)) {
      binds = [binds];
      values = [values];
    }

    this._setRowChanges(row, utils.zipObject(binds, values));
  },

  _onFocusEditor: function (row, column) {
    if (!this.state.errors[row]) {
      return;
    }

    var binds = this._getBindParam(column);
    if (!Array.isArray(binds)) {
      binds = [binds];
    }

    binds.forEach(function (field) {
      this.state.errors[row].clearField(field);
    }, this);
    if (this.state.errors[row].isEmpty()) {
      delete this.state.errors[row];
    }
  },

  _onBlurEditor: function (row, column) {
    this._updateField(row, column);

    if (this.props.realtime) {
      this.save();
    } else {
      this._validateRow(row);
    }
  },

  _isEditorVisible: function (row, column) {
    return Boolean(this.state.editor[row + '_' + column]);
  }
};

module.exports = GridEditorMixin;
