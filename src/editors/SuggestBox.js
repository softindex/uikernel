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
    this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: '',
      popupStyles: {}
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
      || JSON.stringify(this.state.popupStyles) !== JSON.stringify(nextState.popupStyles)
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

    model.getLabel(id)
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
      await toPromise(::this.setState, true)({
        options,
        selectedOptionKey: null,
        loading: false
      });
      // after receiving new options, the size of list could have changed, so we recalculate position of the popup,
      // but after new options was rerendered and we can figure out their new size
      await toPromise(::this.setState, true)({
        popupStyles: this._getComputedPopupStyles(),
      });
    }

    const content = document.querySelector(`${popupId} .__suggestBoxPopUp-content`);
    if (content) {
      content.style = {
        bottom: 'auto',
        position: 'static'
      };
    }
    this._scrollListTo();
  }

  _loadData(searchPattern) {
    return this.props.model.read(searchPattern || '');
  }

  async _openList(searchPattern, focusFirstOption = false) {
    if (this.props.disabled || this.state.isOpened) {
      return;
    }

    await toPromise(::this.setState, true)({
      isOpened: true,
      loading: true,
    });
    // recalculate position of the popup after loading component was rendered and we can figure content size
    await toPromise(::this.setState, true)({
      popupStyles: this._getComputedPopupStyles()
    });
    findDOMNode(this.input).select();

    await this._updateList(searchPattern); // TODO Handle errors

    if (!this.state.options.length) {
      return;
    }

    if (focusFirstOption) {
      const key = this.state.options[0].type !== 'group' ? 0 : 1;
      await this._focusOption(key, true);
      return;
    }

    const selectedOptionKey = utils.findIndex(this.state.options, (option) => {
      return utils.isEqual(option.id, this.props.value);
    });

    if (selectedOptionKey !== -1) {
      this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
    }
  }

  async _onInputFocus(e) {
    await this._openList();
    findDOMNode(this.input).select();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  _closeList(shouldBlur) {
    if (shouldBlur) {
      findDOMNode(this.input).blur();
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

  async _toggleList() {
    if (this.state.isOpened) {
      this._closeList();
    } else {
      await this._openList();
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
    findDOMNode(this.input).select();
  }

  async _focusOption(key, shouldSetLabel) {
    if (shouldSetLabel === true) {
      this._setLabelTo(this.state.options[key].label);
    }
    if (this.state.isOpened) {
      this._focusOptionAndScrollIntoView(key);
    } else {
      await this._openList(null);
      this._focusOptionAndScrollIntoView(key);
    }
  }

  _focusOptionAndScrollIntoView(key) {
    this.state.selectedOptionKey = key;
    const focusedItems = document.querySelector(`.${classes.optionFocused}`);
    const currentItem = document.querySelector(`.${classes.option}[data-key="${key}"]`);
    if (focusedItems) {
      focusedItems.classList.remove(classes.optionFocused);
    }
    if (currentItem) {
      currentItem.classList.add(classes.optionFocused);
    }
    const domOption = document.querySelectorAll(`#${popupId} li[data-key="${key}"]`)[0];
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
    const container = document.querySelector(`#${popupId}:first-child`);
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
      child = child.parentNode;
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
    let target = e.target;
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
      if (!utils.parents(target, `.${classes.searchBlock}`).length) {
        if (!findDOMNode(this.input).value) {
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
      this.setState({
        popupStyles: this._getComputedPopupStyles()
      });
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

  async _onInputValueChange(e) {
    this._setLabelTo(e.target.value);
    if (this.state.isOpened) {
      await this._updateList(e.target.value);
    } else {
      await this._openList(e.target.value);
    }
  }

  _getComputedPopupStyles() {
    const inputStyles = window.getComputedStyle(findDOMNode(this.input));
    let popupStyle = {};

    const inputOffset = findDOMNode(this.input).getBoundingClientRect();
    const inputWidth = inputStyles.width;
    const inputHeight = inputStyles.height;

    let offsetTop = inputOffset.top + parseInt(inputHeight);
    const offsetLeft = inputOffset.left;

    if (typeof window !== 'undefined') {
      const availableSpace = window.innerHeight - offsetTop;
      if (availableSpace < MIN_POPUP_HEIGHT) { // If popup doesn't fit under the input then show it above the input
        const offsetBottom = inputOffset.top;
        const containerMaxHeight = Math.max(offsetBottom, MIN_POPUP_HEIGHT);
        let popupHeight;
        // this.suggestBoxPopUpContent will be empty while there wasn't rendering yet, but then this method
        // will be called again and we will figure out correct contentHeight
        if (this.suggestBoxPopUpContent) {
          const contentHeight = parseInt(window.getComputedStyle(findDOMNode(this.suggestBoxPopUpContent)).height);
          popupHeight = Math.min(contentHeight, containerMaxHeight);
        } else {
          popupHeight = containerMaxHeight;
        }
        offsetTop = offsetBottom - popupHeight;
        popupStyle = {
          bottom: offsetBottom,
          position: 'absolute',
          // We need to set height else it becomes equal to 1 automatically
          height: popupHeight
        };
      } else {
        // availableSpace will be too big in case of huge lists
        popupStyle.maxHeight = Math.min(availableSpace, window.innerHeight);
      }
    }

    return {
      ...popupStyle,
      minWidth: inputWidth,
      top: offsetTop,
      left: offsetLeft
    };
  }

  focus() {
    findDOMNode(this.input).focus();
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

            if (option.id !== undefined) {
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
          styles={this.state.popupStyles}
          onDocumentMouseDown={this._onDocumentMouseDown}
          onDocumentMouseScroll={this._onDocumentMouseScroll}
          className='__suggestBoxPopUp'
        >
          <div
            ref={item => this.suggestBoxPopUpContent = item}
            className="__suggestBoxPopUp-content"
          >
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
                'select', 'notFoundElement', 'loadingElement', 'defaultLabel', 'onMetadataChange'])}
            ref={(input) => this.input = input }
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
