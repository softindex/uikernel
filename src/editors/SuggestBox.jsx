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
      neatSearchTimeout: null
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
    var $popUpTable = $popUpElement.find('.__suggestBoxPopUpTable');
    var $containerElement;
    var containerOffset;
    var popupHeight;

    if (!utils.isEqual(prevState.options, this.state.options)) {
      if (this.state.options.length) {
        $containerElement = $(this.refs.container.getDOMNode());
        containerOffset = $containerElement.offset();

        if (!$popUpElement.length) {
          $popUpElement = $('<div id="' + OPTIONS_ELEMENT_ID + '"></div>');
          $popUpTable = $('<div class="__suggestBoxPopUpTable"></div>');
          $popUpElement.html($popUpTable);
          $('body').append($popUpElement);
        }

        $popUpTable.html(this.getOptionsListHTML());
        $popUpElement.css({
          top: $containerElement.offset().top + $containerElement.height(),
          left: $containerElement.offset().left,
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
        $popUpElement.remove();
      }
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
      if ($target.hasClass('__suggestBoxPopUp-option-selectable')) {
        var option = this.state.options[$target.attr('data-key')];
        this.refs.input.getDOMNode().value = this._getLabel(option);
        this.saveValue(option);
      }
    } else if ($target[0] !== $popup[0] && !$container.find($target).length) {
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

  toggleList: function () {
    if (!this.props.select || this.props.disabled) {
      return;
    }

    if (this.state.options.length) {
      this.setState({options: []}, function () {
        this.refs.input.getDOMNode().focus();
      });
    } else {
      this._openList();
    }
  },

  _getLabel: function (option) {
    return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
  },

  _openList: function () {
    this.search('', function (data) {
      this.setState({options: data}, function () {
        this.refs.input.getDOMNode().focus();
      });
    });
  },

  getOptionsListHTML: function () {
    return this.state.options.reduce(function (result, option, key) {
      var className = '__suggestBoxPopUp-option';
      if (option.id) {
        className += ' __suggestBoxPopUp-option-selectable';
      }

      switch (option.type) {
        case 'group':
        case 'header':
        case 'regular':
          className += ' __suggestBoxPopUp-option-' + option.type;
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
    this.setState({options: []});

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
  saveValueWithValidation: function () {
    var input = this.refs.input.getDOMNode();
    var value = input.value;

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
        this.saveValue({
          id: null,
          value: value
        });
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

      if (curValue === value) {
        this.refs.input.getDOMNode().value = label;
      }
    }.bind(this));
  },

  focus: function () {
    if (this.props.select) {
      this._openList();
    } else {
      this.refs.input.getDOMNode().focus();
    }
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
        <div className="search" onClick={this.toggleList}>
          <input
            {...utils.omit(this.props, ['value', 'onBlur'])}
            ref="input"
            type="text"
            onChange={this.handleChange}
          />
          {this.props.select ?
            <div className="select-btn">
              <div className={arrowClasses.join(' ')}></div>
            </div>
          : null}
        </div>
      </div>
    );
  }
});

module.exports = SuggestBoxEditor;
