/// <reference types="react" />
import type { ArrayWithAtLeastOneElement } from '../../common/types';
import type { GridModelSortMode } from '../models/types/IGridModel';
import type { IGridRef } from './IGridRef';
export type EditorContext<TEditableRecord extends Record<string, unknown>, TField extends string & keyof TEditableRecord> = {
    props: {
        value: TEditableRecord[TField];
        onBlur: () => void;
        onChange: (eventOrValue: React.SyntheticEvent<Element & {
            target: {
                value: TEditableRecord[TField];
            };
        }> | TEditableRecord[TField]) => void;
        onFocus: () => void;
        onKeyUp: (event: React.KeyboardEvent) => void;
    };
    set: (changes: Partial<TEditableRecord>) => void;
    updateField: (field: TField, nextValue: TEditableRecord[TField]) => void;
};
export type OnColumnClick<TKey, TRecord extends Record<string, unknown>, TElement extends HTMLElement> = (event: React.MouseEvent<TElement>, recordId: TKey, record: TRecord, self: any) => void;
export type GridGetCell<TRecord extends Record<string, unknown>> = (recordWithChanges: TRecord, selected: boolean, initialRecord: Partial<TRecord>, gridRef: IGridRef<any, any, TRecord, any, any, boolean> | undefined) => string;
export type GridCellRender<TRecord extends Record<string, unknown>> = readonly [
    ...(string & keyof TRecord)[],
    GridGetCell<TRecord>
];
type GridEditorConfig<TColumnId extends string, TEditableRecord extends Record<string, unknown>, TEditorField extends string & keyof TEditableRecord> = {
    editor?: undefined;
    editorField?: undefined;
} | ({
    editor: (this: EditorContext<TEditableRecord, TEditorField>, record: TEditableRecord, gridRef: IGridRef<any, TEditableRecord, any, any, any, boolean>) => JSX.Element | null;
} & (TColumnId extends TEditorField ? {
    editorField?: TEditorField;
} : {
    editorField: TEditorField;
}));
export type GridColumnName<TKey, TRecord extends Record<string, unknown>> = string | ((gridRef: IGridRef<TKey, any, TRecord, any, any, boolean>) => React.ReactNode);
export type GridColumnConfig<TColumnId extends string, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TEditorField extends string & keyof TRecord, TKey, TElement extends HTMLElement = HTMLElement> = {
    className?: string;
    escape?: boolean;
    name: GridColumnName<TKey, TRecord>;
    parent?: GridColumnName<TKey, TRecord>;
    render: GridCellRender<TRecord>;
    sortCycle?: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>;
    width?: number | string;
} & GridEditorConfig<TColumnId, TEditableRecord, TEditorField> & ({
    onClick?: OnColumnClick<TKey, TRecord, TElement>;
    onClickRefs?: undefined;
} | {
    onClick?: undefined;
    onClickRefs?: Record<string, OnColumnClick<TKey, TRecord, TElement>>;
});
export type GridColumns<TKey, TEditableRecord extends Record<string, unknown>, TRecord extends TEditableRecord, TColumnId extends string = string> = {
    [K in TColumnId]: GridColumnConfig<K, TEditableRecord, TRecord, keyof TEditableRecord & string, TKey>;
};
export {};
