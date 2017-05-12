import React from 'react';
import {mount} from 'enzyme';
import Number from '../Number';

function getOnChangeHandler(value) {
  const onChange = jest.fn();
  const renderedComponent = mount(
    <Number value={null} onChange={onChange}/>
  );

  const input = renderedComponent.find('input');
  input.simulate('change', {target: {value}});

  return onChange;
}

describe('NumberEditor type converting', () => {
  it('Invalid value should returns as string', () => {
    expect(getOnChangeHandler('text')).toHaveBeenCalledWith('text');
  });

  it('Integer value should returns as number', () => {
    expect(getOnChangeHandler('3')).toHaveBeenCalledWith(3);
  });

  it('Float value should returns as number', () => {
    expect(getOnChangeHandler('3.1')).toHaveBeenCalledWith(3.1);
  });

  it('Empty value should returns as null', () => {
    expect(getOnChangeHandler('')).toHaveBeenCalledWith(null);
  });
});

describe('Check props', () => {
  it('Other value prop should change input value', () => {
    const renderedComponent = mount(
      <Number value={1} onChange={jest.fn()}/>
    );
    const input = renderedComponent.find('input').get(0);

    renderedComponent.setProps({value: 2});

    expect(input.value).toBe('2');
  });

  it('Same value prop should not change input value', () => {
    const renderedComponent = mount(
      <Number value={1} onChange={jest.fn()}/>
    );

    // Handle input.value setter
    const onSetInputValue = jest.fn();
    const input = renderedComponent.find('input').get(0);
    Object.defineProperty(input, 'value', {
      set: onSetInputValue
    });

    renderedComponent.setProps({value: 1});

    expect(onSetInputValue).not.toHaveBeenCalled();
  });
});
