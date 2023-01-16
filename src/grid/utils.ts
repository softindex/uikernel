/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ArrayWithAtLeastOneElement} from '../common/types';
import {IGridModelSortMode} from './models/types/IGridModel';

type SortingRule<TColumn extends string> = {column: TColumn; direction: IGridModelSortMode};

export function getNextSingleSorting<TColumn extends string>(
  column: TColumn,
  currentSorting: SortingRule<TColumn> | null | undefined,
  availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<IGridModelSortMode>>
): SortingRule<TColumn> {
  if (!currentSorting || currentSorting.column !== column) {
    return {
      column,
      direction: availableDirectionsForColumn[0]
    };
  }

  return {
    column,
    // Select the next direction of sorting
    direction:
      availableDirectionsForColumn[
        (availableDirectionsForColumn.indexOf(currentSorting.direction) + 1) %
          availableDirectionsForColumn.length
      ]
  };
}

export function getNextMultipleSorting<TColumn extends string>(
  column: TColumn,
  currentSorting: SortingRule<TColumn>[],
  availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<IGridModelSortMode>>
): SortingRule<TColumn>[] {
  const nextSorting = [...currentSorting];

  // Find an element among the other sorts
  const currentSortIndex = nextSorting.findIndex((sort) => sort.column === column);

  if (currentSortIndex < 0) {
    // Add new element
    nextSorting.push({column, direction: availableDirectionsForColumn[0]});
    return nextSorting;
  }

  let nextDirection: IGridModelSortMode;
  const currentSort = nextSorting[currentSortIndex];

  // Determine the direction of sorting
  if (currentSortIndex < nextSorting.length - 1) {
    nextDirection = availableDirectionsForColumn[0];
  } else {
    // If the item is the last one, select the next direction of sorting
    nextDirection =
      availableDirectionsForColumn[
        (availableDirectionsForColumn.indexOf(currentSort.direction) + 1) %
          availableDirectionsForColumn.length
      ];
  }

  if (nextDirection === 'default') {
    // Remove item from the sorts
    nextSorting.splice(currentSortIndex, 1);
  } else if (currentSortIndex === nextSorting.length - 1) {
    // Set new direction, if the last element
    currentSort.direction = nextDirection;
  } else {
    // Move the item to the end, if it is already in sorts
    nextSorting.splice(currentSortIndex, 1);
    nextSorting.push({column, direction: nextDirection});
  }

  return nextSorting;
}
