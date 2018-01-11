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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toPromise = require('../common/toPromise');

var _toPromise2 = _interopRequireDefault(_toPromise);

var _utils = require('../common/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Portal = require('../common/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ThrottleError = require('../common/ThrottleError');

var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var popupId = '__suggestBoxPopUp'; /**
                                    * Copyright (с) 2015-present, SoftIndex LLC.
                                    * All rights reserved.
                                    *
                                    * This source code is licensed under the BSD-style license found in the
                                    * LICENSE file in the root directory of this source tree.
                                    */

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

var SuggestBoxEditor = function (_React$Component) {
  (0, _inherits3.default)(SuggestBoxEditor, _React$Component);

  function SuggestBoxEditor(props) {
    (0, _classCallCheck3.default)(this, SuggestBoxEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SuggestBoxEditor.__proto__ || (0, _getPrototypeOf2.default)(SuggestBoxEditor)).call(this, props));

    _this._loadData = _utils2.default.throttle(_this._loadData);
    _this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: '',
      popupStyles: {}
    };
    _this._onInputFocus = _this._onInputFocus.bind(_this);
    _this._onInputKeyDown = _this._onInputKeyDown.bind(_this);
    _this._onInputValueChange = _this._onInputValueChange.bind(_this);
    _this._focusOption = _this._focusOption.bind(_this);
    _this._onDocumentMouseDown = _this._onDocumentMouseDown.bind(_this);
    _this._onDocumentMouseScroll = _this._onDocumentMouseScroll.bind(_this);
    _this._toggleList = _this._toggleList.bind(_this);
    _this._openList = _this._openList.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SuggestBoxEditor, [{
    key: 'componentDidMount',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.label !== nextState.label || !_utils2.default.isEqual(this.props.value, nextProps.value) || this.state.loading !== nextState.loading || this.state.selectedOptionKey !== nextState.selectedOptionKey || this.state.isOpened !== nextState.isOpened || this.state.options.length !== nextState.options.length || this.props.disabled !== nextProps.disabled;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!_utils2.default.isEqual(this.props.value, nextProps.value)) {
        if (!this.props.hasOwnProperty('label')) {
          this._getLabelFromModel(nextProps.model, nextProps.value);
        }
      }
      if (this.props.label !== nextProps.label) {
        this._setLabelTo(nextProps.label, true);
      }
    }
  }, {
    key: '_getOptionLabel',
    value: function _getOptionLabel(option) {
      return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
    }
  }, {
    key: '_setLabelTo',
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
    key: '_getLabelFromModel',
    value: function _getLabelFromModel(model, id) {
      var _this2 = this;

      if (id === null || id === undefined) {
        return this._setLabelTo('', true);
      }

      (0, _toPromise2.default)(model.getLabel.bind(model))(id).then(function (label) {
        if (!_this2._isMounted) {
          return;
        }
        _this2._setLabelTo(label, true);
      }).catch(function (err) {
        if (err) {
          console.error(err);
          throw err;
        }
      });
    }
  }, {
    key: '_updateList',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(searchPattern) {
        var options, $popup;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = void 0;
                _context.prev = 1;
                _context.next = 4;
                return this._loadData(searchPattern);

              case 4:
                options = _context.sent;
                _context.next = 12;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](1);

                if (_context.t0 instanceof _ThrottleError2.default) {
                  _context.next = 11;
                  break;
                }

                throw _context.t0;

              case 11:
                return _context.abrupt('return');

              case 12:
                if (!this._isMounted) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return this.setState({
                  options: options,
                  selectedOptionKey: null,
                  loading: false
                });

              case 15:
                $popup = $('#' + popupId);

                $popup.find('.__suggestBoxPopUp-content').css('bottom', 'auto').css('position', 'static');

                this._scrollListTo();

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function _updateList(_x) {
        return _ref.apply(this, arguments);
      }

      return _updateList;
    }()
  }, {
    key: '_loadData',
    value: function _loadData(searchPattern) {
      return (0, _toPromise2.default)(this.props.model.read.bind(this.props.model))(searchPattern || '');
    }
  }, {
    key: '_openList',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(searchPattern) {
        var _this3 = this;

        var focusFirstOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.props.disabled || this.state.isOpened)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:

                this.setState({
                  isOpened: true,
                  loading: true,
                  popupStyles: this._setPopupStyles()
                }, function () {
                  (0, _reactDom.findDOMNode)(_this3.refs.input).select();
                  _this3._updateList(searchPattern) // TODO Handle errors
                  .then(function () {
                    if (!_this3.state.options.length) {
                      return;
                    }

                    if (focusFirstOption) {
                      var key = _this3.state.options[0].type !== 'group' ? 0 : 1;
                      _this3._focusOption(key, true);
                      return;
                    }

                    var selectedOptionKey = _utils2.default.findIndex(_this3.state.options, function (option) {
                      return _utils2.default.isEqual(option.id, _this3.props.value);
                    });

                    if (selectedOptionKey !== -1) {
                      _this3._focusOptionAndScrollIntoView(Number(selectedOptionKey));
                    }
                  });
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _openList(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _openList;
    }()
  }, {
    key: '_onInputFocus',
    value: function _onInputFocus(e) {
      this._openList();
      (0, _reactDom.findDOMNode)(this.refs.input).select();
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: '_closeList',
    value: function _closeList(shouldBlur) {
      if (shouldBlur) {
        (0, _reactDom.findDOMNode)(this.refs.input).blur();
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
    key: '_toggleList',
    value: function _toggleList() {
      if (this.state.isOpened) {
        this._closeList();
      } else {
        this._openList();
      }
    }
  }, {
    key: '_selectOption',
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
      (0, _reactDom.findDOMNode)(this.refs.input).select();
    }
  }, {
    key: '_focusOption',
    value: function _focusOption(key, shouldSetLabel) {
      var _this4 = this;

      if (shouldSetLabel === true) {
        this._setLabelTo(this.state.options[key].label);
      }
      if (this.state.isOpened) {
        this._focusOptionAndScrollIntoView(key);
      } else {
        this._openList(null).then(function () {
          return _this4._focusOptionAndScrollIntoView(key);
        });
      }
    }
  }, {
    key: '_focusOptionAndScrollIntoView',
    value: function _focusOptionAndScrollIntoView(key) {
      this.state.selectedOptionKey = key;
      $('.' + classes.optionFocused).removeClass(classes.optionFocused);
      $('.' + classes.option + '[data-key="' + key + '"]').addClass(classes.optionFocused);
      var domOption = $('#' + popupId + ' li[data-key="' + key + '"]').get(0);
      this._scrollListTo(domOption);
    }
  }, {
    key: '_focusNextOption',
    value: function _focusNextOption() {
      if (!this.state.options.length) {
        return;
      }

      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey, true);
      }

      var key = void 0;
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
    key: '_focusPrevOption',
    value: function _focusPrevOption() {
      if (this.state.selectedOptionKey === null) {
        this.state.selectedOptionKey = 0;
        return this._focusOption(this.state.selectedOptionKey);
      }

      var key = void 0;
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
    key: '_scrollListTo',
    value: function _scrollListTo(target) {
      var container = $('#' + popupId).get(0);
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
    key: '_isParentOf',
    value: function _isParentOf(child) {
      while (child) {
        child = $(child).parent().get(0);
        if (child === (0, _reactDom.findDOMNode)(this)) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_onDocumentMouseDown',
    value: function _onDocumentMouseDown(e, isOwner) {
      if (e.button !== 0) {
        return;
      }
      var $target = $(e.target);
      if (isOwner) {
        if (!$target.hasClass(classes.option)) {
          $target = $target.parent();
        }
        if ($target.hasClass(classes.optionSelectable) && this.state.isOpened) {
          this._selectOption(this.state.options[$target.attr('data-key')]);
          this._closeList(true);
        }
      } else {
        if (!$target.parents('.' + classes.searchBlock).length) {
          if (!(0, _reactDom.findDOMNode)(this.refs.input).value) {
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
    key: '_onDocumentMouseScroll',
    value: function _onDocumentMouseScroll(e, isOwner) {
      if (!isOwner) {
        if (this.state.isOpened) {
          this._setLabelTo(this.state.lastValidLabel);
        }
        this._closeList(true);
      }
    }
  }, {
    key: '_onInputKeyDown',
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
    key: '_onInputValueChange',
    value: function _onInputValueChange(e) {
      this._setLabelTo(e.target.value);
      if (this.state.isOpened) {
        return this._updateList(e.target.value);
      } else {
        return this._openList(e.target.value);
      }
    }
  }, {
    key: '_setPopupStyles',
    value: function _setPopupStyles() {
      var $input = $((0, _reactDom.findDOMNode)(this.refs.input));
      var popupStyle = {};

      var inputOffset = (0, _reactDom.findDOMNode)(this.refs.input).getBoundingClientRect();
      var inputWidth = $input.css('width');
      var inputHeight = $input.css('height');

      var offsetTop = inputOffset.top + parseInt(inputHeight);
      var offsetLeft = inputOffset.left;

      if (typeof window !== 'undefined') {
        var availableSpace = window.innerHeight - offsetTop;
        if (availableSpace < MIN_POPUP_HEIGHT) {
          offsetTop = inputOffset.top - 300;
          popupStyle = {
            bottom: '0',
            position: 'absolute',
            height: '300'
          };
        } else {
          popupStyle.maxHeight = availableSpace;
        }
      }

      return (0, _extends3.default)({}, popupStyle, {
        minWidth: inputWidth,
        top: offsetTop,
        left: offsetLeft
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      (0, _reactDom.findDOMNode)(this.refs.input).focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var arrowClasses = [classes.arrow];
      var options = void 0;
      var optionsPopup = null;

      if (this.state.isOpened) {
        arrowClasses.push(classes.up);

        if (this.state.loading) {
          options = _react2.default.createElement(
            'li',
            { className: [classes.option, classes.optionTypes.empty].join(' ') },
            this.props.loadingElement
          );
        } else {
          if (!this.state.options.length) {
            options = _react2.default.createElement(
              'li',
              { className: [classes.option, classes.optionTypes.empty].join(' ') },
              this.props.notFoundElement
            );
          } else {
            options = this.state.options.map(function (option, key) {
              var optionClassNames = [classes.option];
              if (key === _this5.state.selectedOptionKey) {
                optionClassNames.push(classes.optionFocused);
              }

              if (option.id) {
                optionClassNames.push(classes.optionSelectable);
              }

              if (option.type) {
                optionClassNames.push(classes.optionTypes[option.type] || option.type);
              }

              return _react2.default.createElement(
                'li',
                {
                  key: key,
                  'data-key': key,
                  onMouseOver: _this5._focusOption.bind(_this5, key),
                  className: optionClassNames.join(' ')
                },
                Array.isArray(option.label) ? option.label.map(function (label, columnKey) {
                  return _react2.default.createElement(
                    'div',
                    {
                      key: columnKey },
                    label
                  );
                }) : _react2.default.createElement(
                  'div',
                  null,
                  option.label
                )
              );
            });
          }
        }

        optionsPopup = _react2.default.createElement(
          _Portal2.default,
          {
            id: popupId,
            styles: this.state.popupStyles,
            onDocumentMouseDown: this._onDocumentMouseDown,
            onDocumentMouseScroll: this._onDocumentMouseScroll,
            className: '__suggestBoxPopUp'
          },
          _react2.default.createElement(
            'div',
            { className: '__suggestBoxPopUp-content' },
            _react2.default.createElement(
              'ul',
              null,
              options
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: '__suggestBox' },
        _react2.default.createElement(
          'div',
          { className: classes.searchBlock },
          _react2.default.createElement('input', (0, _extends3.default)({}, _utils2.default.omit(this.props, ['model', 'value', 'onChange', 'onLabelChange', 'onFocus', 'select', 'notFoundElement', 'loadingElement', 'defaultLabel']), {
            ref: 'input',
            type: 'text',
            onClick: this._openList,
            onFocus: this._onInputFocus,
            onKeyDown: this._onInputKeyDown,
            onChange: this._onInputValueChange,
            value: this.state.label
          })),
          _react2.default.createElement(
            'div',
            { onClick: this._toggleList, className: classes.selectBtn },
            _react2.default.createElement('div', { className: arrowClasses.join(' ') })
          )
        ),
        optionsPopup
      );
    }
  }]);
  return SuggestBoxEditor;
}(_react2.default.Component);

SuggestBoxEditor.propTypes = {
  disabled: _propTypes2.default.bool,
  model: _propTypes2.default.shape({
    read: _propTypes2.default.func,
    getLabel: _propTypes2.default.func
  }),
  onChange: _propTypes2.default.func.isRequired,
  onLabelChange: _propTypes2.default.func,
  onMetadataChange: _propTypes2.default.func,
  value: _propTypes2.default.any,
  defaultLabel: _propTypes2.default.string,
  label: _propTypes2.default.string,
  notFoundElement: _propTypes2.default.element,
  loadingElement: _propTypes2.default.element,
  onFocus: _propTypes2.default.func
};
SuggestBoxEditor.defaultProps = {
  disabled: false,
  notFoundElement: _react2.default.createElement(
    'div',
    null,
    'Nothing found'
  ),
  loadingElement: _react2.default.createElement(
    'div',
    null,
    'Loading...'
  ),
  value: null
};
exports.default = SuggestBoxEditor;
module.exports = exports['default'];