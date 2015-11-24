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
var utils = require('../common/utils');

var OPTIONS_ELEMENT_ID = '__suggestBoxPopUp';

var classes = {
  optionsTable: '__suggestBoxPopUpTable',
  option: '__suggestBoxPopUp-option',
  optionFocused: '__suggestBoxPopUp-option-focused',
  optionSelectable: '__suggestBoxPopUp-option-selectable',
  optionGroup: '__suggestBoxPopUp-option-group',
  optionHeader: '__suggestBoxPopUp-option-header',
  optionSubitem: '__suggestBoxPopUp-option-subitem'
};

var SuggestBoxEditor = React.createClass({
  propTypes: {
    select: React.PropTypes.bool,
    debounce: React.PropTypes.number,
    model: React.PropTypes.shape({
      read: React.PropTypes.func
    }),
    onChange: React.PropTypes.func.isRequired,
    onLabelChange: React.PropTypes.func,
    value: React.PropTypes.any
  },
  getDefaultProps: function () {
    return {
      select: false,
      debounce: 0
    };
  },
  getInitialState: function () {
    return {
      options: [],
      neatSearchTimeout: null,
      lastValidValue: ''
    };
  },
  componentDidMount: function () {
    this.setLabel(this.props);

    $('body').on('mousedown', this.handleMouseDown);
    // jQuery events not support "useCapture"
    document.addEventListener('scroll', this.handleMouseScroll, true);
  },
  componentWillUnmount: function () {
    $('body').off('mousedown', this.handleMouseDown);
    // jQuery events not support "useCapture"
    document.removeEventListener('scroll', this.handleMouseScroll, true);

    if (this.state.options.length) {
      $('#' + OPTIONS_ELEMENT_ID).remove();
    }
  },
  componentWillReceiveProps: function (props) {
    if (this.props.value !== props.value) {
      this.setLabel(props);
    }
  },
  componentDidUpdate: function (prevProps, prevState) {
    var $popUpElement = $('#' + OPTIONS_ELEMENT_ID);
    var $popUpTable = $popUpElement.find('.' + classes.optionsTable);
    var $containerElement;
    var containerOffset;
    var popupHeight;

    if (!utils.isEqual(prevState.options, this.state.options)) {
      if (this.state.options.length) {
        $containerElement = $(this.refs.container.getDOMNode());
        containerOffset = $containerElement.offset();

        if (!$popUpElement.length) {
          $popUpElement = $('<div id="' + OPTIONS_ELEMENT_ID + '"></div>');
          $popUpTable = $('<div class="' + classes.optionsTable + '"></div>');
          $popUpTable.on('mouseover', this.handleMouseOver);
          $popUpElement.html($popUpTable);
          $('body').append($popUpElement);
        }

        $popUpTable.html(this.getOptionsListHTML());
        $popUpElement.css({
          top: containerOffset.top + $containerElement.height(),
          left: containerOffset.left,
          minWidth: $containerElement.width()
        });

        // If window height is too short, expand list upwards
        popupHeight = $popUpElement.height();
        if (($popUpElement.offset().top + popupHeight) > $(window).height()) {
          $popUpElement.css({
            top: containerOffset.top - popupHeight
          });
        }
      } else if ($popUpElement) {
        $popUpTable.off('mouseover', this.handleMouseOver);
        $popUpElement.remove();
      }
    }
  },
  _highlightOption: function ($target) {
    var $popUpElement = $('#' + OPTIONS_ELEMENT_ID);
    var $focusedOption = $('.' + classes.optionFocused);

    if (typeof $target === 'string') {
      switch ($target) {
        case 'next':
          $target = $focusedOption.next();
          if (!$target.length) {
            $target = $('.' + classes.option + ':first');
          }
          break;
        case 'prev':
          $target = $focusedOption.prev();
          if (!$target.length) {
            $target = $('.' + classes.option + ':last');
          }
          break;
        default:
          return;
      }
    }

    if (!$target.length) {
      $target = $('#' + OPTIONS_ELEMENT_ID + ' .' + classes.option + ':first');
    }
    this._scrollIntoViewAndFocus($target, $popUpElement);
  },
  _scrollIntoViewAndFocus: function ($target, $container) {
    var target = $target.get(0);
    var container = $container.get(0);
    var $focusedOption = $('.' + classes.optionFocused);

    $focusedOption.removeClass(classes.optionFocused);
    $target.addClass(classes.optionFocused);

    if (target.offsetTop - container.scrollTop >= container.clientHeight - target.clientHeight) {
      container.scrollTop = target.offsetTop - container.clientHeight + target.clientHeight;
    } else if (target.offsetTop - container.scrollTop < 0) {
      container.scrollTop = target.offsetTop;
    }
  },
  isSelectableOption: function ($target) {
    return $target.hasClass(classes.optionSelectable);
  },
  handleKeyDown: function (e) {
    switch (e.keyCode) {
      case 40: // down arrow
        e.preventDefault();
        if (this.state.options.length) {
          this._highlightOption('next');
        } else {
          this._openList();
        }
        break;
      case 38: // up arrow
        e.preventDefault();
        if (this.state.options.length) {
          this._highlightOption('prev');
        } else {
          this._openList();
        }
        break;
      case 13: // enter
        e.preventDefault();
        var $target = $('.' + classes.optionFocused);
        if (!$target.attr('data-key')) {
          $target = $target.parent();
        }
        if (this.isSelectableOption($target)) {
          var option = this.state.options[$target.attr('data-key')];
          this.refs.input.getDOMNode().value = this._getLabel(option);
          this.saveValueWithValidation(option.id);
        } else {
          this.saveValueWithValidation();
        }
        break;
      case 27: // escape
        e.preventDefault();
        this._closeList();
        this.saveValueWithValidation();
        break;
    }
  },
  handleMouseOver: function (e) {
    var $target = $(e.target);
    if (!$target.attr('data-key')) {
      $target = $target.parent('.' + classes.option);
    }
    if (this.isSelectableOption($target)) {
      this._highlightOption($target);
    }
  },
  handleMouseDown: function (e) {
    if (!this.isMounted() || e.button !== 0) {
      return;
    }

    var input = this.refs.input.getDOMNode();
    var $container = $(this.refs.container.getDOMNode());
    var $popup = $('#' + OPTIONS_ELEMENT_ID);
    var $target = $(e.target);

    if (input !== document.activeElement && !this.state.options.length) {
      return;
    }

    if ($popup.find($target).length) {
      if (!$target.attr('data-key')) {
        $target = $target.parent();
      }
      if (this.isSelectableOption($target)) {
        var option = this.state.options[$target.attr('data-key')];
        this.refs.input.getDOMNode().value = this._getLabel(option);
        this.saveValue(option);
      }
    } else if ($target[0] !== $popup[0] && !$container.find($target).length) {
      this._closeList();
      this.saveValueWithValidation();
    }
  },
  handleMouseScroll: function (e) {
    if (this.state.options.length && e.target.id !== OPTIONS_ELEMENT_ID) {
      this.saveValueWithValidation();
    }
  },
  handleChange: function (e) {
    this.neatSearch(e.target.value, function (data) {
      this.setState({options: data});
    });
  },
  _getLabel: function (option) {
    return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
  },
  _openList: function () {
    if (this.props.disabled) {
      return;
    }
    this.search('', function (data) {
      this.setState({options: data}, function () {
        var selectedIndex = utils.findIndex(this.state.options, function (option) {
          return utils.isEqual(option.id, this.props.value);
        }.bind(this));

        if (selectedIndex >= 0) {
          var container = $('#' + OPTIONS_ELEMENT_ID);
          var option = container.find('.' + classes.option + ':eq(' + selectedIndex + ')');
          this._scrollIntoViewAndFocus(option, container);
        }
      });
    });
  },
  _openListAndFocus: function () {
    if (this.props.disabled) {
      return;
    }
    this._openList();
    this.refs.input.getDOMNode().focus();
    this.refs.input.getDOMNode().select();
  },
  _closeList: function () {
    if (this.props.disabled) {
      return;
    }
    this.setState({options: []});
  },
  _toggleList: function () {
    if (this.state.options.length) {
      this._closeList();
    } else {
      this._openList();
    }
  },
  getOptionsListHTML: function () {
    return this.state.options.reduce(function (result, option, key) {
      var className = classes.option;
      if (option.id) {
        className += ' ' + classes.optionSelectable;
      }

      switch (option.type) {
        case 'group':
          className += ' ' + classes.optionGroup;
          break;
        case 'header':
          className += ' ' + classes.optionHeader;
          break;
        case 'subitem':
          className += ' ' + classes.optionSubitem;
          break;
      }

      return result + '<div data-key="' + key + '" class="' + className + '">' + (
        Array.isArray(option.label) ? option.label.map(function (label) {
          return '<div>' + label + '</div>';
        }).join('') : '<div>' + utils.escape(option.label) + '</div>'
      ) + '</div>';
    }, '');
  },

  /**
   * Save changes and shut down helps
   *
   * @param {Array} nextValue New SuggestBox value
   */
  saveValue: function (nextValue) {
    this._closeList();

    if (!utils.isEqual(this.props.value, nextValue.id)) {
      this.props.onChange(nextValue.id);
      if (this.props.onLabelChange) {
        this.props.onLabelChange(nextValue.label);
      }
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  },

  /**
   * Input text check and right save call
   */
  saveValueWithValidation: function (value) {
    var input = this.refs.input.getDOMNode();
    value = value || input.value;

    if (!value) {
      this.saveValue({
        id: null,
        value: ''
      });
      return;
    }

    this.search(value, function (data) {
      // Do nothing if value has changed during the check
      if (value !== input.value) {
        return;
      }

      var resultIndex = utils.findIndex(data, function (option) {
        return option.id && value === this._getLabel(option);
      }.bind(this));

      if (resultIndex < 0) {
        this.refs.input.getDOMNode().value = this.state.lastValidValue;
        return;
      }

      input.value = this._getLabel(data[resultIndex]);
      this.saveValue(data[resultIndex]);
    });
  },

  search: function (label, cb) {
    this.props.model.read(label, function (err, data) {
      if (!this.isMounted()) {
        return;
      }
      if (err) {
        throw err;
      }
      cb.call(this, data);
    }.bind(this));
  },

  neatSearch: function (label, cb) {
    if (this.state.neatSearchTimeout) {
      clearTimeout(this.state.neatSearchTimeout);
    }
    this.state.neatSearchTimeout = setTimeout(function () {
      this.state.neatSearchTimeout = null;
      this.search(label, cb);
    }.bind(this), this.props.debounce);
  },

  setLabel: function (props) {
    var value = props.value;

    if (!value) {
      this.refs.input.getDOMNode().value = '';
      return;
    }

    props.model.getLabel(value, function (err, label) {
      var curValue = props.value;

      if (!this.isMounted()) {
        return;
      }
      if (err) {
        throw err;
      }

      this.state.lastValidValue = label;

      if (curValue === value) {
        this.refs.input.getDOMNode().value = label;
      }
    }.bind(this));
  },

  render: function () {
    var wrapperClasses = ['suggest-box'];
    var arrowClasses = ['arrow'];

    if (this.props.select) {
      wrapperClasses.push('select');
    }
    if (this.state.options.length) {
      arrowClasses.push('up');
    }
    return (
      <div
        className={wrapperClasses.join(' ')}
        ref="container"
      >
        <div className="search">
          <input
            {...utils.omit(this.props, ['value', 'onBlur'])}
            ref="input"
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onClick={this._openListAndFocus}
            onFocus={this._openListAndFocus}
            onBlur={this._closeList}
          />
          {this.props.select ?
            <div className="select-btn" onClick={this._toggleList}>
              <div className={arrowClasses.join(' ')}></div>
            </div>
          : null}
        </div>
      </div>
    );
  }
});

module.exports = SuggestBoxEditor;
