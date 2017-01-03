/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Form from '../FormService';
import ValidationErrors from '../../common/validation/ValidationErrors';

function getInitSettings() {
  jest.resetModules();
  return {
    fields: ['name', 'surname', 'phone', 'age', 'gender'],
    partialErrorChecking: true,
    model: require('formModel')
  };
}

let form;
let stateHandler;

beforeEach(async() => {
  form = new Form();
  await form.init(getInitSettings());
  stateHandler = jest.fn();
  form.addChangeListener(stateHandler);
});

describe('init form', () => {
  const initSettings = getInitSettings();

  it('settings dosn\'t have model property', async() => {
    const form = new Form();
    try {
      await form.init({});
    } catch (error) {
      expect(error.message).toEqual('You must specify the model form in this.init()');
    }
  });

  it('init', async() => {
    const form = new Form();
    const result = await form.init(initSettings);
    expect(result).toBeUndefined();
    expect(initSettings.model.on).toHaveBeenCalledTimes(1);
  });
});

describe('get all', () => {
  const initSettings = getInitSettings();
  const form = new Form();
  const defaultState = {
    isLoaded: false,
    data: {},
    originalData: {},
    changes: {},
    errors: new ValidationErrors(),
    globalError: null,
    isSubmitting: false
  };

  it('before init', () => {
    expect(form.getAll()).toEqual(defaultState);
  });

  it('after init', async() => {
    await form.init(initSettings);
    expect(form.getAll()).not.toEqual(defaultState);
  });
});

describe('updateField', () => {
  it('valid record', async () => {
    await form.updateField('name', 'John');
    expect(form.getAll().changes).toEqual({
      name: 'John'
    });
  });
});

describe('Listeners', () => {
  it('add listener', async () => {
    const handler = jest.fn();

    form.addChangeListener(handler);
    await form.set({name: 'John'});

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('remove listener', async () => {
    const handler = jest.fn();

    form.addChangeListener(handler);
    form.removeChangeListener(handler);
    await form.set({name: 'John'});

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('add two listeners', async () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    form.addChangeListener(firstHandler);
    form.addChangeListener(secondHandler);
    await form.set({name: 'John'});

    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });

  it('remove one listener of two', async () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    form.addChangeListener(firstHandler);
    form.addChangeListener(secondHandler);
    form.removeChangeListener(firstHandler);
    await form.set({name: 'John'});

    expect(firstHandler).toHaveBeenCalledTimes(0);
    expect(secondHandler).toHaveBeenCalledTimes(1);
  });

  it('remove all listeners', async () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    form.addChangeListener(firstHandler);
    form.addChangeListener(secondHandler);
    form.removeAllListeners();
    await form.set({name: 'John'});

    expect(firstHandler).toHaveBeenCalledTimes(0);
    expect(secondHandler).toHaveBeenCalledTimes(0);
  });
});

describe('clearError', () => {
  it('clear error', async() => {
    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({name: 'Error'});
    };

    await form.set({name: 'John'}, true);
    form.clearError('name');

    expect(form.getAll().errors.isEmpty()).toBe(true);
    expect(stateHandler).toHaveBeenCalledTimes(3); // Set changes, validation, clear error
  });

  it('clear & validating conflict', async () => {
    const expectedValidation = ValidationErrors.createFromJSON({age: 'Error'});
    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({
        name: 'Error',
        age: 'Error'
      });
    };

    const validatePromise = form.validateForm();
    form.clearError('name');

    await validatePromise;

    expect(form.getAll().errors).toEqual(expectedValidation);
  });
});

describe('validateField', () => {
  it('updateField and validateForm run', () => {
    form.updateField = jest.fn();
    form.validateForm = jest.fn();
    form.validateField('name', 'newName');
    expect(form.updateField).toHaveBeenCalledTimes(1);
    expect(form.validateForm).toHaveBeenCalledTimes(1);
  });
});

describe('set', async() => {
  const initSettings = getInitSettings();
  const form = new Form();
  const stateHandler = jest.fn();

  it('before loaded', async () => {
    expect(await form.set({name: 'newName'})).toBeUndefined();
  });

  it('after loaded', async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
    form.validateForm = jest.fn();
    stateHandler.mockClear();
    expect(await form.set({name: 'newName'})).toBeUndefined();
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('with validate = true', async () => {
    await form.set({name: 'newName'}, true);
    expect(form.validateForm).toHaveBeenCalledTimes(1);
  });
});

describe('submitData', async() => {
  it('it\'s set & submit', async() => {
    form.set = jest.fn();
    form.submit = jest.fn();

    await form.submitData({name: 'John'});

    expect(form.set).toHaveBeenCalledTimes(1);
    expect(form.submit).toHaveBeenCalledTimes(1);
  });
});

describe('submit', () => {
  it('validation error', async() => {
    const validationError = ValidationErrors.createFromJSON({name: 'Error'});
    form.model.submit = async function () {
      throw validationError;
    };

    try {
      await form.submit();
    } catch (err) {
      expect(err).toEqual(validationError);
    }

    expect(form.getAll().errors).toEqual(validationError);
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('not actual changes', async() => {
    await form.set({name: 'John', age: 21});
    const submitPromise = form.submit();
    await form.set({name: 'Sophia'});
    await submitPromise;

    expect(form.getAll().changes).toEqual({name: 'Sophia'});
    expect(stateHandler).toHaveBeenCalledTimes(4); // Set values, submitting, set values, submit result
  });

  it('clear errors and changes after submit', async() => {
    await form.set({name: 'John'});
    await form.submit();

    expect(form.getAll().changes).toEqual({});
    expect(form.getAll().errors.isEmpty()).toBe(true);
    expect(stateHandler).toHaveBeenCalledTimes(3); // Set values, submitting, submit result
  });

  it('global error', async() => {
    const globalError = new Error('Global error');
    form.model.submit = async function () {
      throw globalError;
    };

    try {
      await form.submit();
    } catch (err) {
      expect(err).toEqual(globalError);
    }

    expect(form.getAll().globalError).toEqual(globalError);
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('isSubmitting = true', async() => {
    form.model.submit = jest.fn();
    form.submit();
    const result = await form.submit();
    expect(result).toBeUndefined();
  });
});

describe('clearFieldChanges', () => {
  it('delete changes', async() => {
    await form.set({name: 'newName'});
    form.clearFieldChanges('name');
    expect(form.getAll().changes).toEqual({});
  });

  it('errors clear field', async() => {
    await form.set({name: 'Error'}, true);
    form.clearFieldChanges('name');
    expect(form.getAll().errors.isEmpty()).toBe(true);
  });

  it('set state', async() => {
    stateHandler.mockClear();
    form.clearFieldChanges('name');
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });
});

describe('clearChanges', () => {
  it('clear changed', async() => {
    await form.set({name: 'Error'});
    await form.validateForm();
    stateHandler.mockClear();
    form.clearChanges();
    const state = form.getAll();
    expect(stateHandler).toHaveBeenCalledTimes(1);
    expect({
      errors: state.errors,
      changes: state.changes,
      globalError: state.globalError,
      partialErrorChecking: form.getPartialErrorChecking().partialErrorChecking
    })
      .toEqual({
        errors: new ValidationErrors(),
        changes: {},
        globalError: false,
        partialErrorChecking: form.getPartialErrorChecking().partialErrorCheckingDefault
      });
  });
});

describe('validateForm', () => {
  it('validation error correction', async() => {
    const validationError = ValidationErrors.createFromJSON({name: 'Name is required'});
    form.model.isValidRecord = async function (record) {
      if (!record.name) {
        return validationError;
      }
      return new ValidationErrors();
    };

    // Not valid name
    await form.set({name: ''}, true);
    expect(form.getAll().errors).toEqual(validationError);

    // Valid name
    await form.set({name: 'John'}, true);
    expect(form.getAll().errors.isEmpty()).toBe(true);
  });

  it('simple validation error', async() => {
    const expectedValidation = ValidationErrors.createFromJSON({name: 'Error'});
    form.model.isValidRecord = async function () {
      return expectedValidation;
    };

    await form.set({name: 'John'}, true);

    expect(form.getAll().errors).toEqual(expectedValidation);
  });

  it('global validation error', async() => {
    const globalError = new Error('Global error');
    form.model.isValidRecord = async function () {
      throw globalError;
    };

    await form.set({name: 'John'}, true);

    const state = form.getAll();
    expect(state.globalError).toBe(globalError);
    expect(state.errors.isEmpty()).toBe(true);
  });

  it('set state', async() => {
    await form.set({name: 'newName'});
    stateHandler.mockClear();
    await form.validateForm();
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('partial error checking', async() => {
    const expectedValidation = ValidationErrors.createFromJSON({name: 'Error'});
    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({
        name: 'Error',
        age: 'Error'
      });
    };

    form.setPartialErrorChecking(true);
    await form.set({name: 'John'}, true);

    expect(form.getAll().errors).toEqual(expectedValidation);
  });

  it('cancel not actual validation', async() => {
    const validationError = ValidationErrors.createFromJSON({name: 'Error'});
    form.model.isValidRecord = async function () {
      return validationError;
    };

    const validationPromise = form.set({name: 'John'}, true); // Validation
    form.set({name: 'Sophia'}); // Cancel previous validation

    await validationPromise;
    expect(form.getAll().errors.isEmpty()).toBe(true);
  });

  it('validation dependencies', async() => {
    form.model.getValidationDependency = () => {
      return ['age'];
    };

    await form.set({name: 'John'}, true);
    expect(form.model.isValidRecord.mock.calls[1][0]).toEqual({
      age: null,
      name: 'John'
    });
  });
});

describe('before init', async() => {
  getInitSettings();
  const form = new Form();
  const func = [
    form.updateField.bind(form),
    form.clearError.bind(form),
    form.submit.bind(form),
    form.clearFieldChanges.bind(form),
    form.clearChanges.bind(form),
    form.validateForm.bind(form),
    form.submitData.bind(form)
  ];

  it('before init', async() => {
    const promises = func.map(async(elem) => {
      const result = await elem();
      expect(result).toBeUndefined();
      return;
    });
    await Promise.all(promises);
  });
});
