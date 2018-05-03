// @flow

import ValidationErrors from '../validation/ValidationErrors';

export type ID<T> = T;

export type Record = [ID<number>, Object];

export type Records = {
  records: Array<Record>,
  count?: number
};

export type ReadMethodParams = {
  fields: Array<string>,
  filters?: Object,
  limit?: number,
  offset?: number,
  sort?: Array<[string, 'asc' | 'desc' | 'default']>
};

export interface IGridServerModel {
  isValidRecord(record: Object): Promise<ValidationErrors>;

  getValidationDependency(fields: Array<string>): Array<string>;

  getRecord(id: ID<number>, fields: Array<string>): Promise<?Record>;

  read(settings: ReadMethodParams): Promise<Records>;

  create(record: Object): Promise<?Record>;

  update(records: Array<Record>): Promise<Array<[ID<number>, Record | ValidationErrors]>>;
}

export type ValidationErrorsType = typeof ValidationErrors;
