"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMockInstance_1 = __importDefault(require("../../common/mock-utils/createMockInstance"));
const ValidationErrors_1 = __importDefault(require("../../validation/ValidationErrors"));
const FormModel_1 = __importDefault(require("../FormModel"));
const FormService_1 = __importDefault(require("../FormService"));
function getInitSettings() {
    jest.resetModules();
    return {
        fields: ['name', 'surname', 'phone', 'age'],
        partialErrorChecking: false,
        model: (0, createMockInstance_1.default)(FormModel_1.default)
    };
}
async function createInitedInstance(initialData = {}) {
    const instance = new FormService_1.default();
    const initSettings = getInitSettings();
    const modelMock = initSettings.model;
    modelMock.getData.mockResolvedValueOnce(initialData);
    modelMock.on.mockResolvedValueOnce(modelMock);
    await instance.init(initSettings);
    return { instance, modelMock };
}
describe('Init form', () => {
    it('Init', async () => {
        const form = new FormService_1.default();
        const initSettings = getInitSettings();
        initSettings.model.getData.mockResolvedValueOnce({});
        initSettings.model.on.mockResolvedValueOnce(initSettings.model);
        const result = await form.init(initSettings);
        expect(result).toBeUndefined();
        expect(initSettings.model.on).toHaveBeenCalledTimes(1);
    });
});
describe('Settings', () => {
    it('partialErrorChecking = true', async () => {
        const initSettings = getInitSettings();
        initSettings.model.getData.mockResolvedValueOnce({});
        initSettings.model.on.mockResolvedValueOnce(initSettings.model);
        const form = new FormService_1.default();
        const settings = { ...initSettings };
        settings.partialErrorChecking = true;
        await form.init(settings);
        initSettings.model.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({ age: ['Error'] }));
        await form.validateForm();
        expect(form.getAll().fields.age.errors).toHaveLength(0);
    });
    it('partialErrorChecking = false', async () => {
        const initSettings = getInitSettings();
        initSettings.model.getData.mockResolvedValueOnce({});
        initSettings.model.on.mockResolvedValueOnce(initSettings.model);
        initSettings.model.getValidationDependency.mockReturnValue([]);
        const form = new FormService_1.default();
        await form.init(initSettings);
        await form.set({ age: 'test' });
        initSettings.model.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({ age: ['Error'] }));
        await form.validateForm();
        expect(form.getAll().fields.age.errors).toHaveLength(1);
    });
});
describe('Get all', () => {
    it('Before init', () => {
        const initSettings = getInitSettings();
        initSettings.model.getData.mockResolvedValueOnce({});
        initSettings.model.on.mockResolvedValueOnce(initSettings.model);
        const form = new FormService_1.default();
        const defaultState = {
            isLoaded: false,
            data: {},
            fields: {},
            originalData: {},
            changes: {},
            isSubmitting: false,
            warnings: new ValidationErrors_1.default(),
            errors: new ValidationErrors_1.default()
        };
        expect(form.getAll()).toEqual(defaultState);
    });
    it('After init', async () => {
        const initSettings = getInitSettings();
        initSettings.model.getData.mockResolvedValueOnce({});
        initSettings.model.on.mockResolvedValueOnce(initSettings.model);
        const form = new FormService_1.default();
        initSettings.model.isValidRecord.mockImplementation(async () => {
            return ValidationErrors_1.default.createFromJSON({
                surname: ['Surname is required'],
                age: ['Age must be greater then 100']
            });
        });
        const fields = {
            name: {
                value: 'newName',
                isChanged: true,
                errors: [],
                warnings: []
            },
            surname: {
                value: undefined,
                isChanged: false,
                errors: [{ message: 'Surname is required' }],
                warnings: []
            },
            phone: {
                value: 123456,
                isChanged: true,
                warnings: [],
                errors: []
            },
            age: {
                value: 45,
                isChanged: false,
                errors: [{ message: 'Age must be greater then 100' }],
                warnings: []
            }
        };
        initSettings.data = { name: 'Name', age: 45 };
        initSettings.changes = { name: 'newName', phone: 123456 };
        await form.init(initSettings);
        expect(form.getAll().fields).toEqual(fields);
    });
});
describe('updateField', () => {
    it('Valid record', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        await instance.updateField('name', 'John');
        expect(instance.getAll().fields.name.isChanged).toBeTruthy();
    });
});
describe('Listeners', () => {
    it('Add listener', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const handler = jest.fn();
        instance.addChangeListener(handler);
        await instance.set({ name: 'John' });
        expect(handler).toHaveBeenCalledTimes(1);
    });
    it('Remove listener', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.off.mockResolvedValueOnce(modelMock);
        modelMock.getValidationDependency.mockReturnValue([]);
        const handler = jest.fn();
        instance.addChangeListener(handler);
        instance.removeChangeListener(handler);
        await instance.set({ name: 'John' });
        expect(handler).toHaveBeenCalledTimes(0);
    });
    it('Add two listeners', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const firstHandler = jest.fn();
        const secondHandler = jest.fn();
        instance.addChangeListener(firstHandler);
        instance.addChangeListener(secondHandler);
        await instance.set({ name: 'John' });
        expect(firstHandler).toHaveBeenCalledTimes(1);
        expect(secondHandler).toHaveBeenCalledTimes(1);
    });
    it('Remove one listener of two', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const firstHandler = jest.fn();
        const secondHandler = jest.fn();
        instance.addChangeListener(firstHandler);
        instance.addChangeListener(secondHandler);
        instance.removeChangeListener(firstHandler);
        await instance.set({ name: 'John' });
        expect(firstHandler).toHaveBeenCalledTimes(0);
        expect(secondHandler).toHaveBeenCalledTimes(1);
    });
    it('Remove all listeners', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.off.mockReturnValueOnce(modelMock);
        modelMock.getValidationDependency.mockReturnValue([]);
        const firstHandler = jest.fn();
        const secondHandler = jest.fn();
        instance.addChangeListener(firstHandler);
        instance.addChangeListener(secondHandler);
        instance.removeAllListeners();
        await instance.set({ name: 'John' });
        expect(firstHandler).toHaveBeenCalledTimes(0);
        expect(secondHandler).toHaveBeenCalledTimes(0);
    });
});
describe('clearValidation', () => {
    it('Clear error', async () => {
        const { instance, modelMock } = await createInitedInstance();
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        modelMock.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({ name: ['Error'] }));
        modelMock.getValidationDependency.mockReturnValue([]);
        await instance.set({ name: 'John' }, true);
        instance.clearValidation('name');
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
        expect(stateHandler).toHaveBeenCalledTimes(3);
    });
    it('Clear & validating conflict', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        await instance.set({ name: 'test', age: 'test' });
        modelMock.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({
            name: ['Error'],
            age: ['Error']
        }));
        const validatePromise = instance.validateForm();
        instance.clearValidation('name');
        await validatePromise;
        expect(instance.getAll().fields.age.errors).toHaveLength(1);
    });
});
describe('validateField', () => {
    it('Set run', async () => {
        const { instance } = await createInitedInstance();
        instance.set = jest.fn(async () => { });
        instance.validateField('name', 'newName');
        expect(instance.set).toHaveBeenCalledTimes(1);
    });
});
describe('set', () => {
    it('Before loaded', async () => {
        const instance = new FormService_1.default();
        expect(await instance.set({ name: 'newName' })).toBeUndefined();
    });
    it('After loaded', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        instance.validateForm = jest.fn();
        expect(await instance.set({ name: 'newName' })).toBeUndefined();
        expect(stateHandler).toHaveBeenCalledTimes(1);
    });
    it('With validate = true', async () => {
        const { instance, modelMock } = await createInitedInstance();
        instance.validateForm = jest.fn(async () => { });
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        await instance.set({ name: 'newName' }, true);
        expect(instance.validateForm).toHaveBeenCalledTimes(1);
    });
});
describe('submitData', () => {
    it("It's set & submit", async () => {
        const { instance } = await createInitedInstance();
        instance.set = jest.fn();
        instance.submit = jest.fn();
        await instance.submitData({ name: 'John' });
        expect(instance.set).toHaveBeenCalledTimes(1);
        expect(instance.submit).toHaveBeenCalledTimes(1);
    });
});
describe('submit', () => {
    it('Validation error', async () => {
        const { instance, modelMock } = await createInitedInstance();
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        const validationError = ValidationErrors_1.default.createFromJSON({ name: ['Error'] });
        modelMock.submit.mockRejectedValueOnce(validationError);
        modelMock.getValidationDependency.mockReturnValue([]);
        let error;
        try {
            await instance.submit();
        }
        catch (err) {
            error = err;
        }
        expect(error).toEqual(validationError);
        expect(instance.getAll().fields.name.errors).toHaveLength(1);
        expect(stateHandler).toHaveBeenCalledTimes(2);
    });
    it('Not actual changes', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.submit.mockResolvedValueOnce({});
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        await instance.set({ name: 'John', age: 21 });
        const submitPromise = instance.submit();
        await instance.set({ name: 'Sophia' });
        await submitPromise;
        expect(instance.getAll().fields.name.isChanged).toBeTruthy();
        expect(stateHandler).toHaveBeenCalledTimes(4);
    });
    it('Clear errors and changes after submit', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.submit.mockResolvedValueOnce({});
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        await instance.set({ name: 'John' });
        await instance.submit();
        expect(instance.getAll().fields.name.isChanged).toBeFalsy();
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
        expect(stateHandler).toHaveBeenCalledTimes(3);
    });
    it('Global error', async () => {
        const { instance, modelMock } = await createInitedInstance();
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        const globalError = new Error('Global error');
        modelMock.submit.mockRejectedValueOnce(globalError);
        let error;
        try {
            await instance.submit();
        }
        catch (err) {
            error = err;
        }
        expect(error).toEqual(globalError);
        expect(stateHandler).toHaveBeenCalledTimes(2);
    });
    it('isSubmitting = true', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.submit.mockResolvedValueOnce({});
        instance.submit();
        const result = await instance.submit();
        expect(result).toBeUndefined();
    });
});
describe('clearFieldChanges', () => {
    it('Delete changes', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        await instance.set({ name: 'newName' });
        instance.clearFieldChanges('name');
        expect(instance.getAll().fields.name.isChanged).toBeFalsy();
    });
    it('Errors clear field', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        await instance.set({ name: 'Error' }, true);
        instance.clearFieldChanges('name');
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
    });
    it('Set state', async () => {
        const { instance } = await createInitedInstance();
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        instance.clearFieldChanges('name');
        expect(stateHandler).toHaveBeenCalledTimes(1);
    });
});
describe('clearChanges', () => {
    it('Clear changed', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        await instance.set({ name: 'Error' });
        await instance.validateForm();
        stateHandler.mockClear();
        instance.clearChanges();
        expect(stateHandler).toHaveBeenCalledTimes(1);
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
        expect(instance.getAll().fields.name.isChanged).toBeFalsy();
    });
});
describe('validateForm', () => {
    it('Validation error correction', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const validationError = ValidationErrors_1.default.createFromJSON({ name: ['Name is required'] });
        modelMock.isValidRecord.mockResolvedValueOnce(validationError);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        await instance.set({ name: '' }, true);
        expect(instance.getAll().fields.name.errors.length).toBeTruthy();
        await instance.set({ name: 'John' }, true);
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
    });
    it('Simple validation error', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const expectedValidation = ValidationErrors_1.default.createFromJSON({ name: ['Error'] });
        modelMock.isValidRecord.mockResolvedValueOnce(expectedValidation);
        await instance.set({ name: 'John' }, true);
        expect(instance.getAll().fields.name.errors.length).toBeTruthy();
    });
    it('Global validation error', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const globalError = new Error('Global error');
        modelMock.isValidRecord.mockRejectedValueOnce(globalError);
        let error;
        try {
            await instance.set({ name: 'John' }, true);
        }
        catch (e) {
            error = e;
        }
        expect(error).toBe(globalError);
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
    });
    it('Set state', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        const stateHandler = jest.fn();
        instance.addChangeListener(stateHandler);
        await instance.set({ name: 'newName' });
        stateHandler.mockClear();
        await instance.validateForm();
        expect(stateHandler).toHaveBeenCalledTimes(1);
    });
    it('Partial error checking', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        modelMock.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({
            name: ['Error'],
            age: ['Error']
        }));
        instance.setPartialErrorChecking(true);
        await instance.set({ name: 'John' }, true);
        expect(instance.getAll().fields.name.errors.length).toBeTruthy();
    });
    it('Cancel not actual validation', async () => {
        const { instance, modelMock } = await createInitedInstance();
        modelMock.getValidationDependency.mockReturnValue([]);
        const validationError = ValidationErrors_1.default.createFromJSON({ name: ['Error'] });
        modelMock.isValidRecord.mockResolvedValueOnce(validationError);
        const validationPromise = instance.set({ name: 'John' }, true);
        instance.set({ name: 'Sophia' });
        await validationPromise;
        expect(instance.getAll().fields.name.errors).toHaveLength(0);
    });
    it('Validation dependencies', async () => {
        const { instance, modelMock } = await createInitedInstance({
            name: null,
            age: null
        });
        modelMock.getValidationDependency.mockReturnValue(['age']);
        modelMock.isValidRecord.mockResolvedValueOnce(new ValidationErrors_1.default());
        await instance.set({ name: 'John' }, true);
        expect(modelMock.isValidRecord.mock.calls[0][0]).toStrictEqual({
            age: null,
            name: 'John'
        });
    });
    it('Hide errors on unchanged form fields', async () => {
        const { instance, modelMock } = await createInitedInstance();
        instance.setPartialErrorChecking(true);
        modelMock.getValidationDependency.mockReturnValue(['age']);
        await instance.set({ name: 'John' });
        modelMock.isValidRecord.mockResolvedValueOnce(ValidationErrors_1.default.createFromJSON({ age: ['Age is required'] }));
        const { errors } = await instance.validateForm();
        expect(errors).toBeNull();
    });
});
describe('Before init', () => {
    getInitSettings();
    const form = new FormService_1.default();
    const func = [
        form.updateField.bind(form),
        form.clearValidation.bind(form),
        form.submit.bind(form),
        form.clearFieldChanges.bind(form),
        form.clearChanges.bind(form),
        form.validateForm.bind(form),
        form.submitData.bind(form)
    ];
    it('Before init', async () => {
        const promises = func.map(async (elem) => {
            const result = await elem();
            expect(result).toBeUndefined();
        });
        await Promise.all(promises);
    });
});
//# sourceMappingURL=FormService-test.js.map