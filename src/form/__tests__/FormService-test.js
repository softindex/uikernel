/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Form from '../FormService';
import ValidationErrors from '../../common/validation/ValidationErrors';

function getInitSettings(mockMethods) {
  jest.resetModules();
  return {
    fields: ['name', 'surname', 'phone', 'age'],
    partialErrorChecking: false,
    model: {...require('formModel'), ...mockMethods}
  };
}

let form;
let stateHandler;

beforeEach(async () => {
  form = new Form();
  await form.init(getInitSettings());
  stateHandler = jest.fn();
  form.addChangeListener(stateHandler);
});

describe('init form', () => {
  const initSettings = getInitSettings();

  it('settings dosn\'t have model property', async () => {
    const form = new Form();
    try {
      await form.init({});
    } catch (error) {
      expect(error.message).toEqual('You must specify the model');
    }
  });

  it('init', async () => {
    const form = new Form();
    const result = await form.init(initSettings);
    expect(result).toBeUndefined();
    expect(initSettings.model.on).toHaveBeenCalledTimes(1);
  });
});

describe('settings', () => {
  const initSettings = getInitSettings();

  it('partialErrorChecking = true', async () => {
    const form = new Form();
    const settings = {...initSettings};
    settings.partialErrorChecking = true;
    await form.init(settings);

    form.model.isValidRecord = async () => ValidationErrors.createFromJSON({age: ['Error']});

    await form.validateForm();

    expect(form.getAll().fields.age.errors).toBeNull();
  });

  it('partialErrorChecking = false', async () => {
    const form = new Form();
    await form.init(initSettings);
    // runValidator in ValidateForm won't call model.isValidRecord
    // if there are no changes or data in form
    form.set({age: 'test'});
    form.model.isValidRecord = async () => ValidationErrors.createFromJSON({age: ['Error']});

    await form.validateForm();

    expect(form.getAll().fields.age.errors.length).toBe(1);
  });
});

describe('get all', () => {
  async function isValidRecord() {
    return ValidationErrors.createFromJSON({
      surname: ['Surname is required'],
      age: ['Age must be greater then 100']
    });
  }
  const initSettings = getInitSettings({isValidRecord});
  const form = new Form();
  const defaultState = {
    isLoaded: false,
    data: {},
    fields: {},
    originalData: {},
    changes: {},
    isSubmitting: false,
    warnings: new ValidationErrors(),
    errors: new ValidationErrors()
  };

  it('before init', () => {
    expect(form.getAll()).toEqual(defaultState);
  });

  it('after init', async () => {
    const fields = {
      name: {
        value: 'newName',
        isChanged: true,
        errors: null,
        warnings: null
      },
      surname: {
        value: undefined,
        isChanged: false,
        errors: ['Surname is required'],
        warnings: null
      },
      phone: {
        value: 123456,
        isChanged: true,
        warnings: null,
        errors: null
      },
      age: {
        value: 45,
        isChanged: false,
        errors: ['Age must be greater then 100'],
        warnings: null
      }
    };
    initSettings.data = {name: 'Name', age: 45};
    initSettings.changes = {name: 'newName', phone: 123456};
    await form.init(initSettings);
    expect(form.getAll().fields).toEqual(fields);
  });
});

describe('updateField', () => {
  it('valid record', async () => {
    await form.updateField('name', 'John');
    expect(form.getAll().fields.name.isChanged).toBeTruthy();
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

describe('clearValidation', () => {
  it('clear error', async () => {
    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({name: ['Error']});
    };

    await form.set({name: 'John'}, true);
    form.clearValidation('name');

    expect(form.getAll().fields.name.errors).toBeFalsy();
    expect(stateHandler).toHaveBeenCalledTimes(3); // Set changes, validation, clear error
  });

  it('clear & validating conflict', async () => {
    // runValidator in ValidateForm won't call model.isValidRecord
    // if there are no changes or data in form
    form.set({name: 'test', age: 'test'});

    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({
        name: ['Error'],
        age: ['Error']
      });
    };

    const validatePromise = form.validateForm();
    form.clearValidation('name');

    await validatePromise;
    expect(form.getAll().fields.age.errors.length).toBe(1);
  });
});

describe('validateField', () => {
  it('set run', () => {
    form.set = jest.fn();
    form.validateField('name', 'newName');
    expect(form.set).toHaveBeenCalledTimes(1);
  });
});

describe('set', async () => {
  const initSettings = getInitSettings();
  const form = new Form();
  const stateHandler = jest.fn();

  it('before loaded', async () => {
    expect(await form.set({name: 'newName'})).toBeUndefined();
  });

  it('after loaded', async () => {
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

describe('submitData', async () => {
  it('it\'s set & submit', async () => {
    form.set = jest.fn();
    form.submit = jest.fn();

    await form.submitData({name: 'John'});

    expect(form.set).toHaveBeenCalledTimes(1);
    expect(form.submit).toHaveBeenCalledTimes(1);
  });
});

describe('submit', () => {
  it('validation error', async () => {
    const validationError = ValidationErrors.createFromJSON({name: ['Error']});
    form.model.submit = async function () {
      throw validationError;
    };

    let error;
    try {
      await form.submit();
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(validationError);
    expect(form.getAll().fields.name.errors.length).toBe(1);
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('not actual changes', async () => {
    await form.set({name: 'John', age: 21});
    const submitPromise = form.submit();
    await form.set({name: 'Sophia'});
    await submitPromise;

    expect(form.getAll().fields.name.isChanged).toBeTruthy();
    expect(stateHandler).toHaveBeenCalledTimes(4); // Set values, submitting, set values, submit result
  });

  it('clear errors and changes after submit', async () => {
    await form.set({name: 'John'});
    await form.submit();

    expect(form.getAll().fields.name.isChanged).toBeFalsy();
    expect(form.getAll().fields.name.errors).toBeFalsy();
    expect(stateHandler).toHaveBeenCalledTimes(3); // Set values, submitting, submit result
  });

  it('global error', async () => {
    const globalError = new Error('Global error');
    form.model.submit = async function () {
      throw globalError;
    };

    let error;
    try {
      await form.submit();
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(globalError);
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('isSubmitting = true', async () => {
    form.model.submit = jest.fn();
    form.submit();
    const result = await form.submit();
    expect(result).toBeUndefined();
  });
});

describe('clearFieldChanges', () => {
  it('delete changes', async () => {
    await form.set({name: 'newName'});
    form.clearFieldChanges('name');
    expect(form.getAll().fields.name.isChanged).toBeFalsy();
  });

  it('errors clear field', async () => {
    await form.set({name: 'Error'}, true);
    form.clearFieldChanges('name');
    expect(form.getAll().fields.name.errors).toBeFalsy();
  });

  it('set state', async () => {
    stateHandler.mockClear();
    form.clearFieldChanges('name');
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });
});

describe('clearChanges', () => {
  it('clear changed', async () => {
    await form.set({name: 'Error'});
    await form.validateForm();
    stateHandler.mockClear();
    form.clearChanges();
    expect(stateHandler).toHaveBeenCalledTimes(1);
    expect(form.getAll().fields.name.errors).toBeFalsy();
    expect(form.getAll().fields.name.isChanged).toBeFalsy();
  });
});

describe('validateForm', () => {
  it('validation error correction', async () => {
    const validationError = ValidationErrors.createFromJSON({name: ['Name is required']});
    form.model.isValidRecord = async function (record) {
      if (!record.name) {
        return validationError;
      }
      return new ValidationErrors();
    };

    // Not valid name
    await form.set({name: ''}, true);
    expect(form.getAll().fields.name.errors.length).toBeTruthy();

    // Valid name
    await form.set({name: 'John'}, true);
    expect(form.getAll().fields.name.errors).toBeFalsy();
  });

  it('simple validation error', async () => {
    const expectedValidation = ValidationErrors.createFromJSON({name: ['Error']});
    form.model.isValidRecord = async function () {
      return expectedValidation;
    };

    await form.set({name: 'John'}, true);

    expect(form.getAll().fields.name.errors.length).toBeTruthy();
  });

  it('global validation error', async () => {
    const globalError = new Error('Global error');
    form.model.isValidRecord = async function () {
      throw globalError;
    };

    let error;
    try {
      await form.set({name: 'John'}, true);
    } catch (e) {
      error = e;
    }

    expect(error).toBe(globalError);
    expect(form.getAll().fields.name.errors).toBeFalsy();
  });

  it('set state', async () => {
    await form.set({name: 'newName'});
    stateHandler.mockClear();
    await form.validateForm();
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('partial error checking', async () => {
    form.model.isValidRecord = async function () {
      return ValidationErrors.createFromJSON({
        name: ['Error'],
        age: ['Error']
      });
    };

    form.setPartialErrorChecking(true);
    await form.set({name: 'John'}, true);

    expect(form.getAll().fields.name.errors.length).toBeTruthy();
  });

  it('cancel not actual validation', async () => {
    const validationError = ValidationErrors.createFromJSON({name: ['Error']});
    form.model.isValidRecord = async function () {
      return validationError;
    };

    const validationPromise = form.set({name: 'John'}, true); // Validation
    form.set({name: 'Sophia'}); // Cancel previous validation

    await validationPromise;
    expect(form.getAll().fields.name.errors).toBeFalsy();
  });

  it('validation dependencies', async () => {
    form.model.getValidationDependency = () => {
      return ['age'];
    };

    await form.set({name: 'John'}, true);
    expect(form.model.isValidRecord.mock.calls[0][0]).toEqual({
      age: null,
      name: 'John'
    });
  });
  it('remove errors from unchanged form fields', async () => {
    form.setPartialErrorChecking(true);
    form.model.getValidationDependency = () => {
      return ['age'];
    };
    form.set({name: 'John'});

    form.model.isValidRecord = () => {
      return ValidationErrors.createFromJSON({age: ['Age is required']});
    };

    const {errors} = await form.validateForm();
    expect(errors).toEqual(null);
    form.setPartialErrorChecking(false);
  });
});

describe('before init', async () => {
  getInitSettings();
  const form = new Form();
  const func = [
    form.updateField.bind(form),
    form.clearValidation.bind(form),
    form.submit.bind(form),
    form.clearFieldChanges.bind(form),
    form.clearChanges.bind(form),
    form.validateForm.bind(form),
    form.submitData.bind(form)
  ];

  it('before init', async () => {
    const promises = func.map(async (elem) => {
      const result = await elem();
      expect(result).toBeUndefined();
      return;
    });
    await Promise.all(promises);
  });
});
