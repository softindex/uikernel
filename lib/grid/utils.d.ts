import { ArrayWithAtLeastOneElement } from '../common/types';
import { GridModelSortMode } from './models/types/IGridModel';
type SortingRule<TColumn extends string> = {
    column: TColumn;
    direction: GridModelSortMode;
};
export declare function getNextSingleSorting<TColumn extends string>(column: TColumn, currentSortingRule: SortingRule<TColumn> | null | undefined, availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>): SortingRule<TColumn>;
export declare function getNextMultipleSorting<TColumn extends string>(column: TColumn, currentSortingRules: SortingRule<TColumn>[], availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>): SortingRule<TColumn>[];
export {};
