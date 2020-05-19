"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _FormService = _interopRequireDefault(require("../FormService"));

var _ValidationErrors = _interopRequireDefault(require("../../common/validation/ValidationErrors"));

var _FormModelMock = _interopRequireDefault(require("../__mocks__/FormModelMock"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getInitSettings(mockMethods) {
  jest.resetModules();
  return {
    fields: ['name', 'surname', 'phone', 'age'],
    partialErrorChecking: false,
    model: _objectSpread({}, new _FormModelMock["default"](), {}, mockMethods)
  };
}

var form;
var stateHandler;
beforeEach(function _callee() {
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = new _FormService["default"]();
          _context.next = 3;
          return _regenerator["default"].awrap(form.init(getInitSettings()));

        case 3:
          stateHandler = jest.fn();
          form.addChangeListener(stateHandler);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
describe('Init form', function () {
  var initSettings = getInitSettings();
  it('Settings dosn\'t have model property', function _callee2() {
    var form;
    return _regenerator["default"].async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            form = new _FormService["default"]();
            _context2.prev = 1;
            _context2.next = 4;
            return _regenerator["default"].awrap(form.init({}));

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
    }, null, null, [[1, 6]]);
  });
  it('Init', function _callee3() {
    var form, result;
    return _regenerator["default"].async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            form = new _FormService["default"]();
            _context3.next = 3;
            return _regenerator["default"].awrap(form.init(initSettings));

          case 3:
            result = _context3.sent;
            expect(result).toBeUndefined();
            expect(initSettings.model.on).toHaveBeenCalledTimes(1);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
describe('Settings', function () {
  var initSettings = getInitSettings();
  it('partialErrorChecking = true', function _callee5() {
    var form, settings;
    return _regenerator["default"].async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            form = new _FormService["default"]();
            settings = _objectSpread({}, initSettings);
            settings.partialErrorChecking = true;
            _context5.next = 5;
            return _regenerator["default"].awrap(form.init(settings));

          case 5:
            form.model.isValidRecord = function _callee4() {
              return _regenerator["default"].async(function _callee4$(_context4) {
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
              });
            };

            _context5.next = 8;
            return _regenerator["default"].awrap(form.validateForm());

          case 8:
            expect(form.getAll().fields.age.errors).toBeNull();

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it('partialErrorChecking = false', function _callee7() {
    var form;
    return _regenerator["default"].async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            form = new _FormService["default"]();
            _context7.next = 3;
            return _regenerator["default"].awrap(form.init(initSettings));

          case 3:
            // runValidator in ValidateForm won't call model.isValidRecord
            // if there are no changes or data in form
            form.set({
              age: 'test'
            });

            form.model.isValidRecord = function _callee6() {
              return _regenerator["default"].async(function _callee6$(_context6) {
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
              });
            };

            _context7.next = 7;
            return _regenerator["default"].awrap(form.validateForm());

          case 7:
            expect(form.getAll().fields.age.errors.length).toBe(1);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
});
describe('Get all', function () {
  function isValidRecord() {
    return _regenerator["default"].async(function isValidRecord$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _ValidationErrors["default"].createFromJSON({
              surname: ['Surname is required'],
              age: ['Age must be greater then 100']
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
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
  it('After init', function _callee8() {
    var fields;
    return _regenerator["default"].async(function _callee8$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            fields = {
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
            initSettings.data = {
              name: 'Name',
              age: 45
            };
            initSettings.changes = {
              name: 'newName',
              phone: 123456
            };
            _context9.next = 5;
            return _regenerator["default"].awrap(form.init(initSettings));

          case 5:
            expect(form.getAll().fields).toEqual(fields);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
});
describe('updateField', function () {
  it('Valid record', function _callee9() {
    return _regenerator["default"].async(function _callee9$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _regenerator["default"].awrap(form.updateField('name', 'John'));

          case 2:
            expect(form.getAll().fields.name.isChanged).toBeTruthy();

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    });
  });
});
describe('Listeners', function () {
  it('Add listener', function _callee10() {
    var handler;
    return _regenerator["default"].async(function _callee10$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            handler = jest.fn();
            form.addChangeListener(handler);
            _context11.next = 4;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 4:
            expect(handler).toHaveBeenCalledTimes(1);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    });
  });
  it('Remove listener', function _callee11() {
    var handler;
    return _regenerator["default"].async(function _callee11$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            handler = jest.fn();
            form.addChangeListener(handler);
            form.removeChangeListener(handler);
            _context12.next = 5;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 5:
            expect(handler).toHaveBeenCalledTimes(0);

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    });
  });
  it('Add two listeners', function _callee12() {
    var firstHandler, secondHandler;
    return _regenerator["default"].async(function _callee12$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            _context13.next = 6;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 6:
            expect(firstHandler).toHaveBeenCalledTimes(1);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 8:
          case "end":
            return _context13.stop();
        }
      }
    });
  });
  it('Remove one listener of two', function _callee13() {
    var firstHandler, secondHandler;
    return _regenerator["default"].async(function _callee13$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeChangeListener(firstHandler);
            _context14.next = 7;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 7:
            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    });
  });
  it('Remove all listeners', function _callee14() {
    var firstHandler, secondHandler;
    return _regenerator["default"].async(function _callee14$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();
            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeAllListeners();
            _context15.next = 7;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 7:
            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(0);

          case 9:
          case "end":
            return _context15.stop();
        }
      }
    });
  });
});
describe('clearValidation', function () {
  it('Clear error', function _callee16() {
    return _regenerator["default"].async(function _callee16$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            form.model.isValidRecord = function _callee15() {
              return _regenerator["default"].async(function _callee15$(_context16) {
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
              });
            };

            _context17.next = 3;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 3:
            form.clearValidation('name');
            expect(form.getAll().fields.name.errors).toBeFalsy();
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set changes, validation, clear error

          case 6:
          case "end":
            return _context17.stop();
        }
      }
    });
  });
  it('Clear & validating conflict', function _callee18() {
    var validatePromise;
    return _regenerator["default"].async(function _callee18$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            // runValidator in ValidateForm won't call model.isValidRecord
            // if there are no changes or data in form
            form.set({
              name: 'test',
              age: 'test'
            });

            form.model.isValidRecord = function _callee17() {
              return _regenerator["default"].async(function _callee17$(_context18) {
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
              });
            };

            validatePromise = form.validateForm();
            form.clearValidation('name');
            _context19.next = 6;
            return _regenerator["default"].awrap(validatePromise);

          case 6:
            expect(form.getAll().fields.age.errors.length).toBe(1);

          case 7:
          case "end":
            return _context19.stop();
        }
      }
    });
  });
});
describe('validateField', function () {
  it('Set run', function () {
    form.set = jest.fn();
    form.validateField('name', 'newName');
    expect(form.set).toHaveBeenCalledTimes(1);
  });
});
describe('set', function _callee22() {
  var initSettings, form, stateHandler;
  return _regenerator["default"].async(function _callee22$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          initSettings = getInitSettings();
          form = new _FormService["default"]();
          stateHandler = jest.fn();
          it('Before loaded', function _callee19() {
            return _regenerator["default"].async(function _callee19$(_context20) {
              while (1) {
                switch (_context20.prev = _context20.next) {
                  case 0:
                    _context20.t0 = expect;
                    _context20.next = 3;
                    return _regenerator["default"].awrap(form.set({
                      name: 'newName'
                    }));

                  case 3:
                    _context20.t1 = _context20.sent;
                    (0, _context20.t0)(_context20.t1).toBeUndefined();

                  case 5:
                  case "end":
                    return _context20.stop();
                }
              }
            });
          });
          it('After loaded', function _callee20() {
            return _regenerator["default"].async(function _callee20$(_context21) {
              while (1) {
                switch (_context21.prev = _context21.next) {
                  case 0:
                    _context21.next = 2;
                    return _regenerator["default"].awrap(form.init(initSettings));

                  case 2:
                    form.addChangeListener(stateHandler);
                    form.validateForm = jest.fn();
                    stateHandler.mockClear();
                    _context21.t0 = expect;
                    _context21.next = 8;
                    return _regenerator["default"].awrap(form.set({
                      name: 'newName'
                    }));

                  case 8:
                    _context21.t1 = _context21.sent;
                    (0, _context21.t0)(_context21.t1).toBeUndefined();
                    expect(stateHandler).toHaveBeenCalledTimes(1);

                  case 11:
                  case "end":
                    return _context21.stop();
                }
              }
            });
          });
          it('With validate = true', function _callee21() {
            return _regenerator["default"].async(function _callee21$(_context22) {
              while (1) {
                switch (_context22.prev = _context22.next) {
                  case 0:
                    _context22.next = 2;
                    return _regenerator["default"].awrap(form.set({
                      name: 'newName'
                    }, true));

                  case 2:
                    expect(form.validateForm).toHaveBeenCalledTimes(1);

                  case 3:
                  case "end":
                    return _context22.stop();
                }
              }
            });
          });

        case 6:
        case "end":
          return _context23.stop();
      }
    }
  });
});
describe('submitData', function _callee24() {
  return _regenerator["default"].async(function _callee24$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          it('It\'s set & submit', function _callee23() {
            return _regenerator["default"].async(function _callee23$(_context24) {
              while (1) {
                switch (_context24.prev = _context24.next) {
                  case 0:
                    form.set = jest.fn();
                    form.submit = jest.fn();
                    _context24.next = 4;
                    return _regenerator["default"].awrap(form.submitData({
                      name: 'John'
                    }));

                  case 4:
                    expect(form.set).toHaveBeenCalledTimes(1);
                    expect(form.submit).toHaveBeenCalledTimes(1);

                  case 6:
                  case "end":
                    return _context24.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context25.stop();
      }
    }
  });
});
describe('submit', function () {
  it('Validation error', function _callee26() {
    var validationError, error;
    return _regenerator["default"].async(function _callee26$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });

            form.model.submit = function _callee25() {
              return _regenerator["default"].async(function _callee25$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      throw validationError;

                    case 1:
                    case "end":
                      return _context26.stop();
                  }
                }
              });
            };

            _context27.prev = 2;
            _context27.next = 5;
            return _regenerator["default"].awrap(form.submit());

          case 5:
            _context27.next = 10;
            break;

          case 7:
            _context27.prev = 7;
            _context27.t0 = _context27["catch"](2);
            error = _context27.t0;

          case 10:
            expect(error).toEqual(validationError);
            expect(form.getAll().fields.name.errors.length).toBe(1);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 13:
          case "end":
            return _context27.stop();
        }
      }
    }, null, null, [[2, 7]]);
  });
  it('Not actual changes', function _callee27() {
    var submitPromise;
    return _regenerator["default"].async(function _callee27$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'John',
              age: 21
            }));

          case 2:
            submitPromise = form.submit();
            _context28.next = 5;
            return _regenerator["default"].awrap(form.set({
              name: 'Sophia'
            }));

          case 5:
            _context28.next = 7;
            return _regenerator["default"].awrap(submitPromise);

          case 7:
            expect(form.getAll().fields.name.isChanged).toBeTruthy();
            expect(stateHandler).toHaveBeenCalledTimes(4); // Set values, submitting, set values, submit result

          case 9:
          case "end":
            return _context28.stop();
        }
      }
    });
  });
  it('Clear errors and changes after submit', function _callee28() {
    return _regenerator["default"].async(function _callee28$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }));

          case 2:
            _context29.next = 4;
            return _regenerator["default"].awrap(form.submit());

          case 4:
            expect(form.getAll().fields.name.isChanged).toBeFalsy();
            expect(form.getAll().fields.name.errors).toBeFalsy();
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set values, submitting, submit result

          case 7:
          case "end":
            return _context29.stop();
        }
      }
    });
  });
  it('Global error', function _callee30() {
    var globalError, error;
    return _regenerator["default"].async(function _callee30$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            globalError = new Error('Global error');

            form.model.submit = function _callee29() {
              return _regenerator["default"].async(function _callee29$(_context30) {
                while (1) {
                  switch (_context30.prev = _context30.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case "end":
                      return _context30.stop();
                  }
                }
              });
            };

            _context31.prev = 2;
            _context31.next = 5;
            return _regenerator["default"].awrap(form.submit());

          case 5:
            _context31.next = 10;
            break;

          case 7:
            _context31.prev = 7;
            _context31.t0 = _context31["catch"](2);
            error = _context31.t0;

          case 10:
            expect(error).toEqual(globalError);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 12:
          case "end":
            return _context31.stop();
        }
      }
    }, null, null, [[2, 7]]);
  });
  it('isSubmitting = true', function _callee31() {
    var result;
    return _regenerator["default"].async(function _callee31$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            form.model.submit = jest.fn();
            form.submit();
            _context32.next = 4;
            return _regenerator["default"].awrap(form.submit());

          case 4:
            result = _context32.sent;
            expect(result).toBeUndefined();

          case 6:
          case "end":
            return _context32.stop();
        }
      }
    });
  });
});
describe('clearFieldChanges', function () {
  it('Delete changes', function _callee32() {
    return _regenerator["default"].async(function _callee32$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            _context33.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'newName'
            }));

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().fields.name.isChanged).toBeFalsy();

          case 4:
          case "end":
            return _context33.stop();
        }
      }
    });
  });
  it('Errors clear field', function _callee33() {
    return _regenerator["default"].async(function _callee33$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            _context34.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'Error'
            }, true));

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().fields.name.errors).toBeFalsy();

          case 4:
          case "end":
            return _context34.stop();
        }
      }
    });
  });
  it('Set state', function _callee34() {
    return _regenerator["default"].async(function _callee34$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            stateHandler.mockClear();
            form.clearFieldChanges('name');
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 3:
          case "end":
            return _context35.stop();
        }
      }
    });
  });
});
describe('clearChanges', function () {
  it('Clear changed', function _callee35() {
    return _regenerator["default"].async(function _callee35$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            _context36.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'Error'
            }));

          case 2:
            _context36.next = 4;
            return _regenerator["default"].awrap(form.validateForm());

          case 4:
            stateHandler.mockClear();
            form.clearChanges();
            expect(stateHandler).toHaveBeenCalledTimes(1);
            expect(form.getAll().fields.name.errors).toBeFalsy();
            expect(form.getAll().fields.name.isChanged).toBeFalsy();

          case 9:
          case "end":
            return _context36.stop();
        }
      }
    });
  });
});
describe('validateForm', function () {
  it('Validation error correction', function _callee37() {
    var validationError;
    return _regenerator["default"].async(function _callee37$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Name is required']
            });

            form.model.isValidRecord = function _callee36(record) {
              return _regenerator["default"].async(function _callee36$(_context37) {
                while (1) {
                  switch (_context37.prev = _context37.next) {
                    case 0:
                      if (record.name) {
                        _context37.next = 2;
                        break;
                      }

                      return _context37.abrupt("return", validationError);

                    case 2:
                      return _context37.abrupt("return", new _ValidationErrors["default"]());

                    case 3:
                    case "end":
                      return _context37.stop();
                  }
                }
              });
            }; // Not valid name


            _context38.next = 4;
            return _regenerator["default"].awrap(form.set({
              name: ''
            }, true));

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy(); // Valid name

            _context38.next = 7;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 7:
            expect(form.getAll().fields.name.errors).toBeFalsy();

          case 8:
          case "end":
            return _context38.stop();
        }
      }
    });
  });
  it('Simple validation error', function _callee39() {
    var expectedValidation;
    return _regenerator["default"].async(function _callee39$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            expectedValidation = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });

            form.model.isValidRecord = function _callee38() {
              return _regenerator["default"].async(function _callee38$(_context39) {
                while (1) {
                  switch (_context39.prev = _context39.next) {
                    case 0:
                      return _context39.abrupt("return", expectedValidation);

                    case 1:
                    case "end":
                      return _context39.stop();
                  }
                }
              });
            };

            _context40.next = 4;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy();

          case 5:
          case "end":
            return _context40.stop();
        }
      }
    });
  });
  it('Global validation error', function _callee41() {
    var globalError, error;
    return _regenerator["default"].async(function _callee41$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            globalError = new Error('Global error');

            form.model.isValidRecord = function _callee40() {
              return _regenerator["default"].async(function _callee40$(_context41) {
                while (1) {
                  switch (_context41.prev = _context41.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case "end":
                      return _context41.stop();
                  }
                }
              });
            };

            _context42.prev = 2;
            _context42.next = 5;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 5:
            _context42.next = 10;
            break;

          case 7:
            _context42.prev = 7;
            _context42.t0 = _context42["catch"](2);
            error = _context42.t0;

          case 10:
            expect(error).toBe(globalError);
            expect(form.getAll().fields.name.errors).toBeFalsy();

          case 12:
          case "end":
            return _context42.stop();
        }
      }
    }, null, null, [[2, 7]]);
  });
  it('Set state', function _callee42() {
    return _regenerator["default"].async(function _callee42$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            _context43.next = 2;
            return _regenerator["default"].awrap(form.set({
              name: 'newName'
            }));

          case 2:
            stateHandler.mockClear();
            _context43.next = 5;
            return _regenerator["default"].awrap(form.validateForm());

          case 5:
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 6:
          case "end":
            return _context43.stop();
        }
      }
    });
  });
  it('Partial error checking', function _callee44() {
    return _regenerator["default"].async(function _callee44$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            form.model.isValidRecord = function _callee43() {
              return _regenerator["default"].async(function _callee43$(_context44) {
                while (1) {
                  switch (_context44.prev = _context44.next) {
                    case 0:
                      return _context44.abrupt("return", _ValidationErrors["default"].createFromJSON({
                        name: ['Error'],
                        age: ['Error']
                      }));

                    case 1:
                    case "end":
                      return _context44.stop();
                  }
                }
              });
            };

            form.setPartialErrorChecking(true);
            _context45.next = 4;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 4:
            expect(form.getAll().fields.name.errors.length).toBeTruthy();

          case 5:
          case "end":
            return _context45.stop();
        }
      }
    });
  });
  it('Cancel not actual validation', function _callee46() {
    var validationError, validationPromise;
    return _regenerator["default"].async(function _callee46$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            validationError = _ValidationErrors["default"].createFromJSON({
              name: ['Error']
            });

            form.model.isValidRecord = function _callee45() {
              return _regenerator["default"].async(function _callee45$(_context46) {
                while (1) {
                  switch (_context46.prev = _context46.next) {
                    case 0:
                      return _context46.abrupt("return", validationError);

                    case 1:
                    case "end":
                      return _context46.stop();
                  }
                }
              });
            };

            validationPromise = form.set({
              name: 'John'
            }, true); // Validation

            form.set({
              name: 'Sophia'
            }); // Cancel previous validation

            _context47.next = 6;
            return _regenerator["default"].awrap(validationPromise);

          case 6:
            expect(form.getAll().fields.name.errors).toBeFalsy();

          case 7:
          case "end":
            return _context47.stop();
        }
      }
    });
  });
  it('Validation dependencies', function _callee47() {
    return _regenerator["default"].async(function _callee47$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            form.model.getValidationDependency = function () {
              return ['age'];
            };

            _context48.next = 3;
            return _regenerator["default"].awrap(form.set({
              name: 'John'
            }, true));

          case 3:
            expect(form.model.isValidRecord.mock.calls[0][0]).toEqual({
              age: null,
              name: 'John'
            });

          case 4:
          case "end":
            return _context48.stop();
        }
      }
    });
  });
  it('Hide errors on unchanged form fields', function _callee48() {
    var _ref, errors;

    return _regenerator["default"].async(function _callee48$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
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

            _context49.next = 6;
            return _regenerator["default"].awrap(form.validateForm());

          case 6:
            _ref = _context49.sent;
            errors = _ref.errors;
            expect(errors).toEqual(null);
            form.setPartialErrorChecking(false);

          case 10:
          case "end":
            return _context49.stop();
        }
      }
    });
  });
});
describe('Before init', function _callee51() {
  var form, func;
  return _regenerator["default"].async(function _callee51$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          getInitSettings();
          form = new _FormService["default"]();
          func = [form.updateField.bind(form), form.clearValidation.bind(form), form.submit.bind(form), form.clearFieldChanges.bind(form), form.clearChanges.bind(form), form.validateForm.bind(form), form.submitData.bind(form)];
          it('Before init', function _callee50() {
            var promises;
            return _regenerator["default"].async(function _callee50$(_context51) {
              while (1) {
                switch (_context51.prev = _context51.next) {
                  case 0:
                    promises = func.map(function _callee49(elem) {
                      var result;
                      return _regenerator["default"].async(function _callee49$(_context50) {
                        while (1) {
                          switch (_context50.prev = _context50.next) {
                            case 0:
                              _context50.next = 2;
                              return _regenerator["default"].awrap(elem());

                            case 2:
                              result = _context50.sent;
                              expect(result).toBeUndefined();
                              return _context50.abrupt("return");

                            case 5:
                            case "end":
                              return _context50.stop();
                          }
                        }
                      });
                    });
                    _context51.next = 3;
                    return _regenerator["default"].awrap(Promise.all(promises));

                  case 3:
                  case "end":
                    return _context51.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context52.stop();
      }
    }
  });
});