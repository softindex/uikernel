/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cloneDeep from 'lodash/cloneDeep';
import without from 'lodash/without';
import {StrictOmit} from 'ts-essentials';
import {AllAsOptionalWithRequired, IObservable} from '../../common/types';
import {forEach, keys, isEqual, warn} from '../../common/utils';
import ValidationErrors from '../../validation/ValidationErrors';
import Validator from '../../validation/Validator';
import AbstractGridModel from './AbstractGridModel';
import {GridModelListenerArgsByEventName} from './types/GridModelListenerArgsByEventName';
import {
  IGridModel,
  IGridModelReadParams,
  IGridModelReadResult,
  IGridModelUpdateResult
} from './types/IGridModel';

type GridCollectionModelParams<TKey, TRecord extends {}, TFilters> = {
  data: [TKey, Partial<TRecord>][];
  requiredFields: (keyof TRecord & string)[];
  validator: Validator<TRecord>;
  filtersHandler: (data: [TKey, Partial<TRecord>][], filters: TFilters) => [TKey, Partial<TRecord>][];
  generateId: (existsIds: TKey[]) => TKey;
};

class GridCollectionModel<TKey, TRecord extends {}, TFilters>
  extends AbstractGridModel<TKey, TRecord, TFilters, GridModelListenerArgsByEventName<TKey, TRecord>>
  implements
    IGridModel<TKey, TRecord, TFilters>,
    IObservable<GridModelListenerArgsByEventName<TKey, TRecord>>
{
  /**
   * @deprecated
   */
  static getNumberIdGeneration(): (existsIds: number[]) => number {
    let initalId = 1;
    return (existsIds) => {
      const existsIdsSet = new Set(existsIds);
      while (existsIdsSet.has(initalId)) {
        initalId++;
      }

      return initalId;
    };
  }

  /**
   * @deprecated
   */
  static createWithNumberId<TRecord extends {}, TFilters>({
    data,
    filtersHandler,
    requiredFields,
    validator
  }: Partial<
    StrictOmit<GridCollectionModelParams<number, TRecord, TFilters>, 'generateId'>
  >): GridCollectionModel<number, TRecord, TFilters> {
    warn('static method GridCollectionModel.createWithNumberId is deprecated.');

    return GridCollectionModel.create({
      generateId: GridCollectionModel.getNumberIdGeneration(),
      data,
      filtersHandler,
      requiredFields,
      validator
    });
  }

  static create<TKey, TRecord extends {}, TFilters>({
    generateId,
    data,
    filtersHandler,
    requiredFields,
    validator
  }: AllAsOptionalWithRequired<
    GridCollectionModelParams<TKey, TRecord, TFilters>,
    'generateId'
  >): GridCollectionModel<TKey, TRecord, TFilters> {
    return new GridCollectionModel(
      cloneDeep(data) || [],
      requiredFields || [],
      validator || new Validator(),
      filtersHandler,
      generateId
    );
  }

  /**
   * Specifies a grid model that will work with array data passed to it as a parameter.
   */
  constructor(
    private data: GridCollectionModelParams<TKey, TRecord, TFilters>['data'],
    private requiredFields: GridCollectionModelParams<TKey, TRecord, TFilters>['requiredFields'],
    private validator: GridCollectionModelParams<TKey, TRecord, TFilters>['validator'],
    private filtersHandler: GridCollectionModelParams<TKey, TRecord, TFilters>['filtersHandler'] | undefined,
    private generateId: GridCollectionModelParams<TKey, TRecord, TFilters>['generateId']
  ) {
    super();
  }

  /**
   * Set data array in model
   */
  setData(data: [TKey, Partial<TRecord>][]): void {
    const currentData = this.data.reduce((result: Record<string, Partial<TRecord>>, [recordId, record]) => {
      result[JSON.stringify(recordId)] = record;
      return result;
    }, {});

    const createdRecordsIds: TKey[] = [];
    const updatedRecords: [TKey, Partial<TRecord>][] = [];
    const recordIds: string[] = [];

    for (const [recordId, record] of data) {
      const id = JSON.stringify(recordId);

      recordIds.push(id);

      if (!currentData[id]) {
        createdRecordsIds.push(recordId);
        continue;
      }

      if (!isEqual(record, currentData[id])) {
        updatedRecords.push([recordId, record]);
      }
    }

    const deletedRecordsIds = without(keys(currentData), ...recordIds).map(
      (value) => JSON.parse(value) as TKey
    );

    this.data = cloneDeep(data);

    if (createdRecordsIds.length) {
      this.trigger('create', createdRecordsIds);
    }

    if (deletedRecordsIds.length) {
      this.trigger('delete', deletedRecordsIds);
    }

    if (updatedRecords.length) {
      this.trigger('update', updatedRecords);
    }
  }

  getData(): [TKey, Partial<TRecord>][] {
    return this.data;
  }

  /**
   * Remove field by record id from data
   */
  async delete(recordIds: TKey[]): Promise<void> {
    this.data = this.data.filter((record) => {
      return !recordIds.find((recordId) => isEqual(recordId, record[0]));
    });

    this.trigger('delete', recordIds);
  }

  async create(record: Partial<TRecord> | [TKey, Partial<TRecord>]): Promise<TKey> {
    let recordId: TKey;
    let clonedRecord: Partial<TRecord>;
    if (Array.isArray(record)) {
      if (record.length !== 2) {
        throw new TypeError('expected record type [TKey, TRecord], but received unknown array');
      }

      recordId = record[0];
      clonedRecord = {...record[1]};
    } else {
      recordId = this.createId();
      clonedRecord = {...record};
    }

    for (const field of this.requiredFields) {
      if (!clonedRecord.hasOwnProperty(field)) {
        clonedRecord[field] = undefined;
      }
    }

    const validationErrors = await this.isValidRecord(clonedRecord);
    if (!validationErrors.isEmpty()) {
      throw validationErrors;
    }

    return this.createRecordAndEmit(clonedRecord, recordId);
  }

  read({
    fields,
    extra,
    filters,
    limit,
    offset,
    sort
  }: IGridModelReadParams<TKey, TRecord, TFilters>): Promise<IGridModelReadResult<TKey, TRecord>> {
    let data = cloneDeep(this.data);
    const result: IGridModelReadResult<TKey, TRecord> = {
      records: []
    };

    // Get extra records
    if (extra && extra.length > 0) {
      result.extraRecords = data.filter(([recordId]) => {
        for (const extraRecordId of extra) {
          if (isEqual(extraRecordId, recordId)) {
            return true;
          }
        }

        return false;
      });
    }

    // Delete unnecessary fields
    if (fields && result.extraRecords) {
      for (const [, record] of result.extraRecords) {
        forEach(record, (_value, key) => {
          if (fields.indexOf(key) === -1) {
            delete record[key];
          }
        });
      }
    }

    // Sorting
    if (sort && sort.length > 0) {
      const [sortField, sortMode] = sort[0];

      data.sort((prev, next) => {
        if (prev[1][sortField] < next[1][sortField]) {
          return sortMode === 'asc' ? -1 : 1;
        }

        if (prev[1][sortField] > next[1][sortField]) {
          return sortMode === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    // Apply filters
    if (this.filtersHandler && filters) {
      data = cloneDeep(this.filtersHandler(data, filters));
    }

    result.count = data.length;

    // Offset and limit
    if (offset || limit) {
      const start = offset || 0;
      const end = Number(offset) + Number(limit) || data.length;
      data = data.slice(start, end);
    }

    // Delete unnecessary fields
    if (fields) {
      for (const [, record] of data) {
        forEach(record, (_value, key) => {
          if (fields.indexOf(key) === -1) {
            delete record[key];
          }
        });
      }
    }

    result.records = data;

    return Promise.resolve(result);
  }

  getRecord(id: TKey, fields: (keyof TRecord & string)[]): Promise<Partial<TRecord>> {
    const record = cloneDeep(this.getRecordByID(id));
    if (!record) {
      return Promise.reject(new Error('Record not found.'));
    }

    const returnRecord = record[1];

    // Deleting unused fields
    if (fields) {
      forEach(returnRecord, (_value, key) => {
        if (fields.indexOf(key) === -1) {
          delete returnRecord[key];
        }
      });
    }

    return Promise.resolve(returnRecord);
  }

  async update(changes: [TKey, Partial<TRecord>][]): Promise<IGridModelUpdateResult<TKey, TRecord>> {
    if (!changes.length) {
      return [];
    }

    const appliedChanges: [TKey, Partial<TRecord>][] = [];

    const result = await Promise.all(
      changes.map(async ([recordId, changes]): Promise<IGridModelUpdateResult<TKey, TRecord>[number]> => {
        const validErrors = await this.isValidRecord(changes);

        if (!validErrors.isEmpty()) {
          return [recordId, validErrors];
        }

        appliedChanges.push([recordId, changes]);
        return [recordId, changes];
      })
    );

    // Apply changes
    for (const [recordId, changes] of appliedChanges) {
      this.data = this.data.map(([dataRecordId, dataRecord]) => {
        if (!isEqual(dataRecordId, recordId)) {
          return [dataRecordId, dataRecord];
        }

        return [
          dataRecordId,
          {
            ...dataRecord,
            ...changes
          }
        ];
      });
    }

    if (appliedChanges.length) {
      this.trigger('update', appliedChanges);
    }

    return result;
  }

  isValidRecord(record: Partial<TRecord>): Promise<ValidationErrors<keyof TRecord & string>> {
    return this.validator.isValidRecord(record);
  }

  getValidationDependency(fields: (keyof TRecord & string)[]): (keyof TRecord & string)[] {
    return this.validator.getValidationDependency(fields);
  }

  private createId(): TKey {
    return this.generateId(this.data.map(([id]) => id));
  }

  private getRecordByID(id: TKey): [TKey, Partial<TRecord>] | undefined {
    return this.data.find((record) => isEqual(record[0], id));
  }

  private createRecordAndEmit(record: Partial<TRecord>, id: TKey): TKey {
    this.data = [...this.data, [id, record]];
    this.trigger('create', [id]);
    return id;
  }
}

export default GridCollectionModel;
