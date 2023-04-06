"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const omit_1 = __importDefault(require("lodash/omit"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const assert_1 = require("../common/assert");
const ThrottleError_1 = __importDefault(require("../common/error/ThrottleError"));
const throttle_1 = __importDefault(require("../common/throttle"));
const utils_1 = require("../common/utils");
const Portal_1 = __importDefault(require("../portal/Portal"));
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
};
const TAB_KEY = 9;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const ARROW_UP_KEY = 38;
const ARROW_DOWN_KEY = 40;
const MIN_POPUP_HEIGHT = 100;
const DEFAULT_PROPS = {
    disabled: false,
    notFoundElement: react_1.default.createElement("div", null, "Nothing found"),
    loadingElement: react_1.default.createElement("div", null, "Loading..."),
    value: null,
    withEmptyOption: false,
    closeMenuOnSelect: true,
    defaultOpenTop: false
};
class SuggestBoxEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.input = null;
        this.loadData = (searchPattern) => {
            return this.props.model.read(searchPattern !== null && searchPattern !== void 0 ? searchPattern : '');
        };
        this.openList = async (searchPattern, focusFirstOption = false) => {
            var _a;
            if (this.props.disabled || this.state.isOpened) {
                return;
            }
            const popupStyles = this.getComputedPopupStyles();
            if (!popupStyles) {
                return;
            }
            await new Promise((resolve) => {
                this.setState({
                    isOpened: true,
                    loading: true,
                    popupStyles
                }, resolve);
            });
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.select();
            await this.updateList(searchPattern);
            if (!this.state.options.length) {
                return;
            }
            if (focusFirstOption) {
                const key = this.state.options[0].type !== 'group' ? 0 : 1;
                await this.focusOption(key, true);
                return;
            }
            const selectedOptionKey = this.state.options.findIndex((option) => {
                return (0, utils_1.isEqual)(option.id, this.props.value);
            });
            if (selectedOptionKey !== -1) {
                this.focusOptionAndScrollIntoView(selectedOptionKey);
            }
        };
        this.onInputFocusAsync = async (event) => {
            var _a;
            await this.openList();
            if (!this.state.isOpened || !this.mounted) {
                return;
            }
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.select();
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        };
        this.onInputFocus = (event) => {
            this.onInputFocusAsync(event).catch(console.error);
        };
        this.toggleListInBackground = () => {
            if (this.state.isOpened) {
                this.closeList();
            }
            else {
                this.openList().catch(console.error);
            }
        };
        this.focusOption = async (key, shouldSetLabel) => {
            if (shouldSetLabel) {
                const option = this.state.options[key];
                (0, assert_1.assertNonNullish)(option, `key "${key}" unavailable`);
                this.setLabelTo(option.label);
            }
            if (this.state.isOpened) {
                this.focusOptionAndScrollIntoView(key);
            }
            else {
                await this.openList(null);
                this.focusOptionAndScrollIntoView(key);
            }
        };
        this.onDocumentMouseDown = (event, isOwner) => {
            var _a;
            if (event.button !== 0) {
                return;
            }
            let target = event.target;
            if (isOwner) {
                if (!target.classList.contains(CLASSES.option)) {
                    target = target.parentNode;
                }
                if (target.classList.contains(CLASSES.optionSelectable) && this.state.isOpened) {
                    this.selectOption(this.state.options[Number(target.getAttribute('data-key'))]);
                    if (this.props.closeMenuOnSelect) {
                        this.closeList(true);
                    }
                }
            }
            else {
                if (!(0, utils_1.parents)(target, `.${CLASSES.searchBlock}`).length) {
                    if (!((_a = this.input) === null || _a === void 0 ? void 0 : _a.value)) {
                        this.selectOption(null);
                    }
                    else {
                        this.setLabelTo(this.state.lastValidLabel);
                    }
                }
                if (!this.isParentOf(target)) {
                    this.closeList(true);
                }
            }
        };
        this.onDocumentMouseScroll = (_event, isOwner) => {
            if (!isOwner && this.state.isOpened) {
                const popupStyles = this.getComputedPopupStyles();
                if (popupStyles) {
                    this.setState({ popupStyles });
                }
                else {
                    this.setLabelTo(this.state.lastValidLabel);
                    this.closeList(true);
                }
            }
        };
        this.onInputKeyDown = (event) => {
            if (this.props.disabled) {
                return;
            }
            const target = event.target;
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
                    }
                    else {
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
                    }
                    else {
                        this.setLabelTo(this.state.lastValidLabel);
                    }
                    this.closeList();
                    break;
            }
        };
        this.onInputValueChange = (event) => {
            const value = event.target.value;
            this.setLabelTo(value);
            if (this.state.isOpened) {
                this.updateList(value).catch(console.error);
            }
            else {
                this.openList(value).catch(console.error);
            }
        };
        this.loadData = (0, throttle_1.default)(this.loadData);
        this.state = {
            isOpened: false,
            options: [],
            selectedOptionKey: null,
            lastValidLabel: '',
            label: '',
            popupStyles: {}
        };
    }
    componentDidMount() {
        this.mounted = true;
        if (this.props.defaultLabel) {
            this.setLabelTo(this.props.defaultLabel, true);
        }
        else if (this.props.hasOwnProperty('label')) {
            this.setLabelTo(this.props.label, true);
        }
        else {
            this.getLabelFromModel(this.props.model, this.props.value);
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state !== nextState ||
            !(0, utils_1.isEqual)(this.props.value, nextProps.value) ||
            this.props.disabled !== nextProps.disabled);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!(0, utils_1.isEqual)(this.props.value, nextProps.value)) {
            if (!this.props.hasOwnProperty('label')) {
                this.getLabelFromModel(nextProps.model, nextProps.value);
            }
        }
        if (this.props.label !== nextProps.label) {
            this.setLabelTo(nextProps.label, true);
        }
    }
    focus() {
        var _a;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.focus();
    }
    render() {
        const arrowClasses = [CLASSES.arrow];
        let options;
        let optionsPopup = null;
        if (this.state.isOpened) {
            arrowClasses.push(CLASSES.up);
            if (this.state.loading) {
                options = (react_1.default.createElement("li", { className: [CLASSES.option, CLASSES.optionTypes.empty].join(' ') }, this.props.loadingElement));
            }
            else {
                if (!this.state.options.length) {
                    options = (react_1.default.createElement("li", { className: [CLASSES.option, CLASSES.optionTypes.empty].join(' ') }, this.props.notFoundElement));
                }
                else {
                    options = this.state.options.map((option, key) => {
                        const optionClassNames = [CLASSES.option];
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
                        return (react_1.default.createElement("li", { key: key, "data-key": key, onMouseOver: () => this.onMouseOverOption(key), className: optionClassNames.join(' ') }, Array.isArray(option.label) ? (option.label.map((label, columnKey) => react_1.default.createElement("div", { key: columnKey }, label))) : (react_1.default.createElement("div", null, option.label))));
                    });
                }
            }
            optionsPopup = (react_1.default.createElement(Portal_1.default, { id: PRODUCT_ID, style: this.state.popupStyles, onDocumentMouseDown: this.onDocumentMouseDown, onDocumentMouseScroll: this.onDocumentMouseScroll, className: "__suggestBoxPopUp" },
                react_1.default.createElement("div", { className: "__suggestBoxPopUp-content" },
                    react_1.default.createElement("ul", null, options))));
        }
        return (react_1.default.createElement("div", { className: "__suggestBox" },
            react_1.default.createElement("div", { className: CLASSES.searchBlock },
                react_1.default.createElement("input", { ...(0, omit_1.default)(this.props, [
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
                    ]), ref: (input) => {
                        this.input = input;
                    }, type: "text", onClick: () => {
                        this.openList().catch(console.error);
                    }, onFocus: this.onInputFocus, onKeyDown: this.onInputKeyDown, onChange: this.onInputValueChange, value: this.state.label }),
                react_1.default.createElement("div", { onClick: this.toggleListInBackground, className: CLASSES.selectBtn },
                    react_1.default.createElement("div", { className: arrowClasses.join(' ') }))),
            optionsPopup));
    }
    setLabelTo(label, markAsValid) {
        const preparedLabel = label !== null && label !== void 0 ? label : '';
        this.setState({
            label: preparedLabel,
            lastValidLabel: markAsValid ? preparedLabel : this.state.lastValidLabel
        });
    }
    getLabelFromModel(model, id) {
        if (id === null || id === undefined) {
            return this.setLabelTo('', true);
        }
        model
            .getLabel(id)
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
    async updateList(searchPattern) {
        let options;
        try {
            options = await this.loadData(searchPattern);
        }
        catch (e) {
            if (!(e instanceof ThrottleError_1.default)) {
                throw e;
            }
            return;
        }
        if (this.state.isOpened && this.mounted) {
            this.setState({
                options: options.length && this.props.withEmptyOption
                    ? [
                        {
                            id: null,
                            label: '\u00A0'
                        },
                        ...options
                    ]
                    : options,
                selectedOptionKey: null,
                loading: false
            });
        }
        const content = document.querySelector(`${PRODUCT_ID} .__suggestBoxPopUp-content`);
        if (content) {
            content.style = {
                bottom: 'auto',
                position: 'static'
            };
        }
        this.scrollListTo(undefined);
    }
    closeList(shouldBlur) {
        var _a;
        if (shouldBlur) {
            (_a = this.input) === null || _a === void 0 ? void 0 : _a.blur();
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
    selectOption(option) {
        var _a;
        const performedOption = option !== null && option !== void 0 ? option : {
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
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.select();
    }
    onMouseOverOption(key) {
        this.focusOption(key, false).catch(console.error);
    }
    focusOptionAndScrollIntoView(key) {
        this.state.selectedOptionKey = key;
        const focusedItems = document.querySelector(`.${CLASSES.optionFocused}`);
        const currentItem = document.querySelector(`.${CLASSES.option}[data-key="${key}"]`);
        if (focusedItems) {
            focusedItems.classList.remove(CLASSES.optionFocused);
        }
        if (currentItem) {
            currentItem.classList.add(CLASSES.optionFocused);
        }
        const domOption = document.querySelectorAll(`#${PRODUCT_ID} li[data-key="${key}"]`)[0];
        this.scrollListTo(domOption);
    }
    focusNextOption() {
        if (!this.state.options.length) {
            return;
        }
        if (this.state.selectedOptionKey === null) {
            this.state.selectedOptionKey = 0;
            this.focusOption(this.state.selectedOptionKey, true).catch(console.error);
            return;
        }
        for (let key = this.state.selectedOptionKey + 1; key < this.state.options.length; key++) {
            const option = this.state.options[key];
            (0, assert_1.assertNonNullish)(option, `key "${key}" unavailable`);
            if (option.id) {
                this.focusOption(key, true).catch(console.error);
                return;
            }
        }
        for (let key = 0; key < this.state.selectedOptionKey + 1; key++) {
            const option = this.state.options[key];
            (0, assert_1.assertNonNullish)(option, `key "${key}" unavailable`);
            if (option.id) {
                this.focusOption(key, true).catch(console.error);
                return;
            }
        }
    }
    focusPrevOption() {
        if (this.state.selectedOptionKey === null) {
            this.state.selectedOptionKey = 0;
            this.focusOption(this.state.selectedOptionKey).catch(console.error);
            return;
        }
        for (let key = this.state.selectedOptionKey - 1; key >= 0; key--) {
            const option = this.state.options[key];
            (0, assert_1.assertNonNullish)(option, `key "${key}" unavailable`);
            if (option.id) {
                this.focusOption(key, true).catch(console.error);
                return;
            }
        }
        for (let key = this.state.options.length - 1; key > this.state.selectedOptionKey - 1; key--) {
            const option = this.state.options[key];
            (0, assert_1.assertNonNullish)(option, `key "${key}" unavailable`);
            if (option.id) {
                this.focusOption(key, true).catch(console.error);
                return;
            }
        }
    }
    scrollListTo(target) {
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
        }
        else if (target.offsetTop - container.scrollTop < 0) {
            container.scrollTop = target.offsetTop;
        }
    }
    isParentOf(child) {
        let currentChild = child;
        while (currentChild) {
            currentChild = currentChild.parentNode;
            if (currentChild === (0, react_dom_1.findDOMNode)(this)) {
                return true;
            }
        }
        return false;
    }
    getComputedPopupStyles() {
        (0, assert_1.assertNonNullish)(this.input, `input ref unavailable`);
        const inputStyles = window.getComputedStyle(this.input);
        const popupStyle = {};
        const inputOffset = this.input.getBoundingClientRect();
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
            }
            else {
                popupStyle.maxHeight = availableSpace;
                popupStyle.top = offsetTop;
            }
        }
        popupStyle.minWidth = inputWidth;
        popupStyle.left = offsetLeft;
        return popupStyle;
    }
}
SuggestBoxEditor.defaultProps = DEFAULT_PROPS;
exports.default = SuggestBoxEditor;
//# sourceMappingURL=SuggestBox.js.map