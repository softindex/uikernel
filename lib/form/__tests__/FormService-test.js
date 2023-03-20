"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _FormService = _interopRequireDefault(require("../FormService"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _FormModelMock = _interopRequireDefault(require("../__mocks__/FormModelMock"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getInitSettings(mockMethods) {
  jest.resetModules();
  return {
    fields: ['name', 'surname', 'phone', 'age'],
    partialErrorChecking: false,
    model: _objectSpread(_objectSpread({}, new _FormModelMock["default"]()), mockMethods)
  };
}

var form;
var stateHandler;
beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = new _FormService["default"]();
          _context.next = 3;
          return form.init(getInitSettings());

        case 3:
          stateHandler = jest.fn();
          form.addChangeListener(stateHandler);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
describe('Init form', function () {
  var initSettings = getInitSettings();
  it('Settings dosn\'t have model property', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var form;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            form = new _FormService["default"]();
            _context2.prev = 1;
            _context2.next = 4;
            return form.init({});

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            expect(_context2.t0.message).toEqual('You must specify the model');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  })));
  it('Init', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var form, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            form = new _FormService["default"]();
            _context3.next = 3;
            return form.init(initSettings);

          case 3:
            result = _context3.sent;
            expect(result).toBeUndefined();
            expect(initSettings.model.on).toHaveBeenCalledTimes(1);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe('Settings', function () {
  var initSettings = getInitSettings();
  it('partialErrorChecking = true', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var form, settings;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            form = new _FormService["default"]();
            settings = _objectSpread({}, initSettings);
            settings.partialErrorChecking = true;
            _context5.next = 5;
            return form.init(settings);

          case 5:
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      return _context4.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        age: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));
            _context5.next = 8;
            return form.validateForm();

          case 8:
            expect(form.getAll().fields.age.errors.length).toBe(0);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('partialErrorChecking = false', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var form;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            form = new _FormService["default"]();
            _context7.next = 3;
            return form.init(initSettings);

          case 3:
            // runValidator in ValidateForm won't call model.isValidRecord
            // if there are no changes or data in form
            form.set({
              age: 'test'
            });
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      return _context6.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        age: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6);
            }));
            _context7.next = 7;
            return form.validateForm();

          case 7:
            expect(form.getAll().fields.age.errors.length).toBe(1);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
});
describe('Get all', function () {
  function isValidRecord() {
    return _isValidRecord.apply(this, arguments);
  }

  function _isValidRecord() {
    _isValidRecord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", _ValidationErrors["default"].createFromJSON({
                surname: ['Surname is required'],
                age: ['Age must be greater then 100']
              }));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return _isValidRecord.apply(this, arguments);
  }

  var initSettings = getInitSettings({
    isValidRecord: isValidRecord
  });
  var form = new _FormService["default"]();
  var defaultState = {
    isLoaded: false,
    data: {},
    fields: {},
    originalData: {},
    changes: {},
    isSubmitting: false,
    warnings: new _ValidationErrors["default"](),
    errors: new _ValidationErrors["default"]()
  };
  it('Before init', function () {
    expect(form.getAll()).toEqual(defaultState);
  });
  it('After init', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    var fields;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            fields = {
              name: {
                value: 'newName',
                isChanged: true,
                errors: [],
                warnings: []
              },
              surname: {
                value: undefined,
                isChanged: false,
                errors: [{
                  message: 'Surname is required'
                }],
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
                errors: [{
                  message: 'Age must be greater then 100'
                }],
                warnings: []
              }
            };
            initSettings.data = {
              name: 'Name',
              age: 45
            };
            initSettings.changes = {
              name: 'newName',
              phone: 123456
            };
            _context8.next = 5;
            return form.init(initSettings);

          case 5:
            expect(form.getAll().fields).toEqual(fields);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
});
describe('updateField', function () {
  it('Valid record', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return form.updateField('name', 'John');

          case 2:
            expect(form.getAll().fields.name.isChanged).toBeTruthy();

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
});
describe('Listeners', function () {
  it('Add listener', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
    var handler;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            handler = jest.fn();
            form.addChangeListener(handler);
            _context11.next = 4;
            return form.set({
              name: 'John'
            });

          case 4:
            expect(handler).toHaveBeenCalledTimes(1);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('Remove listener', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var handler;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            handler = jest.fn();
            form.addChangeListener(handler);
            form.removeChangeListener(handler);
            _context12.next = 5;
            return form.set({
              name: 'John'
            });

          case 5:
            expect(handler).toHaveBeenCalledTimes(0);

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('Add two listeners', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var firstHandler, secondHandler;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            _context13.next = 6;
            return form.set({
              name: 'John'
            });

          case 6:
            expect(firstHandler).toHaveBeenCalledTimes(1);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('Remove one listener of two', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var firstHandler, secondHandler;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeChangeListener(firstHandler);
            _context14.next = 7;
            return form.set({
              name: 'John'
            });

          case 7:
            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('Remove all listeners', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
    var firstHandler, secondHandler;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeAllListeners();
            _context15.next = 7;
            return form.set({
              name: 'John'
            });

          case 7:
            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(0);

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
});
describe('clearValidation', function () {
  it('Clear error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
              return _regenerator["default"].wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      return _context16.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        name: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, _callee16);
            }));
            _context17.next = 3;
            return form.set({
              name: 'John'
            }, true);

          case 3:
            form.clearValidation('name');
            expect(form.getAll().fields.name.errors.length).toBe(0);
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set changes, validation, clear error

          case 6:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it('Clear & validating conflict', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
    var validatePromise;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            // runValidator in ValidateForm won't call model.isValidRecord
            // if there are no changes or data in form
            form.set({
              name: 'test',
              age: 'test'
            });
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18() {
              return _regenerator["default"].wrap(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      return _context18.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        name: ['Error'],
                        age: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, _callee18);
            }));
            validatePromise = form.validateForm();
            form.clearValidation('name');
            _context19.next = 6;
            return validatePromise;

          case 6:
            expect(form.getAll().fields.age.errors.length).toBe(1);

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
});
describe('validateField', function () {
  it('Set run', function () {
    form.set = jest.fn();
    form.validateField('name', 'newName');
    expect(form.set).toHaveBeenCalledTimes(1);
  });
});
describe('set', function () {
  var initSettings = getInitSettings();
  var form = new _FormService["default"]();
  var stateHandler = jest.fn();
  it('Before loaded', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20() {
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.t0 = expect;
            _context20.next = 3;
            return form.set({
              name: 'newName'
            });

          case 3:
            _context20.t1 = _context20.sent;
            (0, _context20.t0)(_context20.t1).toBeUndefined();

          case 5:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it('After loaded', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return form.init(initSettings);

          case 2:
            form.addChangeListener(stateHandler);
            form.validateForm = jest.fn();
            stateHandler.mockClear();
            _context21.t0 = expect;
            _context21.next = 8;
            return form.set({
              name: 'newName'
            });

          case 8:
            _context21.t1 = _context21.sent;
            (0, _context21.t0)(_context21.t1).toBeUndefined();
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 11:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
  it('With validate = true', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22() {
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return form.set({
              name: 'newName'
            }, true);

          case 2:
            expect(form.validateForm).toHaveBeenCalledTimes(1);

          case 3:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
});
describe('submitData', function () {
  it('It\'s set & submit', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            form.set = jest.fn();
            form.submit = jest.fn();
            _context23.next = 4;
            return form.submitData({
              name: 'John'
            });

          case 4:
            expect(form.set).toHaveBeenCalledTimes(1);
            expect(form.submit).toHaveBeenCalledTimes(1);

          case 6:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  })));
});
describe('submit', function () {
  it('Validation error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
    var validationError, error;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });
            form.model.submit = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24() {
              return _regenerator["default"].wrap(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      throw validationError;

                    case 1:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, _callee24);
            }));
            _context25.prev = 2;
            _context25.next = 5;
            return form.submit();

          case 5:
            _context25.next = 10;
            break;

          case 7:
            _context25.prev = 7;
            _context25.t0 = _context25["catch"](2);
            error = _context25.t0;

          case 10:
            expect(error).toEqual(validationError);
            expect(form.getAll().fields.name.errors.length).toBe(1);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 13:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, null, [[2, 7]]);
  })));
  it('Not actual changes', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26() {
    var submitPromise;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return form.set({
              name: 'John',
              age: 21
            });

          case 2:
            submitPromise = form.submit();
            _context26.next = 5;
            return form.set({
              name: 'Sophia'
            });

          case 5:
            _context26.next = 7;
            return submitPromise;

          case 7:
            expect(form.getAll().fields.name.isChanged).toBeTruthy();
            expect(stateHandler).toHaveBeenCalledTimes(4); // Set values, submitting, set values, submit result

          case 9:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26);
  })));
  it('Clear errors and changes after submit', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.next = 2;
            return form.set({
              name: 'John'
            });

          case 2:
            _context27.next = 4;
            return form.submit();

          case 4:
            expect(form.getAll().fields.name.isChanged).toBeFalsy();
            expect(form.getAll().fields.name.errors.length).toBe(0);
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set values, submitting, submit result

          case 7:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27);
  })));
  it('Global error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
    var globalError, error;
    return _regenerator["default"].wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            globalError = new Error('Global error');
            form.model.submit = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28() {
              return _regenerator["default"].wrap(function _callee28$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case "end":
                      return _context28.stop();
                  }
                }
              }, _callee28);
            }));
            _context29.prev = 2;
            _context29.next = 5;
            return form.submit();

          case 5:
            _context29.next = 10;
            break;

          case 7:
            _context29.prev = 7;
            _context29.t0 = _context29["catch"](2);
            error = _context29.t0;

          case 10:
            expect(error).toEqual(globalError);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 12:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[2, 7]]);
  })));
  it('isSubmitting = true', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30() {
    var result;
    return _regenerator["default"].wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            form.model.submit = jest.fn();
            form.submit();
            _context30.next = 4;
            return form.submit();

          case 4:
            result = _context30.sent;
            expect(result).toBeUndefined();

          case 6:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  })));
});
describe('clearFieldChanges', function () {
  it('Delete changes', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
    return _regenerator["default"].wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.next = 2;
            return form.set({
              name: 'newName'
            });

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().fields.name.isChanged).toBeFalsy();

          case 4:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31);
  })));
  it('Errors clear field', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32() {
    return _regenerator["default"].wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            _context32.next = 2;
            return form.set({
              name: 'Error'
            }, true);

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().fields.name.errors.length).toBe(0);

          case 4:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32);
  })));
  it('Set state', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
    return _regenerator["default"].wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            stateHandler.mockClear();
            form.clearFieldChanges('name');
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 3:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  })));
});
describe('clearChanges', function () {
  it('Clear changed', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34() {
    return _regenerator["default"].wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            _context34.next = 2;
            return form.set({
              name: 'Error'
            });

          case 2:
            _context34.next = 4;
            return form.validateForm();

          case 4:
            stateHandler.mockClear();
            form.clearChanges();
            expect(stateHandler).toHaveBeenCalledTimes(1);
            expect(form.getAll().fields.name.errors.length).toBe(0);
            expect(form.getAll().fields.name.isChanged).toBeFalsy();

          case 9:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  })));
});
describe('validateForm', function () {
  it('Validation error correction', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36() {
    var validationError;
    return _regenerator["default"].wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Name is required']
            });

            form.model.isValidRecord = /*#__PURE__*/function () {
              var _ref35 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(record) {
                return _regenerator["default"].wrap(function _callee35$(_context35) {
                  while (1) {
                    switch (_context35.prev = _context35.next) {
                      case 0:
                        if (record.name) {
                          _context35.next = 2;
                          break;
                        }

                        return _context35.abrupt("return", validationError);

                      case 2:
                        return _context35.abrupt("return", new _ValidationErrors["default"]());

                      case 3:
                      case "end":
                        return _context35.stop();
                    }
                  }
                }, _callee35);
              }));

              return function (_x) {
                return _ref35.apply(this, arguments);
              };
            }(); // Not valid name


            _context36.next = 4;
            return form.set({
              name: ''
            }, true);

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy(); // Valid name

            _context36.next = 7;
            return form.set({
              name: 'John'
            }, true);

          case 7:
            expect(form.getAll().fields.name.errors.length).toBe(0);

          case 8:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36);
  })));
  it('Simple validation error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38() {
    var expectedValidation;
    return _regenerator["default"].wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            expectedValidation = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
              return _regenerator["default"].wrap(function _callee37$(_context37) {
                while (1) {
                  switch (_context37.prev = _context37.next) {
                    case 0:
                      return _context37.abrupt("return", expectedValidation);

                    case 1:
                    case "end":
                      return _context37.stop();
                  }
                }
              }, _callee37);
            }));
            _context38.next = 4;
            return form.set({
              name: 'John'
            }, true);

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy();

          case 5:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38);
  })));
  it('Global validation error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40() {
    var globalError, error;
    return _regenerator["default"].wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            globalError = new Error('Global error');
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39() {
              return _regenerator["default"].wrap(function _callee39$(_context39) {
                while (1) {
                  switch (_context39.prev = _context39.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case "end":
                      return _context39.stop();
                  }
                }
              }, _callee39);
            }));
            _context40.prev = 2;
            _context40.next = 5;
            return form.set({
              name: 'John'
            }, true);

          case 5:
            _context40.next = 10;
            break;

          case 7:
            _context40.prev = 7;
            _context40.t0 = _context40["catch"](2);
            error = _context40.t0;

          case 10:
            expect(error).toBe(globalError);
            expect(form.getAll().fields.name.errors.length).toBe(0);

          case 12:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40, null, [[2, 7]]);
  })));
  it('Set state', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41() {
    return _regenerator["default"].wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            _context41.next = 2;
            return form.set({
              name: 'newName'
            });

          case 2:
            stateHandler.mockClear();
            _context41.next = 5;
            return form.validateForm();

          case 5:
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 6:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41);
  })));
  it('Partial error checking', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee43() {
    return _regenerator["default"].wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42() {
              return _regenerator["default"].wrap(function _callee42$(_context42) {
                while (1) {
                  switch (_context42.prev = _context42.next) {
                    case 0:
                      return _context42.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        name: ['Error'],
                        age: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context42.stop();
                  }
                }
              }, _callee42);
            }));
            form.setPartialErrorChecking(true);
            _context43.next = 4;
            return form.set({
              name: 'John'
            }, true);

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy();

          case 5:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee43);
  })));
  it('Cancel not actual validation', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee45() {
    var validationError, validationPromise;
    return _regenerator["default"].wrap(function _callee45$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });
            form.model.isValidRecord = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee44() {
              return _regenerator["default"].wrap(function _callee44$(_context44) {
                while (1) {
                  switch (_context44.prev = _context44.next) {
                    case 0:
                      return _context44.abrupt("return", validationError);

                    case 1:
                    case "end":
                      return _context44.stop();
                  }
                }
              }, _callee44);
            }));
            validationPromise = form.set({
              name: 'John'
            }, true); // Validation

            form.set({
              name: 'Sophia'
            }); // Cancel previous validation

            _context45.next = 6;
            return validationPromise;

          case 6:
            expect(form.getAll().fields.name.errors.length).toBe(0);

          case 7:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee45);
  })));
  it('Validation dependencies', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee46() {
    return _regenerator["default"].wrap(function _callee46$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            form.model.getValidationDependency = function () {
              return ['age'];
            };

            _context46.next = 3;
            return form.set({
              name: 'John'
            }, true);

          case 3:
            expect(form.model.isValidRecord.mock.calls[0][0]).toEqual({
              age: null,
              name: 'John'
            });

          case 4:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee46);
  })));
  it('Hide errors on unchanged form fields', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee47() {
    var _yield$form$validateF, errors;

    return _regenerator["default"].wrap(function _callee47$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            form.setPartialErrorChecking(true);

            form.model.getValidationDependency = function () {
              return ['age'];
            };

            form.set({
              name: 'John'
            });

            form.model.isValidRecord = function () {
              return _ValidationErrors["default"].createFromJSON({
                age: ['Age is required']
              });
            };

            _context47.next = 6;
            return form.validateForm();

          case 6:
            _yield$form$validateF = _context47.sent;
            errors = _yield$form$validateF.errors;
            expect(errors).toEqual(null);
            form.setPartialErrorChecking(false);

          case 10:
          case "end":
            return _context47.stop();
        }
      }
    }, _callee47);
  })));
});
describe('Before init', function () {
  getInitSettings();
  var form = new _FormService["default"]();
  var func = [form.updateField.bind(form), form.clearValidation.bind(form), form.submit.bind(form), form.clearFieldChanges.bind(form), form.clearChanges.bind(form), form.validateForm.bind(form), form.submitData.bind(form)];
  it('Before init', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee49() {
    var promises;
    return _regenerator["default"].wrap(function _callee49$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            promises = func.map( /*#__PURE__*/function () {
              var _ref48 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee48(elem) {
                var result;
                return _regenerator["default"].wrap(function _callee48$(_context48) {
                  while (1) {
                    switch (_context48.prev = _context48.next) {
                      case 0:
                        _context48.next = 2;
                        return elem();

                      case 2:
                        result = _context48.sent;
                        expect(result).toBeUndefined();

                      case 4:
                      case "end":
                        return _context48.stop();
                    }
                  }
                }, _callee48);
              }));

              return function (_x2) {
                return _ref48.apply(this, arguments);
              };
            }());
            _context49.next = 3;
            return Promise.all(promises);

          case 3:
          case "end":
            return _context49.stop();
        }
      }
    }, _callee49);
  })));
});