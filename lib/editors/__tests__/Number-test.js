"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Number_1 = __importDefault(require("../Number"));
function getOnChangeHandler(eventValue, eventIsValid) {
    const onChange = jest.fn();
    const renderedComponent = (0, enzyme_1.mount)(react_1.default.createElement(Number_1.default, { value: null, onChange: onChange }));
    const input = renderedComponent.find('input');
    input.simulate('change', {
        target: {
            value: eventValue,
            validity: {
                valid: eventIsValid
            }
        }
    });
    return onChange;
}
describe('NumberEditor type converting', () => {
    it('Invalid value should returns as empty string', () => {
        expect(getOnChangeHandler('', false)).toHaveBeenCalledWith('');
    });
    it('Empty value should returns as null', () => {
        expect(getOnChangeHandler('', true)).toHaveBeenCalledWith(null);
    });
    it('Integer value should returns as number', () => {
        expect(getOnChangeHandler('3', true)).toHaveBeenCalledWith(3);
    });
    it('Float value should returns as number', () => {
        expect(getOnChangeHandler('3.1', true)).toHaveBeenCalledWith(3.1);
    });
});
describe('Check props', () => {
    it('Other value prop should change input value', () => {
        const renderedComponent = (0, enzyme_1.mount)(react_1.default.createElement(Number_1.default, { value: 1, onChange: jest.fn() }));
        const inputDOMNode = renderedComponent.find('input').getDOMNode();
        renderedComponent.setProps({ value: 2 });
        expect(inputDOMNode.value).toBe('2');
    });
    it('Same value prop should not change input value', () => {
        const renderedComponent = (0, enzyme_1.mount)(react_1.default.createElement(Number_1.default, { value: 1, onChange: jest.fn() }));
        const onSetInputValue = jest.fn();
        const inputDOMNode = renderedComponent.find('input').getDOMNode();
        Object.defineProperty(inputDOMNode, 'value', {
            set: onSetInputValue,
            get: jest.fn()
        });
        renderedComponent.setProps({ value: 1 });
        expect(onSetInputValue).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=Number-test.js.map