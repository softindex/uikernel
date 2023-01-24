/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-unsafe */
/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import omit from 'lodash/omit';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {StrictOmit} from 'ts-essentials';
import ThrottleError from '../common/error/ThrottleError';
import throttle from '../common/throttle';
import {parents, isEqual, assert} from '../common/utils';
import {IListModel, IListModelReadResult} from '../list/types/IListModel';
import Portal from '../portal/Portal';

const PRODUCT_ID = '__suggestBoxPopUp';
const CLASSES = {
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
} as const;
const TAB_KEY = 9;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;
const MIN_POPUP_HEIGHT = 100;

type Option<TValue> = IListModelReadResult<TValue, Record<string, unknown>>[number];

type ComputedPopupStyles = Partial<{
  bottom: number;
  left: number;
  maxHeight: number;
  minWidth: string;
  top: number;
}>;

type State<TValue> = {
  isOpened: boolean;
  label: string[] | string;
  lastValidLabel: string[] | string;
  loading?: boolean;
  options: Option<Exclude<TValue, null>>[] | [Option<null>, ...Option<Exclude<TValue, null>>[]];
  popupStyles: ComputedPopupStyles;
  selectedOptionKey: number | null;
};

type Props<TValue> = StrictOmit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onClick' | 'onFocus' | 'onKeyDown' | 'type' | 'value'
> & {
  closeMenuOnSelect: boolean;
  defaultLabel?: string[] | string;
  defaultOpenTop: boolean;
  disabled: boolean;
  label?: string[] | string;
  loadingElement: React.ReactNode;
  model: IListModel<Exclude<TValue, null>, Record<string, unknown>>;
  notFoundElement: React.ReactNode;
  value: TValue | null;
  withEmptyOption: boolean;
  onChange: (value: TValue | null, option: Option<TValue | null>) => void;
  onFocus?: (value: React.FocusEvent<HTMLInputElement>) => void;
  onLabelChange?: (value: string[] | string) => void;
  onMetadataChange?: (value: Option<TValue | null>['metadata']) => void;
};

const DEFAULT_PROPS = {
  disabled: false,
  notFoundElement: <div>Nothing found</div>,
  loadingElement: <div>Loading...</div>,
  value: null,
  withEmptyOption: false,
  closeMenuOnSelect: true,
  defaultOpenTop: false
} as const;

class SuggestBoxEditor<TValue> extends React.Component<Props<TValue>, State<TValue>> {
  static defaultProps = DEFAULT_PROPS;

  private mounted = false;
  private input: HTMLInputElement | null = null;

  constructor(props: Props<TValue>) {
    super(props);

    this.loadData = throttle(this.loadData);
    this.state = {
      isOpened: false,
      options: [],
      selectedOptionKey: null,
      lastValidLabel: '',
      label: '',
      popupStyles: {}
    };
  }

  componentDidMount(): void {
    this.mounted = true;
    if (this.props.defaultLabel) {
      this.setLabelTo(this.props.defaultLabel, true);
    } else if (this.props.hasOwnProperty('label')) {
      this.setLabelTo(this.props.label, true);
    } else {
      this.getLabelFromModel(this.props.model, this.props.value);
    }
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  shouldComponentUpdate(nextProps: Props<TValue>, nextState: State<TValue>): boolean {
    return (
      this.state !== nextState ||
      !isEqual(this.props.value, nextProps.value) ||
      this.props.disabled !== nextProps.disabled
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props<TValue>): void {
    if (!isEqual(this.props.value, nextProps.value)) {
      if (!this.props.hasOwnProperty('label')) {
        this.getLabelFromModel(nextProps.model, nextProps.value);
      }
    }

    if (this.props.label !== nextProps.label) {
      this.setLabelTo(nextProps.label, true);
    }
  }

  focus(): void {
    this.input?.focus();
  }

  render(): JSX.Element {
    const arrowClasses: string[] = [CLASSES.arrow];
    let options;
    let optionsPopup = null;

    if (this.state.isOpened) {
      arrowClasses.push(CLASSES.up);

      if (this.state.loading) {
        options = (
          <li className={[CLASSES.option, CLASSES.optionTypes.empty].join(' ')}>
            {this.props.loadingElement}
          </li>
        );
      } else {
        if (!this.state.options.length) {
          options = (
            <li className={[CLASSES.option, CLASSES.optionTypes.empty].join(' ')}>
              {this.props.notFoundElement}
            </li>
          );
        } else {
          options = this.state.options.map((option, key) => {
            const optionClassNames: string[] = [CLASSES.option];
            if (key === this.state.selectedOptionKey) {
              optionClassNames.push(CLASSES.optionFocused);
            }

            if (option.id !== undefined) {
              optionClassNames.push(CLASSES.optionSelectable);
            }

            const optionType = option.type;
            if (optionType) {
              optionClassNames.push(CLASSES.optionTypes[optionType] || optionType);
            }

            return (
              <li
                key={key}
                data-key={key}
                onMouseOver={() => this.onMouseOverOption(key)}
                className={optionClassNames.join(' ')}
              >
                {Array.isArray(option.label) ? (
                  option.label.map((label, columnKey) => <div key={columnKey}>{label}</div>)
                ) : (
                  <div>{option.label}</div>
                )}
              </li>
            );
          });
        }
      }

      optionsPopup = (
        <Portal
          id={PRODUCT_ID}
          style={this.state.popupStyles}
          onDocumentMouseDown={this.onDocumentMouseDown}
          onDocumentMouseScroll={this.onDocumentMouseScroll}
          className="__suggestBoxPopUp"
        >
          <div className="__suggestBoxPopUp-content">
            <ul>{options}</ul>
          </div>
        </Portal>
      );
    }

    return (
      <div className="__suggestBox">
        <div className={CLASSES.searchBlock}>
          <input
            {...omit(this.props, [
              'model',
              'value',
              'onChange',
              'onLabelChange',
              'onFocus',
              'notFoundElement',
              'loadingElement',
              'defaultLabel',
              'onMetadataChange',
              'withEmptyOption'
            ])}
            ref={(input): void => {
              this.input = input;
            }}
            type="text"
            onClick={() => {
              this.openList().catch(console.error);
            }}
            onFocus={this.onInputFocus}
            onKeyDown={this.onInputKeyDown}
            onChange={this.onInputValueChange}
            value={this.state.label}
          />
          <div onClick={this.toggleListInBackground} className={CLASSES.selectBtn}>
            <div className={arrowClasses.join(' ')} />
          </div>
        </div>
        {optionsPopup}
      </div>
    );
  }

  private setLabelTo(label: string[] | string | null | undefined, markAsValid?: boolean): void {
    const preparedLabel = label ?? '';

    this.setState({
      label: preparedLabel,
      lastValidLabel: markAsValid ? preparedLabel : this.state.lastValidLabel
    });
  }

  private getLabelFromModel(model: Props<TValue>['model'], id: TValue | null): void {
    if (id === null || id === undefined) {
      return this.setLabelTo('', true);
    }

    model
      .getLabel(id as Exclude<TValue, null>)
      .then((label) => {
        if (!this.mounted) {
          return;
        }

        this.setLabelTo(label, true);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
  }

  private async updateList(searchPattern?: string | null): Promise<void> {
    let options;
    try {
      options = await this.loadData(searchPattern);
    } catch (e) {
      if (!(e instanceof ThrottleError)) {
        throw e;
      }

      return;
    }

    if (this.state.isOpened && this.mounted) {
      this.setState({
        options:
          options.length && this.props.withEmptyOption
            ? [
                {
                  id: null,
                  label: '\u00A0' // Use this symbol for save line height
                },
                ...options
              ]
            : options,
        selectedOptionKey: null,
        loading: false
      });
    }

    const content: HTMLElement | null = document.querySelector(`${PRODUCT_ID} .__suggestBoxPopUp-content`);
    if (content) {
      // @ts-expect-error: TS2540 Cannot assign to 'style' because it is a read-only property
      content.style = {
        bottom: 'auto',
        position: 'static'
      };
    }

    this.scrollListTo(undefined);
  }

  private loadData = (searchPattern?: string | null): Promise<Option<Exclude<TValue, null>>[]> => {
    return this.props.model.read(searchPattern ?? '');
  };

  private openList = async (searchPattern?: string | null, focusFirstOption = false): Promise<void> => {
    if (this.props.disabled || this.state.isOpened) {
      return;
    }

    const popupStyles = this.getComputedPopupStyles();
    if (!popupStyles) {
      return;
    }

    await new Promise<void>((resolve) => {
      this.setState(
        {
          isOpened: true,
          loading: true,
          popupStyles
        },
        resolve
      );
    });
    this.input?.select();

    await this.updateList(searchPattern); // TODO Handle errors

    if (!this.state.options.length) {
      return;
    }

    if (focusFirstOption) {
      const key = this.state.options[0].type !== 'group' ? 0 : 1;
      await this.focusOption(key, true);
      return;
    }

    const selectedOptionKey = this.state.options.findIndex((option) => {
      return isEqual(option.id, this.props.value);
    });

    if (selectedOptionKey !== -1) {
      this.focusOptionAndScrollIntoView(selectedOptionKey);
    }
  };

  private onInputFocusAsync = async (event: React.FocusEvent<HTMLInputElement>): Promise<void> => {
    await this.openList();
    if (!this.state.isOpened || !this.mounted) {
      return;
    }

    this.input?.select();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onInputFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    this.onInputFocusAsync(event).catch(console.error);
  };

  private closeList(shouldBlur?: boolean): void {
    if (shouldBlur) {
      this.input?.blur();
    }

    if (!this.state.isOpened || !this.mounted) {
      return;
    }

    this.setState({
      options: [],
      selectedOptionKey: null,
      isOpened: false
    });
  }

  private toggleListInBackground = (): void => {
    if (this.state.isOpened) {
      this.closeList();
    } else {
      this.openList().catch(console.error);
    }
  };

  private selectOption(option: Option<TValue | null> | null | undefined): void {
    const performedOption: Option<TValue | null> = option ?? {
      id: null,
      label: '',
      metadata: {}
    };

    this.props.onChange(performedOption.id, performedOption);
    if (this.props.onLabelChange) {
      this.props.onLabelChange(performedOption.label);
    }

    if (this.props.onMetadataChange) {
      this.props.onMetadataChange(performedOption.metadata);
    }

    this.input?.select();
  }

  private focusOption = async (key: number, shouldSetLabel?: boolean): Promise<void> => {
    if (shouldSetLabel) {
      const option = this.state.options[key];
      assert(option, `key "${key}" unavailable`);
      this.setLabelTo(option.label);
    }

    if (this.state.isOpened) {
      this.focusOptionAndScrollIntoView(key);
    } else {
      await this.openList(null);
      this.focusOptionAndScrollIntoView(key);
    }
  };

  private onMouseOverOption(key: number): void {
    this.focusOption(key, false).catch(console.error);
  }

  private focusOptionAndScrollIntoView(key: number): void {
    // @ts-expect-error: TS2540 Cannot assign to 'selectedOptionKey' because it is a read-only property
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.selectedOptionKey = key;
    const focusedItems = document.querySelector(`.${CLASSES.optionFocused}`);
    const currentItem = document.querySelector(`.${CLASSES.option}[data-key="${key}"]`);
    if (focusedItems) {
      focusedItems.classList.remove(CLASSES.optionFocused);
    }

    if (currentItem) {
      currentItem.classList.add(CLASSES.optionFocused);
    }

    const domOption = document.querySelectorAll(`#${PRODUCT_ID} li[data-key="${key}"]`)[0] as
      | HTMLElement
      | undefined;
    this.scrollListTo(domOption);
  }

  private focusNextOption(): void {
    if (!this.state.options.length) {
      return;
    }

    if (this.state.selectedOptionKey === null) {
      // @ts-expect-error: TS2540 Cannot assign to 'selectedOptionKey' because it is a read-only property
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.selectedOptionKey = 0;
      this.focusOption(this.state.selectedOptionKey, true).catch(console.error);
      return;
    }

    let key;
    for (key = this.state.selectedOptionKey + 1; key < this.state.options.length; key++) {
      const option = this.state.options[key];
      assert(option, `key "${key}" unavailable`);
      if (option.id) {
        this.focusOption(key, true).catch(console.error);
        return;
      }
    }

    for (key = 0; key < this.state.selectedOptionKey + 1; key++) {
      const option = this.state.options[key];
      assert(option, `key "${key}" unavailable`);
      if (option.id) {
        this.focusOption(key, true).catch(console.error);
        return;
      }
    }
  }

  private focusPrevOption(): void {
    if (this.state.selectedOptionKey === null) {
      // @ts-expect-error: TS2540 Cannot assign to 'selectedOptionKey' because it is a read-only property
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.selectedOptionKey = 0;
      this.focusOption(this.state.selectedOptionKey).catch(console.error);
      return;
    }

    let key;
    for (key = this.state.selectedOptionKey - 1; key >= 0; key--) {
      const option = this.state.options[key];
      assert(option, `key "${key}" unavailable`);
      if (option.id) {
        this.focusOption(key, true).catch(console.error);
        return;
      }
    }

    for (key = this.state.options.length - 1; key > this.state.selectedOptionKey - 1; key--) {
      const option = this.state.options[key];
      assert(option, `key "${key}" unavailable`);
      if (option.id) {
        this.focusOption(key, true).catch(console.error);
        return;
      }
    }
  }

  private scrollListTo(target: HTMLElement | null | undefined): void {
    const container = document.querySelector(`#${PRODUCT_ID}:first-child`);
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

  private isParentOf(child: HTMLElement | null | undefined): boolean {
    let currentChild = child;

    while (currentChild) {
      currentChild = currentChild.parentNode as HTMLElement | null | undefined;
      if (currentChild === findDOMNode(this)) {
        return true;
      }
    }

    return false;
  }

  private onDocumentMouseDown = (event: MouseEvent, isOwner: boolean): void => {
    if (event.button !== 0) {
      return;
    }

    let target = event.target as HTMLElement;
    if (isOwner) {
      if (!target.classList.contains(CLASSES.option)) {
        target = target.parentNode as HTMLElement;
      }

      if (target.classList.contains(CLASSES.optionSelectable) && this.state.isOpened) {
        this.selectOption(this.state.options[Number(target.getAttribute('data-key'))]);
        if (this.props.closeMenuOnSelect) {
          this.closeList(true);
        }
      }
    } else {
      // q where to test
      if (!parents(target, `.${CLASSES.searchBlock}`).length) {
        if (!this.input?.value) {
          this.selectOption(null);
        } else {
          this.setLabelTo(this.state.lastValidLabel);
        }
      }

      if (!this.isParentOf(target)) {
        this.closeList(true);
      }
    }
  };

  private onDocumentMouseScroll = (_event: Event, isOwner: boolean): void => {
    if (!isOwner && this.state.isOpened) {
      const popupStyles = this.getComputedPopupStyles();
      if (popupStyles) {
        this.setState({popupStyles});
      } else {
        this.setLabelTo(this.state.lastValidLabel);
        this.closeList(true);
      }
    }
  };

  private onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (this.props.disabled) {
      return;
    }

    const target = event.target as HTMLInputElement;

    switch (event.keyCode) {
      case ARROW_DOWN_KEY:
        event.preventDefault();
        if (!this.state.isOpened) {
          this.openList('', true).catch(console.error);
          return;
        }

        this.focusNextOption();
        break;
      case ARROW_UP_KEY:
        event.preventDefault();
        if (!this.state.isOpened) {
          this.openList().catch(console.error);
          return;
        }

        this.focusPrevOption();
        break;
      case ENTER_KEY:
        event.preventDefault();

        if (this.state.selectedOptionKey === null) {
          this.selectOption(null);
        } else {
          this.selectOption(this.state.options[this.state.selectedOptionKey]);
        }

        this.closeList();
        break;
      case TAB_KEY:
      case ESCAPE_KEY:
        if (event.keyCode === ESCAPE_KEY) {
          event.preventDefault();
        }

        if (!target.value || !this.props.value) {
          this.setLabelTo('');
          this.selectOption(null);
        } else {
          this.setLabelTo(this.state.lastValidLabel);
        }

        this.closeList();
        break;
    }
  };

  private onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setLabelTo(value);
    if (this.state.isOpened) {
      this.updateList(value).catch(console.error);
    } else {
      this.openList(value).catch(console.error);
    }
  };

  private getComputedPopupStyles(): ComputedPopupStyles | null {
    const inputNode = this.input!;
    const inputStyles = window.getComputedStyle(inputNode);
    const popupStyle: ComputedPopupStyles = {};

    const inputOffset = inputNode.getBoundingClientRect();
    const inputWidth = inputStyles.width;
    const inputHeight = parseInt(inputStyles.height, 10);

    if (inputOffset.top + inputHeight <= 0 || inputOffset.top >= window.innerHeight) {
      return null;
    }

    const offsetTop = inputOffset.top + inputHeight;
    const offsetLeft = inputOffset.left;

    if (typeof window !== 'undefined') {
      const availableSpace = window.innerHeight - offsetTop;
      if (this.props.defaultOpenTop || availableSpace < MIN_POPUP_HEIGHT) {
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
}

export default SuggestBoxEditor;
