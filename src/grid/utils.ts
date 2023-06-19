/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {assertNonNullish} from '../common/assert';
import type {ArrayWithAtLeastOneElement} from '../common/types';
import type {GridModelSortMode} from './models/types/IGridModel';

type SortingRule<TColumn extends string> = {column: TColumn; direction: GridModelSortMode};

export function getNextSingleSorting<TColumn extends string>(
  column: TColumn,
  currentSortingRule: SortingRule<TColumn> | null | undefined,
  availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>
): SortingRule<TColumn> {
  if (!currentSortingRule || currentSortingRule.column !== column) {
    return {
      column,
      direction: availableDirectionsForColumn[0]
    };
  }

  return {
    column,
    // Select the next direction of sorting
    direction: getNextDirection(availableDirectionsForColumn, currentSortingRule.direction)
  };
}

export function getNextMultipleSorting<TColumn extends string>(
  column: TColumn,
  currentSortingRules: SortingRule<TColumn>[],
  availableDirectionsForColumn: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>
): SortingRule<TColumn>[] {
  const nextSortingRules = [...currentSortingRules];

  // Find an element among the other sorts
  const currentSortingRuleIndex = nextSortingRules.findIndex((sort) => sort.column === column);

  if (currentSortingRuleIndex < 0) {
    // Add new element
    nextSortingRules.push({column, direction: availableDirectionsForColumn[0]});
    return nextSortingRules;
  }

  let nextDirection: GridModelSortMode;
  const currentSortingRule = nextSortingRules[currentSortingRuleIndex];
  assertNonNullish(currentSortingRule);

  // Determine the direction of sorting
  if (currentSortingRuleIndex < nextSortingRules.length - 1) {
    nextDirection = availableDirectionsForColumn[0];
  } else {
    // If the item is the last one, select the next direction of sorting
    nextDirection = getNextDirection(availableDirectionsForColumn, currentSortingRule.direction);
  }

  if (nextDirection === 'default') {
    // Remove item from the sorts
    nextSortingRules.splice(currentSortingRuleIndex, 1);
  } else if (currentSortingRuleIndex === nextSortingRules.length - 1) {
    // Set new direction, if the last element
    currentSortingRule.direction = nextDirection;
  } else {
    // Move the item to the end, if it is already in sorts
    nextSortingRules.splice(currentSortingRuleIndex, 1);
    nextSortingRules.push({column, direction: nextDirection});
  }

  return nextSortingRules;
}

function getNextDirection(
  directions: Readonly<ArrayWithAtLeastOneElement<GridModelSortMode>>,
  direction: GridModelSortMode
): GridModelSortMode {
  const nextDirectionIndex = (directions.indexOf(direction) + 1) % directions.length;
  const nextDirection = directions[nextDirectionIndex];
  assertNonNullish(nextDirection, 'nextDirection unavailable');

  return nextDirection;
}
