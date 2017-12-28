/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import toPromise from '../common/toPromise';
import utils from '../common/utils';
import Portal from '../common/Portal';
import {findDOMNode} from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ThrottleError from '../common/ThrottleError';

const popupId = '__suggestBoxPopUp';
const classes = {
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
const TAB_KEY = 9;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;
const MIN_POPUP_HEIGHT = 100;

class SuggestBoxEditor extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    model: PropTypes.shape({
      read: PropTypes.func,
      getLabel: PropTypes.func
    }),
    onChange: PropTypes.func.isRequired,
    onLabelChange: PropTypes.func,
    onMetadataChange: PropTypes.func,
    value: PropTypes.any,
    defaultLabel: PropTypes.string,
    label: PropTypes.string,
    notFoundElement: PropTypes.element,
    loadingElement: PropTypes.element,
    onFocus: PropTypes.func
  };

  static defaultProps = {
    disabled: false,
    notFoundElement: <div>Nothing found</div>,
    loadingElement: <div>Loading...</div>,
    value: null
  };

  constructor(props) {
    super(props);
    this._loadData = utils.throttle(this._loadData);
    this._styles = {}; // TODO Rename to popupStyles, move to state
    this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: ''
    };
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._onInputValueChange = this._onInputValueChange.bind(this);
    this._focusOption = this._focusOption.bind(this);
    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onDocumentMouseScroll = this._onDocumentMouseScroll.bind(this);
    this._toggleList = this._toggleList.bind(this);
    this._openList = this._openList.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.defaultLabel) {
      this._setLabelTo(this.props.defaultLabel, true);
    } else if (this.props.hasOwnProperty('label')) {
      this._setLabelTo(this.props.label, true);
    } else {
      this._getLabelFromModel(this.props.model, this.props.value);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.label !== nextState.label
      || !utils.isEqual(this.props.value, nextProps.value)
      || this.state.loading !== nextState.loading
      || this.state.selectedOptionKey !== nextState.selectedOptionKey
      || this.state.isOpened !== nextState.isOpened
      || this.state.options.length !== nextState.options.length
      || this.props.disabled !== nextProps.disabled;
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.isEqual(this.props.value, nextProps.value)) {
      if (!this.props.hasOwnProperty('label')) {
        this._getLabelFromModel(nextProps.model, nextProps.value);
      }
    }
    if (this.props.label !== nextProps.label) {
      this._setLabelTo(nextProps.label, true);
    }
  }

  _getOptionLabel(option) {
    return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
  }

  _setLabelTo(label, markAsValid) {
    if (label === null || label === undefined) {
      label = '';
    }
    this.setState({
      label: label,
      lastValidLabel: markAsValid ? label : this.state.lastValidLabel
    });
  }

  _getLabelFromModel(model, id) {
    if (id === null || id === undefined) {
      return this._setLabelTo('', true);
    }

    toPromise(model.getLabel.bind(model))(id)
      .then((label) => {
        if (!this._isMounted) {
          return;
        }
        this._setLabelTo(label, true);
      })
      .catch(err => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
  }

  async _updateList(searchPattern) {
    let options;
    try {
      options = await this._loadData(searchPattern);
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }
      return;
    }

    if (this._isMounted) {
      await this.setState({
        options,
        selectedOptionKey: null,
        loading: false
      });
    }

    const $popup = $('#' + popupId);
    $popup.find('.__suggestBoxPopUp-content')
      .css('bottom', 'auto')
      .css('position', 'static');

    this._scrollListTo();
  }

  _loadData(searchPattern) {
    return toPromise(this.props.model.read.bind(this.props.model))(searchPattern || '');
  }

  async _openList(searchPattern, focusFirstOption = false) {
    if (this.props.disabled || this.state.isOpened) {
      return;
    }

    this.setState({isOpened: true, loading: true}, () => {
      findDOMNode(this.refs.input).select();
      this._setPopupStyles(); // TODO Remove function
      this._updateList(searchPattern) // TODO Handle errors
        .then(() => {
          if (!this.state.options.length) {
            return;
          }

          if (focusFirstOption) {
            const key = this.state.options[0].type !== 'group' ? 0 : 1;
            this._focusOption(key, true);
            return;
          }

          const selectedOptionKey = utils.findIndex(this.state.options, (option) => {
            return utils.isEqual(option.id, this.props.value);
          });

          if (selectedOptionKey !== -1) {
            this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
          }
        });
    });
  }

  _onInputFocus(e) {
    this._openList();
    findDOMNode(this.refs.input).select();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _closeList(shouldBlur) {
    if (shouldBlur) {
      findDOMNode(this.refs.input).blur();
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

  _toggleList() {
    if (this.state.isOpened) {
      this._closeList();
    } else {
      this._openList();
    }
  }

  _selectOption(option) {
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
    findDOMNode(this.refs.input).select();
  }

  _focusOption(key, shouldSetLabel) {
    if (shouldSetLabel === true) {
      this._setLabelTo(this.state.options[key].label);
    }
    if (this.state.isOpened) {
      this._focusOptionAndScrollIntoView(key);
    } else {
      this._openList(null).then(() => this._focusOptionAndScrollIntoView(key));
    }
  }

  _focusOptionAndScrollIntoView(key) {
    this.state.selectedOptionKey = key;
    $(`.${classes.optionFocused}`).removeClass(classes.optionFocused);
    $(`.${classes.option}[data-key="${key}"]`).addClass(classes.optionFocused);
    const domOption = $(`#${popupId} li[data-key="${key}"]`).get(0);
    this._scrollListTo(domOption);
  }

  _focusNextOption() {
    if (!this.state.options.length) {
      return;
    }

    if (this.state.selectedOptionKey === null) {
      this.state.selectedOptionKey = 0;
      return this._focusOption(this.state.selectedOptionKey, true);
    }

    let key;
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

  _focusPrevOption() {
    if (this.state.selectedOptionKey === null) {
      this.state.selectedOptionKey = 0;
      return this._focusOption(this.state.selectedOptionKey);
    }

    let key;
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

  _scrollListTo(target) {
    const container = $(`#${popupId}`).get(0);
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

  _isParentOf(child) {
    while (child) {
      child = $(child).parent().get(0);
      if (child === findDOMNode(this)) {
        return true;
      }
    }
    return false;
  }

  _onDocumentMouseDown(e, isOwner) {
    if (e.button !== 0) {
      return;
    }
    let $target = $(e.target);
    if (isOwner) {
      if (!$target.hasClass(classes.option)) {
        $target = $target.parent();
      }
      if ($target.hasClass(classes.optionSelectable) && this.state.isOpened) {
        this._selectOption(this.state.options[$target.attr('data-key')]);
        this._closeList(true);
      }
    } else {
      if (!$target.parents(`.${classes.searchBlock}`).length) {
        if (!findDOMNode(this.refs.input).value) {
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

  _onDocumentMouseScroll(e, isOwner) {
    if (!isOwner) {
      if (this.state.isOpened) {
        this._setLabelTo(this.state.lastValidLabel);
      }
      this._closeList(true);
    }
  }

  _onInputKeyDown(e) {
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

  _onInputValueChange(e) {
    this._setLabelTo(e.target.value);
    if (this.state.isOpened) {
      return this._updateList(e.target.value);
    } else {
      return this._openList(e.target.value);
    }
  }

  _setPopupStyles() {
    const $input = $(findDOMNode(this.refs.input));

    const inputOffset = findDOMNode(this.refs.input).getBoundingClientRect();
    const inputWidth = $input.css('width');
    const inputHeight = $input.css('height');

    let offsetTop = inputOffset.top + parseInt(inputHeight);
    const offsetLeft = inputOffset.left;

    if (typeof window !== 'undefined') {
      const availableSpace = window.innerHeight - offsetTop;
      if (availableSpace < MIN_POPUP_HEIGHT) {
        offsetTop = inputOffset.top - 300;
        this._styles = {
          bottom: '0',
          position: 'absolute',
          height: '300'
        };
      } else {
        this._styles.maxHeight = availableSpace;
      }
    }

    this._styles = {
      ...this._styles,
      minWidth: inputWidth,
      top: offsetTop,
      left: offsetLeft
    };
  }

  focus() {
    findDOMNode(this.refs.input).focus();
  }

  render() {
    const arrowClasses = [classes.arrow];
    let options;
    let optionsPopup = null;

    if (this.state.isOpened) {
      arrowClasses.push(classes.up);

      if (this.state.loading) {
        options = (
          <li className={[classes.option, classes.optionTypes.empty].join(' ')}>
            {this.props.loadingElement}
          </li>
        );
      } else {
        if (!this.state.options.length) {
          options = (
            <li className={[classes.option, classes.optionTypes.empty].join(' ')}>
              {this.props.notFoundElement}
            </li>
          );
        } else {
          options = this.state.options.map((option, key) => {
            const optionClassNames = [classes.option];
            if (key === this.state.selectedOptionKey) {
              optionClassNames.push(classes.optionFocused);
            }

            if (option.id) {
              optionClassNames.push(classes.optionSelectable);
            }

            if (option.type) {
              optionClassNames.push(classes.optionTypes[option.type] || option.type);
            }

            return (
              <li
                key={key}
                data-key={key}
                onMouseOver={this._focusOption.bind(this, key)}
                className={optionClassNames.join(' ')}
              >
                {
                  Array.isArray(option.label) ? option.label.map((label, columnKey) => <div
                    key={columnKey}>{label}</div>) : <div>{option.label}</div>
                }
              </li>
            );
          });
        }
      }

      optionsPopup = (
        <Portal
          id={popupId}
          styles={this._styles}
          onDocumentMouseDown={this._onDocumentMouseDown}
          onDocumentMouseScroll={this._onDocumentMouseScroll}
          className='__suggestBoxPopUp'
        >
          <div className="__suggestBoxPopUp-content">
            <ul>{options}</ul>
          </div>
        </Portal>
      );
    }

    return (
      <div className='__suggestBox'>
        <div className={classes.searchBlock}>
          <input
            {...utils.omit(this.props,
              ['model', 'value', 'onChange', 'onLabelChange', 'onFocus',
                'select', 'notFoundElement', 'loadingElement', 'defaultLabel'])}
            ref='input'
            type='text'
            onClick={this._openList}
            onFocus={this._onInputFocus}
            onKeyDown={this._onInputKeyDown}
            onChange={this._onInputValueChange}
            value={this.state.label}
          />
          <div onClick={this._toggleList} className={classes.selectBtn}>
            <div className={arrowClasses.join(' ')}/>
          </div>
        </div>
        {optionsPopup}
      </div>
    );
  }
}

export default SuggestBoxEditor;
