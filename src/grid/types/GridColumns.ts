/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ArrayWithAtLeastOneElement} from '../../common/types';
import {IGridModelSortMode} from '../models/types/IGridModel';
import {IGridRef} from './IGridRef';

export type EditorContext<TRecord extends {}, TField extends string & keyof TRecord> = {
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

export type OnColumnClick<TKey, TRecord extends {}, TElement extends HTMLElement> = (
  event: React.MouseEvent<TElement, MouseEvent>,
  recordId: TKey,
  record: Partial<TRecord>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  self: any
) => void;

export type GridGetColumn<TRecord extends {}> = (
  recordWithChanges: Partial<TRecord>,
  selected: boolean,
  initialRecord: Partial<TRecord>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridRef: IGridRef<any, TRecord, any, any, boolean> | undefined
) => string;

export type GridColumnRender<TRecord extends {}> = readonly [
  ...ArrayWithAtLeastOneElement<string & keyof TRecord>,
  GridGetColumn<TRecord>
];

type GridEditorConfig<TRecord extends {}, TEditorField extends string & keyof TRecord> =
  | {
      editor?: undefined;
      editorField?: undefined;
    }
  | {
      editorField: TEditorField;
      editor: (
        this: EditorContext<Partial<TRecord>, TEditorField>,
        record: Partial<TRecord>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gridRef: IGridRef<any, TRecord, any, any, boolean>
      ) => JSX.Element | null;
    };

type GridSortConfig<TSortPossible extends boolean> = TSortPossible extends true
  ? {
      sortCycle?: Readonly<ArrayWithAtLeastOneElement<IGridModelSortMode>>;
    }
  : {
      sortCycle?: undefined;
    };

export type GridColumnName<TKey, TRecord extends {}> =
  | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((gridRef: IGridRef<TKey, TRecord, any, any, boolean>) => React.ReactNode);

export type GridColumnConfig<
  TRecord extends {},
  TEditorField extends string & keyof TRecord,
  TSortPossible extends boolean,
  TKey = never,
  TElement extends HTMLElement = HTMLElement
> = {
  className?: string;
  escape?: boolean;
  name: GridColumnName<TKey, TRecord>;
  parent?: GridColumnName<TKey, TRecord>;
  render: GridColumnRender<TRecord>;
  width?: number | string;
} & GridSortConfig<TSortPossible> &
  GridEditorConfig<TRecord, TEditorField> &
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

export type GridColumns<
  TRecord extends {},
  TColumnId extends string,
  TColumnToEditorField extends {[K in TColumnId]?: string & keyof TRecord} = {},
  TKey = never,
  TElement extends HTMLElement = HTMLElement
> = {
  [K in TColumnId]: GridColumnConfig<
    TRecord,
    TColumnToEditorField[K] extends string & keyof TRecord ? TColumnToEditorField[K] : never,
    K extends string & keyof TRecord ? true : false,
    TKey,
    TElement
  >;
};
