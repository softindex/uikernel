'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Number = require('../Number');

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOnChangeHandler(eventValue, eventIsValid) {
  var onChange = jest.fn();
  var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: null, onChange: onChange }));

  var input = renderedComponent.find('input');
  input.simulate('change', {
    target: {
      value: eventValue,
      validity: {
        valid: eventIsValid
      }
    }
  });

  return onChange;
} /**
   * Copyright (с) 2015-present, SoftIndex LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree.
   */

describe('NumberEditor type converting', function () {
  it('Invalid value should returns as empty string', function () {
    expect(getOnChangeHandler('', false)).toHaveBeenCalledWith('');
  });

  it('Empty value should returns as null', function () {
    expect(getOnChangeHandler('', true)).toHaveBeenCalledWith(null);
  });

  it('Integer value should returns as number', function () {
    expect(getOnChangeHandler('3', true)).toHaveBeenCalledWith(3);
  });

  it('Float value should returns as number', function () {
    expect(getOnChangeHandler('3.1', true)).toHaveBeenCalledWith(3.1);
  });
});

describe('Check props', function () {
  it('Other value prop should change input value', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: 1, onChange: jest.fn() }));
    var inputDOMNode = renderedComponent.find('input').getDOMNode();

    renderedComponent.setProps({ value: 2 });

    expect(inputDOMNode.value).toBe('2');
  });

  it('Same value prop should not change input value', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: 1, onChange: jest.fn() }));
    // Handle input.value setter
    var onSetInputValue = jest.fn();
    var inputDOMNode = renderedComponent.find('input').getDOMNode();
    Object.defineProperty(inputDOMNode, 'value', {
      set: onSetInputValue
    });

    renderedComponent.setProps({ value: 1 });

    expect(onSetInputValue).not.toHaveBeenCalled();
  });
});