/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (!global._babelPolyfill) {
  require('@babel/polyfill');
}

require('./lib/common/setImmediate');
var variables = require('./lib/common/variables');

var Module = {
  applyGridFilters: require('./lib/grid/models/applyGridFilters'),
  Grid: require('./lib/grid/Component'),
  Form: require('./lib/form/FormService'),
  connectForm: require('./lib/form/connectForm'),
  createValidator: require('./lib/common/validation/validators/browser').create,
  createXhrValidator: require('./lib/common/validation/validators/XhrValidator').create,
  exportGridData: require('./lib/grid/export/exportGridData'),
  toJSON: require('./lib/grid/export/exporters/toJSON'),
  ValidationErrors: require('./lib/common/validation/ValidationErrors'),
  Models: {
    Grid: {
      Xhr: require('./lib/grid/models/GridXhrModel'),
      Collection: require('./lib/grid/models/GridCollectionModel')
    },
    Events: require('./lib/common/Events'),
    Form: require('./lib/form/FormModel'),
    FormXhr: require('./lib/form/FormXhrModel'),
    ValidationErrors: require('./lib/common/validation/ValidationErrors'), // Deprecated. Use UIKernel.ValidationErrors
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
      ToFormUpdate: require('./lib/form/adapters/GridToFormUpdate'),
      ToFormCreate: require('./lib/form/adapters/GridToFormCreate')
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
  Validators: {
    boolean: require('./lib/common/validation/rules/boolean'),
    date: require('./lib/common/validation/rules/date'),
    enum: require('./lib/common/validation/rules/enum'),
    set: require('./lib/common/validation/rules/set'),
    float: require('./lib/common/validation/rules/float'),
    regExp: require('./lib/common/validation/rules/regExp'),
    notNull: require('./lib/common/validation/rules/notNull'),
    number: require('./lib/common/validation/rules/number'),
    notEmpty: require('./lib/common/validation/rules/notEmpty')
  },
  Mixins: {
    Form: require('./lib/form/mixin')
  },
  _get: variables.get,
  _set: variables.set
};

module.exports = Module;
