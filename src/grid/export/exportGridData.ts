/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from '../../common/assert';
import ArgumentsError from '../../common/error/ArgumentsError';
import type {AnyFunction} from '../../common/types';
import {keys} from '../../common/utils';
import type {IGridModel, GridModelSortMode} from '../models/types/IGridModel';
import type {GridColumns, GridGetCell} from '../types/GridColumns';

type FormatColumnsResult<TField extends string> = Record<TField, string>;

function formatColumns<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn
>(
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns: TViewColumn[]
): FormatColumnsResult<TViewColumn> {
  const formattedColumns = {} as unknown as FormatColumnsResult<TViewColumn>;

  for (const columnId of viewColumns) {
    const column = columns[columnId];
    if (!column) {
      continue;
    }

    const {name, parent} = column;
    assert(
      typeof name === 'string' && (!parent || typeof parent === 'string'),
      `column "${columnId}" unavailable for export from server`
    );

    formattedColumns[columnId] = `${parent ? `${parent} ` : ''}${name}`;
  }

  return formattedColumns;
}

type FormatRecordResult<TField extends string> = Record<TField, string>;

function formatRecord<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn
>(
  record: TRecord,
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns: TViewColumn[]
): FormatRecordResult<TViewColumn> {
  const formattedRecord: Partial<FormatRecordResult<TViewColumn>> = {};

  for (const viewColumn of viewColumns) {
    const column = columns[viewColumn];
    if (!column) {
      continue;
    }

    formattedRecord[viewColumn] = (column.render[column.render.length - 1] as GridGetCell<TRecord>)(
      record,
      false,
      record,
      undefined
    );
  }

  return formattedRecord as FormatRecordResult<TViewColumn>;
}

type FormatDataResult<TColumn extends string> = {
  columns: FormatColumnsResult<TColumn>;
  records: FormatRecordResult<TColumn>[];
  totals?: FormatRecordResult<TColumn>;
};

function formatData<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn
>(
  records: [unknown, TRecord][],
  totals: TRecord | undefined,
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns: TViewColumn[]
): FormatDataResult<TViewColumn> {
  const formatted: FormatDataResult<TViewColumn> = {
    columns: formatColumns(columns, viewColumns),
    records: records.map((record) => formatRecord(record[1], columns, viewColumns))
  };
  if (totals) {
    formatted.totals = formatRecord(totals, columns, viewColumns);
  }

  return formatted;
}

function getFields<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn
>(
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns: TViewColumn[]
): (keyof TRecord & string)[] {
  const fields: Partial<Record<keyof TRecord & string, boolean>> = {};
  for (const columnId of viewColumns) {
    const column = columns[columnId];
    if (!column) {
      continue;
    }

    const columnFields = column.render.slice(0, column.render.length - 1) as (keyof TRecord & string)[];

    for (const columnField of columnFields) {
      fields[columnField] = true;
    }
  }

  return keys(fields);
}

function assertValidViewColumns<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn
>(
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns?: TViewColumn[] | null
): void {
  if (!viewColumns?.length) {
    throw new ArgumentsError('"viewColumns" can`t be empty');
  }

  const notExistColumns: string[] = [];
  for (const columnId of viewColumns) {
    if (!columns[columnId]) {
      notExistColumns.push(columnId);
    }
  }

  if (notExistColumns.length) {
    throw new ArgumentsError(`You trying to get not exist columns: ${notExistColumns.join(', ')}`);
  }
}

export type ExportGridDataParams<TRecord extends Record<string, unknown>> = {
  limit?: number;
  offset?: number;
  sort?: {column: keyof TRecord & string; direction: GridModelSortMode};
};

export type ExportGridDataResult<TExportRunner extends AnyFunction> = TExportRunner extends AnyFunction<
  Promise<infer RESULT>
>
  ? RESULT
  : ReturnType<TExportRunner>;

async function exportGridData<
  TEditableRecord extends Record<string, unknown>,
  TRecord extends TEditableRecord,
  TColumn extends string,
  TViewColumn extends TColumn,
  // eslint-disable-next-line space-before-function-paren
  TExportRunner extends (data: FormatDataResult<TViewColumn>) => Promise<{data: unknown; mime: string}>
>(
  gridModel: IGridModel<unknown, TEditableRecord, TRecord, unknown>,
  columns: Partial<GridColumns<unknown, TEditableRecord, TRecord, TColumn>>,
  viewColumns: TViewColumn[],
  exportRunner: TExportRunner,
  settings: ExportGridDataParams<TRecord>
): Promise<ExportGridDataResult<TExportRunner>> {
  assertValidViewColumns(columns, viewColumns);
  const result = await gridModel.read({
    fields: getFields(columns, viewColumns),
    sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : undefined,
    limit: settings.limit,
    offset: settings.offset
  });

  // TODO totals as TRecord is unsafe
  const totals = result.totals as TRecord | undefined;
  const data = formatData(result.records as [unknown, TRecord][], totals, columns, viewColumns);

  return (await exportRunner(data)) as ExportGridDataResult<TExportRunner>;
}

export default exportGridData;
