/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _FormService = require('../FormService');

var _FormService2 = _interopRequireDefault(_FormService);

var _ValidationErrors = require('../../common/validation/ValidationErrors');

var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

function getInitSettings() {
  jest.resetModules();
  return {
    fields: ['name', 'surname', 'phone', 'age', 'gender'],
    partialErrorChecking: true,
    model: require('formModel')
  };
}

var form = void 0;
var stateHandler = void 0;

beforeEach((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = new _FormService2.default();
          _context.next = 3;
          return form.init(getInitSettings());

        case 3:
          stateHandler = jest.fn();
          form.addChangeListener(stateHandler);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('init form', function () {
  var initSettings = getInitSettings();

  it('settings dosn\'t have model property', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var form;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            form = new _FormService2.default();
            _context2.prev = 1;
            _context2.next = 4;
            return form.init({});

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](1);

            expect(_context2.t0.message).toEqual('You must specify the model form in this.init()');

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 6]]);
  })));

  it('init', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var form, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            form = new _FormService2.default();
            _context3.next = 3;
            return form.init(initSettings);

          case 3:
            result = _context3.sent;

            expect(result).toBeUndefined();
            expect(initSettings.model.on).toHaveBeenCalledTimes(1);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});

describe('get all', function () {
  var initSettings = getInitSettings();
  var form = new _FormService2.default();
  var defaultState = {
    isLoaded: false,
    data: {},
    originalData: {},
    changes: {},
    errors: new _ValidationErrors2.default(),
    globalError: null,
    isSubmitting: false
  };

  it('before init', function () {
    expect(form.getAll()).toEqual(defaultState);
  });

  it('after init', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return form.init(initSettings);

          case 2:
            expect(form.getAll()).not.toEqual(defaultState);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('updateField', function () {
  it('valid record', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return form.updateField('name', 'John');

          case 2:
            expect(form.getAll().changes).toEqual({
              name: 'John'
            });

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));
});

describe('Listeners', function () {
  it('add listener', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
    var handler;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            handler = jest.fn();


            form.addChangeListener(handler);
            _context6.next = 4;
            return form.set({ name: 'John' });

          case 4:

            expect(handler).toHaveBeenCalledTimes(1);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  it('remove listener', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
    var handler;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            handler = jest.fn();


            form.addChangeListener(handler);
            form.removeChangeListener(handler);
            _context7.next = 5;
            return form.set({ name: 'John' });

          case 5:

            expect(handler).toHaveBeenCalledTimes(0);

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it('add two listeners', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
    var firstHandler, secondHandler;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();


            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            _context8.next = 6;
            return form.set({ name: 'John' });

          case 6:

            expect(firstHandler).toHaveBeenCalledTimes(1);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 8:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  it('remove one listener of two', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
    var firstHandler, secondHandler;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();


            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeChangeListener(firstHandler);
            _context9.next = 7;
            return form.set({ name: 'John' });

          case 7:

            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(1);

          case 9:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  it('remove all listeners', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
    var firstHandler, secondHandler;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            firstHandler = jest.fn();
            secondHandler = jest.fn();


            form.addChangeListener(firstHandler);
            form.addChangeListener(secondHandler);
            form.removeAllListeners();
            _context10.next = 7;
            return form.set({ name: 'John' });

          case 7:

            expect(firstHandler).toHaveBeenCalledTimes(0);
            expect(secondHandler).toHaveBeenCalledTimes(0);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));
});

describe('clearError', function () {
  it('clear error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
              return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      return _context11.abrupt('return', _ValidationErrors2.default.createFromJSON({ name: 'Error' }));

                    case 1:
                    case 'end':
                      return _context11.stop();
                  }
                }
              }, _callee11, this);
            }));

            _context12.next = 3;
            return form.set({ name: 'John' }, true);

          case 3:
            form.clearError('name');

            expect(form.getAll().errors.isEmpty()).toBe(true);
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set changes, validation, clear error

          case 6:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  })));

  it('clear & validating conflict', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
    var expectedValidation, validatePromise;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            expectedValidation = _ValidationErrors2.default.createFromJSON({ age: 'Error' });

            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
              return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      return _context13.abrupt('return', _ValidationErrors2.default.createFromJSON({
                        name: 'Error',
                        age: 'Error'
                      }));

                    case 1:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, _callee13, this);
            }));

            validatePromise = form.validateForm();

            form.clearError('name');

            _context14.next = 6;
            return validatePromise;

          case 6:

            expect(form.getAll().errors).toEqual(expectedValidation);

          case 7:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));
});

describe('validateField', function () {
  it('updateField and validateForm run', function () {
    form.updateField = jest.fn();
    form.validateForm = jest.fn();
    form.validateField('name', 'newName');
    expect(form.updateField).toHaveBeenCalledTimes(1);
    expect(form.validateForm).toHaveBeenCalledTimes(1);
  });
});

describe('set', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee18() {
  var initSettings, form, stateHandler;
  return _regenerator2.default.wrap(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          initSettings = getInitSettings();
          form = new _FormService2.default();
          stateHandler = jest.fn();


          it('before loaded', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
            return _regenerator2.default.wrap(function _callee15$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.t0 = expect;
                    _context15.next = 3;
                    return form.set({ name: 'newName' });

                  case 3:
                    _context15.t1 = _context15.sent;
                    (0, _context15.t0)(_context15.t1).toBeUndefined();

                  case 5:
                  case 'end':
                    return _context15.stop();
                }
              }
            }, _callee15, undefined);
          })));

          it('after loaded', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16() {
            return _regenerator2.default.wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return form.init(initSettings);

                  case 2:
                    form.addChangeListener(stateHandler);
                    form.validateForm = jest.fn();
                    stateHandler.mockClear();
                    _context16.t0 = expect;
                    _context16.next = 8;
                    return form.set({ name: 'newName' });

                  case 8:
                    _context16.t1 = _context16.sent;
                    (0, _context16.t0)(_context16.t1).toBeUndefined();

                    expect(stateHandler).toHaveBeenCalledTimes(1);

                  case 11:
                  case 'end':
                    return _context16.stop();
                }
              }
            }, _callee16, undefined);
          })));

          it('with validate = true', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee17() {
            return _regenerator2.default.wrap(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.next = 2;
                    return form.set({ name: 'newName' }, true);

                  case 2:
                    expect(form.validateForm).toHaveBeenCalledTimes(1);

                  case 3:
                  case 'end':
                    return _context17.stop();
                }
              }
            }, _callee17, undefined);
          })));

        case 6:
        case 'end':
          return _context18.stop();
      }
    }
  }, _callee18, undefined);
})));

describe('submitData', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee20() {
  return _regenerator2.default.wrap(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          it('it\'s set & submit', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee19() {
            return _regenerator2.default.wrap(function _callee19$(_context19) {
              while (1) {
                switch (_context19.prev = _context19.next) {
                  case 0:
                    form.set = jest.fn();
                    form.submit = jest.fn();

                    _context19.next = 4;
                    return form.submitData({ name: 'John' });

                  case 4:

                    expect(form.set).toHaveBeenCalledTimes(1);
                    expect(form.submit).toHaveBeenCalledTimes(1);

                  case 6:
                  case 'end':
                    return _context19.stop();
                }
              }
            }, _callee19, undefined);
          })));

        case 1:
        case 'end':
          return _context20.stop();
      }
    }
  }, _callee20, undefined);
})));

describe('submit', function () {
  it('validation error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee22() {
    var validationError;
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            validationError = _ValidationErrors2.default.createFromJSON({ name: 'Error' });

            form.model.submit = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee21() {
              return _regenerator2.default.wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      throw validationError;

                    case 1:
                    case 'end':
                      return _context21.stop();
                  }
                }
              }, _callee21, this);
            }));

            _context22.prev = 2;
            _context22.next = 5;
            return form.submit();

          case 5:
            _context22.next = 10;
            break;

          case 7:
            _context22.prev = 7;
            _context22.t0 = _context22['catch'](2);

            expect(_context22.t0).toEqual(validationError);

          case 10:

            expect(form.getAll().errors).toEqual(validationError);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 12:
          case 'end':
            return _context22.stop();
        }
      }
    }, _callee22, undefined, [[2, 7]]);
  })));

  it('not actual changes', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee23() {
    var submitPromise;
    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return form.set({ name: 'John', age: 21 });

          case 2:
            submitPromise = form.submit();
            _context23.next = 5;
            return form.set({ name: 'Sophia' });

          case 5:
            _context23.next = 7;
            return submitPromise;

          case 7:

            expect(form.getAll().changes).toEqual({ name: 'Sophia' });
            expect(stateHandler).toHaveBeenCalledTimes(4); // Set values, submitting, set values, submit result

          case 9:
          case 'end':
            return _context23.stop();
        }
      }
    }, _callee23, undefined);
  })));

  it('clear errors and changes after submit', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee24() {
    return _regenerator2.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.next = 2;
            return form.set({ name: 'John' });

          case 2:
            _context24.next = 4;
            return form.submit();

          case 4:

            expect(form.getAll().changes).toEqual({});
            expect(form.getAll().errors.isEmpty()).toBe(true);
            expect(stateHandler).toHaveBeenCalledTimes(3); // Set values, submitting, submit result

          case 7:
          case 'end':
            return _context24.stop();
        }
      }
    }, _callee24, undefined);
  })));

  it('global error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee26() {
    var globalError;
    return _regenerator2.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            globalError = new Error('Global error');

            form.model.submit = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee25() {
              return _regenerator2.default.wrap(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case 'end':
                      return _context25.stop();
                  }
                }
              }, _callee25, this);
            }));

            _context26.prev = 2;
            _context26.next = 5;
            return form.submit();

          case 5:
            _context26.next = 10;
            break;

          case 7:
            _context26.prev = 7;
            _context26.t0 = _context26['catch'](2);

            expect(_context26.t0).toEqual(globalError);

          case 10:

            expect(form.getAll().globalError).toEqual(globalError);
            expect(stateHandler).toHaveBeenCalledTimes(2);

          case 12:
          case 'end':
            return _context26.stop();
        }
      }
    }, _callee26, undefined, [[2, 7]]);
  })));

  it('isSubmitting = true', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee27() {
    var result;
    return _regenerator2.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            form.model.submit = jest.fn();
            form.submit();
            _context27.next = 4;
            return form.submit();

          case 4:
            result = _context27.sent;

            expect(result).toBeUndefined();

          case 6:
          case 'end':
            return _context27.stop();
        }
      }
    }, _callee27, undefined);
  })));
});

describe('clearFieldChanges', function () {
  it('delete changes', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee28() {
    return _regenerator2.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.next = 2;
            return form.set({ name: 'newName' });

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().changes).toEqual({});

          case 4:
          case 'end':
            return _context28.stop();
        }
      }
    }, _callee28, undefined);
  })));

  it('errors clear field', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee29() {
    return _regenerator2.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return form.set({ name: 'Error' }, true);

          case 2:
            form.clearFieldChanges('name');
            expect(form.getAll().errors.isEmpty()).toBe(true);

          case 4:
          case 'end':
            return _context29.stop();
        }
      }
    }, _callee29, undefined);
  })));

  it('set state', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee30() {
    return _regenerator2.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            stateHandler.mockClear();
            form.clearFieldChanges('name');
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 3:
          case 'end':
            return _context30.stop();
        }
      }
    }, _callee30, undefined);
  })));
});

describe('clearChanges', function () {
  it('clear changed', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee31() {
    var state;
    return _regenerator2.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.next = 2;
            return form.set({ name: 'Error' });

          case 2:
            _context31.next = 4;
            return form.validateForm();

          case 4:
            stateHandler.mockClear();
            form.clearChanges();
            state = form.getAll();

            expect(stateHandler).toHaveBeenCalledTimes(1);
            expect({
              errors: state.errors,
              changes: state.changes,
              globalError: state.globalError,
              partialErrorChecking: form.getPartialErrorChecking().partialErrorChecking
            }).toEqual({
              errors: new _ValidationErrors2.default(),
              changes: {},
              globalError: false,
              partialErrorChecking: form.getPartialErrorChecking().partialErrorCheckingDefault
            });

          case 9:
          case 'end':
            return _context31.stop();
        }
      }
    }, _callee31, undefined);
  })));
});

describe('validateForm', function () {
  it('validation error correction', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee33() {
    var validationError;
    return _regenerator2.default.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            validationError = _ValidationErrors2.default.createFromJSON({ name: 'Name is required' });

            form.model.isValidRecord = function () {
              var _ref33 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee32(record) {
                return _regenerator2.default.wrap(function _callee32$(_context32) {
                  while (1) {
                    switch (_context32.prev = _context32.next) {
                      case 0:
                        if (record.name) {
                          _context32.next = 2;
                          break;
                        }

                        return _context32.abrupt('return', validationError);

                      case 2:
                        return _context32.abrupt('return', new _ValidationErrors2.default());

                      case 3:
                      case 'end':
                        return _context32.stop();
                    }
                  }
                }, _callee32, this);
              }));

              return function (_x) {
                return _ref33.apply(this, arguments);
              };
            }();

            // Not valid name
            _context33.next = 4;
            return form.set({ name: '' }, true);

          case 4:
            expect(form.getAll().errors).toEqual(validationError);

            // Valid name
            _context33.next = 7;
            return form.set({ name: 'John' }, true);

          case 7:
            expect(form.getAll().errors.isEmpty()).toBe(true);

          case 8:
          case 'end':
            return _context33.stop();
        }
      }
    }, _callee33, undefined);
  })));

  it('simple validation error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee35() {
    var expectedValidation;
    return _regenerator2.default.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            expectedValidation = _ValidationErrors2.default.createFromJSON({ name: 'Error' });

            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee34() {
              return _regenerator2.default.wrap(function _callee34$(_context34) {
                while (1) {
                  switch (_context34.prev = _context34.next) {
                    case 0:
                      return _context34.abrupt('return', expectedValidation);

                    case 1:
                    case 'end':
                      return _context34.stop();
                  }
                }
              }, _callee34, this);
            }));

            _context35.next = 4;
            return form.set({ name: 'John' }, true);

          case 4:

            expect(form.getAll().errors).toEqual(expectedValidation);

          case 5:
          case 'end':
            return _context35.stop();
        }
      }
    }, _callee35, undefined);
  })));

  it('global validation error', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee37() {
    var globalError, state;
    return _regenerator2.default.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            globalError = new Error('Global error');

            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee36() {
              return _regenerator2.default.wrap(function _callee36$(_context36) {
                while (1) {
                  switch (_context36.prev = _context36.next) {
                    case 0:
                      throw globalError;

                    case 1:
                    case 'end':
                      return _context36.stop();
                  }
                }
              }, _callee36, this);
            }));

            _context37.next = 4;
            return form.set({ name: 'John' }, true);

          case 4:
            state = form.getAll();

            expect(state.globalError).toBe(globalError);
            expect(state.errors.isEmpty()).toBe(true);

          case 7:
          case 'end':
            return _context37.stop();
        }
      }
    }, _callee37, undefined);
  })));

  it('set state', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee38() {
    return _regenerator2.default.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            _context38.next = 2;
            return form.set({ name: 'newName' });

          case 2:
            stateHandler.mockClear();
            _context38.next = 5;
            return form.validateForm();

          case 5:
            expect(stateHandler).toHaveBeenCalledTimes(1);

          case 6:
          case 'end':
            return _context38.stop();
        }
      }
    }, _callee38, undefined);
  })));

  it('partial error checking', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee40() {
    var expectedValidation;
    return _regenerator2.default.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            expectedValidation = _ValidationErrors2.default.createFromJSON({ name: 'Error' });

            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee39() {
              return _regenerator2.default.wrap(function _callee39$(_context39) {
                while (1) {
                  switch (_context39.prev = _context39.next) {
                    case 0:
                      return _context39.abrupt('return', _ValidationErrors2.default.createFromJSON({
                        name: 'Error',
                        age: 'Error'
                      }));

                    case 1:
                    case 'end':
                      return _context39.stop();
                  }
                }
              }, _callee39, this);
            }));

            form.setPartialErrorChecking(true);
            _context40.next = 5;
            return form.set({ name: 'John' }, true);

          case 5:

            expect(form.getAll().errors).toEqual(expectedValidation);

          case 6:
          case 'end':
            return _context40.stop();
        }
      }
    }, _callee40, undefined);
  })));

  it('cancel not actual validation', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee42() {
    var validationError, validationPromise;
    return _regenerator2.default.wrap(function _callee42$(_context42) {
      while (1) {
        switch (_context42.prev = _context42.next) {
          case 0:
            validationError = _ValidationErrors2.default.createFromJSON({ name: 'Error' });

            form.model.isValidRecord = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee41() {
              return _regenerator2.default.wrap(function _callee41$(_context41) {
                while (1) {
                  switch (_context41.prev = _context41.next) {
                    case 0:
                      return _context41.abrupt('return', validationError);

                    case 1:
                    case 'end':
                      return _context41.stop();
                  }
                }
              }, _callee41, this);
            }));

            validationPromise = form.set({ name: 'John' }, true); // Validation

            form.set({ name: 'Sophia' }); // Cancel previous validation

            _context42.next = 6;
            return validationPromise;

          case 6:
            expect(form.getAll().errors.isEmpty()).toBe(true);

          case 7:
          case 'end':
            return _context42.stop();
        }
      }
    }, _callee42, undefined);
  })));

  it('validation dependencies', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee43() {
    return _regenerator2.default.wrap(function _callee43$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            form.model.getValidationDependency = function () {
              return ['age'];
            };

            _context43.next = 3;
            return form.set({ name: 'John' }, true);

          case 3:
            expect(form.model.isValidRecord.mock.calls[1][0]).toEqual({
              age: null,
              name: 'John'
            });

          case 4:
          case 'end':
            return _context43.stop();
        }
      }
    }, _callee43, undefined);
  })));
});

describe('before init', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee46() {
  var form, func;
  return _regenerator2.default.wrap(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          getInitSettings();
          form = new _FormService2.default();
          func = [form.updateField.bind(form), form.clearError.bind(form), form.submit.bind(form), form.clearFieldChanges.bind(form), form.clearChanges.bind(form), form.validateForm.bind(form), form.submitData.bind(form)];


          it('before init', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee45() {
            var promises;
            return _regenerator2.default.wrap(function _callee45$(_context45) {
              while (1) {
                switch (_context45.prev = _context45.next) {
                  case 0:
                    promises = func.map(function () {
                      var _ref46 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee44(elem) {
                        var result;
                        return _regenerator2.default.wrap(function _callee44$(_context44) {
                          while (1) {
                            switch (_context44.prev = _context44.next) {
                              case 0:
                                _context44.next = 2;
                                return elem();

                              case 2:
                                result = _context44.sent;

                                expect(result).toBeUndefined();
                                return _context44.abrupt('return');

                              case 5:
                              case 'end':
                                return _context44.stop();
                            }
                          }
                        }, _callee44, undefined);
                      }));

                      return function (_x2) {
                        return _ref46.apply(this, arguments);
                      };
                    }());
                    _context45.next = 3;
                    return _promise2.default.all(promises);

                  case 3:
                  case 'end':
                    return _context45.stop();
                }
              }
            }, _callee45, undefined);
          })));

        case 4:
        case 'end':
          return _context46.stop();
      }
    }
  }, _callee46, undefined);
})));