const Form = require('../FormService');
const model = require('../app/model');
const ValidationErrors = require('../../common/validation/ValidationErrors');
const initSettings = {
  fields: ['name', 'surname', 'phone', 'age', 'gender'],
  model: UIKernel.Adapters.Grid.toFormCreate(model, {
    name: '',
    surname: '',
    phone: '',
    age: '',
    gender: 1
  }),
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

describe('init form', () => {
  it('settings dosn\'t have model property', () => {
    let form = new Form();
    try {
      form.init({});
    } catch (error) {
      expect(error.message).toEqual('You must specify the model form in this.init()');
    }
  });

  it('init', () => {
    let form = new Form();
    form.init(initSettings);
  });
});

describe('get all', () => {
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
  let form = new Form();
  form.init(initSettings);
  it('valid record', () => {
    form.updateField('name', 'newName');
    expect(form.getAll().changes).toEqual({name: 'newName'});
  });
});

describe('Listeners', () => {
  let form = new Form();
  form.init(initSettings);
  let handlerFunc = () => {};

  it('add listener', () => {
    form.addChangeListener(handlerFunc);
    expect(form._eventEmitter.listenerCount('update')).toBe(1);
  });

  it('add second listener', () => {
    form.addChangeListener(handlerFunc);
    expect(form._eventEmitter.listenerCount('update')).toBe(2);
  });

  it('remove listener', () => {
    form.removeChangeListener(handlerFunc);
    expect(form._eventEmitter.listenerCount('update')).toBe(1);
    expect(form.model.listenerCount('update')).toBe(1);
  });
});