/// <reference types="react" />
import EqualMap from './EqualMap';
export declare function isIntersection(values: string[], searchValues: string[]): boolean;
export declare function indexOf(array: unknown[], item: unknown): number;
export declare function parseValueFromEvent(value: unknown): unknown;
export declare function parseValueFromEvent<TElement extends {
    target: {
        tagName: 'INPUT';
        type: 'checkbox';
    };
}>(event: React.SyntheticEvent<TElement>): boolean;
export declare function parseValueFromEvent<TElement extends {
    target: {
        tagName: 'INPUT';
        type: 'file';
    };
}>(event: React.SyntheticEvent<TElement>): File | null | undefined;
export declare function parseValueFromEvent<TElement extends {
    target: {
        tagName: 'SELECT' | 'TEXTAREA';
    };
}>(event: React.SyntheticEvent<TElement>): string;
export declare function forEach<T extends Record<string, unknown>>(obj: T | null | undefined, func: <TProp extends string & keyof T>(value: T[TProp], prop: TProp) => void): void;
export declare function isEqual(a: unknown, b: unknown): boolean;
export declare function isEmpty(value: unknown): boolean;
export declare function equalMapToArray<TKey, TValue extends Record<string, unknown>>(map: EqualMap<TKey, TValue>): [TKey, TValue][];
export declare function getRecordChanges<TRecord extends Record<string, unknown>>(getValidationDependency: (fields: (string & keyof TRecord)[]) => (string & keyof TRecord)[], data: Partial<TRecord>, changes: Partial<TRecord>, newChanges: Partial<TRecord>): Partial<TRecord>;
export declare function getStack(deep?: number): string;
export declare function warn(message: string): void;
export declare function toEncodedString(value: unknown): string;
export declare function parents(element: Element, selector: string): Element[];
export declare function keys<T extends Record<string, unknown>>(obj: T): (string & keyof T)[];
export declare function isCorrectNumber(value: number): boolean;
