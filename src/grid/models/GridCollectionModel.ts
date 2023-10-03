/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import without from 'lodash/without';
import type {StrictOmit} from 'ts-essentials';
import type {AllAsOptionalWithRequired, IObservable} from '../../common/types';
import {keys, isEqual, warn} from '../../common/utils';
import type {IValidator} from '../../validation/types/IValidator';
import type ValidationErrors from '../../validation/ValidationErrors';
import ValidatorBuilder from '../../validation/ValidatorBuilder';
import AbstractGridModel from './AbstractGridModel';
import type {GridModelListenerArgsByEventName} from './types/GridModelListenerArgsByEventName';
import type {
  IGridModel,
  GridModelReadParams,
  GridModelReadResult,
  GridModelUpdateResult
} from './types/IGridModel';

type GridCollectionModelParams<TKey, TRecord extends Record<string, unknown>, TFilters> = {
  data: [TKey, TRecord][];
  requiredFields: (keyof TRecord & string)[];
  validator: IValidator<TRecord, keyof TRecord & string>;
  filtersHandler: (data: [TKey, TRecord][], filters: TFilters) => [TKey, TRecord][];
  generateId: (existsIds: TKey[]) => TKey;
};

class GridCollectionModel<TKey, TRecord extends Record<string, unknown>, TFilters>
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
  static createWithNumberId<TRecord extends Record<string, unknown>, TFilters>({
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

  static create<TKey, TRecord extends Record<string, unknown>, TFilters>({
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
      cloneDeep(data) ?? [],
      requiredFields ?? [],
      validator ?? ValidatorBuilder.createEmptyValidator(),
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
  setData(data: [TKey, TRecord][]): void {
    const currentData = this.data.reduce((result: Partial<Record<string, TRecord>>, [recordId, record]) => {
      result[JSON.stringify(recordId)] = record;
      return result;
    }, {});

    const createdRecordsIds: TKey[] = [];
    const updatedRecords: [TKey, TRecord][] = [];
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

  getData(): [TKey, TRecord][] {
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

  async create(record: Partial<TRecord> | [TKey, TRecord]): Promise<TKey> {
    let recordId: TKey;
    let clonedRecord: Partial<TRecord>;
    if (Array.isArray(record)) {
      // TODO deprecated implementation
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw validationErrors;
    }

    // TODO unsafe as TRecord
    return this.createRecordAndEmit(clonedRecord as TRecord, recordId);
  }

  read<TField extends keyof TRecord & string>({
    fields,
    extra,
    filters,
    limit,
    offset,
    sort
  }: GridModelReadParams<TKey, TRecord, TField, TFilters>): Promise<
    GridModelReadResult<TKey, TRecord, TField>
  > {
    let data = cloneDeep(this.data);
    const result: GridModelReadResult<TKey, TRecord, TField> = {
      records: []
    };

    // Get extra records
    if (extra && extra.length > 0) {
      result.extraRecords = data.reduce<[TKey, Pick<TRecord, TField>][]>((acc, [recordId, record]) => {
        for (const extraRecordId of extra) {
          if (isEqual(extraRecordId, recordId)) {
            // Delete unnecessary fields
            acc.push([recordId, pick(record, fields)]);
            return acc;
          }
        }

        return acc;
      }, []);
    }

    // Sorting
    if (sort?.[0]) {
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
      const start = offset ?? 0;
      const end = Number(offset) + Number(limit) || data.length;
      data = data.slice(start, end);
    }

    // Delete unnecessary fields
    result.records = data.map(([key, record]) => [key, pick(record, fields)]);

    return Promise.resolve(result);
  }

  async getRecord<TField extends keyof TRecord & string>(
    id: TKey,
    fields: TField[]
  ): Promise<Pick<TRecord, TField> | null> {
    const record = cloneDeep(this.getRecordByID(id));
    if (!record) {
      throw new Error('Record not found.');
    }

    // Deleting unused fields
    const returnRecord = pick(record[1], fields);

    return returnRecord;
  }

  async update(changes: [TKey, Partial<TRecord>][]): Promise<GridModelUpdateResult<TKey, TRecord>> {
    if (!changes.length) {
      return [];
    }

    const appliedChanges: [TKey, Partial<TRecord>][] = [];

    const result = await Promise.all(
      changes.map(async ([recordId, changes]): Promise<GridModelUpdateResult<TKey, TRecord>[number]> => {
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

  private getRecordByID(id: TKey): [TKey, TRecord] | undefined {
    return this.data.find((record) => isEqual(record[0], id));
  }

  private createRecordAndEmit(record: TRecord, id: TKey): TKey {
    this.data = [...this.data, [id, record]];
    this.trigger('create', [id]);
    return id;
  }
}

export default GridCollectionModel;
