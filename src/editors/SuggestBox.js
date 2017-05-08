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
    disabled: React.PropTypes.bool,
    model: React.PropTypes.shape({
      read: React.PropTypes.func,
      getLabel: React.PropTypes.func
    }),
    onChange: React.PropTypes.func.isRequired,
    onLabelChange: React.PropTypes.func,
    onMetadataChange: React.PropTypes.func,
    value: React.PropTypes.any,
    defaultLabel: React.PropTypes.string,
    label: React.PropTypes.string,
    notFoundElement: React.PropTypes.element,
    loadingElement: React.PropTypes.element
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
      lastValidLabel: ''
    };
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
    return !utils.isEqual(this.props.value, nextProps.value)
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
    findDOMNode(this.refs.input).value = label;
    if (markAsValid) {
      this.state.lastValidLabel = label;
    }
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
    const options = await this._loadData(searchPattern);
    await this.setState({
      options: options,
      selectedOptionKey: null,
      loading: false
    });

    const $popup = $('#' + popupId);
    $popup.find('.__suggestBoxPopUp-content')
      .css('bottom', 'auto')
      .css('position', 'static');

    this._scrollListTo();
  }

  async _loadData(searchPattern) {
    return toPromise(this.props.model.read.bind(this.props.model))(searchPattern || '');
  }

  _openList(searchPattern, cb) {
    if (this.props.disabled || this.state.isOpened) {
      return;
    }

    this.setState({isOpened: true, loading: true}, () => {
      findDOMNode(this.refs.input).select();

      const $input = $(findDOMNode(this.refs.input));
      const $popup = $(`#${popupId}`);

      const inputOffset = $input.offset();
      const inputWidth = $input.css('width');
      const inputHeight = $input.css('height');

      let offsetTop = inputOffset.top + parseInt(inputHeight);
      const offsetLeft = inputOffset.left;

      if (typeof window !== 'undefined') {
        const availableSpace = window.innerHeight - (offsetTop - window.scrollY);

        if (availableSpace < MIN_POPUP_HEIGHT) {
          offsetTop = inputOffset.top - 300;
          $popup.css('height', 300);
          $popup.find('.__suggestBoxPopUp-content')
            .css('bottom', 0)
            .css('position', 'absolute');
        } else {
          $popup.css('maxHeight', availableSpace);
        }
      }

      $popup
        .css('minWidth', inputWidth)
        .offset({
          top: offsetTop,
          left: offsetLeft
        });

      this._updateList(searchPattern, () => {
        const selectedOptionKey = utils.findIndex(this.state.options, (option) => {
          return utils.isEqual(option.id, this.props.value);
        });
        if (selectedOptionKey) {
          this._focusOptionAndScrollIntoView(Number(selectedOptionKey));
        }
        if (typeof cb === 'function') {
          cb();
        }
      });
    });
  }

  _onInputFocus() {
    this._openList();
    findDOMNode(this.refs.input).select();
  }

  _closeList(shouldBlur) {
    if (shouldBlur) {
      findDOMNode(this.refs.input).blur();
    }
    if (!this.state.isOpened) {
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
      label: ''
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

  _focusOption(key, shouldSelectOption) {
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
  }

  _focusOptionAndScrollIntoView(key) {
    this.state.selectedOptionKey = key;
    $(`.${classes.optionFocused}`).removeClass(classes.optionFocused);
    $(`.${classes.option}[data-key="${key}"]`).addClass(classes.optionFocused);
    const domOption = $(`#${popupId} li[data-key="${key}"]`).get(0);
    this._scrollListTo(domOption);
  }

  _focusNextOption() {
    if (this.state.selectedOptionKey === null) {
      this.state.selectedOptionKey = 0;
      return this._focusOption(this.state.selectedOptionKey);
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
        return this._openList();
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
    case TAB_KEY:
    case ENTER_KEY:
      if (e.keyCode === ENTER_KEY) {
        e.preventDefault();
      }
      if (this.state.selectedOptionKey === null) {
        this._selectOption(null);
      } else {
        this._selectOption(this.state.options[this.state.selectedOptionKey]);
      }
      this._closeList();
      break;
    case ESCAPE_KEY:
      e.preventDefault();
      if (!e.target.value) {
        this._selectOption(null);
      } else {
        this._setLabelTo(this.state.lastValidLabel);
      }
      this._closeList();
      break;
    }
  }

  _onInputValueChange(e) {
    if (this.state.isOpened) {
      this._updateList(e.target.value);
    } else {
      this._openList(e.target.value);
    }
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
          onDocumentMouseDown={this::this._onDocumentMouseDown}
          onDocumentMouseScroll={this::this._onDocumentMouseScroll}
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
            {...utils.omit(this.props, ['model', 'value', 'onChange', 'onLabelChange'])}
            ref='input'
            type='text'
            onClick={this._openList.bind(this, '')}
            onFocus={this::this._onInputFocus}
            onKeyDown={this::this._onInputKeyDown}
            onChange={this::this._onInputValueChange}
          />
          <div onClick={this::this._toggleList} className={classes.selectBtn}>
            <div className={arrowClasses.join(' ')}></div>
          </div>
        </div>
        {optionsPopup}
      </div>
    );
  }
}

export default SuggestBoxEditor;
