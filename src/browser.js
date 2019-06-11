/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './common/setImmediate';
import variables from './common/variables';
import applyGridFilters from './grid/models/applyGridFilters';
import GridComponent from './grid/Component';
import FormService from './form/FormService';
import connectForm from './form/connectForm';
import Validator from './common/validation/Validator';
import exportGridData from './grid/export/exportGridData';
import toJSON from './grid/export/exporters/toJSON';
import ValidationErrors from './common/validation/ValidationErrors';
import GridXhrModel from './grid/models/GridXhrModel';
import GridCollectionModel from './grid/models/GridCollectionModel';
import Events from './common/Events';
import FormModel from './form/FormModel';
import FormXhrModel from './form/FormXhrModel';
import ListXhrModel from './list/ListXhrModel';
import AbstractFormModel from './form/AbstractFormModel';
import AbstractGridModel from './grid/models/AbstractGridModel';
import AbstractListModel from './list/AbstractListModel';
import ToFormUpdate from './form/adapters/GridToFormUpdate';
import ToFormCreate from './form/adapters/GridToFormCreate';
import ToFormCopy from './form/adapters/GridToFormCopy';
import Select from './editors/Select';
import SuggestBox from './editors/SuggestBox';
import DatePicker from './editors/DatePicker';
import Checkbox from './editors/Checkbox';
import Number from './editors/Number';
import ArgumentsError from './common/ArgumentsError';
import ThrottleError from './common/ThrottleError';
import booleanValidationRule from './common/validation/rules/boolean';
import dateValidationRule from './common/validation/rules/date';
import enumValidationRule from './common/validation/rules/enum';
import setValidationRule from './common/validation/rules/set';
import floatValidationRule from './common/validation/rules/float';
import regExpValidationRule from './common/validation/rules/regExp';
import notNullValidationRule from './common/validation/rules/notNull';
import numberValidationRule from './common/validation/rules/number';
import notEmptyValidationRule from './common/validation/rules/notEmpty';
import FormMixin from './form/mixin';

if (!global._babelPolyfill) {
  require('@babel/polyfill/browser');
}

const UIKernel = {
  applyGridFilters,
  Grid: GridComponent,
  Form: FormService,
  connectForm,
  createValidator: Validator.create,
  exportGridData,
  toJSON,
  ValidationErrors,
  Models: {
    Grid: {
      Xhr: GridXhrModel,
      Collection: GridCollectionModel
    },
    Events,
    Form: FormModel,
    FormXhr: FormXhrModel,
    List: {
      Xhr: ListXhrModel
    }
  },
  AbstractModels: {
    Form: AbstractFormModel,
    Grid: AbstractGridModel,
    List: AbstractListModel
  },
  Adapters: {
    Grid: {
      ToFormUpdate,
      ToFormCreate,
      ToFormCopy
    }
  },
  Editors: {
    Select,
    SuggestBox,
    DatePicker,
    Checkbox,
    Number
  },
  ArgumentsError,
  ThrottleError,
  Validators: {
    boolean: booleanValidationRule,
    date: dateValidationRule,
    enum: enumValidationRule,
    set: setValidationRule,
    float: floatValidationRule,
    regExp: regExpValidationRule,
    notNull: notNullValidationRule,
    number: numberValidationRule,
    notEmpty: notEmptyValidationRule
  },
  Mixins: {
    Form: FormMixin
  },
  _get: variables.get,
  _set: variables.set
};

export default UIKernel;
