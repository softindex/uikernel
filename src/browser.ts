/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArgumentsError from './common/error/ArgumentsError';
import ThrottleError from './common/error/ThrottleError';
import Events from './common/EventsModel';
import './common/setImmediate';
import variables from './common/variables';
import Checkbox from './editors/Checkbox';
import DatePicker from './editors/DatePicker';
import Number from './editors/Number';
import Select from './editors/Select';
import SuggestBox from './editors/SuggestBox';
import AbstractFormModel from './form/AbstractFormModel';
import ToFormCreate from './form/adapters/GridToFormCreate';
import ToFormUpdate from './form/adapters/GridToFormUpdate';
import connectForm from './form/connectForm';
import FormModel from './form/FormModel';
import FormService from './form/FormService';
import FormXhrModel from './form/FormXhrModel';
// eslint-disable-next-line import/namespace
import * as FormMixin from './form/mixin';
import useForm from './form/useForm';
import Component from './grid/Component';
import AbstractGridModel from './grid/models/AbstractGridModel';
import applyGridFilters from './grid/models/applyGridFilters';
import GridCollectionModel from './grid/models/GridCollectionModel';
import GridXhrModel from './grid/models/GridXhrModel';
import PureGridComponent from './grid/PureGridComponent';
import AbstractListModel from './list/AbstractListModel';
import ListXhrModel from './list/ListXhrModel';
import booleanValidationRule from './validation/rules/boolean';
import dateValidationRule from './validation/rules/date';
import enumValidationRule from './validation/rules/enum';
import floatValidationRule from './validation/rules/float';
import numberValidationRule from './validation/rules/integer';
import notEmptyValidationRule from './validation/rules/notEmpty';
import notNullValidationRule from './validation/rules/notNull';
import regExpValidationRule from './validation/rules/regExp';
import setValidationRule from './validation/rules/set';
import ValidationErrors from './validation/ValidationErrors';
import Validator from './validation/Validator';

// @ts-expect-error: TS7017 Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature
if (!global._babelPolyfill) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@babel/polyfill/browser');
}

const UIKernel = {
  applyGridFilters,
  Grid: Component,
  PureGrid: PureGridComponent,
  Form: FormService,
  connectForm,
  createValidator: Validator.create,
  Validator,
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
      ToFormCreate
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
  useForm,
  _get: variables.get,
  _set: variables.set
};

export default UIKernel;
