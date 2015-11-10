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
    var $containerElement;
    var containerOffset;
    var popupHeight;

    if (!utils.isEqual(prevState.options, this.state.options)) {
      if (this.state.options.length) {
        $containerElement = $(this.refs.container.getDOMNode());
        containerOffset = $containerElement.offset();

        if (!$popUpElement.length) {
          $popUpElement = $('<div id="' + OPTIONS_ELEMENT_ID + '"></div>');
          $('body').append($popUpElement);
        }
        $popUpElement
          .html(this.getOptionsListHTML())
          .css({
            top: containerOffset.top + $containerElement.height(),
            left: containerOffset.left,
            width: $containerElement.width()
          });

        // if window height is too short, expand list upwards
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
    if (!this.isMounted()) {
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
      var option = this.state.options[$target.attr('data-key')];
      this.refs.input.getDOMNode().value = option[1];
      this.saveValue(option);
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

  _openList: function () {
    this.search('', function (data) {
      this.setState({options: data}, function () {
        this.refs.input.getDOMNode().focus();
      });
    });
  },

  getOptionsListHTML: function () {
    return this.state.options.reduce(function (result, option, key) {
      return result + '<div data-key="' + key + '" class="__suggestBoxPopUp-option">' +
          utils.escape(option[1]) +
        '</div>';
    }, '');
  },

  /**
   * Save changes and shut down helps
   *
   * @param {Array} nextValue New SuggestBox value
   */
  saveValue: function (nextValue) {
    this.setState({options: []});

    if (!utils.isEqual(this.props.value, nextValue[0])) {
      this.props.onChange(nextValue[0]);
      if (this.props.onLabelChange) {
        this.props.onLabelChange(nextValue[1]);
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
      this.saveValue([null, '']);
      return;
    }

    this.search(value, function (data) {
      // Do nothing if value has changed during the check
      if (value !== input.value) {
        return;
      }

      var resultIndex = 0;
      if (data.length !== 1) {
        resultIndex = utils.findIndex(data, function (option) {
          return option[1] === value;
        });
      }

      if (resultIndex < 0) {
        this.saveValue([null, value]);
        return;
      }

      input.value = data[resultIndex][1];
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
