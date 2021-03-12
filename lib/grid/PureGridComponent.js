"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../common/utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var findDOMNode = _reactDom["default"].findDOMNode;
var EXTRA_RECORD_CLASS_NAME = 'dgrid-others';
var SELECTED_RECORD_CLASS_NAME = 'dgrid__row_selected';

var PureGridComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(PureGridComponent, _React$Component);

  var _super = _createSuper(PureGridComponent);

  function PureGridComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PureGridComponent);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderBody", function () {
      if (!_this.props.records) {
        return;
      }

      var htmlExtra = '';
      var htmlBody = '';

      var _iterator = _createForOfIteratorHelper(_this.props.extraRecords),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 1),
              recordId = _step$value[0];

          if (_this.props.records.has(recordId)) {
            continue;
          }

          htmlExtra += _this._getRowHTML(recordId);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(_this.props.records),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 1),
              _recordId = _step2$value[0];

          htmlBody += _this._getRowHTML(_recordId);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      _this.tBody.innerHTML = htmlExtra + htmlBody;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderEditor", function (parentElement) {
      var _ref;

      var elementWithRef = /*#__PURE__*/_react["default"].cloneElement(_this.props.editor.element, {
        ref: function ref(value) {
          return _ref = value;
        }
      });

      _reactDom["default"].render(elementWithRef, parentElement, function () {
        parentElement.classList.add('dgrid-input-wrapper');

        if (typeof _ref.focus === 'function') {
          _ref.focus();
        } else {
          findDOMNode(_ref).focus();
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_escapeRecord", function (columnId, record) {
      var field;
      var type;
      var i;
      var escapedRecord = {};
      var column = _this.props.cols[columnId];
      var needEscaping = !column.hasOwnProperty('escape') || column.escape;
      var fields = column.render.slice(0, -1);

      for (i = 0; i < fields.length; i++) {
        field = fields[i];
        type = (0, _typeof2["default"])(record[field]);

        if (needEscaping) {
          if (type === 'string') {
            escapedRecord[field] = (0, _utils.escape)(record[field]);
            continue;
          }

          if (type === 'object' && record[field] && !_this._colsWithEscapeErrors[columnId]) {
            _this._colsWithEscapeErrors[columnId] = true;
            console.error("UIKernel.Grid warning: " + "You send record with fields of Object type in escaped column \"".concat(columnId, "\". ") + "To use Objects, set column config \"escape\" to false, " + "and escape \"".concat(columnId, "\" field in render function by yourself"));
          }
        }

        escapedRecord[field] = record[field];
      }

      return escapedRecord;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleBodyClick", function (event) {
      var target = event.target;
      var refParent = (0, _utils.parents)(target, '[ref]')[0];
      var element;

      if (target.classList.contains('dgrid-cell')) {
        element = event.target;
      } else {
        element = (0, _utils.parents)(target, 'td.dgrid-cell')[0];
      }

      if (element && !(refParent && refParent.hasAttribute('disabled'))) {
        var columnIndex = (0, _toConsumableArray2["default"])(element.parentNode.children).indexOf(element);
        var colId = Object.keys(_this.props.cols)[columnIndex];
        var key = element.parentNode.getAttribute('key');

        var recordId = _this._recordMap.get(key);

        _this.props.onCellClick(event, recordId, colId, (refParent || event.target).getAttribute('ref'));
      }
    });
    _this._colsWithEscapeErrors = props.colsWithEscapeErrors;
    _this._recordMap = null;
    return _this;
  }

  (0, _createClass2["default"])(PureGridComponent, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this._initRecordsMap(prevProps);

      if (this._shouldRenderBody(prevProps, 'records') || this._shouldRenderBody(prevProps, 'extraRecords') || !(0, _utils.isEqual)(this.props.viewColumns, prevProps.viewColumns)) {
        this._renderBody();

        return;
      } // When page is changed - there is always re rendering of whole body


      if (prevProps.page === this.props.page) {
        var rowsToRerenderId = this._getRowsToRerender(prevProps);

        if (rowsToRerenderId.size) {
          var _iterator3 = _createForOfIteratorHelper(rowsToRerenderId),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var recordId = _step3.value;

              this._renderRow(recordId, prevProps.editor);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      }
    }
    /**
     * Create recordId map with encoded ids
     *
     * @param   {Object}  prevProps
     * @private
     */

  }, {
    key: "_initRecordsMap",
    value: function _initRecordsMap(prevProps) {
      if (this.props.records === prevProps.records && this.props.extraRecords === prevProps.extraRecords) {
        return;
      }

      if (this.props.records && this.props.extraRecords) {
        var records = [].concat((0, _toConsumableArray2["default"])(this.props.extraRecords.keys()), (0, _toConsumableArray2["default"])(this.props.records.keys()));
        this._recordMap = records.reduce(function (accum, recordId) {
          accum.set((0, _utils.toEncodedString)(recordId), recordId);
          return accum;
        }, new Map());
      }
    }
    /**
     * Should component render body
     *
     * @param   {Object}  prevProps
     * @returns {Boolean}
     * @private
     */

  }, {
    key: "_shouldRenderBody",
    value: function _shouldRenderBody(prevProps, records) {
      if (!prevProps[records] && this.props[records] || prevProps[records] && !this.props[records]) {
        return true;
      } // data was and exists now


      if (this.props[records] && prevProps[records]) {
        // new and old records are the same
        if (this.props[records] === prevProps[records]) {
          return false;
        } // new data has different length


        if (this.props[records].size !== prevProps[records].size) {
          return true;
        }

        var prevKeys = (0, _toConsumableArray2["default"])(prevProps[records].keys());
        var nextKeys = (0, _toConsumableArray2["default"])(this.props[records].keys());

        for (var i = 0; i < prevKeys.length; i++) {
          // prevKeys.length === nextKeys.length
          // if changed order
          if (!(0, _utils.isEqual)(prevKeys[i], nextKeys[i])) {
            return true;
          }
        }

        return false;
      }

      return false;
    }
    /**
     * Get rows that need to be re rendered
     *
     * @param   {Object}  prevProps
     * @returns {Map}
     * @private
     */

  }, {
    key: "_getRowsToRerender",
    value: function _getRowsToRerender(prevProps) {
      var rowsToReRender = new Set([]);

      this._checkEditorForRender(rowsToReRender, prevProps);

      this._checkRecordsForRender(rowsToReRender, prevProps, 'records');

      this._checkRecordsForRender(rowsToReRender, prevProps, 'extraRecords');

      this._checkPropForRerender(rowsToReRender, prevProps, 'statuses');

      this._checkPropForRerender(rowsToReRender, prevProps, 'errors');

      this._checkPropForRerender(rowsToReRender, prevProps, 'warnings');

      this._checkPropForRerender(rowsToReRender, prevProps, 'changes');

      return rowsToReRender;
    }
    /**
     * Check prop to rerender any records
     *
     * @param   {Map}     rowsToReRender
     * @param   {Object}  prevProps
     * @private
     */

  }, {
    key: "_checkPropForRerender",
    value: function _checkPropForRerender(rowsToReRender, prevProps, propType) {
      var prop = this.props[propType];
      var prevProp = prevProps[propType];

      if (this.props.records) {
        if (prop === prevProp) {
          return;
        } // All unique record ids


        var allRecordIds = new Set([].concat((0, _toConsumableArray2["default"])(prevProp.keys().map(JSON.stringify)), (0, _toConsumableArray2["default"])(prop.keys().map(JSON.stringify))));

        var _iterator4 = _createForOfIteratorHelper(allRecordIds),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var jsonRecordId = _step4.value;
            var recordId = JSON.parse(jsonRecordId);

            if ((!prop.has(recordId) || !prevProp.has(recordId)) && this._isRecordLoaded(recordId)) {
              rowsToReRender.add(recordId);
              continue;
            }

            if (prop.has(recordId) && prevProp.has(recordId) && this._isRecordLoaded(recordId)) {
              if (!(0, _utils.isEqual)(prop.get(recordId), prevProp.get(recordId))) {
                rowsToReRender.add(recordId);
              }
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    }
  }, {
    key: "_isRecordLoaded",
    value: function _isRecordLoaded(recordId) {
      return this.props.records.has(recordId) || this.props.extraRecords.has(recordId);
    }
    /**
     * Check editor prop for record re rendering
     *
     * @param   {Map}     rowsToReRender
     * @param   {Object}  prevProps
     * @private
     */

  }, {
    key: "_checkEditorForRender",
    value: function _checkEditorForRender(rowsToReRender, prevProps) {
      var editor = this.props.editor;
      var prevEditor = prevProps.editor; // there are no editors

      if (!editor.recordId && !prevEditor.recordId) {
        return;
      } // check for editor changes only if records to display exist


      if (this.props.records) {
        // if editor was and exists now
        if (editor.recordId && prevEditor.recordId) {
          // do nothing if old editor is the same as new one
          if (editor === prevEditor) {
            return;
          }

          rowsToReRender.add(prevEditor.recordId);
          rowsToReRender.add(editor.recordId);
          return;
        } // there wasn't editor before


        if (!prevEditor.recordId && editor.recordId) {
          rowsToReRender.add(editor.recordId);
          return;
        } // there is no editor now


        if (!editor.recordId && prevEditor.recordId) {
          rowsToReRender.add(prevEditor.recordId);
        }
      }
    }
    /**
     * Check records to be re rendered
     *
     * @param   {Map}     rowsToReRender
     * @param   {Object}  prevProps
     * @private
     */

  }, {
    key: "_checkRecordsForRender",
    value: function _checkRecordsForRender(rowsToReRender, prevProps, recordsType) {
      var props = this.props; // if data to display is the same - do nothing

      if (this.props[recordsType] === prevProps[recordsType]) {
        return;
      } // check for records differences only if data exists


      if (props[recordsType] && prevProps[recordsType]) {
        // if previous records aren't the same as current
        if (props[recordsType] !== prevProps[recordsType]) {
          var _iterator5 = _createForOfIteratorHelper(props[recordsType]),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 2),
                  recordId = _step5$value[0],
                  rowValue = _step5$value[1];

              // if record has different rowValue than it was before - row must be re rendered
              if (prevProps[recordsType].get(recordId) !== rowValue) {
                rowsToReRender.add(recordId);
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }
    }
    /**
     * Redraw table content totally
     *
     * @private
     */

  }, {
    key: "_renderRow",
    value:
    /**
     * Redraw row
     *
     * @param   {*}       recordId
     * @param   {Object}  prevEditor
     * @private
     */
    function _renderRow(recordId, prevEditor) {
      var row = findDOMNode(this.tBody).querySelector("tr[key=\"".concat((0, _utils.toEncodedString)(recordId), "\"]"));
      var selected = this.isSelected(recordId);
      row.className = this._getRowClassNames(recordId, selected);

      for (var _i = 0, _Object$keys = Object.keys(this.props.cols); _i < _Object$keys.length; _i++) {
        var colId = _Object$keys[_i];

        if (this._isViewColumn(colId)) {
          this._renderCell(recordId, colId, row, prevEditor);
        }
      }
    }
    /**
     * Get amount of extra records
     *
     * @returns {Number}
     * @private
     */

  }, {
    key: "_extraRecordsOfThePage",
    value: function _extraRecordsOfThePage() {
      var count = 0;

      var _iterator6 = _createForOfIteratorHelper(this.props.extraRecords),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = (0, _slicedToArray2["default"])(_step6.value, 1),
              recordId = _step6$value[0];

          if (this.props.records.has(recordId)) {
            count++;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return count;
    }
    /**
     * Redraw cell
     *
     * @param {*}           recordId   Record ID
     * @param {String}      colId      Column ID
     * @param {HTMLElement} row        Row element
     * @param {Object}      prevEditor Previous editor
     * @private
     */

  }, {
    key: "_renderCell",
    value: function _renderCell(recordId, colId, row, prevEditor) {
      // if editor is on the current cell - only render editor
      if (recordId === this.props.editor.recordId) {
        if (colId === this.props.editor.column) {
          var indexOfColumn = Object.keys(this.props.cols).indexOf(this.props.editor.column);

          this._renderEditor(row.children[indexOfColumn]);

          return;
        }

        return;
      } // if editor was on the grid - check and re render only that cell which had editor


      if (prevEditor.recordId) {
        if (recordId === prevEditor.recordId && colId === prevEditor.column) {
          var _indexOfColumn = Object.keys(this.props.cols).indexOf(prevEditor.column);

          this._unmountEditor(row.children[_indexOfColumn]);
        } else {
          return;
        }
      }

      var cellIndex = Object.keys(this.props.cols).indexOf(colId);
      var cell = row.children[cellIndex];

      var record = this._getRecordWithChanges(recordId);

      var selected = this.isSelected(recordId);
      var initialRecord = this.props.records.get(recordId) || this.props.extraRecords.get(recordId) || null;
      var gridCellClass = (0, _classnames["default"])(this._getColumnClass(colId), {
        'dgrid-cell': true,
        'dgrid-changed': this._isChanged(recordId, this._getBindParam(colId)),
        'dgrid-error': this._hasError(recordId, this._getBindParam(colId)),
        'dgrid-warning': this._hasWarning(recordId, this._getBindParam(colId))
      });
      var html = "\n      <td class=\"".concat(gridCellClass, "\" key=\"").concat(colId, "\">\n        ").concat(this._getCellHTML(colId, record, selected, initialRecord), "\n      </td>\n    ");

      try {
        cell.outerHTML = html;
      } catch (e) {// Sometimes it is possible a situation when rerendering of the cell is called in the middle of performing of an
        // event in that cell which may cause an error like "DOMException: The node to be removed is no longer a child
        // of this node", so just ignore it
      }
    }
    /**
     * Redraw cell
     *
     * @param {HTMLElement} element HTML Element
     * @private
     */

  }, {
    key: "_unmountEditor",
    value: function _unmountEditor(element) {
      _reactDom["default"].unmountComponentAtNode(element);

      element.classList.remove('dgrid-input-wrapper');
    }
  }, {
    key: "_getRowHTML",
    value: function _getRowHTML(recordId) {
      var colId;

      var record = this._getRecordWithChanges(recordId);

      var initialRecord = this.props.records.get(recordId) || this.props.extraRecords.get(recordId);
      var selected = this.isSelected(recordId);

      var gridRowClass = this._getRowClassNames(recordId, selected);

      var html = "<tr key=".concat((0, _utils.toEncodedString)(recordId), " class=\"").concat(gridRowClass, "\">");

      for (var _i2 = 0, _Object$keys2 = Object.keys(this.props.cols); _i2 < _Object$keys2.length; _i2++) {
        colId = _Object$keys2[_i2];

        if (this._isViewColumn(colId)) {
          var gridCellClass = (0, _classnames["default"])(this._getColumnClass(colId), {
            'dgrid-cell': true,
            'dgrid-changed': this._isChanged(recordId, this._getBindParam(colId)),
            'dgrid-error': this._hasError(recordId, this._getBindParam(colId)),
            'dgrid-warning': this._hasWarning(recordId, this._getBindParam(colId))
          });
          html += "\n          <td class=\"".concat(gridCellClass, "\" key=\"").concat(colId, "\">\n            ").concat(this._getCellHTML(colId, record, selected, initialRecord), "\n          </td>");
        }
      }

      return "".concat(html, "</tr>");
    }
  }, {
    key: "_getRowClassNames",
    value: function _getRowClassNames(recordId, selected) {
      var _classNames;

      return (0, _classnames["default"])((0, _toConsumableArray2["default"])(this._getRowStatusNames(recordId)).join(' '), (_classNames = {}, (0, _defineProperty2["default"])(_classNames, EXTRA_RECORD_CLASS_NAME, this.props.extraRecords.has(recordId)), (0, _defineProperty2["default"])(_classNames, SELECTED_RECORD_CLASS_NAME, selected), _classNames));
    } // called in _getRowHTML

    /**
     * Get table cell HTML
     *
     * @param   {number}   columnId       Column ID
     * @param   {Object}   record         Table record (initial record + changes)
     * @param   {boolean}  selected       "Selected" row status
     * @param   {Object}   initialRecord  Initial record
     * @returns {string}   Table cell HTML
     * @private
     */

  }, {
    key: "_getCellHTML",
    value: function _getCellHTML(columnId, record, selected, initialRecord) {
      var render = (0, _utils.last)(this.props.cols[columnId].render);
      var cellHtml = render(this._escapeRecord(columnId, record), selected, this._escapeRecord(columnId, initialRecord), this.props.grid);
      return "".concat((0, _utils.isDefined)(cellHtml) ? cellHtml : '');
    } // called in _getCellHTML

  }, {
    key: "_hasWarning",
    value: // called in _getRowHTML

    /**
     * Table row has warning flag
     *
     * @param   {string}        row     Row ID
     * @param   {Array|string}  fields
     * @returns {boolean}
     * @private
     */
    function _hasWarning(row, fields) {
      return this._checkFieldInValidation(row, fields, this.props.warnings);
    } // called in _getRowHTML

    /**
     * Table row has error flag
     *
     * @param   {string}        row     Row ID
     * @param   {Array|string}  fields
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_hasError",
    value: function _hasError(recordId, fields) {
      return this._checkFieldInValidation(recordId, fields, this.props.errors);
    } // called in _hasError

    /**
     * Table row has error in "validation" object
     *
     * @param   {any}        recordId
     * @param   {Array|string}  fields
     * @param   {Validation}    validation
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_checkFieldInValidation",
    value: function _checkFieldInValidation(recordId, fields, validation) {
      var i;

      if (!validation.has(recordId)) {
        return false;
      }

      if (!Array.isArray(fields)) {
        fields = [fields];
      }

      for (i = 0; i < fields.length; i++) {
        if (validation.get(recordId).hasError(fields[i])) {
          return true;
        }
      }

      return false;
    } // called in _getRowHTML

    /**
     * Table row changed flag
     *
     * @param   {string}        recordId         Row ID
     * @param   {Array|string}  [fields]
     * @return  {boolean}
     * @private
     */

  }, {
    key: "_isChanged",
    value: function _isChanged(recordId, fields) {
      var i;

      if (!this.props.changes.has(recordId)) {
        return false;
      }

      if (fields) {
        if (!Array.isArray(fields)) {
          fields = [fields];
        }

        for (i = 0; i < fields.length; i++) {
          if (this.props.changes.get(recordId).hasOwnProperty(fields[i])) {
            return true;
          }
        }

        return false;
      }

      return true;
    } // called in _getRowHTML

    /**
     * Get record field title that changes column Editor
     *
     * @param       {string}        id  Column ID
     * @returns     {Array|string}     Fields that change Editor
     * @private
     */

  }, {
    key: "_getBindParam",
    value: function _getBindParam(id) {
      return this.props.cols[id].editorField || id;
    } // called in _getRowHTML

    /**
     * Get all status names that are applied to the row
     *
     * @param   {string}    row    Row ID
     * @return  {Array}  Status names array
     * @private
     */

  }, {
    key: "_getRowStatusNames",
    value: function _getRowStatusNames(recordId) {
      return this.props.statuses.get(recordId) || [];
    } // called in _getRowHTML

    /**
     * Is selected row flag in accordance with
     * current select mode (whitelist/blacklist).
     *
     * @param   {number|string}     recordId    Record ID
     * @returns {boolean}           Is selected row flag
     */

  }, {
    key: "isSelected",
    value: function isSelected(recordId) {
      var rowStatuses = this.props.statuses.get(recordId);

      if (rowStatuses) {
        return rowStatuses.has('selected');
      }

      return false;
    } // called in _getRowHTML

    /**
     * Get table record with changes
     *
     * @param {string} recordId Row ID
     * @returns {Object} Required table data record
     * @private
     */

  }, {
    key: "_getRecordWithChanges",
    value: function _getRecordWithChanges(recordId) {
      if (this.props.records.has(recordId)) {
        return _objectSpread(_objectSpread({}, this.props.records.get(recordId)), this.props.changes.get(recordId));
      }

      if (this.props.extraRecords.has(recordId)) {
        return _objectSpread(_objectSpread({}, this.props.extraRecords.get(recordId)), this.props.changes.get(recordId));
      }

      return null;
    }
    /**
     * Collect data for table header display
     *
     * @returns {Object} Formed data
     * @private
     */

  }, {
    key: "_formHeader",
    value: function _formHeader() {
      var rows = [[
        /* top */
      ], [
        /* bottom */
      ]];
      var colGroup = [];
      var lastParent = {
        name: ''
      };

      for (var _i3 = 0, _Object$entries = Object.entries(this.props.cols); _i3 < _Object$entries.length; _i3++) {
        var _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i3], 2),
            columnId = _Object$entries$_i[0],
            column = _Object$entries$_i[1];

        // Skip column if it's invisible
        if (!this._isViewColumn(columnId)) {
          continue;
        }

        colGroup.push( /*#__PURE__*/_react["default"].createElement("col", {
          key: columnId,
          width: column.width,
          className: this._getColumnClass(columnId)
        }));
        var _classNames2 = [this._getColumnClass(columnId)];
        var addInfo = {
          id: columnId,
          name: column.name || '',
          onClick: column.onClick,
          onClickRefs: column.onClickRefs,
          cols: 1,
          rows: 1
        };

        var sortParams = this._getSortParams(columnId);

        if (sortParams) {
          _classNames2.push("dgrid-".concat(sortParams.direction));

          addInfo.field = sortParams.column;
          addInfo.sort = sortParams.direction;
        }

        addInfo.className = _classNames2.join(' ');

        if (column.parent) {
          if (column.parent !== lastParent.name) {
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
    } // called in _formHeader

    /**
     * Get current mode and column sort parameter
     *
     * @param   column                                  Column ID
     * @returns {{field: {string}, sort: {string}}|{}}  Sort parameter and mode
     * @private
     */

  }, {
    key: "_getSortParams",
    value: function _getSortParams(column) {
      var params = {
        column: column
      };
      var sorts = this.props.sort;
      var sortIndex;

      if (!this.props.cols[column].sortCycle) {
        return null;
      }

      if (!sorts) {
        params.direction = 'default';
        return params;
      }

      if (this.props.multipleSorting) {
        sortIndex = (0, _utils.findIndex)(sorts, function (sort) {
          return sort.column === params.column;
        });

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
    } // called in _formHeader

  }, {
    key: "_getColumnClass",
    value: function _getColumnClass(id) {
      return this.props.cols[id].className;
    } // called in _formHeader

    /**
     * Column visibility flag
     *
     * @param   {string}    id  Column ID
     * @returns {boolean}   Column visibility
     * @private
     */

  }, {
    key: "_isViewColumn",
    value: function _isViewColumn(id) {
      if (!this.props.viewColumns) {
        return true;
      }

      if (Array.isArray(this.props.viewColumns)) {
        return this.props.viewColumns.indexOf(id) > -1;
      }

      return this.props.viewColumns[id];
    } // called in render method

  }, {
    key: "_getHeaderCellHTML",
    value: function _getHeaderCellHTML(columnName) {
      var cellHtml = typeof columnName === 'function' ? columnName(this.props.grid) : columnName;

      if (cellHtml === undefined) {
        return '';
      }

      return cellHtml;
    } // called in render for scrollable

    /**
     * Table content click event handler
     *
     * @param {Event} event
     */

  }, {
    key: "_renderPagination",
    value: function _renderPagination() {
      var viewCount = this.props.viewCount;
      var _this$props = this.props,
          onChangeViewCount = _this$props.onChangeViewCount,
          onClickFirstPage = _this$props.onClickFirstPage,
          onClickPrevPage = _this$props.onClickPrevPage,
          onClickNextPage = _this$props.onClickNextPage,
          onClickLastPage = _this$props.onClickLastPage,
          onRefreshTable = _this$props.onRefreshTable;
      return Boolean(viewCount) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "dgrid-footer"
      }, Boolean(this.props.viewVariants) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "dgrid-pagination-page-size"
      }, " Page Size"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "dgrid-pagination-view-variants"
      }, /*#__PURE__*/_react["default"].createElement("select", {
        className: "dgrid-pagination-view-variants-select",
        value: this.props.viewVariants.indexOf(viewCount),
        onChange: onChangeViewCount
      }, this.props.viewVariants.map(function (option, key) {
        return /*#__PURE__*/_react["default"].createElement("option", {
          key: key,
          value: key
        }, option);
      }, this)))), /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": "first page",
        className: "btn-first-page",
        onClick: withPreventDefault(onClickFirstPage)
      }, "\xA0"), /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": "prev page",
        className: "btn-prev-page",
        onClick: withPreventDefault(onClickPrevPage)
      }, "\xA0"), Boolean(this.props.count) && /*#__PURE__*/_react["default"].createElement("div", null, this.props.page * viewCount + 1, ' - ', Math.min((this.props.page + 1) * viewCount, this.props.count), ' of ', this.props.count), /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": "next page",
        className: "btn-next-page",
        onClick: withPreventDefault(onClickNextPage)
      }, "\xA0"), /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": "last page",
        className: "btn-last-page",
        onClick: withPreventDefault(onClickLastPage)
      }, "\xA0"), /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": "refresh page",
        className: "btn-refresh-page",
        onClick: withPreventDefault(onRefreshTable)
      }, "\xA0"));
    }
  }, {
    key: "_renderTotals",
    value: function _renderTotals(isScrollable) {
      var totalsDisplayed = false;
      var i;
      var className;
      var totalsRowHTML = '';

      var header = this._formHeader(); // If data for result line display exists, form it


      if (this.props.totals) {
        for (var _i4 = 0, _Object$keys3 = Object.keys(this.props.cols); _i4 < _Object$keys3.length; _i4++) {
          i = _Object$keys3[_i4];

          if (!this._isViewColumn(i)) {
            continue;
          }

          className = this.props.cols[i].className;

          if (className) {
            totalsRowHTML += "<td class=\"".concat(className, "\" key=\"").concat(i, "\">");
          } else {
            totalsRowHTML += "<td key=\"".concat(i, "\">");
          }

          if (this.props.totals.hasOwnProperty(i)) {
            totalsRowHTML += this._getCellHTML(i, this.props.totals, false, this.props.totals);
            totalsDisplayed = true;
          }

          totalsRowHTML += '</td>';
        }
      }

      if (!totalsDisplayed) {
        return null;
      }

      if (isScrollable) {
        return /*#__PURE__*/_react["default"].createElement("table", {
          cellSpacing: "0",
          className: "dgrid-totals"
        }, /*#__PURE__*/_react["default"].createElement("colgroup", null, header.colGroup), /*#__PURE__*/_react["default"].createElement("tr", {
          dangerouslySetInnerHTML: {
            __html: totalsRowHTML
          }
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("tfoot", {
        className: "dgrid-totals"
      }, /*#__PURE__*/_react["default"].createElement("tr", {
        dangerouslySetInnerHTML: {
          __html: totalsRowHTML
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$_formHeader = this._formHeader(),
          cols = _this$_formHeader.cols,
          colGroup = _this$_formHeader.colGroup;

      var classNames = this.props.classNames;
      var _this$props2 = this.props,
          height = _this$props2.height,
          onColumnClick = _this$props2.onColumnClick;
      classNames = classNames.concat('dgrid-not-scrollable');

      if (height) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: classNames.join(' ')
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "wrapper-dgrid-header"
        }, /*#__PURE__*/_react["default"].createElement("table", {
          cellSpacing: "0",
          className: "dgrid-header"
        }, /*#__PURE__*/_react["default"].createElement("colgroup", null, colGroup), /*#__PURE__*/_react["default"].createElement("thead", null, cols.map(function (row, colKey) {
          return /*#__PURE__*/_react["default"].createElement("tr", {
            key: colKey
          }, row.map(function (col, rowKey) {
            var header = _this2._getHeaderCellHTML(col.name);

            var props = {
              key: rowKey,
              className: col.className,
              onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
              colSpan: col.cols,
              rowSpan: col.rows
            };
            return typeof header === 'string' ? /*#__PURE__*/_react["default"].createElement("th", (0, _extends2["default"])({}, props, {
              dangerouslySetInnerHTML: {
                __html: header
              }
            })) : /*#__PURE__*/_react["default"].createElement("th", props, header);
          }));
        })))), /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            maxHeight: this.props.height,
            height: this.props.height
          },
          className: "dgrid-body-wrapper dgrid-scrollable"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "dgrid-body"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: this.props.showLoader ? 'dgrid-loader' : '',
          ref: function ref(loader) {
            return _this2.loader = loader;
          }
        }), /*#__PURE__*/_react["default"].createElement("table", {
          cellSpacing: "0",
          ref: function ref(body) {
            return _this2.body = body;
          },
          onClick: this._handleBodyClick
        }, /*#__PURE__*/_react["default"].createElement("colgroup", null, colGroup), /*#__PURE__*/_react["default"].createElement("tbody", {
          className: "dgrid-body-table",
          ref: function ref(tbody) {
            return _this2.tBody = tbody;
          }
        })))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "wrapper-totals"
        }, this._renderTotals(this.props.height)), this._renderPagination());
      } // If not scrollable grid


      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classNames.join(' ')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.showLoader ? 'dgrid-loader' : '',
        ref: function ref(loader) {
          return _this2.loader = loader;
        }
      }), /*#__PURE__*/_react["default"].createElement("table", {
        cellSpacing: "0",
        className: 'dgrid-body-table',
        onClick: this._handleBodyClick
      }, /*#__PURE__*/_react["default"].createElement("colgroup", null, colGroup), /*#__PURE__*/_react["default"].createElement("thead", null, cols.map(function (row, colKey) {
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: colKey
        }, row.map(function (col, rowKey) {
          var header = _this2._getHeaderCellHTML(col.name);

          var props = {
            key: rowKey,
            className: col.className,
            onClick: col.id ? onColumnClick.bind(null, col.id) : undefined,
            colSpan: col.cols,
            rowSpan: col.rows
          };
          return typeof header === 'string' ? /*#__PURE__*/_react["default"].createElement("th", (0, _extends2["default"])({}, props, {
            dangerouslySetInnerHTML: {
              __html: header
            }
          })) : /*#__PURE__*/_react["default"].createElement("th", props, header);
        }));
      })), /*#__PURE__*/_react["default"].createElement("tbody", {
        className: "dgrid-body-table",
        ref: function ref(tbody) {
          return _this2.tBody = tbody;
        }
      }), this._renderTotals(height)), this._renderPagination());
    }
  }]);
  return PureGridComponent;
}(_react["default"].Component);

function withPreventDefault(handler) {
  return function (event) {
    event.preventDefault();
    handler(event);
  };
}

var _default = PureGridComponent;
exports["default"] = _default;
module.exports = exports.default;