/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import EventsModel from '../../common/Events';
import ValidationErrors from '../../common/validation/ValidationErrors';

/**
 * Grid model abstraction
 *
 * @constructor
 * @extends EventsModel
 */
class AbstractGridModel extends EventsModel {
  constructor() {
    super();
  }

  /**
   * Add a record
   *
   * @param {Object}      record  Record object
   * @abstract
   */
  create(/* record */) {
    return Promise.resolve();
  }

  /**
   * Get records list
   *
   * @param {Object}      settings                Request
   * @param {Array}       settings.fields         Fields
   * @param {number}      [settings.limit]        Limit
   * @param {number}      [settings.offset]       Offset
   * @param {Object}      [settings.filters]      Filter values object
   * @param {Array}       [settings.sort]         Sort parameters
   * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
   * @abstract
   */
  read(/* settings */) {
    return Promise.resolve({
      records: [], // Primary records
      ids: [], // Extra records
      extraRecords: 0 // In all records count
    });
  }

  /**
   * Get the particular record
   *
   * @param {*}         id      Record ID
   * @param {Array}     fields  Required fields
   * @abstract
   */
  getRecord(/* id, fields */) {
    return Promise.resolve();
  }

  /**
   * Apply record changes
   *
   * @param {Array}       changes     Changes array
   * @abstract
   */
  update(/* changes */) {
    return Promise.resolve([]);
  }

  /**
   * Validation check
   *
   * @param {Object}      record
   * @param {*|null}      recordId
   * @abstract
   */
  isValidRecord(/* record, recordId */) {
    return Promise.resolve(new ValidationErrors());
  }

  /**
   * Get all dependent fields, that are required for validation
   *
   * @param   {Array}  fields   Fields list
   * @returns {Array}  Dependencies
   * @abstract
   */
  getValidationDependency() {
    return [];
  }
}

export default AbstractGridModel;
