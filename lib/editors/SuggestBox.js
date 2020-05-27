"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toPromise = _interopRequireDefault(require("../common/toPromise"));

var _utils = require("../common/utils");

var _Portal = _interopRequireDefault(require("../common/Portal"));

var _reactDom = require("react-dom");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ThrottleError = _interopRequireDefault(require("../common/ThrottleError"));

/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var popupId = '__suggestBoxPopUp';
var classes = {
  option: '__suggestBoxPopUp-option',
  optionFocused: '__suggestBoxPopUp-option-focused',
  optionSelectable: '__suggestBoxPopUp-option-selectable',
  optionTypes: {
    group: '__suggestBoxPopUp-option-group',
    header: '__suggestBoxPopUp-option-header',
    subitem: '__suggestBoxPopUp-option-subitem',
    empty: '__suggestBoxPopUp-option-empty'
  },
  searchBlock: '__suggestBox-search',
  selectBtn: '__suggestBox-select-btn',
  arrow: '__suggestBox-arrow',
  up: '__suggestBox-up'
};
var TAB_KEY = 9;
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;
var ARROW_UP_KEY = 38;
var ARROW_DOWN_KEY = 40;
var MIN_POPUP_HEIGHT = 100;

var SuggestBoxEditor =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(SuggestBoxEditor, _React$Component);

  function SuggestBoxEditor(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SuggestBoxEditor);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SuggestBoxEditor).call(this, props));
    _this._loadData = (0, _utils.throttle)(_this._loadData);
    _this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: '',
      popupStyles: {}
    };
    _this._onInputFocus = _this._onInputFocus.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onInputKeyDown = _this._onInputKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onInputValueChange = _this._onInputValueChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this._focusOption = _this._focusOption.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind((0, _assertThisInitialized2["default"])(_this));
    _this._toggleList = _this._toggleList.bind((0, _assertThisInitialized2["default"])(_this));
    _this._openList = _this._openList.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(SuggestBoxEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      if (this.props.defaultLabel) {
        this._setLabelTo(this.props.defaultLabel, true);
      } else if (this.props.hasOwnProperty('label')) {
        this._setLabelTo(this.props.label, true);
      } else {
        this._getLabelFromModel(this.props.model, this.props.value);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state !== nextState || !(0, _utils.isEqual)(this.props.value, nextProps.value) || this.props.disabled !== nextProps.disabled;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!(0, _utils.isEqual)(this.props.value, nextProps.value)) {
        if (!this.props.hasOwnProperty('label')) {
          this._getLabelFromModel(nextProps.model, nextProps.value);
        }
      }

      if (this.props.label !== nextProps.label) {
        this._setLabelTo(nextProps.label, true);
      }
    }
  }, {
    key: "_getOptionLabel",
    value: function _getOptionLabel(option) {
      return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
    }
  }, {
    key: "_setLabelTo",
    value: function _setLabelTo(label, markAsValid) {
      if (label === null || label === undefined) {
        label = '';
      }

      this.setState({
        label: label,
        lastValidLabel: markAsValid ? label : this.state.lastValidLabel
      });
    }
  }, {
    key: "_getLabelFromModel",
    value: function _getLabelFromModel(model, id) {
      var _this2 = this;

      if (id === null || id === undefined) {
        return this._setLabelTo('', true);
      }

      model.getLabel(id).then(function (label) {
        if (!_this2._isMounted) {
          return;
        }

        _this2._setLabelTo(label, true);
      })["catch"](function (err) {
        if (err) {
          console.error(err);
          throw err;
        }
      });
    }
  }, {
    key: "_updateList",
    value: function _updateList(searchPattern) {
      var options, content;
      return _regenerator["default"].async(function _updateList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _regenerator["default"].awrap(this._loadData(searchPattern));

            case 3:
              options = _context.sent;
              _context.next = 11;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);

              if (_context.t0 instanceof _ThrottleError["default"]) {
                _context.next = 10;
                break;
              }

              throw _context.t0;

            case 10:
              return _context.abrupt("return");

            case 11:
              if (options.length && this.props.withEmptyOption) {
                options.unshift({
                  id: null,
                  label: "\xA0" // Use this symbol for save line height

                });
              }

              if (!this._isMounted) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return _regenerator["default"].awrap(this.setState({
                options: options,
                selectedOptionKey: null,
                loading: false
              }));

            case 15:
              content = document.querySelector("".concat(popupId, " .__suggestBoxPopUp-content"));

              if (content) {
                content.style = {
                  bottom: 'auto',
                  position: 'static'
                };
              }

              this._scrollListTo();

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: "_loadData",
    value: function _loadData(searchPattern) {
      return this.props.model.read(searchPattern || '');
    }
  }, {
    key: "_openList",
    value: function _openList(searchPattern) {
      var _this3 = this;

      var focusFirstOption,
          popupStyles,
          key,
          selectedOptionKey,
          _args2 = arguments;
      return _regenerator["default"].async(function _openList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              focusFirstOption = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

              if (!(this.props.disabled || this.state.isOpened)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              popupStyles = this._getComputedPopupStyles();

              if (popupStyles) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return");

            case 6:
              _context2.next = 8;
              return _regenerator["default"].awrap((0, _toPromise["default"])(this.setState.bind(this), true)({
                isOpened: true,
                loading: true,
                popupStyles: popupStyles
              }));

            case 8:
              (0, _reactDom.findDOMNode)(this.input).select();
              _context2.next = 11;
              return _regenerator["default"].awrap(this._updateList(searchPattern));

            case 11:
              if (this.state.options.length) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return");

            case 13:
              if (!focusFirstOption) {
                _context2.next = 18;
                break;
              }

              key = this.state.options[0].type !== 'group' ? 0 : 1;
              _context2.next = 17;
              return _regenerator["default"].awrap(this._focusOption(key, true));

            case 17:
              return _context2.abrupt("return");

            case 18:
              selectedOptionKey = (0, _utils.findIndex)(this.state.options, function (option) {
                return (0, _utils.isEqual)(option.id, _this3.props.value);
              });

              if (selectedOptionKey !== -1) {
                this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
              }

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_onInputFocus",
    value: function _onInputFocus(e) {
      return _regenerator["default"].async(function _onInputFocus$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(this._openList());

            case 2:
              if (this._isMounted) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return");

            case 4:
              (0, _reactDom.findDOMNode)(this.input).select();

              if (this.props.onFocus) {
                this.props.onFocus(e);
              }

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_closeList",
    value: function _closeList(shouldBlur) {
      if (shouldBlur) {
        (0, _reactDom.findDOMNode)(this.input).blur();
      }

      if (!this.state.isOpened || !this._isMounted) {
        return;
      }

      this.setState({
        options: [],
        selectedOptionKey: null,
        isOpened: false
      });
    }
  }, {
    key: "_toggleList",
    value: function _toggleList() {
      return _regenerator["default"].async(function _toggleList$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.state.isOpened) {
                _context4.next = 4;
                break;
              }

              this._closeList();

              _context4.next = 6;
              break;

            case 4:
              _context4.next = 6;
              return _regenerator["default"].awrap(this._openList());

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_selectOption",
    value: function _selectOption(option) {
      option = option || {
        id: null,
        label: '',
        metadata: {}
      };
      this.props.onChange(option.id, option);

      if (this.props.onLabelChange) {
        this.props.onLabelChange(option.label);
      }

      if (this.props.onMetadataChange) {
        this.props.onMetadataChange(option.metadata);
      }

      (0, _reactDom.findDOMNode)(this.input).select();
    }
  }, {
    key: "_focusOption",
    value: function _focusOption(key, shouldSetLabel) {
      return _regenerator["default"].async(function _focusOption$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (shouldSetLabel === true) {
                this._setLabelTo(this.state.options[key].label);
              }

              if (!this.state.isOpened) {
                _context5.next = 5;
                break;
              }

              this._focusOptionAndScrollIntoView(key);

              _context5.next = 8;
              break;

            case 5:
              _context5.next = 7;
              return _regenerator["default"].awrap(this._openList(null));

            case 7:
              this._focusOptionAndScrollIntoView(key);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_focusOptionAndScrollIntoView",
    value: function _focusOptionAndScrollIntoView(key) {
      this.state.selectedOptionKey = key;
      var focusedItems = document.querySelector(".".concat(classes.optionFocused));
      var currentItem = document.querySelector(".".concat(classes.option, "[data-key=\"").concat(key, "\"]"));

      if (focusedItems) {
        focusedItems.classList.remove(classes.optionFocused);
      }

      if (currentItem) {
        currentItem.classList.add(classes.optionFocused);
      }

      var domOption = document.querySelectorAll("#".concat(popupId, " li[data-key=\"").concat(key, "\"]"))[0];

      this._scrollListTo(domOption);
    }
  }, {
    key: "_focusNextOption",
    value: function _focusNextOption() {
      if (!this.state.options.length) {
        return;
      }

      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey, true);
      }

      var key;

      for (key = this.state.selectedOptionKey + 1; key < this.state.options.length; key++) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }

      for (key = 0; key < this.state.selectedOptionKey + 1; key++) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }
    }
  }, {
    key: "_focusPrevOption",
    value: function _focusPrevOption() {
      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey);
      }

      var key;

      for (key = this.state.selectedOptionKey - 1; key >= 0; key--) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }

      for (key = this.state.options.length - 1; key > this.state.selectedOptionKey - 1; key--) {
        if (this.state.options[key].id) {
          return this._focusOption(key, true);
        }
      }
    }
  }, {
    key: "_scrollListTo",
    value: function _scrollListTo(target) {
      var container = document.querySelector("#".concat(popupId, ":first-child"));

      if (!container) {
        return;
      }

      if (!target) {
        container.scrollTop = 0;
        return;
      }

      if (target.offsetTop - container.scrollTop >= container.clientHeight - target.clientHeight) {
        container.scrollTop = target.offsetTop - container.clientHeight + target.clientHeight;
      } else if (target.offsetTop - container.scrollTop < 0) {
        container.scrollTop = target.offsetTop;
      }
    }
  }, {
    key: "_isParentOf",
    value: function _isParentOf(child) {
      while (child) {
        child = child.parentNode;

        if (child === (0, _reactDom.findDOMNode)(this)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_onDocumentMouseDown",
    value: function _onDocumentMouseDown(e, isOwner) {
      if (e.button !== 0) {
        return;
      }

      var target = e.target;

      if (isOwner) {
        if (!target.classList.contains(classes.option)) {
          target = target.parentNode;
        }

        if (target.classList.contains(classes.optionSelectable) && this.state.isOpened) {
          this._selectOption(this.state.options[target.getAttribute('data-key')]);

          this._closeList(true);
        }
      } else {
        // q where to test
        if (!(0, _utils.parents)(target, ".".concat(classes.searchBlock)).length) {
          if (!(0, _reactDom.findDOMNode)(this.input).value) {
            this._selectOption(null);
          } else {
            this._setLabelTo(this.state.lastValidLabel);
          }
        }

        if (!this._isParentOf(e.target)) {
          this._closeList(true);
        }
      }
    }
  }, {
    key: "_onDocumentMouseScroll",
    value: function _onDocumentMouseScroll(e, isOwner) {
      if (!isOwner && this.state.isOpened) {
        var popupStyles = this._getComputedPopupStyles();

        if (popupStyles) {
          this.setState({
            popupStyles: this._getComputedPopupStyles()
          });
        } else {
          this._setLabelTo(this.state.lastValidLabel);

          this._closeList(true);
        }
      }
    }
  }, {
    key: "_onInputKeyDown",
    value: function _onInputKeyDown(e) {
      if (this.props.disabled) {
        return;
      }

      switch (e.keyCode) {
        case ARROW_DOWN_KEY:
          e.preventDefault();

          if (!this.state.isOpened) {
            return this._openList('', true);
          }

          this._focusNextOption();

          break;

        case ARROW_UP_KEY:
          e.preventDefault();

          if (!this.state.isOpened) {
            return this._openList();
          }

          this._focusPrevOption();

          break;

        case ENTER_KEY:
          e.preventDefault();

          if (this.state.selectedOptionKey === null) {
            this._selectOption(null);
          } else {
            this._selectOption(this.state.options[this.state.selectedOptionKey]);
          }

          this._closeList();

          break;

        case TAB_KEY:
        case ESCAPE_KEY:
          if (e.keyCode === ESCAPE_KEY) {
            e.preventDefault();
          }

          if (!e.target.value || !this.props.value) {
            this._setLabelTo('');

            this._selectOption(null);
          } else {
            this._setLabelTo(this.state.lastValidLabel);
          }

          this._closeList();

          break;
      }
    }
  }, {
    key: "_onInputValueChange",
    value: function _onInputValueChange(e) {
      return _regenerator["default"].async(function _onInputValueChange$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this._setLabelTo(e.target.value);

              if (!this.state.isOpened) {
                _context6.next = 6;
                break;
              }

              _context6.next = 4;
              return _regenerator["default"].awrap(this._updateList(e.target.value));

            case 4:
              _context6.next = 8;
              break;

            case 6:
              _context6.next = 8;
              return _regenerator["default"].awrap(this._openList(e.target.value));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_getComputedPopupStyles",
    value: function _getComputedPopupStyles() {
      var inputStyles = window.getComputedStyle((0, _reactDom.findDOMNode)(this.input));
      var popupStyle = {};
      var inputOffset = (0, _reactDom.findDOMNode)(this.input).getBoundingClientRect();
      var inputWidth = inputStyles.width;
      var inputHeight = parseInt(inputStyles.height);

      if (inputOffset.top + inputHeight <= 0 || inputOffset.top >= window.innerHeight) {
        return null;
      }

      var offsetTop = inputOffset.top + inputHeight;
      var offsetLeft = inputOffset.left;

      if (typeof window !== 'undefined') {
        var availableSpace = window.innerHeight - offsetTop;

        if (availableSpace < MIN_POPUP_HEIGHT) {
          popupStyle.maxHeight = inputOffset.top;
          popupStyle.bottom = -inputOffset.top;
        } else {
          popupStyle.maxHeight = availableSpace;
          popupStyle.top = offsetTop;
        }
      }

      popupStyle.minWidth = inputWidth;
      popupStyle.left = offsetLeft;
      return popupStyle;
    }
  }, {
    key: "focus",
    value: function focus() {
      (0, _reactDom.findDOMNode)(this.input).focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var arrowClasses = [classes.arrow];
      var options;
      var optionsPopup = null;

      if (this.state.isOpened) {
        arrowClasses.push(classes.up);

        if (this.state.loading) {
          options = _react["default"].createElement("li", {
            className: [classes.option, classes.optionTypes.empty].join(' ')
          }, this.props.loadingElement);
        } else {
          if (!this.state.options.length) {
            options = _react["default"].createElement("li", {
              className: [classes.option, classes.optionTypes.empty].join(' ')
            }, this.props.notFoundElement);
          } else {
            options = this.state.options.map(function (option, key) {
              var optionClassNames = [classes.option];

              if (key === _this4.state.selectedOptionKey) {
                optionClassNames.push(classes.optionFocused);
              }

              if (option.id !== undefined) {
                optionClassNames.push(classes.optionSelectable);
              }

              if (option.type) {
                optionClassNames.push(classes.optionTypes[option.type] || option.type);
              }

              return _react["default"].createElement("li", {
                key: key,
                "data-key": key,
                onMouseOver: _this4._focusOption.bind(_this4, key),
                className: optionClassNames.join(' ')
              }, Array.isArray(option.label) ? option.label.map(function (label, columnKey) {
                return _react["default"].createElement("div", {
                  key: columnKey
                }, label);
              }) : _react["default"].createElement("div", null, option.label));
            });
          }
        }

        optionsPopup = _react["default"].createElement(_Portal["default"], {
          id: popupId,
          style: this.state.popupStyles,
          onDocumentMouseDown: this._onDocumentMouseDown,
          onDocumentMouseScroll: this._onDocumentMouseScroll,
          className: "__suggestBoxPopUp"
        }, _react["default"].createElement("div", {
          className: "__suggestBoxPopUp-content"
        }, _react["default"].createElement("ul", null, options)));
      }

      return _react["default"].createElement("div", {
        className: "__suggestBox"
      }, _react["default"].createElement("div", {
        className: classes.searchBlock
      }, _react["default"].createElement("input", (0, _extends2["default"])({}, (0, _utils.omit)(this.props, ['model', 'value', 'onChange', 'onLabelChange', 'onFocus', 'select', 'notFoundElement', 'loadingElement', 'defaultLabel', 'onMetadataChange', 'withEmptyOption']), {
        ref: function ref(input) {
          return _this4.input = input;
        },
        type: "text",
        onClick: this._openList,
        onFocus: this._onInputFocus,
        onKeyDown: this._onInputKeyDown,
        onChange: this._onInputValueChange,
        value: this.state.label
      })), _react["default"].createElement("div", {
        onClick: this._toggleList,
        className: classes.selectBtn
      }, _react["default"].createElement("div", {
        className: arrowClasses.join(' ')
      }))), optionsPopup);
    }
  }]);
  return SuggestBoxEditor;
}(_react["default"].Component);

(0, _defineProperty2["default"])(SuggestBoxEditor, "propTypes", {
  disabled: _propTypes["default"].bool,
  model: _propTypes["default"].shape({
    read: _propTypes["default"].func,
    getLabel: _propTypes["default"].func
  }),
  onChange: _propTypes["default"].func.isRequired,
  onLabelChange: _propTypes["default"].func,
  onMetadataChange: _propTypes["default"].func,
  value: _propTypes["default"].any,
  defaultLabel: _propTypes["default"].string,
  label: _propTypes["default"].string,
  notFoundElement: _propTypes["default"].element,
  loadingElement: _propTypes["default"].element,
  onFocus: _propTypes["default"].func,
  withEmptyOption: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(SuggestBoxEditor, "defaultProps", {
  disabled: false,
  notFoundElement: _react["default"].createElement("div", null, "Nothing found"),
  loadingElement: _react["default"].createElement("div", null, "Loading..."),
  value: null,
  withEmptyOption: false
});
var _default = SuggestBoxEditor;
exports["default"] = _default;
module.exports = exports.default;