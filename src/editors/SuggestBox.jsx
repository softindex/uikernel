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
var Portal = require('../common/Portal');
var utils = require('../common/utils');

var popupId = '__suggestBoxPopUp';
var classes = {
  option: '__suggestBoxPopUp-option',
  optionFocused: '__suggestBoxPopUp-option-focused',
  optionSelectable: '__suggestBoxPopUp-option-selectable',
  optionGroup: '__suggestBoxPopUp-option-group',
  optionHeader: '__suggestBoxPopUp-option-header',
  optionSubitem: '__suggestBoxPopUp-option-subitem',
  searchBlock: '__suggestBox-search'
};

var SuggestBoxEditor = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    model: React.PropTypes.shape({
      read: React.PropTypes.func,
      getLabel: React.PropTypes.func
    }),
    onChange: React.PropTypes.func.isRequired,
    onLabelChange: React.PropTypes.func,
    value: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      disabled: false
    };
  },

  getInitialState: function () {
    return {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      value: null
    };
  },

  componentDidMount: function () {
    this._getLabelFromModel(this.props.value);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return !utils.isEqual(this.state.value, nextProps.value)
      || this.state.selectedOptionKey !== nextState.selectedOptionKey
      || this.state.isOpened !== nextState.isOpened
      || this.state.options.length !== nextState.options.length;
  },

  componentWillReceiveProps: function (nextProps) {
    if (!utils.isEqual(this.state.value, nextProps.value)) {
      this.state.value = nextProps.value;
      this._getLabelFromModel(nextProps.value);
    }
  },

  _getOptionLabel: function (option) {
    return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
  },

  _setLabelTo: function (label, markAsValid) {
    this.refs.input.getDOMNode().value = label;
    if (markAsValid) {
      this.state.lastValidLabel = label;
    }
  },

  _getLabelFromModel: function (id) {
    if (!id) {
      return this._setLabelTo('');
    }

    this.props.model.getLabel(id, function (err, label) {
      if (err) {
        throw err;
      }
      this._setLabelTo(label, true);
    }.bind(this));
  },

  _updateList: function (searchPattern, cb) {
    this._loadData(searchPattern, function (err, options) {
      if (err) {
        throw err;
      }
      this.setState({
        options: options,
        selectedOptionKey: null
      }, function () {
        this._scrollListTo('top');
        if (typeof cb === 'function') {
          cb();
        }
      });
    }.bind(this));
  },

  _loadData: utils.throttle(function (searchPattern, cb) {
    this.props.model.read(searchPattern, cb);
  }),

  _openList: function (searchPattern, cb) {
    if (this.props.disabled || this.state.isOpened) {
      return;
    }
    this.setState({isOpened: true}, function () {
      this.refs.input.getDOMNode().focus();
      this.refs.input.getDOMNode().select();

      var $input = $(this.refs.input.getDOMNode());
      var $popup = $('#' + popupId);

      var inputOffset = $input.offset();
      var inputWidth = $input.css('width');
      var inputHeight = $input.css('height');

      var offsetTop = inputOffset.top + parseInt(inputHeight);
      var offsetLeft = inputOffset.left;

      $popup
        .css('minWidth', inputWidth)
        .offset({
          top: offsetTop,
          left: offsetLeft
        });

      this._updateList(searchPattern || '', function () {
        var selectedOptionKey = utils.findIndex(this.state.options, function (option) {
          return utils.isEqual(option.id, this.props.value);
        }.bind(this));
        if (selectedOptionKey) {
          this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
        }
        if (typeof cb === 'function') {
          cb();
        }
      }.bind(this));
    });
  },

  _openListAndSelectAll: function () {
    this._openList();
  },

  _closeList: function (shouldBlur) {
    if (shouldBlur) {
      this.refs.input.getDOMNode().blur();
    }
    if (!this.state.isOpened) {
      return;
    }
    this.setState({
      options: [],
      selectedOptionKey: null,
      isOpened: false
    });
  },

  _toggleList: function () {
    if (this.state.isOpened) {
      this._closeList();
    } else {
      this._openList();
    }
  },

  _selectOption: function (option) {
    this.state.value = option.id;
    this.props.onChange(option.id);
    if (typeof this.props.onLabelChange === 'function') {
      this.props.onLabelChange(option.label);
    }
    this._setLabelTo(this._getOptionLabel(option), true);
    this.refs.input.getDOMNode().select();
  },

  _focusOption: function (key, shouldSelectOption) {
    if (shouldSelectOption === true) {
      this._selectOption(this.state.options[key]);
    }
    if (this.state.isOpened) {
      this._focusOptionAndScrollIntoView(key);
    } else {
      this._openList(null, function () {
        this._focusOptionAndScrollIntoView(key);
      });
    }
  },

  _focusOptionAndScrollIntoView: function (key) {
    this.state.selectedOptionKey = key;
    $('.' + classes.optionFocused).removeClass(classes.optionFocused);
    $('.' + classes.option + '[data-key="' + key + '"]').addClass(classes.optionFocused);
    var domOption = $('#' + popupId + ' li[data-key="' + key + '"]').get(0);
    this._scrollListTo(domOption);
  },

  _focusNextOption: function () {
    if (this.state.selectedOptionKey === null) {
      this.state.selectedOptionKey = 0;
      return this._focusOption(this.state.selectedOptionKey);
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
  },

  _focusPrevOption: function () {
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
  },

  _scrollListTo: function (target) {
    var container = $('#' + popupId).get(0);

    if (target === 'top') {
      container.scrollTop = 0;
      return;
    }

    if (target.offsetTop - container.scrollTop >= container.clientHeight - target.clientHeight) {
      container.scrollTop = target.offsetTop - container.clientHeight + target.clientHeight;
    } else if (target.offsetTop - container.scrollTop < 0) {
      container.scrollTop = target.offsetTop;
    }
  },

  _onDocumentMouseDown: function (e, isOwner) {
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
    } else if (!$target.parents('.' + classes.searchBlock).length) {
      this._setLabelTo(this.state.lastValidLabel);
      this._closeList(true);
    }
  },

  _onDocumentMouseScroll: function (e, isOwner) {
    if (!isOwner) {
      if (this.state.isOpened) {
        this._setLabelTo(this.state.lastValidLabel);
      }
      this._closeList(true);
    }
  },

  _onInputKeyDown: function (e) {
    if (this.props.disabled) {
      return;
    }

    switch (e.keyCode) {
      case 40: // down arrow
        e.preventDefault();
        if (!this.state.isOpened) {
          return this._openList();
        }
        this._focusNextOption();
        break;
      case 38: // up arrow
        e.preventDefault();
        if (!this.state.isOpened) {
          return this._openList();
        }
        this._focusPrevOption();
        break;
      case 9: // eslint-disable-line no-fallthrough
        if (!this.state.isOpened) {
          break;
        }
      case 13: // enter
        e.preventDefault();
        if (this.state.selectedOptionKey === null) {
          this._setLabelTo(this.state.lastValidLabel);
        } else {
          this._selectOption(this.state.options[this.state.selectedOptionKey]);
        }
        this._closeList();
        break;
      case 27: // escape
        e.preventDefault();
        this._setLabelTo(this.state.lastValidLabel);
        this._closeList();
        break;
    }
  },

  _onInputValueChange: function (e) {
    if (this.props.disabled) {
      return;
    }

    if (this.state.isOpened) {
      this._updateList(e.target.value);
    } else {
      this._openList(e.target.value);
    }
  },

  focus: function () {
    this.refs.input.getDOMNode().focus();
  },

  render: function () {
    var optionsPopup = null;

    if (this.state.isOpened) {
      var options = this.state.options.map(function (option, key) {
        var optionClassName = classes.option;
        if (key === this.state.selectedOptionKey) {
          optionClassName += ' ' + classes.optionFocused;
        }

        if (option.id) {
          optionClassName += ' ' + classes.optionSelectable;
        }

        switch (option.type) {
          case 'group':
            optionClassName += ' ' + classes.optionGroup;
            break;
          case 'header':
            optionClassName += ' ' + classes.optionHeader;
            break;
          case 'subitem':
            optionClassName += ' ' + classes.optionSubitem;
            break;
        }

        return (
          <li
            key={key}
            data-key={key}
            onMouseOver={this._focusOption.bind(null, key)}
            className={optionClassName}
          >
            {
              Array.isArray(option.label) ? option.label.map(function (label, columnKey) {
                return <div key={columnKey}>{label}</div>;
              }) : <div>{option.label}</div>
            }
          </li>
        );
      }.bind(this));

      optionsPopup = (
        <Portal
          id={popupId}
          onDocumentMouseDown={this._onDocumentMouseDown}
          onDocumentMouseScroll={this._onDocumentMouseScroll}
          className='__suggestBoxPopUp'
        >
          <ul>{options}</ul>
        </Portal>
      );
    }

    return (
      <div className='__suggestBox'>
        <div className={classes.searchBlock}>
          <input
            {...utils.omit(this.props, ['model', 'value', 'onChange', 'onLabelChange'])}
            ref='input'
            type='text'
            onClick={this._openList}
            onFocus={this._openListAndSelectAll}
            onKeyDown={this._onInputKeyDown}
            onChange={this._onInputValueChange}
          />
          <div onClick={this._toggleList} className="select-btn">
            <div className={'arrow' + (this.state.isOpened ? ' up' : '')}></div>
          </div>
        </div>
        {optionsPopup}
      </div>
    );
  }
});

module.exports = SuggestBoxEditor;
