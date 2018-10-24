"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = _interopRequireDefault(require("../../common/utils"));

var _ThrottleError = _interopRequireDefault(require("../../common/ThrottleError"));

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
// eslint-disable-line no-unused-vars
var findDOMNode = _reactDom.default.findDOMNode;
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
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

    var value = _utils.default.at(record, binds);

    var focusDone = false;

    if (!Array.isArray(binds)) {
      value = value[0];
    } // Prevent recreate of the opened Editor


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
          _this._unmountEditor(element, row, column);

          _this._onBlurEditor(row);
        }
      },
      onKeyUp: function onKeyUp(e) {
        if (focusDone && [ENTER_KEY, ESCAPE_KEY].includes(e.keyCode)) {
          if (e.keyCode === ESCAPE_KEY) {
            _this._setRowChanges(row, (0, _defineProperty2.default)({}, column, value));
          }

          _this._unmountEditor(element, row, column);

          _this._onBlurEditor(row);
        }
      },
      value: value
    };
    editorContext.props = props; // Display Editor

    var Component = this.props.cols[column].editor.call(editorContext, record, this);

    if (!Component) {
      return;
    }

    this.state.editor["".concat(row, "_").concat(column)] = _reactDom.default.render(Component, element, function () {
      element.classList.add('dgrid-input-wrapper');

      if (typeof this.focus === 'function') {
        this.focus();
      } else {
        findDOMNode(this).focus();
      }

      focusDone = true;
    });
  },
  _unmountEditor: function _unmountEditor(element, row, column) {
    _reactDom.default.unmountComponentAtNode(element);

    delete this.state.editor["".concat(row, "_").concat(column)];
    element.classList.remove('dgrid-input-wrapper');
    var selected = this.isSelected(this.state.recordsInfo[row].id);

    this._renderCell(row, column, selected);
  },
  _onChangeEditor: function _onChangeEditor(row, column, values, editorContext, element) {
    var binds = this._getBindParam(column);

    values = _utils.default.cloneDeep(_utils.default.parseValueFromEvent(values));

    var record = this._getRecord(row);

    var context = _utils.default.cloneDeep(editorContext);

    context.props.value = values;
    var Component = this.props.cols[column].editor.call(context, record, this);
    this.state.editor["".concat(row, "_").concat(column)] = _reactDom.default.render(Component, element);

    if (!Array.isArray(binds)) {
      binds = [binds];
      values = [values];
    }

    this._setRowChanges(row, _utils.default.zipObject(binds, values));
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
  _onBlurEditor: function () {
    var _onBlurEditor2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(row) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this._checkWarnings(row);

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);

              if (_context.t0 instanceof _ThrottleError.default) {
                _context.next = 9;
                break;
              }

              throw _context.t0;

            case 9:
              // TODO Deprecated prop realtime in v0.17
              if (this.props.autoSubmit || this.props.realtime) {
                if (this.props.realtime) {
                  console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
                }

                this.save(this.props.onRealtimeSubmit);
              } else {
                this._validateRow(row);
              }

              if (this.props.onChange) {
                this.props.onChange(this.state.changes, this.state.data);
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 5]]);
    }));

    return function _onBlurEditor(_x) {
      return _onBlurEditor2.apply(this, arguments);
    };
  }(),
  _isEditorVisible: function _isEditorVisible(row, column) {
    return Boolean(this.state.editor["".concat(row, "_").concat(column)]);
  }
};
var _default = GridEditorMixin;
exports.default = _default;
module.exports = exports.default;