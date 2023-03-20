"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../common/utils");

var _EqualMap = _interopRequireDefault(require("../common/EqualMap"));

var _ValidationErrors = _interopRequireDefault(require("../common/validation/ValidationErrors"));

var _PureGridComponent = _interopRequireDefault(require("./PureGridComponent"));

var _ThrottleError = _interopRequireDefault(require("../common/ThrottleError"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RESET_MODEL = 'RESET_MODEL';
var RESET_VIEW_COLUMNS = 'RESET_VIEW_COLUMNS';
var RESET_SORT = 'RESET_SORT';
var RESET_VIEW_COUNT = 'RESET_VIEW_COUNT';
var RESET_SELECTED_COLUMNS = 'RESET_SELECTED_COLUMNS';
var RESET_BLACK_LIST_MODE = 'RESET_BLACK_LIST_MODE';
var RESET_STATUSES = 'RESET_STATUSES';
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var propTypes = function () {
  var sortElementProp = _propTypes["default"].shape({
    column: _propTypes["default"].string,
    direction: _propTypes["default"].any
  });

  var sortProp = _propTypes["default"].oneOfType([sortElementProp, _propTypes["default"].arrayOf(sortElementProp)]);

  return {
    className: _propTypes["default"].string,
    model: _propTypes["default"].shape({
      read: _propTypes["default"].func.isRequired,
      update: _propTypes["default"].func,
      isValidRecord: _propTypes["default"].func,
      getValidationDependency: _propTypes["default"].func,
      on: _propTypes["default"].func,
      off: _propTypes["default"].func
    }),
    columns: _propTypes["default"].object,
    viewColumns: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].object]),
    selected: _propTypes["default"].array,
    // sort: PropTypes.object,
    page: _propTypes["default"].number,
    defaultViewCount: _propTypes["default"].number,
    viewCount: _propTypes["default"].number,
    viewVariants: _propTypes["default"].arrayOf(_propTypes["default"].number),
    onChangeViewCount: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    onError: _propTypes["default"].func,
    onPageLoad: _propTypes["default"].func,
    onInit: _propTypes["default"].func,
    onDestroy: _propTypes["default"].func,
    autoSubmit: _propTypes["default"].bool,
    height: _propTypes["default"].number,
    onSelectedChange: _propTypes["default"].func,
    onSorting: _propTypes["default"].func,
    multipleSorting: _propTypes["default"].bool,
    selectAllStatus: _propTypes["default"].any,
    statuses: _propTypes["default"].any,
    onToggleSelected: _propTypes["default"].func,
    onToggleSelectAll: _propTypes["default"].func,
    defaultSort: function defaultSort(props, propName) {
      if (!props.defaultSort) {
        return;
      }

      for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (props.hasOwnProperty('sort')) {
        return Error('You can not set "defaultSort" when the "sort" prop is specified');
      }
    },
    sort: function sort(props, propName) {
      if (!props.sort) {
        return;
      }

      for (var _len2 = arguments.length, rest = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
      }

      var validProp = sortProp.apply(void 0, [props, propName].concat(rest));

      if (validProp) {
        return validProp;
      }

      if (!props.onSorting) {
        return Error('You need to define the "onSorting" prop when "sort" is set');
      }
    },
    saveFullRecord: _propTypes["default"].bool,
    partialErrorChecking: _propTypes["default"].bool,
    warningsValidator: _propTypes["default"].shape({
      isValidRecord: _propTypes["default"].func,
      getValidationDependency: _propTypes["default"].func
    }),
    pageSizeLabel: _propTypes["default"].string
  };
}();

var defaultProps = {
  page: 0,
  defaultViewCount: 0,
  partialErrorChecking: false,
  selected: [],
  pageSizeLabel: 'Page Size'
};

var GridComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(GridComponent, _React$Component);

  var _super = _createSuper(GridComponent);

  function GridComponent(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      page: _this.props.page,
      viewCount: _this.props.defaultViewCount,
      count: 0,
      statuses: _this.props.statuses || new _EqualMap["default"](),
      sort: _this._getDefaultSort(),
      data: null,
      extra: new _EqualMap["default"](),
      changes: new _EqualMap["default"](),
      warnings: new _EqualMap["default"](),
      errors: new _EqualMap["default"](),
      totals: {},
      partialErrorChecking: _this.props.partialErrorChecking,
      editor: {},
      colsWithEscapeErrors: {},
      selectBlackListMode: false,
      selected: (0, _toConsumableArray2["default"])(_this.props.selected),
      showLoader: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateTable", function () {
      var throttled = (0, _utils.throttle)( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var viewCount, loadedData, page, data, extra, recordIds;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  showLoader: true
                });

                if (_this.props.model) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                viewCount = _this.getViewCount();
                _context.prev = 4;
                _context.next = 7;
                return _this._loadData({
                  limit: viewCount,
                  offset: _this.state.page * viewCount,
                  sort: _this._sortingToArray(),
                  fields: _this._getFieldsToRender(),
                  extra: (0, _toConsumableArray2["default"])(_this._getAdditionalIds())
                });

              case 7:
                loadedData = _context.sent;
                _context.next = 16;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);

                if (_this._isMounted) {
                  _this.setState({
                    showLoader: false
                  });
                }

                if (_context.t0 instanceof _ThrottleError["default"]) {
                  _context.next = 15;
                  break;
                }

                throw _context.t0;

              case 15:
                return _context.abrupt("return");

              case 16:
                if (_this._isMounted) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return");

              case 18:
                if (!(_this.getViewCount() && !loadedData.hasOwnProperty('count'))) {
                  _context.next = 20;
                  break;
                }

                throw new Error('Incorrect response from GridModel. "response.count" not defined');

              case 20:
                // If required page is not included in the range of existing pages,
                // request existing in a moment page
                page = _this._checkPage(_this.state.page, _this.getViewCount(), loadedData.count);

                if (!(page !== _this.state.page)) {
                  _context.next = 25;
                  break;
                }

                _this.state.page = page;

                _this.updateTable();

                return _context.abrupt("return");

              case 25:
                data = new _EqualMap["default"](loadedData.records || []);
                extra = new _EqualMap["default"]((loadedData.extraRecords || []).filter(function (_ref2) {
                  var _ref3 = (0, _slicedToArray2["default"])(_ref2, 1),
                      recordId = _ref3[0];

                  return !data.has(recordId);
                }));
                recordIds = [].concat((0, _toConsumableArray2["default"])(data.keys()), (0, _toConsumableArray2["default"])(extra.keys()));

                _this.setState({
                  data: data,
                  extra: extra,
                  count: loadedData.count,
                  totals: loadedData.totals,
                  errors: _this._pick(_this.state.errors, recordIds),
                  changes: _this._pick(_this.state.changes, recordIds),
                  showLoader: false
                }, function () {
                  if (_this.props.onPageLoad) {
                    _this.props.onPageLoad(loadedData);
                  }
                });

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      })));
      return function () {
        return throttled.apply(void 0, arguments)["catch"](function (error) {
          if (!(error instanceof _ThrottleError["default"])) {
            throw error;
          }
        });
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onRecordsCreated", /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(recordIds) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!Array.isArray(recordIds)) {
                  console.warn('Not array recordsIds in "create" event is deprecated');
                  recordIds = [recordIds];
                }

                _this.updateTable().then(function () {
                  return Promise.all(recordIds.map( /*#__PURE__*/function () {
                    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(recordId) {
                      return _regenerator["default"].wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              if (_this._isRecordLoaded(recordId)) {
                                _context2.next = 2;
                                break;
                              }

                              return _context2.abrupt("return");

                            case 2:
                              _context2.prev = 2;
                              _context2.next = 5;
                              return _this._checkWarnings(recordId);

                            case 5:
                              _context2.next = 11;
                              break;

                            case 7:
                              _context2.prev = 7;
                              _context2.t0 = _context2["catch"](2);

                              if (_context2.t0 instanceof _ThrottleError["default"]) {
                                _context2.next = 11;
                                break;
                              }

                              throw _context2.t0;

                            case 11:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, null, [[2, 7]]);
                    }));

                    return function (_x2) {
                      return _ref5.apply(this, arguments);
                    };
                  }()));
                })["catch"](_this.props.onError);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getRecordWithChanges", function (recordId) {
      if (_this.state.data.has(recordId)) {
        return _objectSpread(_objectSpread({}, _this.state.data.get(recordId)), _this.state.changes.get(recordId));
      }

      if (_this.state.extra.has(recordId)) {
        return _objectSpread(_objectSpread({}, _this.state.extra.get(recordId)), _this.state.changes.get(recordId));
      }

      return null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setData", /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(changes) {
        var _iterator, _step, _step$value, recordId, data;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Apply all changes
                _iterator = _createForOfIteratorHelper(changes);
                _context4.prev = 1;

                _iterator.s();

              case 3:
                if ((_step = _iterator.n()).done) {
                  _context4.next = 19;
                  break;
                }

                _step$value = (0, _slicedToArray2["default"])(_step.value, 2), recordId = _step$value[0], data = _step$value[1];

                if (_this._isRecordLoaded(recordId)) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("continue", 17);

              case 7:
                // Firstly we update the state
                _this._setRecordData(recordId, data); // Then we validate the updated data in state


                _context4.prev = 8;
                _context4.next = 11;
                return _this._checkWarnings(recordId);

              case 11:
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](8);

                if (_context4.t0 instanceof _ThrottleError["default"]) {
                  _context4.next = 17;
                  break;
                }

                throw _context4.t0;

              case 17:
                _context4.next = 3;
                break;

              case 19:
                _context4.next = 24;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t1 = _context4["catch"](1);

                _iterator.e(_context4.t1);

              case 24:
                _context4.prev = 24;

                _iterator.f();

                return _context4.finish(24);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 21, 24, 27], [8, 13]]);
      }));

      return function (_x3) {
        return _ref6.apply(this, arguments);
      };
    }());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "createEditor", function (event, recordId, colId, ref) {
      // preventing of creating editor on same cell as it is
      if (recordId === _this.state.editor.recordId && colId === _this.state.editor.column) {
        return;
      }

      var record = _this._getRecordWithChanges(recordId);

      var columnConfig = _this.props.columns[colId];

      var binds = _this._getBindParam(colId);

      var value = (0, _utils.at)(record, binds); // Trigger click handler on the table configuration

      if (ref) {
        columnConfig.onClickRefs[ref](event, recordId, record, (0, _assertThisInitialized2["default"])(_this));
      } else if (columnConfig.onClick) {
        columnConfig.onClick(event, recordId, record, (0, _assertThisInitialized2["default"])(_this));
      }

      var editor = _this.props.columns[colId].editor;

      if (!editor) {
        return;
      }

      var editorContext = {
        updateField: function updateField(field, nextValue) {
          _this._setRowChanges(recordId, (0, _defineProperty2["default"])({}, field, nextValue));
        },
        set: function set(changes) {
          _this._setRowChanges(recordId, changes);
        }
      };
      editorContext.props = {
        onChange: function onChange(values) {
          _this._onChangeEditor(recordId, colId, values, editorContext);
        },
        onFocus: function onFocus() {
          _this._onFocusEditor(recordId, colId);
        },
        onBlur: function onBlur() {
          // Remove Editor
          _this._onBlurEditor(recordId);
        },
        onKeyUp: function onKeyUp(e) {
          if ([ENTER_KEY, ESCAPE_KEY].includes(e.keyCode)) {
            _this.setState({
              editor: {}
            }, function () {
              if (e.keyCode === ESCAPE_KEY) {
                _this._setRowChanges(recordId, (0, _defineProperty2["default"])({}, colId, value[0]));
              }

              _this._onBlurEditor(recordId);
            });
          }
        },
        value: value[0]
      };
      var element = editor.call(editorContext, record, (0, _assertThisInitialized2["default"])(_this));

      if (element) {
        _this.setState({
          editor: {
            element: element,
            recordId: recordId,
            column: colId
          }
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getRecordChanges", function (recordId) {
      if (_this.state.changes.has(recordId)) {
        return (0, _utils.cloneDeep)(_this.state.changes.get(recordId));
      }

      return {};
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleNextPage", function () {
      _this.setPage(_this.state.page + 1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePrevPage", function () {
      _this.setPage(_this.state.page - 1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleChangeViewCount", function (viewCount) {
      if (_this._isViewCountPropsMode()) {
        _this.props.onChangeViewCount(viewCount);

        return;
      }

      _this.setViewCount(viewCount);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleColumnClick", function (column) {
      var sortCycle = _this.props.columns[column].sortCycle;

      if (!sortCycle) {
        return;
      }

      var newOrder;
      var newSorts = (0, _utils.clone)(_this.getSortDirection());
      var sortElement = {
        column: column
      };
      var currentSortIndex;
      var currentSort;

      if (_this.props.multipleSorting) {
        // Find an element among the other sorts
        currentSortIndex = (0, _utils.findIndex)(newSorts, function (sort) {
          return sort.column === column;
        });

        if (currentSortIndex >= 0) {
          currentSort = newSorts[currentSortIndex]; // Determine the direction of sorting

          if (currentSortIndex < newSorts.length - 1) {
            newOrder = sortCycle[0];
          } else {
            // If the item is the last one, select the next direction of sorting
            newOrder = sortCycle[(sortCycle.indexOf(currentSort.direction) + 1) % sortCycle.length];
          }

          if (newOrder === 'default') {
            // Remove item from the sorts
            newSorts.splice(currentSortIndex, 1);
          } else if (currentSortIndex === newSorts.length - 1) {
            // Set new direction, if the last element
            currentSort.direction = newOrder;
          } else {
            // Move the item to the end, if it is already in sorts
            newSorts.splice(currentSortIndex, 1);
            sortElement.direction = newOrder;
            newSorts.push(sortElement);
          }
        } else {
          // Add new element
          sortElement.direction = newOrder = sortCycle[0];
          newSorts.push(sortElement);
        }
      } else {
        if (newSorts && newSorts.column === column) {
          // Select the next direction of sorting
          newOrder = sortCycle[(sortCycle.indexOf(newSorts.direction) + 1) % sortCycle.length];
        } else {
          newOrder = sortCycle[0];
        }

        if (newOrder === 'default') {
          newSorts = null;
        } else {
          sortElement.direction = newOrder;
          newSorts = sortElement;
        }
      }

      if (_this.props.onSorting) {
        _this.props.onSorting(newSorts, column, newOrder);
      }

      if (!_this._isSortingPropsMode()) {
        _this.state.sort = newSorts;

        _this.setPage(0);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFirstPage", function () {
      _this.setPage(0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleLastPage", function () {
      _this.setPage(_this.getPagesCount() - 1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRefreshTable", function () {
      _this.updateTable();
    });
    _this._statusesOnlyViaPropsEnabled = Boolean(props.statuses);
    _this._validateRow = (0, _utils.throttle)(_this._validateRow.bind((0, _assertThisInitialized2["default"])(_this)));

    if (_this.props.onInit) {
      _this.props.onInit();
    }

    return _this;
  }

  (0, _createClass2["default"])(GridComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      if (this.props.model) {
        this.props.model.on('create', this._onRecordsCreated);
        this.props.model.on('update', this._setData);
        this.props.model.on('delete', this.updateTable);
      }

      this.updateTable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;

      if (this.props.model) {
        this.props.model.off('create', this._onRecordsCreated);
        this.props.model.off('update', this._setData);
        this.props.model.off('delete', this.updateTable);
      }

      if (this.props.onDestroy) {
        this.props.onDestroy();
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var reset = new Set();

      if (this.props.model !== nextProps.model) {
        reset.add(RESET_MODEL);
      }

      if (this.props.viewColumns !== nextProps.viewColumns) {
        reset.add(RESET_VIEW_COLUMNS);
      }

      if (!(0, _utils.isEqual)(this.props.sort, nextProps.sort)) {
        reset.add(RESET_SORT);
      }

      if (this.props.viewCount !== nextProps.viewCount) {
        reset.add(RESET_VIEW_COUNT);
      }

      if (!(0, _utils.isEqual)(this.props.selected, nextProps.selected) || this.props.selectBlackListMode !== nextProps.selectBlackListMode) {
        reset.add(RESET_SELECTED_COLUMNS);
      }

      if (!(0, _utils.isEqual)(this.props.blackListMode, nextProps.blackListMode)) {
        reset.add(RESET_BLACK_LIST_MODE);
      }

      if (this._statusesOnlyViaPropsEnabled && this.props.statuses !== nextProps.statuses) {
        reset.add(RESET_STATUSES);
      }

      if (!reset.size) {
        return;
      }

      if (reset.has(RESET_SELECTED_COLUMNS)) {
        this.state.selected = (0, _toConsumableArray2["default"])(nextProps.selected);
      }

      if (reset.has(RESET_VIEW_COLUMNS)) {
        this.state.viewColumns = nextProps.viewColumns;
      }

      if (reset.has(RESET_BLACK_LIST_MODE)) {
        this.state.selectBlackListMode = !this.state.selectBlackListMode;
      }

      if (reset.has(RESET_MODEL) || reset.has(RESET_SORT)) {
        this._setPage(0);
      }

      if (reset.has(RESET_MODEL)) {
        this.state.data = null;

        if (this.props.model) {
          this.props.model.off('create', this._onRecordsCreated);
          this.props.model.off('update', this._setData);
        }

        if (nextProps.model) {
          nextProps.model.on('create', this._onRecordsCreated);
          nextProps.model.on('update', this._setData);
        }
      }

      var needUpdateTable = reset.has(RESET_MODEL) || reset.has(RESET_SORT) || reset.has(RESET_VIEW_COUNT);
      var nextStatuses = this.state.statuses;

      if (reset.has(RESET_STATUSES)) {
        nextStatuses = nextProps.statuses;

        if (!needUpdateTable) {
          var _iterator2 = _createForOfIteratorHelper(nextStatuses.keys()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var recordId = _step2.value;

              if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
                needUpdateTable = true;
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        if (!needUpdateTable) {
          var needRemoveRecordIds = [];

          var _iterator3 = _createForOfIteratorHelper(this._getRecordsWithStatus()),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var oldStatusRecordId = _step3.value;

              if (!nextStatuses.has(oldStatusRecordId) && !this.state.changes.has(oldStatusRecordId)) {
                needRemoveRecordIds.push(oldStatusRecordId);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          this._removeExtraRecords(needRemoveRecordIds);
        }
      }

      this.setState({
        statuses: nextStatuses
      }, function () {
        if (needUpdateTable) {
          _this2.updateTable()["catch"](function (err) {
            console.error(err);
          });
        }
      });
    }
    /**
     * Fetch server data
     */

  }, {
    key: "_loadData",
    value:
    /**
     * Load model data
     *
     * @param {Object}      settings    Request parameters
     * @private
     */
    function () {
      var _loadData2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(settings) {
        var data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.props.model.read(settings);

              case 3:
                data = _context5.sent;
                _context5.next = 10;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);

                if (_context5.t0 && this.props.onError) {
                  this.props.onError(_context5.t0);
                }

                throw _context5.t0;

              case 10:
                return _context5.abrupt("return", data);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function _loadData(_x4) {
        return _loadData2.apply(this, arguments);
      }

      return _loadData;
    }()
    /**
     * Find record IDs that need to be displayed additionally
     *
     * @returns {Array} Additional IDs array
     * @private
     */

  }, {
    key: "_getAdditionalIds",
    value: function _getAdditionalIds() {
      var additionalIds = this._getRecordsWithStatus();

      var _iterator4 = _createForOfIteratorHelper(this.state.changes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 1),
              recordId = _step4$value[0];

          additionalIds.add(recordId);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return additionalIds;
    }
    /**
     * Get the names of the parameters that are required to display the grid
     *
     * @return {string[]}
     * @private
     */

  }, {
    key: "_getFieldsToRender",
    value: function _getFieldsToRender() {
      var i;
      var cols = this.props.columns;
      var columns = [];

      for (i in cols) {
        columns = (0, _utils.union)(columns, cols[i].render.slice(0, cols[i].render.length - 1));
      }

      return columns;
    }
    /**
     * Get current records selection mode
     *
     * @returns {boolean} Records selection mode. true - Blacklist; false - Whitelist
     */

  }, {
    key: "isSelectBlackMode",
    value: function isSelectBlackMode() {
      return this.state.selectBlackListMode;
    }
    /**
     * Unselect all records status
     * Switches records selection mode to "whitelist"
     */

  }, {
    key: "unselectAll",
    value: function unselectAll() {
      var _this3 = this;

      this.setState({
        selected: [],
        selectBlackListMode: false
      }, function () {
        _this3._emitChangeSelectedNum();
      });
    }
    /**
     * Convert sorting to array
     *
     * @return {Object[]|Object} sorts
     * @private
     */

  }, {
    key: "_sortingToArray",
    value: function _sortingToArray() {
      function toArray(sort) {
        return [sort.column, sort.direction];
      }

      var direction = this.getSortDirection();

      if (!direction) {
        return null;
      }

      if (this.props.multipleSorting) {
        if (!direction.length) {
          return null;
        }

        return direction.map(toArray);
      }

      return [toArray(direction)];
    }
    /**
     * Get record IDs that have a status
     *
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getRecordsWithStatus",
    value: function _getRecordsWithStatus() {
      var ids = new Set([]);

      var _iterator5 = _createForOfIteratorHelper(this.state.statuses),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 1),
              key = _step5$value[0];

          ids.add(key);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return ids;
    }
    /**
     * Get record data
     *
     * @param {*} recordId Record ID
     * @returns {Object}
     */

  }, {
    key: "getRecord",
    value: function getRecord(recordId) {
      if (!this.state.data.has(recordId)) {
        throw new Error('Record with the ID is not contained in the table.');
      }

      return (0, _utils.cloneDeep)(this._getRecordWithChanges(recordId));
    }
    /**
     * Get record changes object
     *
     * @param   {*} recordId Record ID
     * @return  {Object}
     */

  }, {
    key: "getRecordChanges",
    value: function getRecordChanges(recordId) {
      return this._getRecordChanges(recordId);
    }
  }, {
    key: "getRecordWarnings",
    value: function getRecordWarnings(recordId) {
      return this.state.warnings.get(recordId) || new _ValidationErrors["default"]();
    }
    /**
     * Get record errors object
     *
     * @param   {*} recordId  Record ID
     * @returns  {ValidationErrors}
     * @private
     */

  }, {
    key: "getRecordErrors",
    value: function getRecordErrors(recordId) {
      return this.state.errors.get(recordId) || new _ValidationErrors["default"]();
    }
    /**
     * Get validation errors
     *
     * @return {Array|null}
     */

  }, {
    key: "getErrors",
    value: function getErrors() {
      var result = (0, _toConsumableArray2["default"])(this.state.errors.entries());
      return result.length ? result : null;
    }
    /**
     * Get table model
     *
     * @returns {AbstractGridModel}
     */

  }, {
    key: "getModel",
    value: function getModel() {
      return this.props.model;
    }
  }, {
    key: "_pick",
    value: function _pick(map, keys, defaultValue) {
      return keys.reduce(function (result, key) {
        if (map.has(key)) {
          result.set(key, map.get(key));
        } else if (defaultValue !== undefined) {
          result.set(key, defaultValue);
        }

        return result;
      }, new _EqualMap["default"]());
    }
    /**
     * Get record with changes
     *
     * @param   {*} recordId  Record ID
     * @returns {Object}
     */

  }, {
    key: "_setRowChanges",
    value:
    /**
     * Pass changes to the table
     * This method marks changed fields
     *
     * @param {*}      recordId    Record ID
     * @param {Object}     data    Changed data
     * @private
     */
    function _setRowChanges(recordId, data) {
      var _this4 = this;

      this.setState(function (state, props) {
        var changes = (0, _utils.cloneDeep)(state.changes);
        changes.set(recordId, (0, _utils.getRecordChanges)(props.model, state.data.get(recordId) || state.extra.get(recordId), changes.get(recordId), data));

        if ((0, _utils.isEmpty)(changes.get(recordId))) {
          changes["delete"](recordId);
        }

        return {
          changes: changes
        };
      }, function () {
        if (_this4.props.onChange) {
          _this4.props.onChange(_this4.state.changes, _this4.state.data);
        }
      });
    }
    /**
     * Clear record changes
     *
     * @param {*} recordId Record ID
     */

  }, {
    key: "clearRecordChanges",
    value: function clearRecordChanges(recordId) {
      var _this5 = this;

      var changes = (0, _utils.cloneDeep)(this.state.changes);
      var warnings = (0, _utils.cloneDeep)(this.state.warnings);
      var errors = (0, _utils.cloneDeep)(this.state.errors);
      changes["delete"](recordId);
      warnings["delete"](recordId);
      errors["delete"](recordId);
      this.setState({
        errors: errors,
        changes: changes,
        warnings: warnings
      }, function () {
        _this5._removeExtraRecordIfNeed(recordId);

        if (_this5.props.onChange) {
          _this5.props.onChange(_this5.state.changes, _this5.state.data);
        }
      });
    }
    /**
     * Change table record
     * This method marks changed fields and validates them
     *
     * @param {*}         recordId      Record ID
     * @param {Object}    recordChanges Changed data
     * @param {Boolean}   validate      Is validation needed
     */

  }, {
    key: "set",
    value: function set(recordId, recordChanges) {
      var _this6 = this;

      var validate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var allChanges = (0, _utils.cloneDeep)(this.state.changes);
      var filteredRecordChanges = (0, _utils.getRecordChanges)(this.props.model, this.state.data.get(recordId) || this.state.extra.get(recordId), allChanges.get(recordId), recordChanges);
      allChanges.set(recordId, filteredRecordChanges);

      if ((0, _utils.isEmpty)(allChanges.get(recordId))) {
        allChanges["delete"](recordId);
      }

      if (this.props.onChange) {
        this.props.onChange(this.state.changes, this.state.data);
      }

      this.setState({
        changes: allChanges
      }, function () {
        if (_this6.props.autoSubmit) {
          _this6.save();
        } else if (validate) {
          _this6._validateRow(recordId);
        } else if (_this6.props.onChange) {
          _this6.props.onChange(_this6.state.changes, _this6.state.data);
        }
      });
    }
    /**
     * Save grid changes
     */

  }, {
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        var _this7 = this,
            _context6;

        var errors, changes, data, unhandledErrors, _iterator6, _step6, _loop, _ret, errorHandler;

        return _regenerator["default"].wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                errors = (0, _utils.cloneDeep)(this.state.errors);
                changes = (0, _utils.cloneDeep)(this.state.changes); // Cancel new record display

                this.removeRecordStatusAll('new');
                _context7.next = 5;
                return this.props.model.update(this._dataMapToArray(changes));

              case 5:
                data = _context7.sent;

                if (this._isMounted) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return");

              case 8:
                this.state.partialErrorChecking = false;
                unhandledErrors = [];
                _iterator6 = _createForOfIteratorHelper(data);
                _context7.prev = 11;

                _loop = function _loop() {
                  var record = _step6.value;

                  var recordId = _this7._getRowID(record[0]); // Skip records that are user changed while data processing


                  if (!(0, _utils.isEqual)(changes.get(recordId), changes.get(recordId))) {
                    return "continue";
                  }

                  if (record[1] instanceof Error) {
                    unhandledErrors.push(record[1]);
                    return "continue";
                  } // Process validation errors


                  if (record[1] instanceof _ValidationErrors["default"]) {
                    errors.set(recordId, record[1]);
                    return "continue";
                  } // Cancel changed data status of the parameters, that are changed


                  (0, _utils.forEach)(changes.get(recordId), function (value, field) {
                    if ((0, _utils.isEqual)(value, changes.get(recordId)[field])) {
                      delete changes.get(recordId)[field];
                    }
                  }); // Clear changed data row if it's empty

                  if ((0, _utils.isEmpty)(changes.get(recordId))) {
                    changes["delete"](recordId);

                    if (_this7.state.extra.has(recordId)) {
                      _this7._removeExtraRecord(recordId);
                    }
                  }
                };

                _iterator6.s();

              case 14:
                if ((_step6 = _iterator6.n()).done) {
                  _context7.next = 20;
                  break;
                }

                _ret = _loop();

                if (!(_ret === "continue")) {
                  _context7.next = 18;
                  break;
                }

                return _context7.abrupt("continue", 18);

              case 18:
                _context7.next = 14;
                break;

              case 20:
                _context7.next = 25;
                break;

              case 22:
                _context7.prev = 22;
                _context7.t0 = _context7["catch"](11);

                _iterator6.e(_context7.t0);

              case 25:
                _context7.prev = 25;

                _iterator6.f();

                return _context7.finish(25);

              case 28:
                this.setState({
                  errors: errors,
                  changes: changes
                }, function () {
                  if (_this7.props.onChange) {
                    _this7.props.onChange(changes, _this7.state.data);
                  }
                });
                errorHandler = this.props.onError || (_context6 = console).error.bind(_context6);
                unhandledErrors.forEach(function (error) {
                  return errorHandler(error);
                });

              case 31:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, this, [[11, 22, 25, 28]]);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
    /**
     * Remove record
     *
     * @param {*}  recordId  Record ID
     * @private
     */

  }, {
    key: "_removeExtraRecord",
    value: function _removeExtraRecord(recordId) {
      return this._removeExtraRecords([recordId]);
    }
  }, {
    key: "_removeExtraRecords",
    value: function _removeExtraRecords(recordIds) {
      var _this8 = this;

      if (!recordIds.length) {
        return;
      }

      var changes = (0, _utils.cloneDeep)(this.state.changes);
      var warnings = (0, _utils.cloneDeep)(this.state.warnings);
      var errors = (0, _utils.cloneDeep)(this.state.errors);
      var extra = (0, _utils.cloneDeep)(this.state.extra);
      var editor = (0, _utils.cloneDeep)(this.state.editor);
      var touchedChangesExists = false;

      var _iterator7 = _createForOfIteratorHelper(recordIds),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var recordId = _step7.value;
          touchedChangesExists = touchedChangesExists || Boolean(changes.get(recordId));
          this.unselectRecord(recordId);
          extra["delete"](recordId);
          changes["delete"](recordId);
          warnings["delete"](recordId);
          errors["delete"](recordId);

          if (editor.recordId === recordId) {
            editor = {};
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      this.setState({
        changes: changes,
        extra: extra,
        warnings: warnings,
        errors: errors,
        editor: editor
      }, function () {
        if (touchedChangesExists && _this8.props.onChange) {
          _this8.props.onChange(_this8.state.changes, _this8.state.data);
        }
      });
    }
    /**
     * Unselect record
     *
     * @param {number|string}   recordId                    Record ID
     * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
     */

  }, {
    key: "unselectRecord",
    value: function unselectRecord(recordId, ignoreBlackList) {
      var _this9 = this;

      this.setState(function (state) {
        var selected = (0, _toConsumableArray2["default"])(state.selected);

        if (state.selectBlackListMode && !ignoreBlackList) {
          _this9.selectRecord(recordId, true);

          return null;
        }

        var pos = (0, _utils.indexOf)(selected, recordId);

        if (pos >= 0) {
          selected.splice(pos, 1);
        }

        return {
          selected: selected
        };
      }, function () {
        _this9._emitChangeSelectedNum();
      });
    }
    /**
     * Trigger selected records count change handler
     *
     * @private
     */

  }, {
    key: "_emitChangeSelectedNum",
    value: function _emitChangeSelectedNum() {
      if (this.props.onSelectedChange) {
        var selectedCount = this.state.selected.length;

        if (this.state.selectBlackListMode) {
          selectedCount = this.getCountRecords() - selectedCount;
        }

        this.props.onSelectedChange(this.getAllSelected(), selectedCount);
      }
    }
    /**
     * Select a record
     *
     * @param {*}    recordId       Record ID
     * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
     */

  }, {
    key: "selectRecord",
    value: function selectRecord(recordId, ignoreBlackList) {
      var _this10 = this;

      this.setState(function (state) {
        var selected = (0, _toConsumableArray2["default"])(state.selected);

        if (state.selectBlackListMode && !ignoreBlackList) {
          _this10.unselectRecord(recordId, true);

          return null;
        }

        if ((0, _utils.indexOf)(selected, recordId) < 0) {
          selected.push(recordId);

          if (selected.length === state.count) {
            if (state.selectBlackListMode) {
              _this10.unselectAll();
            } else {
              _this10.selectAll();
            }

            return null;
          }
        }

        return {
          selected: selected
        };
      }, function () {
        _this10._emitChangeSelectedNum();
      });
    }
    /**
     * Select all records
     * Switches records selection mode to "blacklist"
     */

  }, {
    key: "selectAll",
    value: function selectAll() {
      var _this11 = this;

      this.setState({
        selectBlackListMode: true,
        selected: []
      }, function () {
        _this11._emitChangeSelectedNum();
      });
    }
  }, {
    key: "getSelectAllStatus",
    value: function getSelectAllStatus() {
      return this.props.selectAllStatus;
    }
    /**
     * Set table data
     *
     * @param {Array}  changes  Changes
     * @private
     */

  }, {
    key: "_setRecordData",
    value:
    /**
     * Set record data
     *
     * @param {*}       recordId  Record ID
     * @param {Object}  data      Data
     * @private
     */
    function _setRecordData(recordId, data) {
      if (!this._isRecordLoaded(recordId)) {
        return;
      }

      this.setState(function (state) {
        state.data = new _EqualMap["default"]((0, _toConsumableArray2["default"])(state.data).map(function (_ref7) {
          var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
              dataRecordId = _ref8[0],
              record = _ref8[1];

          if (!(0, _utils.isEqual)(recordId, dataRecordId)) {
            return [dataRecordId, record];
          }

          return [dataRecordId, _objectSpread(_objectSpread({}, record), data)];
        }));
        return state;
      });
    }
    /**
     * Is record loaded
     *
     * @param {*}       recordId  Record ID
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isRecordLoaded",
    value: function _isRecordLoaded(recordId) {
      if (!this.state.data) {
        return false;
      }

      return this.state.data.has(recordId);
    }
    /**
     * Is extra record loaded
     *
     * @param {*}       recordId  Record ID
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isExtraRecordLoaded",
    value: function _isExtraRecordLoaded(recordId) {
      return this.state.extra.has(recordId);
    }
    /**
     * Get row ID
     *
     * @param {*}       recordId  Record ID
     * @returns {*}
     * @private
     */

  }, {
    key: "_getRowID",
    value: function _getRowID(recordId) {
      if (!this.state.data.has(recordId) && !this.state.extra.has(recordId)) {
        throw new Error('Record with the ID is not contained in the table.');
      }

      return recordId;
    }
    /**
     * Clear all table changes
     */

  }, {
    key: "clearAllChanges",
    value: function clearAllChanges() {
      var _this12 = this;

      var nextProps = {
        extra: new _EqualMap["default"](),
        changes: new _EqualMap["default"](),
        warnings: new _EqualMap["default"](),
        errors: new _EqualMap["default"](),
        partialErrorChecking: this.props.partialErrorChecking
      };

      if (!this._statusesOnlyViaPropsEnabled) {
        nextProps.statuses = new _EqualMap["default"]();
      }

      this.setState(nextProps, function () {
        if (_this12.props.onChange) {
          _this12.props.onChange(_this12.state.changes, _this12.state.data);
        }
      });
    }
    /**
     * Reset to initial table state
     */

  }, {
    key: "reset",
    value: function reset() {
      this._setPage(0);

      if (!this._isSortingPropsMode()) {
        this._resetSorting();
      }

      this.updateTable();
    }
    /**
     * Reset to default sort parameters
     * @private
     */

  }, {
    key: "_resetSorting",
    value: function _resetSorting() {
      var sort = this._getDefaultSort();

      if (this._isSortingPropsMode()) {
        this.onSorting(sort);
        return;
      }

      this.state.sort = sort;
    }
    /**
     * Reset to default sort parameters
     */

  }, {
    key: "resetSorting",
    value: function resetSorting() {
      if (this._isSortingPropsMode()) {
        throw new Error('You can not use function "resetSorting" when set prop "sort"');
      }

      this._resetSorting();

      this.updateTable();
    }
    /**
     * Get initial sort state
     *
     * @returns {Array} Initial sort state
     * @private
     */

  }, {
    key: "_getDefaultSort",
    value: function _getDefaultSort() {
      if (this.props.defaultSort) {
        return (0, _utils.cloneDeep)(this.props.defaultSort);
      }

      return null;
    }
    /**
     * Does sorting using props
     *
     * @return {boolean}
     * @private
     */

  }, {
    key: "_isSortingPropsMode",
    value: function _isSortingPropsMode() {
      return this.props.hasOwnProperty('sort');
    }
    /**
     * This method converts data object to the array with keys presented as record ID hash
     *
     * @param   {Object}  obj     Data object
     * @returns {Array}   Array result
     * @private
     */

  }, {
    key: "_dataMapToArray",
    value: function _dataMapToArray(map) {
      var arr = [];

      var _iterator8 = _createForOfIteratorHelper(map),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _step8$value = (0, _slicedToArray2["default"])(_step8.value, 2),
              recordId = _step8$value[0],
              value = _step8$value[1];

          arr.push([recordId, (0, _utils.clone)(value)]);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return arr;
    }
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

      if (!this.state.changes.has(recordId)) {
        return false;
      }

      if (fields) {
        if (!Array.isArray(fields)) {
          fields = [fields];
        }

        for (i = 0; i < fields.length; i++) {
          if (this.state.changes.get(recordId).hasOwnProperty(fields[i])) {
            return true;
          }
        }

        return false;
      }

      return true;
    }
    /**
     * Remove records status
     *
     * @deprecated
     * @param {string}      status  Status
     */

  }, {
    key: "removeRecordStatusAll",
    value: function removeRecordStatusAll(status) {
      var _this13 = this;

      console.warn('method removeRecordStatusAll deprecated');

      if (this._statusesOnlyViaPropsEnabled) {
        console.error('statuses are controlled through properties');
        return;
      }

      var checkDeletingRecordIds = new Set();
      this.setState(function (state) {
        var statuses = (0, _utils.cloneDeep)(state.statuses);

        var _iterator9 = _createForOfIteratorHelper(statuses),
            _step9;

        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = (0, _slicedToArray2["default"])(_step9.value, 2),
                recordId = _step9$value[0],
                statusSet = _step9$value[1];

            if (statusSet.has(status)) {
              statusSet["delete"](status);
            }

            if (!statusSet.size) {
              statuses["delete"](recordId);
              checkDeletingRecordIds.add(recordId);
            }
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }

        return {
          statuses: statuses,
          selected: status === 'selected' ? [] : state.selected
        };
      }, function () {
        var _iterator10 = _createForOfIteratorHelper(checkDeletingRecordIds),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var recordId = _step10.value;

            _this13._removeExtraRecordIfNeed(recordId);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      });
    }
    /**
     * Select only these records
     *
     * @param {Array}   selectedIds       Record IDs
     * @param {boolean} [blackListMode]   Is black list mode
     */

  }, {
    key: "setSelectedRecords",
    value: function setSelectedRecords(selectedIds, blackListMode) {
      var _this14 = this;

      this.setState({
        selected: (0, _utils.clone)(selectedIds),
        selectBlackListMode: blackListMode
      }, function () {
        _this14.forceUpdate();

        _this14._emitChangeSelectedNum();
      });
    }
    /**
     * Set editor on grid
     */

  }, {
    key: "_onBlurEditor",
    value: function () {
      var _onBlurEditor2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(recordId) {
        var _errors;

        return _regenerator["default"].wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.setState({
                  editor: {}
                });
                _context8.prev = 1;
                _context8.next = 4;
                return this._checkWarnings(recordId);

              case 4:
                _context8.next = 10;
                break;

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](1);

                if (_context8.t0 instanceof _ThrottleError["default"]) {
                  _context8.next = 10;
                  break;
                }

                throw _context8.t0;

              case 10:
                if (!this.props.autoSubmit) {
                  _context8.next = 14;
                  break;
                }

                _context8.next = 13;
                return this.save();

              case 13:
                return _context8.abrupt("return");

              case 14:
                _context8.prev = 14;
                _context8.next = 17;
                return this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');

              case 17:
                _errors = _context8.sent;
                this.setState({
                  errors: _errors
                });
                _context8.next = 25;
                break;

              case 21:
                _context8.prev = 21;
                _context8.t1 = _context8["catch"](14);

                if (_context8.t1 instanceof _ThrottleError["default"]) {
                  _context8.next = 25;
                  break;
                }

                throw _context8.t1;

              case 25:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, this, [[1, 6], [14, 21]]);
      }));

      function _onBlurEditor(_x5) {
        return _onBlurEditor2.apply(this, arguments);
      }

      return _onBlurEditor;
    }()
    /**
     * Validate row
     */

  }, {
    key: "_validateRow",
    value: function () {
      var _validateRow2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(recordId) {
        var errors;
        return _regenerator["default"].wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');

              case 2:
                errors = _context9.sent;
                this.setState({
                  errors: errors
                });

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee8, this);
      }));

      function _validateRow(_x6) {
        return _validateRow2.apply(this, arguments);
      }

      return _validateRow;
    }()
    /**
     * Validate row
     */

  }, {
    key: "_getValidationErrors",
    value: function () {
      var _getValidationErrors2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(recordId) {
        return _regenerator["default"].wrap(function _callee9$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._checkValidatorErrors(recordId, this.props.model, this._getRecordChanges, 'errors');

              case 2:
                return _context10.abrupt("return", _context10.sent);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee9, this);
      }));

      function _getValidationErrors(_x7) {
        return _getValidationErrors2.apply(this, arguments);
      }

      return _getValidationErrors;
    }()
    /**
     * Get record changes object
     *
     * @param   {string}        recordId     Row ID
     * @return  {Object}
     */

  }, {
    key: "_checkWarnings",
    value:
    /**
     * Check warnings
     */
    function () {
      var _checkWarnings2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(recordId) {
        var warnings;
        return _regenerator["default"].wrap(function _callee10$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.props.warningsValidator) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return");

              case 2:
                _context11.next = 4;
                return this._checkValidatorErrors(recordId, this.props.warningsValidator, this._getRecordWithChanges, 'warnings');

              case 4:
                warnings = _context11.sent;
                this.setState({
                  warnings: warnings
                });

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee10, this);
      }));

      function _checkWarnings(_x8) {
        return _checkWarnings2.apply(this, arguments);
      }

      return _checkWarnings;
    }()
    /**
     * Get current page index number
     *
     * @returns {number}
     */

  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      return this.state.page;
    }
    /**
     * Get current page count
     *
     * @returns {number}
     */

  }, {
    key: "getCountRecords",
    value: function getCountRecords() {
      return this.state.count;
    }
    /**
     * Check errors in "validator" object
     *
     * @param {string}        recordId    Row ID
     * @param {Validator}     validator   Validator object
     * @param {Function}      getData     Data provider function
     * @param {{}}            result      Validation result object
     * @private
     */

  }, {
    key: "_checkValidatorErrors",
    value: function () {
      var _checkValidatorErrors2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(recordId, validator, getData, resultField) {
        var record, validErrors, clonedResult;
        return _regenerator["default"].wrap(function _callee11$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                record = getData(recordId);
                _context12.next = 3;
                return validator.isValidRecord(record, recordId);

              case 3:
                validErrors = _context12.sent;
                clonedResult = (0, _utils.clone)(this.state[resultField]);

                if ((0, _utils.isEqual)(record, getData(recordId))) {
                  if (validErrors.isEmpty()) {
                    clonedResult["delete"](recordId);
                  } else {
                    clonedResult.set(recordId, validErrors);
                  }
                }

                return _context12.abrupt("return", clonedResult);

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee11, this);
      }));

      function _checkValidatorErrors(_x9, _x10, _x11, _x12) {
        return _checkValidatorErrors2.apply(this, arguments);
      }

      return _checkValidatorErrors;
    }()
  }, {
    key: "_onFocusEditor",
    value: function _onFocusEditor(recordId, column) {
      var errors = (0, _utils.cloneDeep)(this.state.errors);

      if (!this.state.errors.has(recordId)) {
        return;
      }

      var binds = this._getBindParam(column);

      if (!Array.isArray(binds)) {
        binds = [binds];
      }

      binds.forEach(function (field) {
        errors.get(recordId).clearField(field);
      });

      if (errors.get(recordId).isEmpty()) {
        errors["delete"](recordId);
      }

      this.setState({
        errors: errors
      });
    }
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
      return this.props.columns[id].editorField || id;
    }
  }, {
    key: "_onChangeEditor",
    value: function _onChangeEditor(recordId, column, values, editorContext) {
      values = (0, _utils.cloneDeep)((0, _utils.parseValueFromEvent)(values));

      var record = this._getRecordWithChanges(recordId);

      var context = (0, _utils.cloneDeep)(editorContext);
      context.props.value = values;
      var element = this.props.columns[column].editor.call(context, record, this);

      this._setRowChanges(recordId, (0, _defineProperty2["default"])({}, column, values));

      this.setState({
        editor: {
          element: element,
          recordId: recordId,
          column: column
        }
      });
    }
    /**
     * Move to next page event handler
     *
     */

  }, {
    key: "setPage",
    value:
    /**
     * Move to other page
     *
     * @param {number}  page     Page index number
     */
    function setPage(page) {
      this._setPage(page);

      this.updateTable();
    }
  }, {
    key: "_setPage",
    value: function _setPage(page) {
      this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
    }
  }, {
    key: "_checkPage",
    value: function _checkPage(page, view, count) {
      if (page * view >= count) {
        page = view ? Math.ceil(count / view) - 1 : 0;
      }

      return Math.max(0, page);
    }
    /**
     * Move to previous page event handler
     *
     */

  }, {
    key: "setViewCount",
    value:
    /**
     * Set displayed elements count
     *
     * @param {number} viewCount
     */
    function setViewCount(viewCount) {
      if (this._isViewCountPropsMode()) {
        throw new Error('You can not use function "setViewCount" when set prop "viewCount"');
      }

      this.state.viewCount = viewCount;
      this.state.page = this._checkPage(this.state.page, viewCount, this.state.count);
      this.updateTable();
    }
    /**
     * Get pages count
     *
     * @return {number}
     */

  }, {
    key: "getPagesCount",
    value: function getPagesCount() {
      var viewCount = this.getViewCount();
      return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
    }
  }, {
    key: "getViewCount",
    value: function getViewCount() {
      if (this._isViewCountPropsMode()) {
        return this.props.viewCount;
      }

      return this.state.viewCount;
    }
  }, {
    key: "_removeExtraRecordIfNeed",
    value: function _removeExtraRecordIfNeed(recordId) {
      if (this.state.extra.has(recordId) && !this.state.statuses.has(recordId) && !this.state.changes.has(recordId)) {
        this._removeExtraRecord(recordId);
      }
    }
  }, {
    key: "_isViewCountPropsMode",
    value: function _isViewCountPropsMode() {
      return this.props.hasOwnProperty('viewCount');
    }
    /**
     * Use column name for table sort
     *
     * @param {string} column  Column name
     * @private
     */

  }, {
    key: "addRecordStatus",
    value:
    /**
     * Add record status
     *
     * @deprecated
     * @param {*}    recordId    Record ID
     * @param {string}           status      Record status
     */
    function addRecordStatus(recordId, status) {
      var _this15 = this;

      console.warn('method addRecordStatus deprecated');

      if (this._statusesOnlyViaPropsEnabled) {
        console.error('statuses are controlled through properties');
        return;
      }

      this.setState(function (state) {
        var recordStatuses = state.statuses.get(recordId);
        var statuses = (0, _utils.cloneDeep)(state.statuses); // If list does not contain the record, mark its status as empty

        if (!recordStatuses) {
          recordStatuses = new Set();
        }

        recordStatuses.add(status);
        statuses.set(recordId, recordStatuses);
        return {
          statuses: statuses
        };
      }, function () {
        if (!_this15.state.data.has(recordId)) {
          _this15.updateTable();
        }
      });
    }
    /**
     * Add status to records group
     *
     * @deprecated
     * @param {Array}      recordIds   Record IDs array
     * @param {string}     status      Status
     */

  }, {
    key: "addRecordStatusGroup",
    value: function addRecordStatusGroup(recordIds, status) {
      var _this16 = this;

      console.warn('method addRecordStatusGroup deprecated');

      if (this._statusesOnlyViaPropsEnabled) {
        console.error('statuses are controlled through properties');
        return;
      }

      var needTableUpdate = Boolean(recordIds.length);
      this.setState(function (state) {
        var statuses = (0, _utils.cloneDeep)(state.statuses);

        var _iterator11 = _createForOfIteratorHelper(recordIds),
            _step11;

        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var recordId = _step11.value;
            var recordStatuses = statuses.get(recordId);

            if (!recordStatuses) {
              recordStatuses = new Set();
            }

            recordStatuses.add(status);
            statuses.set(recordId, recordStatuses);
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }

        return {
          statuses: statuses
        };
      }, function () {
        if (needTableUpdate) {
          _this16.updateTable();
        }
      });
    }
    /**
     * Remove record status
     *
     * @deprecated
     * @param {*}       recordId    Record ID
     * @param {string}  status      Record status
     */

  }, {
    key: "removeRecordStatus",
    value: function removeRecordStatus(recordId, status) {
      var _this17 = this;

      console.warn('method removeRecordStatus deprecated');

      if (this._statusesOnlyViaPropsEnabled) {
        console.error('statuses are controlled through properties');
        return;
      }

      var needCheckRemoveRecord;
      this.setState(function (state) {
        // Cancel method execution if record has no statuses
        if (!state.statuses.has(recordId)) {
          return null;
        }

        var statuses = (0, _utils.cloneDeep)(state.statuses);
        var recordStatuses = statuses.get(recordId); // Remove status if record has i

        if (recordStatuses.has(status)) {
          recordStatuses["delete"](status);

          if (!recordStatuses.size) {
            statuses["delete"](recordId);
            needCheckRemoveRecord = true;
          }
        }

        return {
          statuses: statuses
        };
      }, function () {
        if (needCheckRemoveRecord) {
          _this17._removeExtraRecordIfNeed(recordId);
        }
      });
    }
    /**
     * Check record status presence
     *
     * @param   {*}       recordId    Record ID
     * @param   {number}  status      Record status
     * @returns {boolean} Record has status flag
     */

  }, {
    key: "hasRecordStatus",
    value: function hasRecordStatus(recordId, status) {
      if (this.state.statuses.has(recordId)) {
        return this.state.statuses.get(recordId).has(status);
      }

      return false;
    }
    /**
     * Get all record IDs that have the status
     *
     * @param {number}  status  Status
     * @returns {Array} Record IDs array
     */

  }, {
    key: "getAllWithStatus",
    value: function getAllWithStatus(status) {
      var records = [];

      var _iterator12 = _createForOfIteratorHelper(this.state.statuses),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _step12$value = (0, _slicedToArray2["default"])(_step12.value, 2),
              recordId = _step12$value[0],
              statuses = _step12$value[1];

          if (statuses.has(status)) {
            records.push(recordId);
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      return records;
    }
    /**
     * Get all selected records
     *
     * @returns {Array}   Record IDs array
     */

  }, {
    key: "getAllSelected",
    value: function getAllSelected() {
      var selected = [];

      var _iterator13 = _createForOfIteratorHelper(this.state.selected),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var recordId = _step13.value;
          selected.push(recordId);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }

      return selected;
    }
    /**
     * Get sort direction
     *
     * @return {object|object[]}
     */

  }, {
    key: "getSortDirection",
    value: function getSortDirection() {
      if (this._isSortingPropsMode()) {
        return this.props.sort;
      }

      return this.state.sort;
    }
    /**
     * Sort by column
     *
     * @param {string} column
     * @param {string} direction
     */

  }, {
    key: "sort",
    value: function sort(column, direction) {
      if (this._isSortingPropsMode()) {
        throw new Error('You can not use function "sort" when set prop "sort"');
      }

      var sort = {
        column: column,
        direction: direction
      };

      if (this.props.multipleSorting) {
        this.state.sort.push(sort);
      } else {
        this.state.sort = sort;
      }

      this.setPage(0);

      if (this.props.onSorting) {
        this.props.onSorting(this.state.sort, column, direction);
      }
    }
    /**
     * Move to first page event handler
     *
     * @param {Event} event
     */

  }, {
    key: "_getStatuses",
    value:
    /**
     * Returns statuses Map combined with Array of selected records
     *
     * @returns {EqualMap} statuses
     */
    function _getStatuses() {
      var statuses = (0, _utils.cloneDeep)(this.state.statuses);

      if (this.state.selectBlackListMode) {
        var _iterator14 = _createForOfIteratorHelper(this.state.data),
            _step14;

        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var _step14$value = (0, _slicedToArray2["default"])(_step14.value, 1),
                recordId = _step14$value[0];

            if ((0, _utils.indexOf)(this.state.selected, recordId) < 0) {
              if (!statuses.has(recordId)) {
                statuses.set(recordId, new Set());
              }

              statuses.get(recordId).add('selected');
            }
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }

        return statuses;
      }

      var _iterator15 = _createForOfIteratorHelper(this.state.selected),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var _recordId = _step15.value;

          if (!statuses.has(_recordId)) {
            statuses.set(_recordId, new Set());
          }

          statuses.get(_recordId).add('selected');
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }

      return statuses;
    }
    /**
     * Switch records selection mode
     */

  }, {
    key: "toggleSelectAll",
    value: function toggleSelectAll() {
      if (this.props.onToggleSelectAll) {
        return this.props.onToggleSelectAll();
      }

      if (this.state.selectBlackListMode) {
        this.unselectAll();
      } else {
        this.selectAll();
      }
    }
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
      var selected = (0, _utils.indexOf)(this.state.selected, recordId) >= 0;

      if (this.state.selectBlackListMode) {
        return !selected;
      }

      return selected;
    }
    /**
     * Switch "select"
     *
     * @param {*}   recordId  Record ID
     */

  }, {
    key: "toggleSelected",
    value: function toggleSelected(recordId) {
      if (this.props.onToggleSelected) {
        return this.props.onToggleSelected(recordId);
      }

      if (this.isSelected(recordId)) {
        this.unselectRecord(recordId);
      } else {
        this.selectRecord(recordId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var gridClassNames = ['data-grid'];
      var sort = this.getSortDirection();
      var viewCount = this.getViewCount();

      var statuses = this._getStatuses();

      var _this$state = this.state,
          showLoader = _this$state.showLoader,
          totals = _this$state.totals,
          count = _this$state.count,
          page = _this$state.page,
          data = _this$state.data,
          changes = _this$state.changes,
          errors = _this$state.errors,
          warnings = _this$state.warnings,
          editor = _this$state.editor,
          extra = _this$state.extra;
      var _this$props = this.props,
          viewVariants = _this$props.viewVariants,
          viewColumns = _this$props.viewColumns;

      if (this.props.className) {
        gridClassNames.push(this.props.className);
      }

      return /*#__PURE__*/_react["default"].createElement(_PureGridComponent["default"], {
        onChangeViewCount: this.handleChangeViewCount,
        onClickFirstPage: this.handleFirstPage,
        onClickPrevPage: this.handlePrevPage,
        onClickNextPage: this.handleNextPage,
        onClickLastPage: this.handleLastPage,
        onRefreshTable: this.handleRefreshTable,
        onCellClick: this.createEditor,
        onColumnClick: this._handleColumnClick,
        height: this.props.height,
        columns: this.props.columns,
        pageSizeLabel: this.props.pageSizeLabel,
        viewCount: viewCount,
        sort: sort,
        classNames: gridClassNames,
        showLoader: showLoader,
        totals: totals,
        viewVariants: viewVariants,
        count: count,
        page: page,
        viewColumns: viewColumns,
        records: data,
        extraRecords: extra,
        statuses: statuses,
        changes: changes,
        errors: errors,
        warnings: warnings,
        editor: editor,
        grid: this
      });
    }
  }]);
  return GridComponent;
}(_react["default"].Component);

GridComponent.propTypes = propTypes;
GridComponent.defaultProps = defaultProps;
var _default = GridComponent;
exports["default"] = _default;
module.exports = exports.default;