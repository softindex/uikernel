"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMultipleSorting = exports.getNextSingleSorting = void 0;
const assert_1 = require("../common/assert");
function getNextSingleSorting(column, currentSortingRule, availableDirectionsForColumn) {
    if (!currentSortingRule || currentSortingRule.column !== column) {
        return {
            column,
            direction: availableDirectionsForColumn[0]
        };
    }
    return {
        column,
        direction: getNextDirection(availableDirectionsForColumn, currentSortingRule.direction)
    };
}
exports.getNextSingleSorting = getNextSingleSorting;
function getNextMultipleSorting(column, currentSortingRules, availableDirectionsForColumn) {
    const nextSortingRules = [...currentSortingRules];
    const currentSortingRuleIndex = nextSortingRules.findIndex((sort) => sort.column === column);
    if (currentSortingRuleIndex < 0) {
        nextSortingRules.push({ column, direction: availableDirectionsForColumn[0] });
        return nextSortingRules;
    }
    let nextDirection;
    const currentSortingRule = nextSortingRules[currentSortingRuleIndex];
    (0, assert_1.assertNonNullish)(currentSortingRule);
    if (currentSortingRuleIndex < nextSortingRules.length - 1) {
        nextDirection = availableDirectionsForColumn[0];
    }
    else {
        nextDirection = getNextDirection(availableDirectionsForColumn, currentSortingRule.direction);
    }
    if (nextDirection === 'default') {
        nextSortingRules.splice(currentSortingRuleIndex, 1);
    }
    else if (currentSortingRuleIndex === nextSortingRules.length - 1) {
        currentSortingRule.direction = nextDirection;
    }
    else {
        nextSortingRules.splice(currentSortingRuleIndex, 1);
        nextSortingRules.push({ column, direction: nextDirection });
    }
    return nextSortingRules;
}
exports.getNextMultipleSorting = getNextMultipleSorting;
function getNextDirection(directions, direction) {
    const nextDirectionIndex = (directions.indexOf(direction) + 1) % directions.length;
    const nextDirection = directions[nextDirectionIndex];
    (0, assert_1.assertNonNullish)(nextDirection, 'nextDirection unavailable');
    return nextDirection;
}
//# sourceMappingURL=utils.js.map