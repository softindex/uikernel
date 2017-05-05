/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../../common/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
var findDOMNode = _reactDom2.default.findDOMNode; /**
                                                   * Copyright (с) 2015-present, SoftIndex LLC.
                                                   * All rights reserved.
                                                   *
                                                   * This source code is licensed under the BSD-style license found in the
                                                   * LICENSE file in the root directory of this source tree.
                                                   */

var GridEditorMixin = {

  /**
   * Display Editor in a table cell
   *
   * @param {HTMLElement} element     Cell DOM element
   * @param {string}      row         Row ID
   * @param {string}      column      Column ID
   * @private
   */
  _renderEditor: function _renderEditor(element, row, column) {
    var _this = this;

    var binds = this._getBindParam(column);
    var record = this._getRecord(row);
    var $element = $(element);
    var value = _utils2.default.at(record, binds);
    var focusDone = false;

    if (!Array.isArray(binds)) {
      value = value[0];
    }

    // Prevent recreate of the opened Editor
    if (this._isEditorVisible(row, column)) {
      return;
    }

    var editorContext = {
      updateField: function updateField(field, nextValue) {
        var data = {};
        data[field] = nextValue;
        _this._setRowChanges(row, data);
      }
    };

    var props = {
      onChange: function onChange(values) {
        _this._onChangeEditor(row, column, values, editorContext, element);
      },
      onFocus: function onFocus() {
        _this._onFocusEditor(row, column);
      },
      onBlur: function onBlur() {
        // Remove Editor
        if (focusDone) {
          _reactDom2.default.unmountComponentAtNode(element);
          delete _this.state.editor[row + '_' + column];
          $element.removeClass('dgrid-input-wrapper');
          _this._onBlurEditor(row, column);
        }
      },
      value: value
    };

    editorContext.props = props;

    // Display Editor
    var Component = this.props.cols[column].editor.call(editorContext, record);

    if (!Component) {
      return;
    }

    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element, function () {
      $element.addClass('dgrid-input-wrapper');

      if (typeof this.focus === 'function') {
        this.focus();
      } else {
        findDOMNode(this).focus();
      }
      focusDone = true;
    });
  },

  _onChangeEditor: function _onChangeEditor(row, column, values, editorContext, element) {
    var binds = this._getBindParam(column);

    values = _utils2.default.cloneDeep(_utils2.default.parseValueFromEvent(values));

    var record = this._getRecord(row);
    var context = _utils2.default.cloneDeep(editorContext);
    context.props.value = values;
    var Component = this.props.cols[column].editor.call(context, record);
    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element);

    if (!Array.isArray(binds)) {
      binds = [binds];
      values = [values];
    }

    this._setRowChanges(row, _utils2.default.zipObject(binds, values));
  },

  _onFocusEditor: function _onFocusEditor(row, column) {
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

  _onBlurEditor: function _onBlurEditor(row, column) {
    this._updateField(row, column);
    this._checkWarnings(row);

    // TODO Deprecated prop realtime in v0.17
    if (this.props.autoSubmit || this.props.realtime) {
      if (this.props.realtime) {
        console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
      }
      this.save(this.props.onRealtimeSubmit);
    } else {
      this._validateRow(row);
    }
  },

  _isEditorVisible: function _isEditorVisible(row, column) {
    return Boolean(this.state.editor[row + '_' + column]);
  }
};

exports.default = GridEditorMixin;
module.exports = exports['default'];