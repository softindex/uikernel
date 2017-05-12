/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Number = require('../Number');

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOnChangeHandler(value) {
  var onChange = jest.fn();
  var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: null, onChange: onChange }));

  var input = renderedComponent.find('input');
  input.simulate('change', { target: { value: value } });

  return onChange;
}

describe('NumberEditor type converting', function () {
  it('Invalid value should returns as string', function () {
    expect(getOnChangeHandler('text')).toHaveBeenCalledWith('text');
  });

  it('Integer value should returns as number', function () {
    expect(getOnChangeHandler('3')).toHaveBeenCalledWith(3);
  });

  it('Float value should returns as number', function () {
    expect(getOnChangeHandler('3.1')).toHaveBeenCalledWith(3.1);
  });

  it('Empty value should returns as null', function () {
    expect(getOnChangeHandler('')).toHaveBeenCalledWith(null);
  });
});

describe('Check props', function () {
  it('Other value prop should change input value', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: 1, onChange: jest.fn() }));
    var input = renderedComponent.find('input').get(0);

    renderedComponent.setProps({ value: 2 });

    expect(input.value).toBe('2');
  });

  it('Same value prop should not change input value', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(_Number2.default, { value: 1, onChange: jest.fn() }));

    // Handle input.value setter
    var onSetInputValue = jest.fn();
    var input = renderedComponent.find('input').get(0);
    Object.defineProperty(input, 'value', {
      set: onSetInputValue
    });

    renderedComponent.setProps({ value: 1 });

    expect(onSetInputValue).not.toHaveBeenCalled();
  });
});