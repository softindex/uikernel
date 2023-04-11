/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ArrayWithAtLeastOneElement} from '../../common/types';
import {GridModelSortMode} from '../models/types/IGridModel';
import {IGridRef} from './IGridRef';

export type EditorContext<TRecord extends Record<string, unknown>, TField extends string & keyof TRecord> = {
  props: {
    value: TRecord[TField];
    onBlur: () => void;
    onChange: (
      eventOrValue: React.SyntheticEvent<Element & {target: {value: TRecord[TField]}}> | TRecord[TField]
    ) => void;
    onFocus: () => void;
    onKeyUp: (event: React.KeyboardEvent) => void;
  };
  set: (changes: Partial<TRecord>) => void;
  updateField: (field: TField, nextValue: TRecord[TField]) => void;
};

export type OnColumnClick<TKey, TRecord extends Record<string, unknown>, TElement extends HTMLElement> = (
  event: React.MouseEvent<TElement>,
  recordId: TKey,
  record: TRecord,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  self: any
) => void;

export type GridGetCell<TRecord extends Record<string, unknown>> = (
  recordWithChanges: TRecord,
  selected: boolean,
  initialRecord: Partial<TRecord>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridRef: IGridRef<any, TRecord, any, any, boolean> | undefined
) => string;

export type GridCellRender<TRecord extends Record<string, unknown>> = readonly [
  ...(string & keyof TRecord)[],
  GridGetCell<TRecord>
];

type GridEditorConfig<
  TColumnId extends string,
  TRecord extends Record<string, unknown>,
  TEditorField extends string & keyof TRecord
> =
  | {
      editor?: undefined;
      editorField?: undefined;
    }
  | ({
      editor: (
        this: EditorContext<TRecord, TEditorField>,
        record: TRecord,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gridRef: IGridRef<any, TRecord, any, any, boolean>
      ) => JSX.Element | null;
    } & (TColumnId extends TEditorField ? {editorField?: TEditorField} : {editorField: TEditorField}));

export type GridColumnName<TKey, TRecord extends Record<string, unknown>> =
  | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((gridRef: IGridRef<TKey, TRecord, any, any, boolean>) => React.ReactNode);

export type GridColumnConfig<
  TColumnId extends string,
  TRecord extends Record<string, unknown>,
  TEditorField extends string & keyof TRecord,
  TKey,
  TElement extends HTMLElement = HTMLElement
> = {
  className?: string;
  escape?: boolean;
  name: GridColumnName<TKey, TRecord>;
  parent?: GridColumnName<TKey, TRecord>;
  render: GridCellRender<TRecord>;
  sortCycle?: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>;
  width?: number | string;
} & GridEditorConfig<TColumnId, TRecord, TEditorField> &
  (
    | {
        onClick?: OnColumnClick<TKey, TRecord, TElement>;
        onClickRefs?: undefined;
      }
    | {
        onClick?: undefined;
        onClickRefs?: Record<string, OnColumnClick<TKey, TRecord, TElement>>;
      }
  );

export type GridColumns<TKey, TRecord extends Record<string, unknown>, TColumnId extends string = string> = {
  [K in TColumnId]: GridColumnConfig<K, TRecord, string & keyof TRecord, TKey>;
};
