/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Events from '../../common/Events';
import {pick} from '../../common/utils';

class GridToFormCreate extends Events {
  private _adapter: { initialData: {}; model: any };
  /**
   * Adapter allows to use Grid model as a model for new form record creation
   *
   * @param {AbstractGridModel}   model           Grid model
   * @param {Object}              [initialData]   Default field values
   * @constructor
   */
  constructor(model: any, initialData: {[index: string]: any}) {
    super();

    this._adapter = {
      model: model,
      initialData: initialData || {}
    };
  }

  /**
   * Get data
   *
   * @param {Array}     fields     Required fields
   */
  async getData(fields: string[]) {
    if (fields && fields.length) {
      return pick(this._adapter.initialData, fields);
    }
    return this._adapter.initialData;
  }

  /**
   * Create new record
   *
   * @param   {Object}      data      Record
   */
  async submit(data: {[index: string]: any}) {
    const model = this._adapter.model;
    return await model.create(data);
  }

  /**
   * Validation checking
   *
   * @param {Object}      record  Record object
   */
  async isValidRecord(record: {[index: string]: any}) {
    const model = this._adapter.model;
    return await model.isValidRecord(record, null);
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields
   * @returns {Array}  Dependencies
   */
  getValidationDependency(fields: string[]) {
    return this._adapter.model.getValidationDependency(fields);
  }
}

export default GridToFormCreate;
