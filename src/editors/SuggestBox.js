/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {throttle, isEqual, findIndex, parents, omit} from '../common/utils';
import Portal from '../common/Portal';
import React, {useState, useMemo, useEffect, useRef} from 'react';
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

function SuggestBoxEditor({
  notFoundElement = <div>Nothing found</div>,
  loadingElement = <div>Loading...</div>,
  ...props
}) {
  const [isOpened, setOpened] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState(null);
  const [selectedOptionKey, setSelectedOptionKey] = useState(null);
  const [lastValidOption, setLastValidOption] = useState(option);
  const [popupStyles, setPopupStyles] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultLabel || '');
  const input = useRef();
  const suggestComponent = useRef();
  
  const getData = useMemo(() => throttle(props.model.read).bind(props.model), [props.model]);
  const arrowClasses = useMemo(() => isOpened ? `${classes.arrow} ${classes.up}` : classes.arrow, [isOpened]);

  useEffect(() => {
    if (!isLoading && isOpened) {
      input.current.select();
    }
  }, [isLoading, isOpened]);

  useEffect(() => {
    if ((!option || props.value !== option.id) && !props.label) {
      if (props.value) {
        props.model.getLabel(props.value)
          .then(label => _selectOption({id: props.value, label}))
          .catch(error => {
            throw error;
          });
      } else {
        _selectOption();
      }
    }
  }, [props.value]);

  useEffect(() => {
    if (props.label !== inputValue) {
      setLastValidOption(props.label ? {label: props.label} : null);
      setInputValue(props.label || '');
    }
  }, [props.label]);

  function _onInputChange(e) {
    isOpened ? _loadData(e.target.value) : _openList(e.target.value);
    setInputValue(e.target.value);
  }

  function _toggleList() {
    isOpened ? _closeList() : _openList();
  }

  async function _loadData(search) {
    if (!isLoading) {
      setLoading(true);
    }

    let options;
    try {
      options = await getData(search || '');
    } catch (error) {
      if (!(error instanceof ThrottleError)) {
        throw error;
      }
      return;
    }

    if (options.length && props.withEmptyOption) {
      options.unshift({
        id: null,
        label: '\u00A0' // Use this symbol for save line height
      });
    }

    setLoading(false);
    setOptions(options);

    const optionKey = findIndex(options, (option) => {
      const id = props.value ? Number(props.value) : lastValidOption ? lastValidOption.id : 0;
      return isEqual(option.id, id);
    });
    if (optionKey !== -1) {
      _focusOptionAndScrollIntoView(Number(optionKey));
    }
  }

  function _openList(search) {
    if (props.disabled || isOpened) {
      return;
    }
    setOpened(true);
    setPopupStyles(_getComputedPopupStyles());
    _loadData(search);
  }

  function _closeList() {
    setOpened(false);
    setLoading(false);
    setInputValue(lastValidOption ? lastValidOption.label : '');
  }

  function _selectOption(option) {
    option = option || {
      id: null,
      label: '',
      metadata: {}
    };
    setOption(option);
    setLastValidOption(option);
    setInputValue(option.label);
    props.onChange(option.id, option);
    setOpened(false);
    setLoading(false);
    setOptions([]);
    setSelectedOptionKey(null);
    if (props.onLabelChange) {
      props.onLabelChange(option.label);
    }
    if (props.onMetadataChange) {
      props.onMetadataChange(option.metadata);
    }
  }

  function _onFocusInput(e) {
    if (props.onFocus) {
      props.onFocus(e);
    }
    if (!isOpened) {
      _openList();
    }
  }

  function _focusOption(key) {
    setInputValue(options[key].label);
    setSelectedOptionKey(key);
    input.current.focus();
    _focusOptionAndScrollIntoView(key);
  }

  async function _focusOptionAndScrollIntoView(key) {
    setSelectedOptionKey(key);
    const focusedItems = document.querySelector(`.${classes.optionFocused}`);
    const currentItem = document.querySelector(`.${classes.option}[data-key="${key}"]`);
    const container = document.querySelector(`#${popupId}:first-child`);
    if (focusedItems) {
      focusedItems.classList.remove(classes.optionFocused);
    }
    if (currentItem) {
      currentItem.classList.add(classes.optionFocused);
      if (currentItem.offsetTop - container.scrollTop >= container.clientHeight - currentItem.clientHeight) {
        container.scrollTop = currentItem.offsetTop - container.clientHeight + currentItem.clientHeight;
      } else if (currentItem.offsetTop - container.scrollTop < 0) {
        container.scrollTop = currentItem.offsetTop;
      }
    } else if (container) {
      container.scrollTop = 0;
    }
  }

  function _focusNextOption() {
    if (!options.length || isLoading) {
      return;
    }

    if (selectedOptionKey === null) {
      return _focusOption(0, true);
    }

    let key;
    for (key = selectedOptionKey + 1; key < options.length; key++) {
      if (options[key].id) {
        return _focusOption(key, true);
      }
    }
    for (key = 0; key < selectedOptionKey + 1; key++) {
      if (options[key].id) {
        return _focusOption(key, true);
      }
    }
  }

  function _focusPrevOption() {
    if (!options.length || isLoading) {
      return;
    }

    if (selectedOptionKey === null) {
      return _focusOption(0);
    }

    let key;
    for (key = selectedOptionKey - 1; key >= 0; key--) {
      if (options[key].id) {
        return _focusOption(key, true);
      }
    }
    for (key = options.length - 1; key > selectedOptionKey - 1; key--) {
      if (options[key].id) {
        return _focusOption(key, true);
      }
    }
  }

  function _onInputKeyDown(e) {
    if (props.disabled) {
      return;
    }

    switch (e.keyCode) {
    case ARROW_DOWN_KEY:
      e.preventDefault();
      if (!isOpened) {
        _openList();
      }
      return _focusNextOption();
    case ARROW_UP_KEY:
      e.preventDefault();
      if (!isOpened) {
        _openList();
      }
      return _focusPrevOption();
    case ENTER_KEY:
      e.preventDefault();
      input.current.select();
      return _selectOption(selectedOptionKey !== null && input.current.value ? options[selectedOptionKey]: null);
    case TAB_KEY:
    case ESCAPE_KEY:
      if (e.keyCode === ESCAPE_KEY) {
        e.preventDefault();
      }
      _selectOption(input.current.value ? lastValidOption : null);
      break;
    }
  }

  function _getComputedPopupStyles() {
    const inputStyles = window.getComputedStyle(input.current);
    const popupStyle = {};

    const inputOffset = input.current.getBoundingClientRect();
    const inputWidth = inputStyles.width;
    const inputHeight = parseInt(inputStyles.height);

    if (inputOffset.top + inputHeight <= 0 || inputOffset.top >= window.innerHeight) {
      return;
    }

    const offsetTop = inputOffset.top + inputHeight;
    const offsetLeft = inputOffset.left;

    if (typeof window !== 'undefined') {
      const availableSpace = window.innerHeight - offsetTop;
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

  function _isParentOf(child) {
    while (child) {
      child = child.parentNode;
      if (child === suggestComponent.current) {
        return true;
      }
    }
    return false;
  }

  function _onDocumentMouseDown(e, isOwner) {
    if (e.button !== 0) {
      return;
    }
    let target = e.target;
    if (isOwner) {
      if (!target.classList.contains(classes.option)) {
        target = target.parentNode;
      }
      if (target.classList.contains(classes.optionSelectable) && isOpened) {
        _selectOption(options[target.getAttribute('data-key')]);
      }
    } else {
      if (!parents(target, `.${classes.searchBlock}`).length) {
        _selectOption(input.current.value ? lastValidOption : null);
      }
      if (!_isParentOf(e.target)) {
        _closeList();
      }
    }
  }

  function _onDocumentMouseScroll(e, isOwner) {
    if (!isOwner && isOpened) {
      const popupStyles = _getComputedPopupStyles();
      if (popupStyles) {
        setPopupStyles(popupStyles);
      } else {
        setInputValue(lastValidOption ? lastValidOption.label : '');
        _closeList();
      }
    }
  }

  function _renderStaticOption(element) {
    return <li className={[classes.option, classes.optionTypes.empty].join(' ')}>
      {element}
    </li>;
  }

  function _renderPortal() {
    if (!isOpened) {
      return;
    }

    let optionsList;
    if (isLoading) {
      optionsList = _renderStaticOption(loadingElement);
    } else if (!options.length) {
      optionsList = _renderStaticOption(notFoundElement);
    } else {
      optionsList = options.map((option, key) => {
        const optionClassNames = [classes.option];
        if (key === selectedOptionKey) {
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
            onMouseOver={_focusOption.bind(this, key)}
            className={optionClassNames.join(' ')}
          >
            {Array.isArray(option.label)
              ? option.label.map((label, columnKey) => <div key={columnKey}>{label}</div>)
              : <div>{option.label}</div>
            }
          </li>
        );
      });
    }

    return (
      <Portal
        id={popupId}
        style={popupStyles}
        onDocumentMouseDown={_onDocumentMouseDown}
        onDocumentMouseScroll={_onDocumentMouseScroll}
        className='__suggestBoxPopUp'
      >
        <div className="__suggestBoxPopUp-content">
          <ul>
            {optionsList}
          </ul>
        </div>
      </Portal>
    );
  }

  return (
    <div className='__suggestBox' ref={suggestComponent}>
      <div className={classes.searchBlock}>
        <input
          {...omit(props,
            ['model', 'value', 'onChange', 'onLabelChange', 'onFocus',
              'select', 'notFoundElement', 'loadingElement', 'defaultLabel', 'onMetadataChange', 'withEmptyOption'])}
          ref={input}
          type='text'
          onClick={_openList}
          onFocus={_onFocusInput}
          onKeyDown={_onInputKeyDown}
          onChange={_onInputChange}
          value={inputValue}
        />
        <div onClick={_toggleList} className={classes.selectBtn}>
          <div className={arrowClasses}/>
        </div>
      </div>
      {_renderPortal()}
    </div>
  );
}

SuggestBoxEditor.propTypes = {
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
  onFocus: PropTypes.func,
  withEmptyOption: PropTypes.bool
};

export default SuggestBoxEditor;
