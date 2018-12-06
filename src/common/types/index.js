// @flow

import ValidationErrors from '../validation/ValidationErrors';

export type Records<K, R> = {
  records: Array<[K, R]>,
  count?: number
};

export type ReadSettings<F> = {
  fields: Array<string>,
  filters?: F,
  limit?: number,
  offset?: number,
  sort?: Array<[string, 'asc' | 'desc' | 'default']>
};

export interface IServerGridModel<K, R, F> {
  isValidRecord(record: R, recordId: K | null): Promise<ValidationErrors>;
  getValidationDependency(fields: Array<string>): Array<string>;
  getRecord(id: K, fields: Array<string>): Promise<R>;
  read(settings: ReadSettings<F>): Promise<Records<K, R>>;
  create(record: R): Promise<[K, R]>;
  update(records: Array<[K, R]>): Promise<Array<[K, R | ValidationErrors]>>;
}
