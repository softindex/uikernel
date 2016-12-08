const Form = require('../FormService');
const FormModel = require('../FormModel');
const ValidationErrors = require('../../common/validation/ValidationErrors');
jest.mock('model');
// const model = require('model');
let initSettings = {
  fields: ['name', 'surname', 'phone', 'age', 'gender'],
  submitAll: true,
  partialErrorChecking: true
};
const defaultState = {
  isLoaded: false,
  data: {},
  originalData: {},
  changes: {},
  errors: new ValidationErrors(),
  globalError: null,
  isSubmitting: false
};

function getInitSettings() {
  jest.resetModules();
  const model = require('model');
  return {...initSettings, model};
};

describe('init form', () => {
  const initSettings = getInitSettings();

  it('settings dosn\'t have model property', async() => {
    let form = new Form();
    try {
      await form.init({});
    } catch (error) {
      expect(error.message).toEqual('You must specify the model form in this.init()');
    }
  });

  it('init', async() => {
    let form = new Form();
    let result = await form.init(initSettings);
    expect(result).toBeUndefined();
    expect(initSettings.model.on).toHaveBeenCalledTimes(1);
  });
});

describe('get all', () => {
  const initSettings = getInitSettings();
  let form = new Form();

  it('before init', () => {
    expect(form.getAll()).toEqual(defaultState);
  });

  it('after init', async() => {
    await form.init(initSettings);
    expect(form.getAll()).not.toEqual(defaultState);
  });
});

describe('updateField', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  form.set = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
  });

  it('valid record', () => {
    form.updateField('name', 'newName');
    expect(form.set.mock.calls).toEqual([[{name: 'newName'}]]);
  });
});

describe('Listeners', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  let handlerFunc1 = jest.fn();
  let handlerFunc2 = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
  });

  it('add listener', () => {
    form.addChangeListener(handlerFunc1);
    form.setPartialErrorChecking(); // call _setState
    expect(handlerFunc1).toHaveBeenCalledTimes(1);
  });

  it('add second listener', () => {
    handlerFunc1.mockClear();
    form.addChangeListener(handlerFunc2);
    form.setPartialErrorChecking(); // call _setState
    expect(handlerFunc1).toHaveBeenCalledTimes(1);
    expect(handlerFunc2).toHaveBeenCalledTimes(1);
  });

  it('remove listener', () => {
    handlerFunc2.mockClear();
    form.removeChangeListener(handlerFunc2);
    form.setPartialErrorChecking(); // call _setState
    expect(handlerFunc2).toHaveBeenCalledTimes(0);
    expect(form.model.listenerCount('update')).toBe(1);
  });

  it('remove all listener', () => {
    handlerFunc1.mockClear();
    form.addChangeListener(handlerFunc2);
    form.removeAllListeners();
    form.setPartialErrorChecking(); // call _setState
    expect(handlerFunc1).toHaveBeenCalledTimes(0);
    expect(handlerFunc2).toHaveBeenCalledTimes(0);
    expect(form.model.listenerCount('update')).toBe(0);
  });
});

describe('clearError', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
  });

  it('clear err', async() => {
    form.set({name: 'Error'});
    await form.validateForm();
    stateHandler.mockClear();

    form.clearError('name');
    expect(form.getAll().errors).toEqual({});
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('validating = true', async() => {
    form.model.isValidRecord = jest.fn(() => ValidationErrors.createFromJSON({name: 'err1', surname: 'err2', age: 'err3'}));
    let result = form.validateForm();
    form.clearError('name');
    form.clearError('surname');
    result
    .then(() => {
      expect(form.getAll().errors).toEqual({ age: 'err3' })
    });
  });
});

describe('validateField', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  form.updateField = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
  });

  it('updateField and validateForm run', () => {
    form.validateForm = jest.fn();
    form.validateField('name', 'newName');
    expect(form.updateField.mock.calls).toEqual([['name', 'newName']]);
    expect(form.validateForm).toHaveBeenCalledTimes(1);
  });
});

describe('set', async() => {
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  it('before loaded', () => {
    expect(form.set({name: 'newName'})).toBeUndefined();
  });

  it('after loaded', async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
    form.validateForm = jest.fn();
    stateHandler.mockClear();
    expect(form.set({name: 'newName'})).toBeUndefined();
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('with validate = true', () => {
    form.set({name: 'newName'}, true);
    expect(form.validateForm).toHaveBeenCalledTimes(1);
  });
});

describe('submitData', async() => {
  const initSettings = getInitSettings();
  let form = new Form();

  beforeAll(async() => {
    await form.init(initSettings);
  });

  it('after init', async() => {
    await form.init(initSettings);
    form.set = jest.fn();
    form.submit = jest.fn();

    form.submitData({name: 'newName'});
    expect(form.set).toHaveBeenCalledTimes(1);
    expect(form.submit).toHaveBeenCalledTimes(1);
  });
});

describe('submit', () => { //fixme разные валидаторы
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
  });

  it('validation error', async() => {
    // form.set({name: 'Error'});
    form.model.submit = jest.fn(() => {throw ValidationErrors.createFromJSON({name: 'bad name'})});
    stateHandler.mockClear();

    try{
      await form.submit();
    } catch (err){
      expect(err).toBeInstanceOf(ValidationErrors);
    }
    expect(form.getAll().errors).toEqual({name: 'bad name'});
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('not actual changes', async() => {
    form.set({name: 'newName1', surname: 'value'});
    form.model.submit = jest.fn(() => {
      form.set({name: 'newName2', surname: 'value'});
      return 1;
    });
    stateHandler.mockClear();

    let result = await form.submit();
    expect(form.getAll().changes).toEqual({name: 'newName2'});
    expect(result).toBe(1);
    expect(stateHandler).toHaveBeenCalledTimes(3); //submit: 2 + set: 1
  });

  it('actual changes', async() => {
    form.set({name: 'newName1', surname: 'value'});
    form.model.submit = jest.fn(() => 1);
    stateHandler.mockClear();

    let result = await form.submit();
    expect(form.getAll().changes).toEqual({});
    expect(form.getAll().errors).toEqual({});
    expect(result).toBe(1);
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('global error', async() => {
    form.model.submit = jest.fn(() => {throw "global error!"});
    stateHandler.mockClear();

    try{
      let result = await form.submit();
    } catch (err){
      expect(err).toEqual("global error!");
    }
    expect(form.getAll().globalError).toEqual("global error!");
    expect(stateHandler).toHaveBeenCalledTimes(2);
  });

  it('isSubmitting = true', async() => {
    form.model.submit = jest.fn();
    form.submit();
    let result = await form.submit();
    expect(result).toBeUndefined();
  });
});

describe('clearFieldChanges', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
  });

  it('delete changes', async() => {
    form.set({name: 'newName'});
    form.clearFieldChanges('name');
    expect(form.getAll().changes).toEqual({});
  });

  it('errors clear field', async() => {
    form.set({name: 'Error'});
    await form.validateForm();
    form.clearFieldChanges('name');
    expect(form.getAll().errors).toEqual({});
  });

  it('set state', async() => {
    stateHandler.mockClear();
    form.clearFieldChanges('name');
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });
});

describe('clearChanges', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
  });

  it('clear changed', async() => {
    form.set({name: 'Error'});
    await form.validateForm();
    stateHandler.mockClear();
    form.clearChanges();
    let state = form.getAll();
    expect(stateHandler).toHaveBeenCalledTimes(1);
    expect({
      errors: state.errors,
      changes: state.changes,
      globalError: state.globalError,
      partialErrorChecking: form.getPartialErrorChecking().partialErrorChecking
    })
      .toEqual({
        errors: {},
        changes: {},
        globalError: false,
        partialErrorChecking: form.getPartialErrorChecking().partialErrorCheckingDefault
      });
  });
});

describe('validateForm', () => {
  const initSettings = getInitSettings();
  let form = new Form();
  let stateHandler = jest.fn();

  beforeAll(async() => {
    await form.init(initSettings);
    form.addChangeListener(stateHandler);
  });

  it('valid record', async() => {
    form.set({name: 'Error'});
    await form.validateForm();
    form.set({name: 'newName'});
    let result = await form.validateForm();
    expect(result).toBeUndefined();
    expect(form.getAll().errors).toBeUndefined();
  });

  it('validation error', async() => {
    form.set({name: 'Error'});
    let result = await form.validateForm();
    expect(result.getFieldErrors('name')).toEqual("error in name");
    expect(form.getAll().errors).toEqual({"name": "error in name"});
  });

  it('global error', async() => {
    form.set({name: 'globalError'});
    try {
      await form.validateForm();
    } catch (err) {
      expect(err).toBe('global error exist');
      expect(form.getAll().errors).toEqual({});
    }
  });

  it('set state', async() => {
    form.set({name: 'newName'});
    stateHandler.mockClear();
    await form.validateForm();
    expect(stateHandler).toHaveBeenCalledTimes(1);
  });

  it('errorsWithPartialChecking', async() => {
    form.model.isValidRecord = jest.fn(() => ValidationErrors.createFromJSON({name: 'err1', surname: 'err2', age: 'err3'}));
    form.set({name: 'newName'});
    form.setPartialErrorChecking(true);
    await form.validateForm();
    expect(form.getAll().errors).toEqual({name: 'err1'});
  });

  it('not actual changes', async() => {
    form.set({name: 'newName1', surname: 'value'});
    form.model.isValidRecord = jest.fn(() => {
      form.set({name: 'newName2', surname: 'value'});
    });
    let result = await form.validateForm();
    expect(result).toBeUndefined();
  });

});

describe('before init', async() => {
  const initSettings = getInitSettings();
  let form = new Form();
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
    let promises = func.map(async(elem) => {
      let result = await elem();
      expect(result).toBeUndefined();
      return;
    });
    await Promise.all(promises);
  });

});

