/**
 * Copyright (с) 2015, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule UIKernel
 */

'use strict';

require('./lib/common/setImmediate');
require('regenerator-runtime/runtime');
var variables = require('./lib/common/variables');

var Module = {
  applyGridFilters: require('./lib/grid/models/applyGridFilters'),
  Grid: require('./lib/grid/Component'),
  Form: require('./lib/form/FormService'),
  createValidator: require('./lib/common/validation/Validator/browser'),
  exportGridData: require('./lib/grid/export/exportGridData'),
  toJSON: require('./lib/grid/export/exporters/toJSON'),
  toCSV: require('./lib/grid/export/exporters/toCSV'),
  Models: {
    Grid: {
      Xhr: require('./lib/grid/models/GridXhrModel'),
      Collection: require('./lib/grid/models/GridCollectionModel')
    },
    Events: require('./lib/common/Events'),
    Form: require('./lib/form/FormModel'),
    FormXhr: require('./lib/form/FormXhrModel'),
    ValidationErrors: require('./lib/common/validation/ValidationErrors'),
    List: {
      Xhr: require('./lib/list/ListXhrModel')
    }
  },
  AbstractModels: {
    Form: require('./lib/form/AbstractFormModel'),
    Grid: require('./lib/grid/models/AbstractGridModel'),
    List: require('./lib/list/AbstractListModel')
  },
  Adapters: {
    Grid: {
      toFormUpdate: require('./lib/form/adapters/GridToFormUpdate'),
      toFormCreate: require('./lib/form/adapters/GridToFormCreate')
    }
  },
  Editors: {
    Select: require('./lib/editors/Select'),
    SuggestBox: require('./lib/editors/SuggestBox'),
    DatePicker: require('./lib/editors/DatePicker'),
    Checkbox: require('./lib/editors/Checkbox'),
    Number: require('./lib/editors/Number')
  },
  ArgumentsError: require('./lib/common/ArgumentsError'),
  ThrottleError: require('./lib/common/ThrottleError'),
  Services: {
    Form: require('./lib/form/FormService')
  },
  Validators: {
    boolean: require('./lib/common/validation/validators/boolean'),
    date: require('./lib/common/validation/validators/date'),
    enum: require('./lib/common/validation/validators/enum'),
    set: require('./lib/common/validation/validators/set'),
    float: require('./lib/common/validation/validators/float'),
    regExp: require('./lib/common/validation/validators/regExp'),
    notNull: require('./lib/common/validation/validators/notNull'),
    number: require('./lib/common/validation/validators/number')
  },
  _get: variables.get,
  _set: variables.set
};

global.UIKernel = module.exports = Module;
