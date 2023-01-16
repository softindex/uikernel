/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArgumentsError from '../../common/error/ArgumentsError';
import {AnyFunction} from '../../common/types';
import {keys} from '../../common/utils';
import {IGridModelSortMode, IGridModel} from '../models/types/IGridModel';
import {GridColumnConfig, GridGetColumn} from '../types/GridColumns';

type FormatColumnsResult<TField extends string> = Record<TField, string>;

function formatColumns<TRecord extends {}, TColumn extends string>(
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns: TColumn[]
): FormatColumnsResult<TColumn> {
  const formattedColumns: FormatColumnsResult<TColumn> = {} as unknown as FormatColumnsResult<TColumn>;
  let columnId;
  let i;

  for (i = 0; i < viewColumns.length; i++) {
    columnId = viewColumns[i];
    formattedColumns[columnId] = `${columns[columnId].parent ? columns[columnId].parent + ' ' : ''}${
      columns[columnId].name
    }`;
  }

  return formattedColumns;
}

type FormatRecordResult<TField extends string> = Record<TField, string>;

function formatRecord<TRecord extends {}, TColumn extends string>(
  record: Partial<TRecord>,
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns: TColumn[]
): FormatRecordResult<TColumn> {
  const formattedRecord: FormatRecordResult<TColumn> = {} as unknown as FormatRecordResult<TColumn>;

  for (const viewColumn of viewColumns) {
    const column = columns[viewColumn];
    formattedRecord[viewColumn] = (column.render[column.render.length - 1] as GridGetColumn<TRecord>)(
      record,
      false,
      record,
      undefined
    );
  }

  return formattedRecord;
}

type FormatDataResult<TColumn extends string> = {
  columns: FormatColumnsResult<TColumn>;
  records: FormatRecordResult<TColumn>[];
  totals?: FormatRecordResult<TColumn>;
};

function formatData<TRecord extends {}, TColumn extends string>(
  records: [unknown, Partial<TRecord>][],
  totals: Partial<TRecord> | undefined,
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns: TColumn[]
): FormatDataResult<TColumn> {
  const formatted: FormatDataResult<TColumn> = {
    columns: formatColumns(columns, viewColumns),
    records: records.map((record) => formatRecord(record[1], columns, viewColumns))
  };
  if (totals) {
    formatted.totals = formatRecord(totals, columns, viewColumns);
  }

  return formatted;
}

function getFields<TRecord extends {}, TColumn extends string>(
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns: TColumn[]
): (keyof TRecord & string)[] {
  const fields: Partial<Record<keyof TRecord & string, boolean>> = {};
  for (const columnId of viewColumns) {
    const columnFields = columns[columnId].render.slice(0, -1) as (keyof TRecord & string)[];

    for (const columnField of columnFields) {
      fields[columnField] = true;
    }
  }

  return keys(fields);
}

function assertValidViewColumns<TRecord extends {}, TColumn extends string>(
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns?: TColumn[] | null
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

type ExportRunner = AnyFunction<Promise<{data: unknown; mime: string}>>;

type ExportGridDataSettings<TRecord extends {}> = {
  limit?: number;
  offset?: number;
  sort?: {column: keyof TRecord & string; direction: IGridModelSortMode};
};

type ExportGridDataResult<TExportRunner extends ExportRunner> = TExportRunner extends AnyFunction<
  Promise<infer RESULT>
>
  ? RESULT
  : ReturnType<ExportRunner>;

async function exportGridData<TRecord extends {}, TColumn extends string, TExportRunner extends ExportRunner>(
  gridModel: IGridModel<unknown, TRecord, unknown>,
  columns: Record<TColumn, GridColumnConfig<TRecord, never, boolean>>,
  viewColumns: TColumn[],
  exportRunner: TExportRunner,
  settings: ExportGridDataSettings<TRecord>
): Promise<ExportGridDataResult<TExportRunner>> {
  assertValidViewColumns(columns, viewColumns);
  const result = await gridModel.read({
    fields: getFields(columns, viewColumns),
    sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : undefined,
    limit: settings.limit,
    offset: settings.offset
  });

  const data = formatData(result.records, result.totals, columns, viewColumns);

  return (await exportRunner(data)) as ExportGridDataResult<TExportRunner>;
}

export default exportGridData;
